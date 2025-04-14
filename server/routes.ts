import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertEditorProfileSchema, 
  insertPortfolioItemSchema,
  insertBriefSchema
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
      
      if (req.query.software) {
        filters.software = (req.query.software as string).split(',').map(Number);
      }
      
      if (req.query.editingStyles) {
        filters.editingStyles = (req.query.editingStyles as string).split(',').map(Number);
      }
      
      if (req.query.maxRate) {
        filters.maxRate = parseFloat(req.query.maxRate as string);
      }
      
      const profiles = await storage.searchEditorProfiles(filters);
      
      // Get user data for each profile
      const profilesWithUserData = await Promise.all(
        profiles.map(async (profile) => {
          const user = await storage.getUser(profile.userId);
          if (!user) return null; // Should not happen
          
          // Don't return password
          const { password, ...userData } = user;
          
          return {
            profile,
            user: userData
          };
        })
      );
      
      // Filter out nulls
      const validProfiles = profilesWithUserData.filter(Boolean);
      
      res.json(validProfiles);
    } catch (error) {
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

  const httpServer = createServer(app);
  return httpServer;
}
