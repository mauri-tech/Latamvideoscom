import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { 
  insertUserSchema, 
  insertEditorProfileSchema, 
  insertPortfolioItemSchema,
  insertBriefSchema,
  insertForumCategorySchema,
  insertForumTopicSchema,
  insertForumPostSchema,
  insertCourseCategorySchema,
  insertCourseSchema,
  insertCourseModuleSchema,
  insertCourseLessonSchema,
  insertReviewSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { createAdminUser } from "./createAdminUser";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create admin user if it doesn't exist
  try {
    await createAdminUser();
    console.log("Admin user setup completed");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
  
  // Setup authentication
  setupAuth(app);
  
  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // User Routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      const user = await storage.createUser(userData);
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });

  // Ruta para obtener todos los usuarios (solo para administradores)
  app.get("/api/users", async (req, res) => {
    try {
      // Verificar que el usuario está autenticado
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Verificar que el usuario es administrador
      const currentUser = req.user as Express.User;
      if (currentUser.userType !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
      }
      
      const users = await storage.getAllUsers();
      
      // No devolver las contraseñas
      const safeUsers = users.map(user => {
        const { password, ...userData } = user;
        return userData;
      });
      
      res.json(safeUsers);
    } catch (error) {
      console.error("Error getting all users:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password
      const { password, ...userData } = user;
      res.json(userData);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Software Routes
  app.get("/api/software", async (_req, res) => {
    try {
      const allSoftware = await storage.getAllSoftware();
      res.json(allSoftware);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Editing Styles Routes
  app.get("/api/editing-styles", async (_req, res) => {
    try {
      const styles = await storage.getAllEditingStyles();
      res.json(styles);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Editor Profile Routes
  app.post("/api/editor-profiles", async (req, res) => {
    try {
      const profileData = insertEditorProfileSchema.parse(req.body);
      
      // Check if user exists
      const user = await storage.getUser(profileData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if profile already exists
      const existingProfile = await storage.getEditorProfileByUserId(profileData.userId);
      if (existingProfile) {
        return res.status(400).json({ message: "Profile already exists for this user" });
      }
      
      const profile = await storage.createEditorProfile(profileData);
      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });

  app.get("/api/editor-profiles/:id", async (req, res) => {
    try {
      const profile = await storage.getEditorProfile(parseInt(req.params.id));
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      // Increment view count
      await storage.incrementProfileView(profile.id);
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/editor-profiles/user/:userId", async (req, res) => {
    try {
      const profile = await storage.getEditorProfileByUserId(parseInt(req.params.userId));
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put("/api/editor-profiles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const profile = await storage.getEditorProfile(id);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      const updatedProfile = await storage.updateEditorProfile(id, req.body);
      res.json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/editor-profiles/:id/contact-click", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const profile = await storage.getEditorProfile(id);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      await storage.incrementContactClick(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/editor-profiles", async (req, res) => {
    try {
      // Extract filter parameters
      const filters: Record<string, any> = {};
      
      // Software filter
      if (req.query.software) {
        filters.software = (req.query.software as string).split(',').map(Number);
      }
      
      // Editing styles filter
      if (req.query.editingStyles) {
        filters.editingStyles = (req.query.editingStyles as string).split(',').map(Number);
      }
      
      // Rate filter
      if (req.query.maxRate) {
        filters.maxRate = parseFloat(req.query.maxRate as string);
      }
      
      // Experience level filter
      if (req.query.experienceLevel) {
        filters.experienceLevel = req.query.experienceLevel as string;
      }
      
      // Professional type filter
      if (req.query.professionalType) {
        filters.professionalType = req.query.professionalType as string;
      }
      
      // Country filter
      if (req.query.country) {
        filters.country = (req.query.country as string).split(',');
      }
      
      // Languages filter
      if (req.query.languages) {
        filters.languages = (req.query.languages as string).split(',');
      }
      
      // Expertise areas filter
      if (req.query.expertise) {
        filters.expertise = (req.query.expertise as string).split(',');
      }
      
      // Delivery time filter
      if (req.query.deliveryTime) {
        filters.deliveryTime = req.query.deliveryTime as string;
      }
      
      // Rating filter
      if (req.query.minRating) {
        filters.minRating = parseFloat(req.query.minRating as string);
      }
      
      // Sort by parameter
      if (req.query.sortBy) {
        filters.sortBy = req.query.sortBy as string;
      }
      
      // Pagination parameters
      if (req.query.page) {
        filters.page = parseInt(req.query.page as string);
      }
      
      if (req.query.limit) {
        filters.limit = parseInt(req.query.limit as string);
      }
      
      const profiles = await storage.searchEditorProfiles(filters);
      
      // Apply pagination if specified
      let paginatedProfiles = profiles;
      if (filters.page && filters.limit) {
        const startIndex = (filters.page - 1) * filters.limit;
        const endIndex = filters.page * filters.limit;
        paginatedProfiles = profiles.slice(startIndex, endIndex);
      }
      
      // Get user data for each profile
      const profilesWithUserData = await Promise.all(
        paginatedProfiles.map(async (profile) => {
          const user = await storage.getUser(profile.userId);
          if (!user) return null; // Should not happen
          
          // Don't return password
          const { password, ...userData } = user;
          
          // Get portfolio items for this profile
          const portfolioItems = await storage.getPortfolioItems(profile.id);
          
          // Featured portfolio item (first one)
          const featuredPortfolio = portfolioItems.length > 0 ? portfolioItems[0] : null;
          
          return {
            profile,
            user: userData,
            featuredPortfolio
          };
        })
      );
      
      // Filter out nulls
      const validProfiles = profilesWithUserData.filter(Boolean);
      
      // Return pagination metadata along with results
      const response = {
        results: validProfiles,
        pagination: {
          total: profiles.length,
          page: filters.page || 1,
          limit: filters.limit || profiles.length,
          totalPages: filters.limit ? Math.ceil(profiles.length / filters.limit) : 1
        }
      };
      
      res.json(response);
    } catch (error) {
      console.error("Error in search editor profiles:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Portfolio Routes
  app.get("/api/portfolio/:editorProfileId", async (req, res) => {
    try {
      const items = await storage.getPortfolioItems(parseInt(req.params.editorProfileId));
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/portfolio", async (req, res) => {
    try {
      const itemData = insertPortfolioItemSchema.parse(req.body);
      
      // Check if profile exists
      const profile = await storage.getEditorProfile(itemData.editorProfileId);
      if (!profile) {
        return res.status(404).json({ message: "Editor profile not found" });
      }
      
      const item = await storage.createPortfolioItem(itemData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });

  app.put("/api/portfolio/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.updatePortfolioItem(id, req.body);
      
      if (!item) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.delete("/api/portfolio/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePortfolioItem(id);
      
      if (!success) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Brief Routes
  app.post("/api/briefs", async (req, res) => {
    try {
      const briefData = insertBriefSchema.parse(req.body);
      
      // Check if client exists
      const client = await storage.getUser(briefData.clientId);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      
      // Check if editor exists
      const editorProfile = await storage.getEditorProfile(briefData.editorId);
      if (!editorProfile) {
        return res.status(404).json({ message: "Editor not found" });
      }
      
      const brief = await storage.createBrief(briefData);
      res.status(201).json(brief);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });

  app.get("/api/briefs/client/:clientId", async (req, res) => {
    try {
      const briefs = await storage.getBriefsByClientId(parseInt(req.params.clientId));
      res.json(briefs);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/briefs/editor/:editorId", async (req, res) => {
    try {
      const briefs = await storage.getBriefsByEditorId(parseInt(req.params.editorId));
      res.json(briefs);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put("/api/briefs/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !['pending', 'accepted', 'rejected', 'completed'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedBrief = await storage.updateBriefStatus(id, status);
      
      if (!updatedBrief) {
        return res.status(404).json({ message: "Brief not found" });
      }
      
      res.json(updatedBrief);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Forum Routes
  // Categories
  app.get("/api/forum/categories", async (_req, res) => {
    try {
      const categories = await storage.getAllForumCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/forum/categories/:id", async (req, res) => {
    try {
      const category = await storage.getForumCategory(parseInt(req.params.id));
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/forum/categories/slug/:slug", async (req, res) => {
    try {
      const category = await storage.getForumCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/forum/categories", async (req, res) => {
    try {
      // Require authentication and admin role
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Check if user is admin
      const user = req.user;
      if (user.userType !== "admin") {
        return res.status(403).json({ message: "Admin permission required" });
      }
      
      const categoryData = insertForumCategorySchema.parse(req.body);
      const category = await storage.createForumCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });
  
  app.put("/api/forum/categories/:id", async (req, res) => {
    try {
      // Require authentication and admin role
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Check if user is admin
      const user = req.user;
      if (user.userType !== "admin") {
        return res.status(403).json({ message: "Admin permission required" });
      }
      
      const id = parseInt(req.params.id);
      const category = await storage.getForumCategory(id);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const updatedCategory = await storage.updateForumCategory(id, req.body);
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.delete("/api/forum/categories/:id", async (req, res) => {
    try {
      // Require authentication and admin role
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Check if user is admin
      const user = req.user;
      if (user.userType !== "admin") {
        return res.status(403).json({ message: "Admin permission required" });
      }
      
      const id = parseInt(req.params.id);
      const success = await storage.deleteForumCategory(id);
      
      if (!success) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Topics
  app.get("/api/forum/topics", async (req, res) => {
    try {
      const categoryId = req.query.categoryId 
        ? parseInt(req.query.categoryId as string) 
        : undefined;
      
      const topics = await storage.getForumTopics(categoryId);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/forum/topics/:id", async (req, res) => {
    try {
      const topic = await storage.getForumTopic(parseInt(req.params.id));
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      
      // Increment view count
      await storage.incrementTopicView(topic.id);
      
      res.json(topic);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/forum/topics/slug/:slug", async (req, res) => {
    try {
      const topic = await storage.getForumTopicBySlug(req.params.slug);
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      
      // Increment view count
      await storage.incrementTopicView(topic.id);
      
      res.json(topic);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/forum/topics/user/:userId", async (req, res) => {
    try {
      const topics = await storage.getForumTopicsByAuthor(parseInt(req.params.userId));
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/forum/topics", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const topicData = insertForumTopicSchema.parse({
        ...req.body,
        authorId: req.user.id // Set the current user as author
      });
      
      // Check if category exists
      const category = await storage.getForumCategory(topicData.categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const topic = await storage.createForumTopic(topicData);
      
      // Create the first post for the topic
      const postData = {
        topicId: topic.id,
        authorId: req.user.id,
        content: topicData.content
      };
      
      await storage.createForumPost(postData);
      
      res.status(201).json(topic);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });
  
  app.put("/api/forum/topics/:id", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const topic = await storage.getForumTopic(id);
      
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      
      // Check if user is author or admin
      if (topic.authorId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const updatedTopic = await storage.updateForumTopic(id, req.body);
      res.json(updatedTopic);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.delete("/api/forum/topics/:id", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const topic = await storage.getForumTopic(id);
      
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      
      // Check if user is author or admin
      if (topic.authorId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const success = await storage.deleteForumTopic(id);
      
      if (!success) {
        return res.status(404).json({ message: "Topic not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/forum/topics/:id/pin", async (req, res) => {
    try {
      // Require authentication and admin role
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Check if user is admin
      if (req.user.userType !== "admin") {
        return res.status(403).json({ message: "Admin permission required" });
      }
      
      const id = parseInt(req.params.id);
      const { isPinned } = req.body;
      
      if (typeof isPinned !== 'boolean') {
        return res.status(400).json({ message: "isPinned must be a boolean" });
      }
      
      const topic = await storage.togglePinTopic(id, isPinned);
      
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      
      res.json(topic);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/forum/topics/:id/close", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const topic = await storage.getForumTopic(id);
      
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      
      // Check if user is author or admin
      if (topic.authorId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const { isClosed } = req.body;
      
      if (typeof isClosed !== 'boolean') {
        return res.status(400).json({ message: "isClosed must be a boolean" });
      }
      
      const updatedTopic = await storage.toggleCloseTopic(id, isClosed);
      res.json(updatedTopic);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Posts
  app.get("/api/forum/posts/:topicId", async (req, res) => {
    try {
      const posts = await storage.getForumPosts(parseInt(req.params.topicId));
      
      // Get author data for each post
      const postsWithAuthorData = await Promise.all(
        posts.map(async (post) => {
          const user = await storage.getUser(post.authorId);
          if (!user) return { ...post, author: null };
          
          // Don't return password
          const { password, ...userData } = user;
          
          return {
            ...post,
            author: userData
          };
        })
      );
      
      res.json(postsWithAuthorData);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/forum/posts/user/:userId", async (req, res) => {
    try {
      const posts = await storage.getForumPostsByAuthor(parseInt(req.params.userId));
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/forum/posts", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const postData = insertForumPostSchema.parse({
        ...req.body,
        authorId: req.user.id // Set the current user as author
      });
      
      // Check if topic exists
      const topic = await storage.getForumTopic(postData.topicId);
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      
      // Check if topic is closed
      if (topic.isClosed && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Topic is closed" });
      }
      
      const post = await storage.createForumPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });
  
  app.put("/api/forum/posts/:id", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const post = await storage.getForumPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      // Check if user is author or admin
      if (post.authorId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const updatedPost = await storage.updateForumPost(id, req.body);
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.delete("/api/forum/posts/:id", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const post = await storage.getForumPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      // Check if user is author or admin
      if (post.authorId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const success = await storage.deleteForumPost(id);
      
      if (!success) {
        return res.status(404).json({ message: "Post not found or is the first post of a topic" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/forum/posts/:id/accept", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const post = await storage.getForumPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      // Get the topic to check author
      const topic = await storage.getForumTopic(post.topicId);
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      
      // Check if user is topic author or admin
      if (topic.authorId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const { isAccepted } = req.body;
      
      if (typeof isAccepted !== 'boolean') {
        return res.status(400).json({ message: "isAccepted must be a boolean" });
      }
      
      const updatedPost = await storage.markPostAsAcceptedAnswer(id, isAccepted);
      
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found or is the first post of a topic" });
      }
      
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Course Routes
  // Categories
  app.get("/api/courses/categories", async (_req, res) => {
    try {
      const categories = await storage.getAllCourseCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/courses/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCourseCategory(parseInt(req.params.id));
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/courses/categories/slug/:slug", async (req, res) => {
    try {
      const category = await storage.getCourseCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/courses/categories", async (req, res) => {
    try {
      // Require authentication and admin role
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Check if user is admin
      const user = req.user;
      if (user.userType !== "admin") {
        return res.status(403).json({ message: "Admin permission required" });
      }
      
      const categoryData = insertCourseCategorySchema.parse(req.body);
      const category = await storage.createCourseCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });
  
  app.put("/api/courses/categories/:id", async (req, res) => {
    try {
      // Require authentication and admin role
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Check if user is admin
      const user = req.user;
      if (user.userType !== "admin") {
        return res.status(403).json({ message: "Admin permission required" });
      }
      
      const id = parseInt(req.params.id);
      const category = await storage.getCourseCategory(id);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const updatedCategory = await storage.updateCourseCategory(id, req.body);
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.delete("/api/courses/categories/:id", async (req, res) => {
    try {
      // Require authentication and admin role
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Check if user is admin
      const user = req.user;
      if (user.userType !== "admin") {
        return res.status(403).json({ message: "Admin permission required" });
      }
      
      const id = parseInt(req.params.id);
      const success = await storage.deleteCourseCategory(id);
      
      if (!success) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Courses
  app.get("/api/courses", async (req, res) => {
    try {
      const categoryId = req.query.categoryId 
        ? parseInt(req.query.categoryId as string) 
        : undefined;
      
      const courses = await storage.getCourses(categoryId);
      
      // Filter out unpublished courses unless user is admin
      let filteredCourses = courses;
      if (!(req.isAuthenticated() && req.user.userType === "admin")) {
        filteredCourses = courses.filter(course => course.isPublished);
      }
      
      res.json(filteredCourses);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(parseInt(req.params.id));
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Check if course is published or user is admin
      if (!course.isPublished && !(req.isAuthenticated() && req.user.userType === "admin")) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/courses/slug/:slug", async (req, res) => {
    try {
      const course = await storage.getCourseBySlug(req.params.slug);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Check if course is published or user is admin
      if (!course.isPublished && !(req.isAuthenticated() && req.user.userType === "admin")) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/courses/instructor/:instructorId", async (req, res) => {
    try {
      const courses = await storage.getCoursesByInstructor(parseInt(req.params.instructorId));
      
      // Filter out unpublished courses unless user is admin or the instructor
      let filteredCourses = courses;
      if (req.isAuthenticated()) {
        const isAdminOrInstructor = req.user.userType === "admin" || 
          req.user.id === parseInt(req.params.instructorId);
        
        if (!isAdminOrInstructor) {
          filteredCourses = courses.filter(course => course.isPublished);
        }
      } else {
        filteredCourses = courses.filter(course => course.isPublished);
      }
      
      res.json(filteredCourses);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/courses", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Only instructors and admins can create courses
      if (req.user.userType !== "admin" && req.user.userType !== "editor") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const courseData = insertCourseSchema.parse({
        ...req.body,
        instructorId: req.user.id // Set the current user as instructor
      });
      
      // Check if category exists
      const category = await storage.getCourseCategory(courseData.categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });
  
  app.put("/api/courses/:id", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const course = await storage.getCourse(id);
      
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Check if user is instructor or admin
      if (course.instructorId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const updatedCourse = await storage.updateCourse(id, req.body);
      res.json(updatedCourse);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.delete("/api/courses/:id", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const course = await storage.getCourse(id);
      
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Check if user is instructor or admin
      if (course.instructorId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const success = await storage.deleteCourse(id);
      
      if (!success) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/courses/:id/publish", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const course = await storage.getCourse(id);
      
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Check if user is instructor or admin
      if (course.instructorId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const { isPublished } = req.body;
      
      if (typeof isPublished !== 'boolean') {
        return res.status(400).json({ message: "isPublished must be a boolean" });
      }
      
      const updatedCourse = await storage.toggleCoursePublished(id, isPublished);
      res.json(updatedCourse);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Modules
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      
      // Check if course exists and is published or user has access
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      if (!course.isPublished && !(req.isAuthenticated() && 
          (req.user.userType === "admin" || req.user.id === course.instructorId))) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      const modules = await storage.getCourseModules(courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const courseId = parseInt(req.params.courseId);
      
      // Check if course exists
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Check if user is instructor or admin
      if (course.instructorId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const moduleData = insertCourseModuleSchema.parse({
        ...req.body,
        courseId
      });
      
      const module = await storage.createCourseModule(moduleData);
      res.status(201).json(module);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });
  
  app.put("/api/courses/modules/:id", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const module = await storage.getCourseModule(id);
      
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      // Check if user is instructor or admin
      const course = await storage.getCourse(module.courseId);
      if (!course || (course.instructorId !== req.user.id && req.user.userType !== "admin")) {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const updatedModule = await storage.updateCourseModule(id, req.body);
      res.json(updatedModule);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.delete("/api/courses/modules/:id", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const module = await storage.getCourseModule(id);
      
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      // Check if user is instructor or admin
      const course = await storage.getCourse(module.courseId);
      if (!course || (course.instructorId !== req.user.id && req.user.userType !== "admin")) {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const success = await storage.deleteCourseModule(id);
      
      if (!success) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Lessons
  app.get("/api/courses/modules/:moduleId/lessons", async (req, res) => {
    try {
      const moduleId = parseInt(req.params.moduleId);
      
      // Check if module exists
      const module = await storage.getCourseModule(moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      // Check if course is published or user has access
      const course = await storage.getCourse(module.courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      if (!course.isPublished && !(req.isAuthenticated() && 
          (req.user.userType === "admin" || req.user.id === course.instructorId))) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      const lessons = await storage.getCourseLessons(moduleId);
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/courses/modules/:moduleId/lessons", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const moduleId = parseInt(req.params.moduleId);
      
      // Check if module exists
      const module = await storage.getCourseModule(moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      // Check if user is instructor or admin
      const course = await storage.getCourse(module.courseId);
      if (!course || (course.instructorId !== req.user.id && req.user.userType !== "admin")) {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const lessonData = insertCourseLessonSchema.parse({
        ...req.body,
        moduleId
      });
      
      const lesson = await storage.createCourseLesson(lessonData);
      res.status(201).json(lesson);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });
  
  app.put("/api/courses/lessons/:id", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const lesson = await storage.getCourseLesson(id);
      
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      
      // Check if user is instructor or admin
      const module = await storage.getCourseModule(lesson.moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      const course = await storage.getCourse(module.courseId);
      if (!course || (course.instructorId !== req.user.id && req.user.userType !== "admin")) {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const updatedLesson = await storage.updateCourseLesson(id, req.body);
      res.json(updatedLesson);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.delete("/api/courses/lessons/:id", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const id = parseInt(req.params.id);
      const lesson = await storage.getCourseLesson(id);
      
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      
      // Check if user is instructor or admin
      const module = await storage.getCourseModule(lesson.moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      const course = await storage.getCourse(module.courseId);
      if (!course || (course.instructorId !== req.user.id && req.user.userType !== "admin")) {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const success = await storage.deleteCourseLesson(id);
      
      if (!success) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Enrollments and Progress
  app.post("/api/courses/:courseId/enroll", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const courseId = parseInt(req.params.courseId);
      
      // Check if course exists and is published
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      if (!course.isPublished && req.user.userType !== "admin" && req.user.id !== course.instructorId) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      const enrollment = await storage.enrollUserInCourse(courseId, req.user.id);
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const courseId = parseInt(req.params.courseId);
      
      // Check if course exists
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Only instructor or admin can see all enrollments
      if (course.instructorId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const enrollments = await storage.getCourseEnrollments(courseId);
      
      // Get user data for each enrollment
      const enrollmentsWithUserData = await Promise.all(
        enrollments.map(async (enrollment) => {
          const user = await storage.getUser(enrollment.userId);
          if (!user) return { ...enrollment, user: null };
          
          // Don't return password
          const { password, ...userData } = user;
          
          return {
            ...enrollment,
            user: userData
          };
        })
      );
      
      res.json(enrollmentsWithUserData);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/users/:userId/enrollments", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const userId = parseInt(req.params.userId);
      
      // Users can only see their own enrollments unless admin
      if (userId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      
      const enrollments = await storage.getUserEnrollments(userId);
      
      // Get course data for each enrollment
      const enrollmentsWithCourseData = await Promise.all(
        enrollments.map(async (enrollment) => {
          const course = await storage.getCourse(enrollment.courseId);
          return {
            ...enrollment,
            course
          };
        })
      );
      
      res.json(enrollmentsWithCourseData);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/courses/lessons/:lessonId/progress", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const lessonId = parseInt(req.params.lessonId);
      const { completed } = req.body;
      
      if (typeof completed !== 'boolean') {
        return res.status(400).json({ message: "completed must be a boolean" });
      }
      
      // Check if lesson exists
      const lesson = await storage.getCourseLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      
      // Check if user is enrolled in the course
      const module = await storage.getCourseModule(lesson.moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      const enrollments = await storage.getUserEnrollments(req.user.id);
      const isEnrolled = enrollments.some(e => e.courseId === module.courseId);
      
      if (!isEnrolled && req.user.userType !== "admin") {
        return res.status(403).json({ message: "You are not enrolled in this course" });
      }
      
      const progress = await storage.updateLessonProgress(lessonId, req.user.id, completed);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.get("/api/courses/:courseId/progress", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const courseId = parseInt(req.params.courseId);
      
      // Check if course exists
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Check if user is enrolled
      const enrollments = await storage.getUserEnrollments(req.user.id);
      const isEnrolled = enrollments.some(e => e.courseId === courseId);
      
      if (!isEnrolled && req.user.userType !== "admin" && req.user.id !== course.instructorId) {
        return res.status(403).json({ message: "You are not enrolled in this course" });
      }
      
      const progress = await storage.getUserCourseProgress(req.user.id, courseId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/courses/:courseId/complete", async (req, res) => {
    try {
      // Require authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const courseId = parseInt(req.params.courseId);
      
      // Check if course exists
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Check if user is enrolled
      const enrollments = await storage.getUserEnrollments(req.user.id);
      const isEnrolled = enrollments.some(e => e.courseId === courseId);
      
      if (!isEnrolled) {
        return res.status(403).json({ message: "You are not enrolled in this course" });
      }
      
      // Optionally check if all lessons are completed
      const progress = await storage.getUserCourseProgress(req.user.id, courseId);
      if (progress.completed < progress.total && req.user.userType !== "admin") {
        return res.status(400).json({ 
          message: "You need to complete all lessons first",
          progress
        });
      }
      
      const enrollment = await storage.markCourseAsCompleted(courseId, req.user.id);
      
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
      
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Ruta para crear datos de prueba (solo para administradores)
  app.post("/api/admin/create-test-data", async (req, res) => {
    try {
      // Verificar que el usuario está autenticado
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Verificar que el usuario es administrador
      const currentUser = req.user as Express.User;
      if (currentUser.userType !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
      }
      
      // Crear usuarios de prueba con diferentes roles profesionales
      const professionalTypes = [
        "editor", "videographer", "sound", "lighting", "colorist", "vfx", "animator", "director"
      ];
      
      const createdProfiles = [];
      
      // Crear un usuario y perfil para cada tipo profesional
      for (let i = 0; i < professionalTypes.length; i++) {
        // Crear usuario
        const testUser = await storage.createUser({
          email: `test${i+1}@example.com`,
          password: "password123",
          name: `Test ${professionalTypes[i].charAt(0).toUpperCase() + professionalTypes[i].slice(1)}`,
          userType: "editor"
        });
        
        // Crear perfil de editor con tipo profesional específico
        const profile = await storage.createEditorProfile({
          userId: testUser.id,
          software: [1, 2],
          editingStyles: [1, 3],
          equipment: ["Camera", "Microphone"],
          basicRate: 80 + i * 20,
          mediumRate: 120 + i * 20,
          advancedRate: 180 + i * 20,
          weeklyAvailability: 40,
          paymentMethods: ["PayPal", "Bank Transfer"],
          experience: "5+ years",
          expertise: ["Commercials", "Documentaries"],
          professionalType: professionalTypes[i]
        });
        
        createdProfiles.push({
          userId: testUser.id,
          profileId: profile.id,
          professionalType: professionalTypes[i]
        });
      }
      
      res.status(201).json({
        message: "Test data created successfully",
        profiles: createdProfiles
      });
    } catch (error) {
      console.error("Error creating test data:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
