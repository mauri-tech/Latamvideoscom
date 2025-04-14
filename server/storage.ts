import { 
  users, User, InsertUser,
  software, Software, InsertSoftware,
  editingStyles, EditingStyle, InsertEditingStyle,
  editorProfiles, EditorProfile, InsertEditorProfile,
  portfolioItems, PortfolioItem, InsertPortfolioItem,
  briefs, Brief, InsertBrief
} from "@shared/schema";
import { db } from "./db";
import { eq, and, inArray, lte, desc } from "drizzle-orm";
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
    if (filters.maxRate && typeof filters.maxRate === 'number') {
      queryBuilder = queryBuilder.where(lte(editorProfiles.basicRate, filters.maxRate));
    }
    
    // Execute the query
    const results = await queryBuilder.execute();
    
    // Sort by view count (most popular first)
    return results.sort((a, b) => {
      const aCount = a.viewCount || 0;
      const bCount = b.viewCount || 0;
      return bCount - aCount;
    });
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
