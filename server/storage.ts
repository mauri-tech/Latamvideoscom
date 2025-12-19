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
  lessonProgress, LessonProgress, InsertLessonProgress,
  // Messages imports
  conversations, Conversation, InsertConversation,
  conversationParticipants, ConversationParticipant, InsertConversationParticipant,
  messages, Message, InsertMessage
} from "@shared/schema";
import { supabase } from "./db";
import session from "express-session";
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

  // Messaging Methods
  getConversationsByUserId(userId: number): Promise<Conversation[]>;
  getConversation(id: number): Promise<Conversation | undefined>;
  getConversationMessages(conversationId: number): Promise<Message[]>;
  createConversation(subject: string, participants: number[]): Promise<Conversation>;
  addUserToConversation(conversationId: number, userId: number): Promise<ConversationParticipant>;
  sendMessage(conversationId: number, senderId: number, content: string): Promise<Message>;
  markConversationAsRead(conversationId: number, userId: number): Promise<boolean>;
  getUsersDirectory(excludeUserId?: number): Promise<User[]>;

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
  getPortfolioItem(id: number): Promise<PortfolioItem | undefined>;
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
  getUserCourseProgress(userId: number, courseId: number): Promise<{ total: number, completed: number }>;
}

// Helper function to convert object keys to camelCase
function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) return obj.map(toCamelCase);
  if (obj !== null && typeof obj === 'object') {
    if (obj instanceof Date) return obj;
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/_([a-z])/g, (g) => g[1].toUpperCase()),
        toCamelCase(value)
      ])
    );
  }
  return obj;
}

// Helper function to convert object keys to snake_case
function toSnakeCase(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(toSnakeCase);
  if (obj instanceof Date) return obj;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
      toSnakeCase(value)
    ])
  );
}

export class SupabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new createMemoryStore(session)({
      checkPeriod: 86400000,
    });
  }

  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return undefined;
    return toCamelCase(data);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) return undefined;
    return toCamelCase(data);
  }

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return toCamelCase(data || []);
  }

  async createUser(user: InsertUser): Promise<User> {
    const snakeCaseUser = toSnakeCase(user);
    // Remove ID if present to let DB handle it
    delete snakeCaseUser.id;

    const { data, error } = await supabase
      .from('users')
      .insert(snakeCaseUser)
      .select()
      .single();

    if (error) throw error;
    return toCamelCase(data);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const snakeCaseData = toSnakeCase(data);
    const { data: updated, error } = await supabase
      .from('users')
      .update(snakeCaseData)
      .eq('id', id)
      .select()
      .single();

    if (error) return undefined;
    return toCamelCase(updated);
  }

  // Editor Profile Methods
  async getEditorProfile(id: number): Promise<EditorProfile | undefined> {
    const { data, error } = await supabase
      .from('editor_profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return undefined;
    return toCamelCase(data);
  }

  async getEditorProfileByUserId(userId: number): Promise<EditorProfile | undefined> {
    const { data, error } = await supabase
      .from('editor_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) return undefined;
    return toCamelCase(data);
  }

  async createEditorProfile(data: InsertEditorProfile): Promise<EditorProfile> {
    const snakeCaseData = toSnakeCase(data);
    const { data: profile, error } = await supabase
      .from('editor_profiles')
      .insert(snakeCaseData)
      .select()
      .single();

    if (error) throw error;
    return toCamelCase(profile);
  }

  async updateEditorProfile(id: number, data: Partial<EditorProfile>): Promise<EditorProfile | undefined> {
    const snakeCaseData = toSnakeCase(data);
    const { data: profile, error } = await supabase
      .from('editor_profiles')
      .update(snakeCaseData)
      .eq('id', id)
      .select()
      .single();

    if (error) return undefined;
    return toCamelCase(profile);
  }

  async searchEditorProfiles(filters: Record<string, any>): Promise<EditorProfile[]> {
    let query = supabase.from('editor_profiles').select('*');

    const { data, error } = await query;
    if (error) return [];
    return toCamelCase(data || []);
  }

  async incrementProfileView(id: number): Promise<void> {
    await supabase.rpc('increment_profile_view', { row_id: id });
  }

  async incrementContactClick(id: number): Promise<void> {
    await supabase.rpc('increment_contact_click', { row_id: id });
  }

  // Messages (Stubs for now)
  async getConversationsByUserId(userId: number): Promise<Conversation[]> { return []; }
  async getConversation(id: number): Promise<Conversation | undefined> { return undefined; }
  async getConversationMessages(conversationId: number): Promise<Message[]> { return []; }
  async createConversation(subject: string, participants: number[]): Promise<Conversation> { throw new Error("Not impl"); }
  async addUserToConversation(conversationId: number, userId: number): Promise<ConversationParticipant> { throw new Error("Not impl"); }
  async sendMessage(conversationId: number, senderId: number, content: string): Promise<Message> { throw new Error("Not impl"); }
  async markConversationAsRead(conversationId: number, userId: number): Promise<boolean> { return false; }
  async getUsersDirectory(excludeUserId?: number): Promise<User[]> { return []; }

  // Software (Implementation)
  async getAllSoftware(): Promise<Software[]> {
    const { data } = await supabase.from('software').select('*');
    return toCamelCase(data || []);
  }
  async getSoftware(id: number): Promise<Software | undefined> {
    const { data } = await supabase.from('software').select('*').eq('id', id).single();
    return data ? toCamelCase(data) : undefined;
  }
  async createSoftware(data: InsertSoftware): Promise<Software> {
    const { data: sw } = await supabase.from('software').insert(toSnakeCase(data)).select().single();
    return toCamelCase(sw);
  }

  // Editing Styles
  async getAllEditingStyles(): Promise<EditingStyle[]> {
    const { data } = await supabase.from('editing_styles').select('*');
    return toCamelCase(data || []);
  }
  async getEditingStyle(id: number): Promise<EditingStyle | undefined> {
    const { data } = await supabase.from('editing_styles').select('*').eq('id', id).single();
    return data ? toCamelCase(data) : undefined;
  }
  async createEditingStyle(data: InsertEditingStyle): Promise<EditingStyle> {
    const { data: style } = await supabase.from('editing_styles').insert(toSnakeCase(data)).select().single();
    return toCamelCase(style);
  }

  // Portfolio
  async getPortfolioItems(editorProfileId: number): Promise<PortfolioItem[]> {
    const { data } = await supabase.from('portfolio_items').select('*').eq('editor_profile_id', editorProfileId);
    return toCamelCase(data || []);
  }
  async getPortfolioItem(id: number): Promise<PortfolioItem | undefined> { return undefined; }
  async createPortfolioItem(data: InsertPortfolioItem): Promise<PortfolioItem> {
    const { data: item } = await supabase.from('portfolio_items').insert(toSnakeCase(data)).select().single();
    return toCamelCase(item);
  }
  async updatePortfolioItem(id: number, data: Partial<PortfolioItem>): Promise<PortfolioItem | undefined> { return undefined; }
  async deletePortfolioItem(id: number): Promise<boolean> { return false; }

  // Rest of methods stubs...
  // Briefs
  async getBrief(id: number): Promise<Brief | undefined> { return undefined; }
  async getBriefsByClientId(clientId: number): Promise<Brief[]> { return []; }
  async getBriefsByEditorId(editorId: number): Promise<Brief[]> { return []; }
  async createBrief(data: InsertBrief): Promise<Brief> { throw new Error("Not Impl"); }
  async updateBriefStatus(id: number, status: string): Promise<Brief | undefined> { return undefined; }

  // Reviews
  async getReview(id: number): Promise<Review | undefined> { return undefined; }
  async getReviewsByEditorProfileId(editorProfileId: number): Promise<Review[]> { return []; }
  async getReviewsByClientId(clientId: number): Promise<Review[]> { return []; }
  async createReview(data: InsertReview): Promise<Review> { throw new Error("Not Impl"); }
  async updateReview(id: number, data: Partial<Review>): Promise<Review | undefined> { return undefined; }
  async deleteReview(id: number): Promise<boolean> { return false; }

  // Forum
  async getAllForumCategories(): Promise<ForumCategory[]> { return []; }
  async getForumCategory(id: number): Promise<ForumCategory | undefined> { return undefined; }
  async getForumCategoryBySlug(slug: string): Promise<ForumCategory | undefined> { return undefined; }
  async createForumCategory(data: InsertForumCategory): Promise<ForumCategory> { throw new Error("Not Impl"); }
  async updateForumCategory(id: number, data: Partial<ForumCategory>): Promise<ForumCategory | undefined> { return undefined; }
  async deleteForumCategory(id: number): Promise<boolean> { return false; }

  async getForumTopics(categoryId?: number): Promise<ForumTopic[]> { return []; }
  async getForumTopic(id: number): Promise<ForumTopic | undefined> { return undefined; }
  async getForumTopicBySlug(slug: string): Promise<ForumTopic | undefined> { return undefined; }
  async getForumTopicsByAuthor(authorId: number): Promise<ForumTopic[]> { return []; }
  async createForumTopic(data: InsertForumTopic): Promise<ForumTopic> { throw new Error("Not Impl"); }
  async updateForumTopic(id: number, data: Partial<ForumTopic>): Promise<ForumTopic | undefined> { return undefined; }
  async deleteForumTopic(id: number): Promise<boolean> { return false; }
  async incrementTopicView(id: number): Promise<void> { }
  async togglePinTopic(id: number, isPinned: boolean): Promise<ForumTopic | undefined> { return undefined; }
  async toggleCloseTopic(id: number, isClosed: boolean): Promise<ForumTopic | undefined> { return undefined; }
  async getForumPosts(topicId: number): Promise<ForumPost[]> { return []; }
  async getForumPost(id: number): Promise<ForumPost | undefined> { return undefined; }
  async getForumPostsByAuthor(authorId: number): Promise<ForumPost[]> { return []; }
  async createForumPost(data: InsertForumPost): Promise<ForumPost> { throw new Error("Not Impl"); }
  async updateForumPost(id: number, data: Partial<ForumPost>): Promise<ForumPost | undefined> { return undefined; }
  async deleteForumPost(id: number): Promise<boolean> { return false; }
  async markPostAsAcceptedAnswer(id: number, isAccepted: boolean): Promise<ForumPost | undefined> { return undefined; }

  // Courses
  async getAllCourseCategories(): Promise<CourseCategory[]> { return []; }
  async getCourseCategory(id: number): Promise<CourseCategory | undefined> { return undefined; }
  async getCourseCategoryBySlug(slug: string): Promise<CourseCategory | undefined> { return undefined; }
  async createCourseCategory(data: InsertCourseCategory): Promise<CourseCategory> { throw new Error("Not Impl"); }
  async updateCourseCategory(id: number, data: Partial<CourseCategory>): Promise<CourseCategory | undefined> { return undefined; }
  async deleteCourseCategory(id: number): Promise<boolean> { return false; }

  async getCourses(categoryId?: number): Promise<Course[]> { return []; }
  async getCourse(id: number): Promise<Course | undefined> { return undefined; }
  async getCourseBySlug(slug: string): Promise<Course | undefined> { return undefined; }
  async getCoursesByInstructor(instructorId: number): Promise<Course[]> { return []; }
  async createCourse(data: InsertCourse): Promise<Course> { throw new Error("Not Impl"); }
  async updateCourse(id: number, data: Partial<Course>): Promise<Course | undefined> { return undefined; }
  async deleteCourse(id: number): Promise<boolean> { return false; }
  async toggleCoursePublished(id: number, isPublished: boolean): Promise<Course | undefined> { return undefined; }

  async getCourseModules(courseId: number): Promise<CourseModule[]> { return []; }
  async getCourseModule(id: number): Promise<CourseModule | undefined> { return undefined; }
  async createCourseModule(data: InsertCourseModule): Promise<CourseModule> { throw new Error("Not Impl"); }
  async updateCourseModule(id: number, data: Partial<CourseModule>): Promise<CourseModule | undefined> { return undefined; }
  async deleteCourseModule(id: number): Promise<boolean> { return false; }

  async getCourseLessons(moduleId: number): Promise<CourseLesson[]> { return []; }
  async getCourseLesson(id: number): Promise<CourseLesson | undefined> { return undefined; }
  async createCourseLesson(data: InsertCourseLesson): Promise<CourseLesson> { throw new Error("Not Impl"); }
  async updateCourseLesson(id: number, data: Partial<CourseLesson>): Promise<CourseLesson | undefined> { return undefined; }
  async deleteCourseLesson(id: number): Promise<boolean> { return false; }

  async enrollUserInCourse(courseId: number, userId: number): Promise<CourseEnrollment> { throw new Error("Not Impl"); }
  async getUserEnrollments(userId: number): Promise<CourseEnrollment[]> { return []; }
  async getCourseEnrollments(courseId: number): Promise<CourseEnrollment[]> { return []; }
  async markCourseAsCompleted(courseId: number, userId: number): Promise<CourseEnrollment | undefined> { return undefined; }

  async updateLessonProgress(lessonId: number, userId: number, completed: boolean): Promise<LessonProgress> { throw new Error("Not Impl"); }
  async getUserLessonProgress(userId: number, lessonId: number): Promise<LessonProgress | undefined> { return undefined; }
  async getUserCourseProgress(userId: number, courseId: number): Promise<{ total: number, completed: number }> { return { total: 0, completed: 0 }; }
}

export const storage = new SupabaseStorage();
