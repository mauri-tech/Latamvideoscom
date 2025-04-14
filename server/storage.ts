import { 
  users, User, InsertUser,
  software, Software, InsertSoftware,
  editingStyles, EditingStyle, InsertEditingStyle,
  editorProfiles, EditorProfile, InsertEditorProfile,
  portfolioItems, PortfolioItem, InsertPortfolioItem,
  briefs, Brief, InsertBrief,
  reviews, Review, InsertReview,
  // Forum imports
  forumCategories, ForumCategory, InsertForumCategory,
  forumTopics, ForumTopic, InsertForumTopic,
  forumPosts, ForumPost, InsertForumPost,
  // Course imports
  courseCategories, CourseCategory, InsertCourseCategory,
  courses, Course, InsertCourse,
  courseModules, CourseModule, InsertCourseModule,
  courseLessons, CourseLesson, InsertCourseLesson,
  courseEnrollments, CourseEnrollment, InsertCourseEnrollment,
  lessonProgress, LessonProgress, InsertLessonProgress
} from "@shared/schema";
import { db } from "./db";
import { eq, and, inArray, lte, desc, sql } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";
import createMemoryStore from "memorystore";

// Storage interface
export interface IStorage {
  // Session Store para autenticación
  sessionStore: session.Store;
  
  // User Methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<User | undefined>;
  
  // Software Methods
  getAllSoftware(): Promise<Software[]>;
  getSoftware(id: number): Promise<Software | undefined>;
  createSoftware(data: InsertSoftware): Promise<Software>;
  
  // Editing Styles Methods
  getAllEditingStyles(): Promise<EditingStyle[]>;
  getEditingStyle(id: number): Promise<EditingStyle | undefined>;
  createEditingStyle(data: InsertEditingStyle): Promise<EditingStyle>;
  
  // Editor Profile Methods
  getEditorProfile(id: number): Promise<EditorProfile | undefined>;
  getEditorProfileByUserId(userId: number): Promise<EditorProfile | undefined>;
  createEditorProfile(data: InsertEditorProfile): Promise<EditorProfile>;
  updateEditorProfile(id: number, data: Partial<EditorProfile>): Promise<EditorProfile | undefined>;
  searchEditorProfiles(filters: Record<string, any>): Promise<EditorProfile[]>;
  incrementProfileView(id: number): Promise<void>;
  incrementContactClick(id: number): Promise<void>;
  
  // Portfolio Methods
  getPortfolioItems(editorProfileId: number): Promise<PortfolioItem[]>;
  createPortfolioItem(data: InsertPortfolioItem): Promise<PortfolioItem>;
  updatePortfolioItem(id: number, data: Partial<PortfolioItem>): Promise<PortfolioItem | undefined>;
  deletePortfolioItem(id: number): Promise<boolean>;
  
  // Brief Methods
  getBrief(id: number): Promise<Brief | undefined>;
  getBriefsByClientId(clientId: number): Promise<Brief[]>;
  getBriefsByEditorId(editorId: number): Promise<Brief[]>;
  createBrief(data: InsertBrief): Promise<Brief>;
  updateBriefStatus(id: number, status: string): Promise<Brief | undefined>;
  
  // Review Methods
  getReview(id: number): Promise<Review | undefined>;
  getReviewsByEditorProfileId(editorProfileId: number): Promise<Review[]>;
  getReviewsByClientId(clientId: number): Promise<Review[]>;
  createReview(data: InsertReview): Promise<Review>;
  updateReview(id: number, data: Partial<Review>): Promise<Review | undefined>;
  deleteReview(id: number): Promise<boolean>;
  
  // Forum Methods
  // Categories
  getAllForumCategories(): Promise<ForumCategory[]>;
  getForumCategory(id: number): Promise<ForumCategory | undefined>;
  getForumCategoryBySlug(slug: string): Promise<ForumCategory | undefined>;
  createForumCategory(data: InsertForumCategory): Promise<ForumCategory>;
  updateForumCategory(id: number, data: Partial<ForumCategory>): Promise<ForumCategory | undefined>;
  deleteForumCategory(id: number): Promise<boolean>;
  
  // Topics
  getForumTopics(categoryId?: number): Promise<ForumTopic[]>;
  getForumTopic(id: number): Promise<ForumTopic | undefined>;
  getForumTopicBySlug(slug: string): Promise<ForumTopic | undefined>;
  getForumTopicsByAuthor(authorId: number): Promise<ForumTopic[]>;
  createForumTopic(data: InsertForumTopic): Promise<ForumTopic>;
  updateForumTopic(id: number, data: Partial<ForumTopic>): Promise<ForumTopic | undefined>;
  deleteForumTopic(id: number): Promise<boolean>;
  incrementTopicView(id: number): Promise<void>;
  togglePinTopic(id: number, isPinned: boolean): Promise<ForumTopic | undefined>;
  toggleCloseTopic(id: number, isClosed: boolean): Promise<ForumTopic | undefined>;
  
  // Posts
  getForumPosts(topicId: number): Promise<ForumPost[]>;
  getForumPost(id: number): Promise<ForumPost | undefined>;
  getForumPostsByAuthor(authorId: number): Promise<ForumPost[]>;
  createForumPost(data: InsertForumPost): Promise<ForumPost>;
  updateForumPost(id: number, data: Partial<ForumPost>): Promise<ForumPost | undefined>;
  deleteForumPost(id: number): Promise<boolean>;
  markPostAsAcceptedAnswer(id: number, isAccepted: boolean): Promise<ForumPost | undefined>;
  
  // Course Methods
  // Categories
  getAllCourseCategories(): Promise<CourseCategory[]>;
  getCourseCategory(id: number): Promise<CourseCategory | undefined>;
  getCourseCategoryBySlug(slug: string): Promise<CourseCategory | undefined>;
  createCourseCategory(data: InsertCourseCategory): Promise<CourseCategory>;
  updateCourseCategory(id: number, data: Partial<CourseCategory>): Promise<CourseCategory | undefined>;
  deleteCourseCategory(id: number): Promise<boolean>;
  
  // Courses
  getCourses(categoryId?: number): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  getCourseBySlug(slug: string): Promise<Course | undefined>;
  getCoursesByInstructor(instructorId: number): Promise<Course[]>;
  createCourse(data: InsertCourse): Promise<Course>;
  updateCourse(id: number, data: Partial<Course>): Promise<Course | undefined>;
  deleteCourse(id: number): Promise<boolean>;
  toggleCoursePublished(id: number, isPublished: boolean): Promise<Course | undefined>;
  
  // Modules
  getCourseModules(courseId: number): Promise<CourseModule[]>;
  getCourseModule(id: number): Promise<CourseModule | undefined>;
  createCourseModule(data: InsertCourseModule): Promise<CourseModule>;
  updateCourseModule(id: number, data: Partial<CourseModule>): Promise<CourseModule | undefined>;
  deleteCourseModule(id: number): Promise<boolean>;
  
  // Lessons
  getCourseLessons(moduleId: number): Promise<CourseLesson[]>;
  getCourseLesson(id: number): Promise<CourseLesson | undefined>;
  createCourseLesson(data: InsertCourseLesson): Promise<CourseLesson>;
  updateCourseLesson(id: number, data: Partial<CourseLesson>): Promise<CourseLesson | undefined>;
  deleteCourseLesson(id: number): Promise<boolean>;
  
  // Enrollments
  enrollUserInCourse(courseId: number, userId: number): Promise<CourseEnrollment>;
  getUserEnrollments(userId: number): Promise<CourseEnrollment[]>;
  getCourseEnrollments(courseId: number): Promise<CourseEnrollment[]>;
  markCourseAsCompleted(courseId: number, userId: number): Promise<CourseEnrollment | undefined>;
  
  // Progress
  updateLessonProgress(lessonId: number, userId: number, completed: boolean): Promise<LessonProgress>;
  getUserLessonProgress(userId: number, lessonId: number): Promise<LessonProgress | undefined>;
  getUserCourseProgress(userId: number, courseId: number): Promise<{total: number, completed: number}>;
}

// Memory Storage Implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private software: Map<number, Software>;
  private editingStyles: Map<number, EditingStyle>;
  private editorProfiles: Map<number, EditorProfile>;
  private portfolioItems: Map<number, PortfolioItem>;
  private briefs: Map<number, Brief>;
  private reviews: Map<number, Review>;
  
  // Forum data
  private forumCategories: Map<number, ForumCategory>;
  private forumTopics: Map<number, ForumTopic>;
  private forumPosts: Map<number, ForumPost>;
  
  // Course data
  private courseCategories: Map<number, CourseCategory>;
  private courses: Map<number, Course>;
  private courseModules: Map<number, CourseModule>;
  private courseLessons: Map<number, CourseLesson>;
  private courseEnrollments: Map<number, CourseEnrollment>;
  private lessonProgress: Map<number, LessonProgress>;
  
  private currentUserId = 1;
  private currentSoftwareId = 1;
  private currentStyleId = 1;
  private currentProfileId = 1;
  private currentPortfolioId = 1;
  private currentBriefId = 1;
  private currentReviewId = 1;
  
  // Forum counters
  private currentForumCategoryId = 1;
  private currentForumTopicId = 1;
  private currentForumPostId = 1;
  
  // Course counters
  private currentCourseCategoryId = 1;
  private currentCourseId = 1;
  private currentCourseModuleId = 1;
  private currentCourseLessonId = 1;
  private currentCourseEnrollmentId = 1;
  private currentLessonProgressId = 1;
  
  public sessionStore: session.Store;
  
  constructor() {
    this.users = new Map();
    this.software = new Map();
    this.editingStyles = new Map();
    this.editorProfiles = new Map();
    this.portfolioItems = new Map();
    this.briefs = new Map();
    this.reviews = new Map();
    
    // Inicializar colecciones del foro
    this.forumCategories = new Map();
    this.forumTopics = new Map();
    this.forumPosts = new Map();
    
    // Inicializar colecciones de cursos
    this.courseCategories = new Map();
    this.courses = new Map();
    this.courseModules = new Map();
    this.courseLessons = new Map();
    this.courseEnrollments = new Map();
    this.lessonProgress = new Map();
    
    // Setup session store
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Seed initial data
    this.seedInitialData();
  }
  
  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async createUser(userData: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...userData, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Software Methods
  async getAllSoftware(): Promise<Software[]> {
    return Array.from(this.software.values());
  }
  
  async getSoftware(id: number): Promise<Software | undefined> {
    return this.software.get(id);
  }
  
  async createSoftware(data: InsertSoftware): Promise<Software> {
    const id = this.currentSoftwareId++;
    const software: Software = { ...data, id };
    this.software.set(id, software);
    return software;
  }
  
  // Editing Styles Methods
  async getAllEditingStyles(): Promise<EditingStyle[]> {
    return Array.from(this.editingStyles.values());
  }
  
  async getEditingStyle(id: number): Promise<EditingStyle | undefined> {
    return this.editingStyles.get(id);
  }
  
  async createEditingStyle(data: InsertEditingStyle): Promise<EditingStyle> {
    const id = this.currentStyleId++;
    const style: EditingStyle = { ...data, id };
    this.editingStyles.set(id, style);
    return style;
  }
  
  // Editor Profile Methods
  async getEditorProfile(id: number): Promise<EditorProfile | undefined> {
    return this.editorProfiles.get(id);
  }
  
  async getEditorProfileByUserId(userId: number): Promise<EditorProfile | undefined> {
    return Array.from(this.editorProfiles.values()).find(
      (profile) => profile.userId === userId
    );
  }
  
  async createEditorProfile(data: InsertEditorProfile): Promise<EditorProfile> {
    const id = this.currentProfileId++;
    const profile: EditorProfile = { 
      ...data, 
      id, 
      viewCount: 0, 
      contactClickCount: 0
    };
    this.editorProfiles.set(id, profile);
    return profile;
  }
  
  async updateEditorProfile(id: number, data: Partial<EditorProfile>): Promise<EditorProfile | undefined> {
    const profile = this.editorProfiles.get(id);
    if (!profile) return undefined;
    
    const updatedProfile = { ...profile, ...data };
    this.editorProfiles.set(id, updatedProfile);
    return updatedProfile;
  }
  
  async searchEditorProfiles(filters: Record<string, any>): Promise<EditorProfile[]> {
    let results = Array.from(this.editorProfiles.values());
    
    // Apply filters (simplified for MVP)
    if (filters.software && filters.software.length > 0) {
      results = results.filter(profile => {
        const softwareIds = profile.software as number[];
        return filters.software.some((id: number) => softwareIds.includes(id));
      });
    }
    
    if (filters.editingStyles && filters.editingStyles.length > 0) {
      results = results.filter(profile => {
        const styleIds = profile.editingStyles as number[];
        return filters.editingStyles.some((id: number) => styleIds.includes(id));
      });
    }
    
    if (filters.maxRate) {
      results = results.filter(profile => 
        (profile.basicRate || 0) <= filters.maxRate
      );
    }
    
    // Filter by professional type
    if (filters.professionalType) {
      results = results.filter(profile => 
        profile.professionalType === filters.professionalType
      );
    }
    
    return results;
  }
  
  async incrementProfileView(id: number): Promise<void> {
    const profile = this.editorProfiles.get(id);
    if (profile) {
      profile.viewCount += 1;
      this.editorProfiles.set(id, profile);
    }
  }
  
  async incrementContactClick(id: number): Promise<void> {
    const profile = this.editorProfiles.get(id);
    if (profile) {
      profile.contactClickCount += 1;
      this.editorProfiles.set(id, profile);
    }
  }
  
  // Portfolio Methods
  async getPortfolioItems(editorProfileId: number): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values())
      .filter(item => item.editorProfileId === editorProfileId)
      .sort((a, b) => a.order - b.order);
  }
  
  async createPortfolioItem(data: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.currentPortfolioId++;
    const item: PortfolioItem = { ...data, id };
    this.portfolioItems.set(id, item);
    return item;
  }
  
  async updatePortfolioItem(id: number, data: Partial<PortfolioItem>): Promise<PortfolioItem | undefined> {
    const item = this.portfolioItems.get(id);
    if (!item) return undefined;
    
    const updatedItem = { ...item, ...data };
    this.portfolioItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async deletePortfolioItem(id: number): Promise<boolean> {
    return this.portfolioItems.delete(id);
  }
  
  // Brief Methods
  async getBrief(id: number): Promise<Brief | undefined> {
    return this.briefs.get(id);
  }
  
  async getBriefsByClientId(clientId: number): Promise<Brief[]> {
    return Array.from(this.briefs.values())
      .filter(brief => brief.clientId === clientId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getBriefsByEditorId(editorId: number): Promise<Brief[]> {
    return Array.from(this.briefs.values())
      .filter(brief => brief.editorId === editorId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createBrief(data: InsertBrief): Promise<Brief> {
    const id = this.currentBriefId++;
    const now = new Date();
    const brief: Brief = { 
      ...data, 
      id, 
      status: "pending", 
      createdAt: now 
    };
    this.briefs.set(id, brief);
    return brief;
  }
  
  async updateBriefStatus(id: number, status: string): Promise<Brief | undefined> {
    const brief = this.briefs.get(id);
    if (!brief) return undefined;
    
    const updatedBrief = { ...brief, status };
    this.briefs.set(id, updatedBrief);
    return updatedBrief;
  }
  
  // Review Methods
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }
  
  async getReviewsByEditorProfileId(editorProfileId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.editorProfileId === editorProfileId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getReviewsByClientId(clientId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.clientId === clientId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createReview(data: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const now = new Date();
    const review: Review = {
      ...data,
      id,
      createdAt: now
    };
    this.reviews.set(id, review);
    return review;
  }
  
  async updateReview(id: number, data: Partial<Review>): Promise<Review | undefined> {
    const review = this.reviews.get(id);
    if (!review) return undefined;
    
    const updatedReview = { ...review, ...data };
    this.reviews.set(id, updatedReview);
    return updatedReview;
  }
  
  async deleteReview(id: number): Promise<boolean> {
    return this.reviews.delete(id);
  }
  
  // Forum Category Methods
  async getAllForumCategories(): Promise<ForumCategory[]> {
    return Array.from(this.forumCategories.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async getForumCategory(id: number): Promise<ForumCategory | undefined> {
    return this.forumCategories.get(id);
  }
  
  async getForumCategoryBySlug(slug: string): Promise<ForumCategory | undefined> {
    return Array.from(this.forumCategories.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async createForumCategory(data: InsertForumCategory): Promise<ForumCategory> {
    const id = this.currentForumCategoryId++;
    const now = new Date();
    const category: ForumCategory = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.forumCategories.set(id, category);
    return category;
  }
  
  async updateForumCategory(id: number, data: Partial<ForumCategory>): Promise<ForumCategory | undefined> {
    const category = this.forumCategories.get(id);
    if (!category) return undefined;
    
    const now = new Date();
    const updatedCategory = { ...category, ...data, updatedAt: now };
    this.forumCategories.set(id, updatedCategory);
    return updatedCategory;
  }
  
  async deleteForumCategory(id: number): Promise<boolean> {
    return this.forumCategories.delete(id);
  }
  
  // Forum Topic Methods
  async getForumTopics(categoryId?: number): Promise<ForumTopic[]> {
    let topics = Array.from(this.forumTopics.values());
    
    if (categoryId) {
      topics = topics.filter(topic => topic.categoryId === categoryId);
    }
    
    return topics.sort((a, b) => {
      // Pinned topics first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      // Then by most recent activity
      const aDate = a.lastActivityAt || a.createdAt;
      const bDate = b.lastActivityAt || b.createdAt;
      return bDate.getTime() - aDate.getTime();
    });
  }
  
  async getForumTopic(id: number): Promise<ForumTopic | undefined> {
    return this.forumTopics.get(id);
  }
  
  async getForumTopicBySlug(slug: string): Promise<ForumTopic | undefined> {
    return Array.from(this.forumTopics.values()).find(
      (topic) => topic.slug === slug
    );
  }
  
  async getForumTopicsByAuthor(authorId: number): Promise<ForumTopic[]> {
    return Array.from(this.forumTopics.values())
      .filter(topic => topic.authorId === authorId)
      .sort((a, b) => {
        const aDate = a.lastActivityAt || a.createdAt;
        const bDate = b.lastActivityAt || b.createdAt;
        return bDate.getTime() - aDate.getTime();
      });
  }
  
  async createForumTopic(data: InsertForumTopic): Promise<ForumTopic> {
    const id = this.currentForumTopicId++;
    const now = new Date();
    const topic: ForumTopic = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
      lastActivityAt: now,
      viewCount: 0,
      replyCount: 0,
      isPinned: false,
      isClosed: false
    };
    this.forumTopics.set(id, topic);
    return topic;
  }
  
  async updateForumTopic(id: number, data: Partial<ForumTopic>): Promise<ForumTopic | undefined> {
    const topic = this.forumTopics.get(id);
    if (!topic) return undefined;
    
    const now = new Date();
    const updatedTopic = { ...topic, ...data, updatedAt: now };
    this.forumTopics.set(id, updatedTopic);
    return updatedTopic;
  }
  
  async deleteForumTopic(id: number): Promise<boolean> {
    return this.forumTopics.delete(id);
  }
  
  async incrementTopicView(id: number): Promise<void> {
    const topic = this.forumTopics.get(id);
    if (topic) {
      topic.viewCount += 1;
      this.forumTopics.set(id, topic);
    }
  }
  
  async togglePinTopic(id: number, isPinned: boolean): Promise<ForumTopic | undefined> {
    const topic = this.forumTopics.get(id);
    if (!topic) return undefined;
    
    const updatedTopic = { ...topic, isPinned };
    this.forumTopics.set(id, updatedTopic);
    return updatedTopic;
  }
  
  async toggleCloseTopic(id: number, isClosed: boolean): Promise<ForumTopic | undefined> {
    const topic = this.forumTopics.get(id);
    if (!topic) return undefined;
    
    const updatedTopic = { ...topic, isClosed };
    this.forumTopics.set(id, updatedTopic);
    return updatedTopic;
  }
  
  // Forum Post Methods
  async getForumPosts(topicId: number): Promise<ForumPost[]> {
    return Array.from(this.forumPosts.values())
      .filter(post => post.topicId === topicId)
      .sort((a, b) => {
        // First post always first
        if (a.isFirstPost && !b.isFirstPost) return -1;
        if (!a.isFirstPost && b.isFirstPost) return 1;
        
        // Then accepted answer
        if (a.isAcceptedAnswer && !b.isAcceptedAnswer) return -1;
        if (!a.isAcceptedAnswer && b.isAcceptedAnswer) return 1;
        
        // Then by date
        return a.createdAt.getTime() - b.createdAt.getTime();
      });
  }
  
  async getForumPost(id: number): Promise<ForumPost | undefined> {
    return this.forumPosts.get(id);
  }
  
  async getForumPostsByAuthor(authorId: number): Promise<ForumPost[]> {
    return Array.from(this.forumPosts.values())
      .filter(post => post.authorId === authorId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createForumPost(data: InsertForumPost): Promise<ForumPost> {
    const id = this.currentForumPostId++;
    const now = new Date();
    
    // Default first post flag to false, will update later if needed
    let isFirstPost = false;
    
    // Check if this is the first post for the topic
    const existingPosts = Array.from(this.forumPosts.values())
      .filter(post => post.topicId === data.topicId);
    
    if (existingPosts.length === 0) {
      isFirstPost = true;
    }
    
    const post: ForumPost = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
      isFirstPost,
      isAcceptedAnswer: false
    };
    
    this.forumPosts.set(id, post);
    
    // Update topic's lastActivityAt and replyCount
    const topic = this.forumTopics.get(data.topicId);
    if (topic) {
      topic.lastActivityAt = now;
      
      if (!isFirstPost) {
        topic.replyCount = (topic.replyCount || 0) + 1;
      }
      
      this.forumTopics.set(data.topicId, topic);
    }
    
    return post;
  }
  
  async updateForumPost(id: number, data: Partial<ForumPost>): Promise<ForumPost | undefined> {
    const post = this.forumPosts.get(id);
    if (!post) return undefined;
    
    const now = new Date();
    const updatedPost = { ...post, ...data, updatedAt: now };
    this.forumPosts.set(id, updatedPost);
    
    // Update topic's lastActivityAt
    const topic = this.forumTopics.get(post.topicId);
    if (topic) {
      topic.lastActivityAt = now;
      this.forumTopics.set(post.topicId, topic);
    }
    
    return updatedPost;
  }
  
  async deleteForumPost(id: number): Promise<boolean> {
    const post = this.forumPosts.get(id);
    if (!post) return false;
    
    // Cannot delete the first post of a topic
    if (post.isFirstPost) {
      return false;
    }
    
    // Update topic's replyCount
    const topic = this.forumTopics.get(post.topicId);
    if (topic) {
      topic.replyCount = Math.max(0, (topic.replyCount || 0) - 1);
      this.forumTopics.set(post.topicId, topic);
    }
    
    return this.forumPosts.delete(id);
  }
  
  async markPostAsAcceptedAnswer(id: number, isAccepted: boolean): Promise<ForumPost | undefined> {
    const post = this.forumPosts.get(id);
    if (!post || post.isFirstPost) return undefined;
    
    // If marking as accepted, unmark any currently accepted answers for the topic
    if (isAccepted) {
      Array.from(this.forumPosts.values())
        .filter(p => p.topicId === post.topicId && p.isAcceptedAnswer)
        .forEach(p => {
          p.isAcceptedAnswer = false;
          this.forumPosts.set(p.id, p);
        });
    }
    
    const updatedPost = { ...post, isAcceptedAnswer: isAccepted };
    this.forumPosts.set(id, updatedPost);
    return updatedPost;
  }
  
  // Course Category Methods
  async getAllCourseCategories(): Promise<CourseCategory[]> {
    return Array.from(this.courseCategories.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async getCourseCategory(id: number): Promise<CourseCategory | undefined> {
    return this.courseCategories.get(id);
  }
  
  async getCourseCategoryBySlug(slug: string): Promise<CourseCategory | undefined> {
    return Array.from(this.courseCategories.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async createCourseCategory(data: InsertCourseCategory): Promise<CourseCategory> {
    const id = this.currentCourseCategoryId++;
    const now = new Date();
    const category: CourseCategory = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.courseCategories.set(id, category);
    return category;
  }
  
  async updateCourseCategory(id: number, data: Partial<CourseCategory>): Promise<CourseCategory | undefined> {
    const category = this.courseCategories.get(id);
    if (!category) return undefined;
    
    const now = new Date();
    const updatedCategory = { ...category, ...data, updatedAt: now };
    this.courseCategories.set(id, updatedCategory);
    return updatedCategory;
  }
  
  async deleteCourseCategory(id: number): Promise<boolean> {
    return this.courseCategories.delete(id);
  }
  
  // Course Methods
  async getCourses(categoryId?: number): Promise<Course[]> {
    let courses = Array.from(this.courses.values());
    
    if (categoryId) {
      courses = courses.filter(course => course.categoryId === categoryId);
    }
    
    return courses.sort((a, b) => {
      // Published courses first
      if (a.isPublished && !b.isPublished) return -1;
      if (!a.isPublished && b.isPublished) return 1;
      
      // Then by most recent
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }
  
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }
  
  async getCourseBySlug(slug: string): Promise<Course | undefined> {
    return Array.from(this.courses.values()).find(
      (course) => course.slug === slug
    );
  }
  
  async getCoursesByInstructor(instructorId: number): Promise<Course[]> {
    return Array.from(this.courses.values())
      .filter(course => course.instructorId === instructorId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createCourse(data: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const now = new Date();
    const course: Course = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
      enrollmentCount: 0,
      isPublished: false
    };
    this.courses.set(id, course);
    return course;
  }
  
  async updateCourse(id: number, data: Partial<Course>): Promise<Course | undefined> {
    const course = this.courses.get(id);
    if (!course) return undefined;
    
    const now = new Date();
    const updatedCourse = { ...course, ...data, updatedAt: now };
    this.courses.set(id, updatedCourse);
    return updatedCourse;
  }
  
  async deleteCourse(id: number): Promise<boolean> {
    return this.courses.delete(id);
  }
  
  async toggleCoursePublished(id: number, isPublished: boolean): Promise<Course | undefined> {
    const course = this.courses.get(id);
    if (!course) return undefined;
    
    const updatedCourse = { ...course, isPublished };
    this.courses.set(id, updatedCourse);
    return updatedCourse;
  }
  
  // Course Module Methods
  async getCourseModules(courseId: number): Promise<CourseModule[]> {
    return Array.from(this.courseModules.values())
      .filter(module => module.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }
  
  async getCourseModule(id: number): Promise<CourseModule | undefined> {
    return this.courseModules.get(id);
  }
  
  async createCourseModule(data: InsertCourseModule): Promise<CourseModule> {
    const id = this.currentCourseModuleId++;
    const now = new Date();
    const module: CourseModule = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.courseModules.set(id, module);
    return module;
  }
  
  async updateCourseModule(id: number, data: Partial<CourseModule>): Promise<CourseModule | undefined> {
    const module = this.courseModules.get(id);
    if (!module) return undefined;
    
    const now = new Date();
    const updatedModule = { ...module, ...data, updatedAt: now };
    this.courseModules.set(id, updatedModule);
    return updatedModule;
  }
  
  async deleteCourseModule(id: number): Promise<boolean> {
    return this.courseModules.delete(id);
  }
  
  // Course Lesson Methods
  async getCourseLessons(moduleId: number): Promise<CourseLesson[]> {
    return Array.from(this.courseLessons.values())
      .filter(lesson => lesson.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  }
  
  async getCourseLesson(id: number): Promise<CourseLesson | undefined> {
    return this.courseLessons.get(id);
  }
  
  async createCourseLesson(data: InsertCourseLesson): Promise<CourseLesson> {
    const id = this.currentCourseLessonId++;
    const now = new Date();
    const lesson: CourseLesson = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.courseLessons.set(id, lesson);
    return lesson;
  }
  
  async updateCourseLesson(id: number, data: Partial<CourseLesson>): Promise<CourseLesson | undefined> {
    const lesson = this.courseLessons.get(id);
    if (!lesson) return undefined;
    
    const now = new Date();
    const updatedLesson = { ...lesson, ...data, updatedAt: now };
    this.courseLessons.set(id, updatedLesson);
    return updatedLesson;
  }
  
  async deleteCourseLesson(id: number): Promise<boolean> {
    return this.courseLessons.delete(id);
  }
  
  // Course Enrollment Methods
  async enrollUserInCourse(courseId: number, userId: number): Promise<CourseEnrollment> {
    // Check if enrollment exists
    const existingEnrollment = Array.from(this.courseEnrollments.values())
      .find(e => e.courseId === courseId && e.userId === userId);
    
    if (existingEnrollment) {
      return existingEnrollment;
    }
    
    const id = this.currentCourseEnrollmentId++;
    const now = new Date();
    const enrollment: CourseEnrollment = {
      id,
      courseId,
      userId,
      enrolledAt: now,
      completedAt: null
    };
    
    this.courseEnrollments.set(id, enrollment);
    
    // Update course enrollment count
    const course = this.courses.get(courseId);
    if (course) {
      course.enrollmentCount = (course.enrollmentCount || 0) + 1;
      this.courses.set(courseId, course);
    }
    
    return enrollment;
  }
  
  async getUserEnrollments(userId: number): Promise<CourseEnrollment[]> {
    return Array.from(this.courseEnrollments.values())
      .filter(enrollment => enrollment.userId === userId)
      .sort((a, b) => b.enrolledAt.getTime() - a.enrolledAt.getTime());
  }
  
  async getCourseEnrollments(courseId: number): Promise<CourseEnrollment[]> {
    return Array.from(this.courseEnrollments.values())
      .filter(enrollment => enrollment.courseId === courseId)
      .sort((a, b) => b.enrolledAt.getTime() - a.enrolledAt.getTime());
  }
  
  async markCourseAsCompleted(courseId: number, userId: number): Promise<CourseEnrollment | undefined> {
    const enrollment = Array.from(this.courseEnrollments.values())
      .find(e => e.courseId === courseId && e.userId === userId);
    
    if (!enrollment) return undefined;
    
    const now = new Date();
    const updatedEnrollment = { ...enrollment, completedAt: now };
    this.courseEnrollments.set(enrollment.id, updatedEnrollment);
    return updatedEnrollment;
  }
  
  // Lesson Progress Methods
  async updateLessonProgress(lessonId: number, userId: number, completed: boolean): Promise<LessonProgress> {
    // Check if progress exists
    const existingProgress = Array.from(this.lessonProgress.values())
      .find(p => p.lessonId === lessonId && p.userId === userId);
    
    const now = new Date();
    
    if (existingProgress) {
      const updatedProgress = { 
        ...existingProgress, 
        completed, 
        lastAccessedAt: now 
      };
      this.lessonProgress.set(existingProgress.id, updatedProgress);
      return updatedProgress;
    }
    
    const id = this.currentLessonProgressId++;
    const progress: LessonProgress = {
      id,
      lessonId,
      userId,
      completed,
      lastAccessedAt: now
    };
    
    this.lessonProgress.set(id, progress);
    return progress;
  }
  
  async getUserLessonProgress(userId: number, lessonId: number): Promise<LessonProgress | undefined> {
    return Array.from(this.lessonProgress.values())
      .find(p => p.lessonId === lessonId && p.userId === userId);
  }
  
  async getUserCourseProgress(userId: number, courseId: number): Promise<{total: number, completed: number}> {
    // Get all modules for the course
    const modules = Array.from(this.courseModules.values())
      .filter(m => m.courseId === courseId);
    
    // Get all lessons for these modules
    let lessonIds: number[] = [];
    for (const module of modules) {
      const moduleLessons = Array.from(this.courseLessons.values())
        .filter(l => l.moduleId === module.id)
        .map(l => l.id);
      
      lessonIds.push(...moduleLessons);
    }
    
    // Get progress for all lessons
    const totalLessons = lessonIds.length;
    let completedLessons = 0;
    
    for (const lessonId of lessonIds) {
      const progress = Array.from(this.lessonProgress.values())
        .find(p => p.lessonId === lessonId && p.userId === userId);
      
      if (progress && progress.completed) {
        completedLessons++;
      }
    }
    
    return { total: totalLessons, completed: completedLessons };
  }
  
  // Seed initial data for demo purposes
  private seedInitialData() {
    // Seed software
    const software1 = this.createSoftware({ name: "Premiere Pro", icon: "adobe-premiere" });
    const software2 = this.createSoftware({ name: "Final Cut Pro", icon: "apple-final-cut" });
    const software3 = this.createSoftware({ name: "DaVinci Resolve", icon: "davinci-resolve" });
    const software4 = this.createSoftware({ name: "After Effects", icon: "adobe-after-effects" });
    const software5 = this.createSoftware({ name: "CapCut", icon: "capcut" });
    
    // Seed editing styles
    const style1 = this.createEditingStyle({ name: "YouTube" });
    const style2 = this.createEditingStyle({ name: "Reels/TikTok" });
    const style3 = this.createEditingStyle({ name: "Comerciales" });
    const style4 = this.createEditingStyle({ name: "Eventos" });
    const style5 = this.createEditingStyle({ name: "Corporativo" });
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;
  
  constructor() {
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }
  
  // Reviews Methods
  async getReview(id: number): Promise<Review | undefined> {
    try {
      const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
      return review;
    } catch (error) {
      console.error("Error en getReview:", error);
      return undefined;
    }
  }
  
  async getReviewsByEditorProfileId(editorProfileId: number): Promise<Review[]> {
    try {
      console.log("Buscando reviews para editorProfileId:", editorProfileId);
      const reviewsList = await db.select().from(reviews).where(eq(reviews.editorProfileId, editorProfileId));
      console.log("Reviews encontradas:", reviewsList.length);
      return reviewsList.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    } catch (error) {
      console.error("Error en getReviewsByEditorProfileId:", error);
      return [];
    }
  }
  
  async getReviewsByClientId(clientId: number): Promise<Review[]> {
    try {
      const reviewsList = await db.select().from(reviews).where(eq(reviews.clientId, clientId));
      return reviewsList.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    } catch (error) {
      console.error("Error en getReviewsByClientId:", error);
      return [];
    }
  }
  
  async createReview(data: InsertReview): Promise<Review> {
    try {
      console.log("Creando review con datos:", JSON.stringify(data));
      const [review] = await db.insert(reviews).values(data).returning();
      console.log("Review creada:", review);
      return review;
    } catch (error) {
      console.error("Error en createReview:", error);
      throw error;
    }
  }
  
  async updateReview(id: number, data: Partial<Review>): Promise<Review | undefined> {
    try {
      const [updatedReview] = await db
        .update(reviews)
        .set(data)
        .where(eq(reviews.id, id))
        .returning();
      return updatedReview;
    } catch (error) {
      console.error("Error en updateReview:", error);
      return undefined;
    }
  }
  
  async deleteReview(id: number): Promise<boolean> {
    try {
      const result = await db
        .delete(reviews)
        .where(eq(reviews.id, id))
        .returning({ id: reviews.id });
      return result.length > 0;
    } catch (error) {
      console.error("Error en deleteReview:", error);
      return false;
    }
  }
  
  // Forum Methods - Categories
  async getAllForumCategories(): Promise<ForumCategory[]> {
    return db.select().from(forumCategories).orderBy(forumCategories.order);
  }
  
  async getForumCategory(id: number): Promise<ForumCategory | undefined> {
    const [category] = await db
      .select()
      .from(forumCategories)
      .where(eq(forumCategories.id, id));
    return category;
  }
  
  async getForumCategoryBySlug(slug: string): Promise<ForumCategory | undefined> {
    const [category] = await db
      .select()
      .from(forumCategories)
      .where(eq(forumCategories.slug, slug));
    return category;
  }
  
  async createForumCategory(data: InsertForumCategory): Promise<ForumCategory> {
    const [category] = await db
      .insert(forumCategories)
      .values(data)
      .returning();
    return category;
  }
  
  async updateForumCategory(id: number, data: Partial<ForumCategory>): Promise<ForumCategory | undefined> {
    const [category] = await db
      .update(forumCategories)
      .set(data)
      .where(eq(forumCategories.id, id))
      .returning();
    return category;
  }
  
  async deleteForumCategory(id: number): Promise<boolean> {
    await db
      .delete(forumCategories)
      .where(eq(forumCategories.id, id));
    return true;
  }
  
  // Forum Methods - Topics
  async getForumTopics(categoryId?: number): Promise<ForumTopic[]> {
    let queryBuilder = db.select().from(forumTopics);
    
    if (categoryId) {
      queryBuilder = queryBuilder.where(eq(forumTopics.categoryId, categoryId));
    }
    
    return queryBuilder.orderBy(desc(forumTopics.createdAt));
  }
  
  async getForumTopic(id: number): Promise<ForumTopic | undefined> {
    const [topic] = await db
      .select()
      .from(forumTopics)
      .where(eq(forumTopics.id, id));
    return topic;
  }
  
  async incrementTopicView(id: number): Promise<void> {
    await db
      .update(forumTopics)
      .set({ viewCount: sql`${forumTopics.viewCount} + 1` })
      .where(eq(forumTopics.id, id));
  }
  
  async getForumTopicBySlug(slug: string): Promise<ForumTopic | undefined> {
    const [topic] = await db
      .select()
      .from(forumTopics)
      .where(eq(forumTopics.slug, slug));
    return topic;
  }
  
  async getForumTopicsByAuthor(authorId: number): Promise<ForumTopic[]> {
    return db
      .select()
      .from(forumTopics)
      .where(eq(forumTopics.authorId, authorId))
      .orderBy(desc(forumTopics.createdAt));
  }
  
  async createForumTopic(data: InsertForumTopic): Promise<ForumTopic> {
    const [topic] = await db
      .insert(forumTopics)
      .values(data)
      .returning();
    return topic;
  }
  
  async updateForumTopic(id: number, data: Partial<ForumTopic>): Promise<ForumTopic | undefined> {
    const [topic] = await db
      .update(forumTopics)
      .set(data)
      .where(eq(forumTopics.id, id))
      .returning();
    return topic;
  }
  
  async deleteForumTopic(id: number): Promise<boolean> {
    await db
      .delete(forumTopics)
      .where(eq(forumTopics.id, id));
    return true;
  }
  
  async togglePinTopic(id: number, isPinned: boolean): Promise<ForumTopic | undefined> {
    const [topic] = await db
      .update(forumTopics)
      .set({ isPinned })
      .where(eq(forumTopics.id, id))
      .returning();
    return topic;
  }
  
  async toggleCloseTopic(id: number, isClosed: boolean): Promise<ForumTopic | undefined> {
    const [topic] = await db
      .update(forumTopics)
      .set({ isClosed })
      .where(eq(forumTopics.id, id))
      .returning();
    return topic;
  }
  
  // Forum Methods - Posts
  async getForumPosts(topicId: number): Promise<ForumPost[]> {
    return db
      .select()
      .from(forumPosts)
      .where(eq(forumPosts.topicId, topicId))
      .orderBy(forumPosts.createdAt);
  }
  
  async getForumPost(id: number): Promise<ForumPost | undefined> {
    const [post] = await db
      .select()
      .from(forumPosts)
      .where(eq(forumPosts.id, id));
    return post;
  }
  
  async getForumPostsByAuthor(authorId: number): Promise<ForumPost[]> {
    return db
      .select()
      .from(forumPosts)
      .where(eq(forumPosts.authorId, authorId))
      .orderBy(desc(forumPosts.createdAt));
  }
  
  async createForumPost(data: InsertForumPost): Promise<ForumPost> {
    const [post] = await db
      .insert(forumPosts)
      .values(data)
      .returning();
    return post;
  }
  
  async updateForumPost(id: number, data: Partial<ForumPost>): Promise<ForumPost | undefined> {
    const [post] = await db
      .update(forumPosts)
      .set(data)
      .where(eq(forumPosts.id, id))
      .returning();
    return post;
  }
  
  async deleteForumPost(id: number): Promise<boolean> {
    await db
      .delete(forumPosts)
      .where(eq(forumPosts.id, id));
    return true;
  }
  
  async markPostAsAcceptedAnswer(id: number, isAccepted: boolean): Promise<ForumPost | undefined> {
    const [post] = await db
      .update(forumPosts)
      .set({ isAcceptedAnswer: isAccepted })
      .where(eq(forumPosts.id, id))
      .returning();
    return post;
  }
  
  // Course Methods - implementar según se necesite
  async getAllCourseCategories(): Promise<CourseCategory[]> {
    return []; // Implementar cuando sea necesario
  }
  
  async getCourseCategory(id: number): Promise<CourseCategory | undefined> {
    return undefined; // Implementar cuando sea necesario
  }
  
  async getCourseCategoryBySlug(slug: string): Promise<CourseCategory | undefined> {
    return undefined; // Implementar cuando sea necesario
  }
  
  async createCourseCategory(data: InsertCourseCategory): Promise<CourseCategory> {
    throw new Error('Not implemented'); // Implementar cuando sea necesario
  }
  
  async updateCourseCategory(id: number, data: Partial<CourseCategory>): Promise<CourseCategory | undefined> {
    return undefined; // Implementar cuando sea necesario
  }
  
  async deleteCourseCategory(id: number): Promise<boolean> {
    return false; // Implementar cuando sea necesario
  }
  
  // User Methods
  
  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  
  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }
  
  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user;
  }
  
  // Software Methods
  async getAllSoftware(): Promise<Software[]> {
    return db.select().from(software);
  }
  
  async getSoftware(id: number): Promise<Software | undefined> {
    const [sw] = await db.select().from(software).where(eq(software.id, id));
    return sw;
  }
  
  async createSoftware(data: InsertSoftware): Promise<Software> {
    const [sw] = await db.insert(software).values(data).returning();
    return sw;
  }
  
  // Editing Styles Methods
  async getAllEditingStyles(): Promise<EditingStyle[]> {
    return db.select().from(editingStyles);
  }
  
  async getEditingStyle(id: number): Promise<EditingStyle | undefined> {
    const [style] = await db.select().from(editingStyles).where(eq(editingStyles.id, id));
    return style;
  }
  
  async createEditingStyle(data: InsertEditingStyle): Promise<EditingStyle> {
    const [style] = await db.insert(editingStyles).values(data).returning();
    return style;
  }
  
  // Editor Profile Methods
  async getEditorProfile(id: number): Promise<EditorProfile | undefined> {
    const [profile] = await db
      .select()
      .from(editorProfiles)
      .where(eq(editorProfiles.id, id));
    return profile;
  }
  
  async getEditorProfileByUserId(userId: number): Promise<EditorProfile | undefined> {
    const [profile] = await db
      .select()
      .from(editorProfiles)
      .where(eq(editorProfiles.userId, userId));
    return profile;
  }
  
  async createEditorProfile(data: InsertEditorProfile): Promise<EditorProfile> {
    const [profile] = await db
      .insert(editorProfiles)
      .values({
        ...data,
        viewCount: 0,
        contactClickCount: 0,
        verified: false
      })
      .returning();
    return profile;
  }
  
  async updateEditorProfile(id: number, data: Partial<EditorProfile>): Promise<EditorProfile | undefined> {
    const [profile] = await db
      .update(editorProfiles)
      .set(data)
      .where(eq(editorProfiles.id, id))
      .returning();
    return profile;
  }
  
  async searchEditorProfiles(filters: Record<string, any>): Promise<EditorProfile[]> {
    let queryBuilder = db.select().from(editorProfiles);
    
    // Apply filters
    // Filter by maximum rate
    if (filters.maxRate && typeof filters.maxRate === 'number') {
      queryBuilder = queryBuilder.where(lte(editorProfiles.basicRate, filters.maxRate));
    }
    
    // Execute the query to get all profiles that match rate filter
    const results = await queryBuilder.execute();
    
    // Apply filters that need post-processing (JSONB fields)
    let filteredResults = [...results];
    
    // Filter by software
    if (filters.software && Array.isArray(filters.software) && filters.software.length > 0) {
      filteredResults = filteredResults.filter(profile => {
        const profileSoftware = profile.software as number[];
        // Match if the profile has ANY of the requested software (OR condition)
        return filters.software.some((id: number) => profileSoftware.includes(id));
      });
    }
    
    // Filter by editing styles
    if (filters.editingStyles && Array.isArray(filters.editingStyles) && filters.editingStyles.length > 0) {
      filteredResults = filteredResults.filter(profile => {
        const profileStyles = profile.editingStyles as number[];
        // Match if the profile has ANY of the requested styles (OR condition)
        return filters.editingStyles.some((id: number) => profileStyles.includes(id));
      });
    }
    
    // Filter by expertise areas
    if (filters.expertise && Array.isArray(filters.expertise) && filters.expertise.length > 0) {
      filteredResults = filteredResults.filter(profile => {
        const profileExpertise = profile.expertise as string[];
        // Match if the profile has ANY of the requested expertise areas (OR condition)
        return filters.expertise.some((area: string) => 
          profileExpertise.some(exp => exp.toLowerCase().includes(area.toLowerCase()))
        );
      });
    }
    
    // Filter by experience level
    if (filters.experienceLevel) {
      // Fetch all users to get years of experience
      const allUsers = await db.select().from(users);
      const userMap = new Map(allUsers.map(user => [user.id, user]));
      
      filteredResults = filteredResults.filter(profile => {
        const user = userMap.get(profile.userId);
        if (!user || !user.yearsOfExperience) return false;
        
        switch (filters.experienceLevel) {
          case 'beginner':
            return user.yearsOfExperience <= 2;
          case 'intermediate':
            return user.yearsOfExperience > 2 && user.yearsOfExperience <= 5;
          case 'expert':
            return user.yearsOfExperience > 5;
          default:
            return true;
        }
      });
    }
    
    // Filter by country
    if (filters.country && filters.country.length > 0) {
      // Fetch all users to get countries
      const allUsers = await db.select().from(users);
      const userMap = new Map(allUsers.map(user => [user.id, user]));
      
      filteredResults = filteredResults.filter(profile => {
        const user = userMap.get(profile.userId);
        if (!user || !user.country) return false;
        
        return filters.country.includes(user.country);
      });
    }
    
    // Filter by professional type
    if (filters.professionalType) {
      filteredResults = filteredResults.filter(profile => {
        // Comparación caso insensible o con valores por defecto
        const profileType = profile.professionalType?.toLowerCase() || 'editor';
        const filterType = filters.professionalType.toLowerCase();
        
        return profileType === filterType || 
               // Si el filtro es "editor", mostrar también perfiles sin tipo específico
               (filterType === 'editor' && (!profile.professionalType || profile.professionalType === ''));
      });
    }
    
    // Sort by different criteria
    const sortBy = filters.sortBy || 'popularity';
    switch (sortBy) {
      case 'price_low':
        filteredResults.sort((a, b) => (a.basicRate || 0) - (b.basicRate || 0));
        break;
      case 'price_high':
        filteredResults.sort((a, b) => (b.basicRate || 0) - (a.basicRate || 0));
        break;
      case 'experience':
        // Fetch all users to get experience for sorting
        const allUsers = await db.select().from(users);
        const userMap = new Map(allUsers.map(user => [user.id, user]));
        
        filteredResults.sort((a, b) => {
          const userA = userMap.get(a.userId);
          const userB = userMap.get(b.userId);
          const expA = userA?.yearsOfExperience || 0;
          const expB = userB?.yearsOfExperience || 0;
          return expB - expA; // Most experienced first
        });
        break;
      case 'popularity':
      default:
        // Sort by view count (most popular first)
        filteredResults.sort((a, b) => {
          const aCount = a.viewCount || 0;
          const bCount = b.viewCount || 0;
          return bCount - aCount;
        });
        break;
    }
    
    return filteredResults;
  }
  
  async incrementProfileView(id: number): Promise<void> {
    const profile = await this.getEditorProfile(id);
    if (!profile) return;
    
    const newCount = (profile.viewCount || 0) + 1;
    await db
      .update(editorProfiles)
      .set({
        viewCount: newCount
      })
      .where(eq(editorProfiles.id, id));
  }
  
  async incrementContactClick(id: number): Promise<void> {
    const profile = await this.getEditorProfile(id);
    if (!profile) return;
    
    const newCount = (profile.contactClickCount || 0) + 1;
    await db
      .update(editorProfiles)
      .set({
        contactClickCount: newCount
      })
      .where(eq(editorProfiles.id, id));
  }
  
  // Portfolio Methods
  async getPortfolioItems(editorProfileId: number): Promise<PortfolioItem[]> {
    return db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.editorProfileId, editorProfileId))
      .orderBy(portfolioItems.order);
  }
  
  async createPortfolioItem(data: InsertPortfolioItem): Promise<PortfolioItem> {
    const [item] = await db
      .insert(portfolioItems)
      .values(data)
      .returning();
    return item;
  }
  
  async updatePortfolioItem(id: number, data: Partial<PortfolioItem>): Promise<PortfolioItem | undefined> {
    const [item] = await db
      .update(portfolioItems)
      .set(data)
      .where(eq(portfolioItems.id, id))
      .returning();
    return item;
  }
  
  async deletePortfolioItem(id: number): Promise<boolean> {
    try {
      await db
        .delete(portfolioItems)
        .where(eq(portfolioItems.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      return false;
    }
  }
  
  // Brief Methods
  async getBrief(id: number): Promise<Brief | undefined> {
    const [brief] = await db
      .select()
      .from(briefs)
      .where(eq(briefs.id, id));
    return brief;
  }
  
  async getBriefsByClientId(clientId: number): Promise<Brief[]> {
    const results = await db
      .select()
      .from(briefs)
      .where(eq(briefs.clientId, clientId));
    
    // Sort manually by createdAt in descending order
    return results.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
      const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
      return dateB - dateA;
    });
  }
  
  async getBriefsByEditorId(editorId: number): Promise<Brief[]> {
    const results = await db
      .select()
      .from(briefs)
      .where(eq(briefs.editorId, editorId));
    
    // Sort manually by createdAt in descending order
    return results.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
      const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
      return dateB - dateA;
    });
  }
  
  async createBrief(data: InsertBrief): Promise<Brief> {
    const [brief] = await db
      .insert(briefs)
      .values({
        ...data,
        status: "pending"
      })
      .returning();
    return brief;
  }
  
  async updateBriefStatus(id: number, status: string): Promise<Brief | undefined> {
    const [brief] = await db
      .update(briefs)
      .set({ status })
      .where(eq(briefs.id, id))
      .returning();
    return brief;
  }
}

// Choose the storage implementation
export const storage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemStorage();
