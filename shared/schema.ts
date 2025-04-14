import { pgTable, text, serial, integer, jsonb, timestamp, boolean, real, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// USERS TABLE
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  profilePicture: text("profile_picture"),
  bio: text("bio"),
  country: text("country"),
  timezone: text("timezone"),
  yearsOfExperience: integer("years_of_experience"),
  userType: text("user_type").notNull().default("editor"), // editor or client
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  name: true,
  profilePicture: true,
  bio: true,
  country: true,
  timezone: true,
  yearsOfExperience: true,
  userType: true,
});

// SOFTWARE TABLE
export const software = pgTable("software", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon"),
});

export const insertSoftwareSchema = createInsertSchema(software).pick({
  name: true,
  icon: true,
});

// EDITING STYLES TABLE
export const editingStyles = pgTable("editing_styles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const insertEditingStylesSchema = createInsertSchema(editingStyles).pick({
  name: true,
});

// EDITOR PROFILES TABLE
export const editorProfiles = pgTable("editor_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  software: jsonb("software").notNull().default([]), // Array of software IDs
  editingStyles: jsonb("editing_styles").notNull().default([]), // Array of editing style IDs
  equipment: jsonb("equipment").notNull().default([]), // Array of equipment items
  basicRate: real("basic_rate"),
  mediumRate: real("medium_rate"),
  advancedRate: real("advanced_rate"),
  weeklyAvailability: jsonb("weekly_availability").notNull().default({}), // JSON object
  paymentMethods: jsonb("payment_methods").notNull().default([]), // Array of payment methods
  experience: text("experience"), // Brief description of experience
  expertise: jsonb("expertise").notNull().default([]), // Array of areas of expertise
  professionalType: text("professional_type").default('editor'), // Type of professional (editor, videographer, etc.)
  viewCount: integer("view_count").notNull().default(0),
  contactClickCount: integer("contact_click_count").notNull().default(0),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relaciones al final del archivo

export const insertEditorProfileSchema = createInsertSchema(editorProfiles).pick({
  userId: true,
  software: true,
  editingStyles: true,
  equipment: true,
  basicRate: true,
  mediumRate: true,
  advancedRate: true,
  weeklyAvailability: true,
  paymentMethods: true,
  experience: true,
  expertise: true,
  professionalType: true,
});

// PORTFOLIO ITEMS TABLE
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  editorProfileId: integer("editor_profile_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  videoType: text("video_type"), // Type of video (documentary, commercial, etc.)
  duration: text("duration"), // Duration of the video
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relaciones al final del archivo

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).pick({
  editorProfileId: true,
  title: true,
  description: true,
  videoUrl: true,
  thumbnailUrl: true,
  videoType: true,
  duration: true,
  order: true,
});

// REVIEWS TABLE
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  editorProfileId: integer("editor_profile_id").notNull(),
  clientId: integer("client_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relaciones al final del archivo

export const insertReviewSchema = createInsertSchema(reviews).pick({
  editorProfileId: true,
  clientId: true,
  rating: true,
  comment: true,
});

// BRIEFS TABLE
export const briefs = pgTable("briefs", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  editorId: integer("editor_id").notNull(),
  projectType: text("project_type").notNull(),
  description: text("description").notNull(),
  budget: real("budget"),
  deadline: timestamp("deadline"),
  attachments: jsonb("attachments").notNull().default([]), // Array of attachment URLs
  status: text("status").notNull().default("pending"), // pending, accepted, rejected, completed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relaciones al final del archivo

export const insertBriefSchema = createInsertSchema(briefs).pick({
  clientId: true,
  editorId: true,
  projectType: true,
  description: true,
  budget: true,
  deadline: true,
  attachments: true,
});

// Many-to-many relations (if needed in the future)
// EDITOR_SOFTWARE (for more complex relations if needed)
export const editorSoftware = pgTable("editor_software", {
  editorId: integer("editor_id").notNull(),
  softwareId: integer("software_id").notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.editorId, t.softwareId] }),
}));

// EDITOR_EDITING_STYLES (for more complex relations if needed)
export const editorEditingStyles = pgTable("editor_editing_styles", {
  editorId: integer("editor_id").notNull(),
  styleId: integer("style_id").notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.editorId, t.styleId] }),
}));

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Software = typeof software.$inferSelect;
export type InsertSoftware = z.infer<typeof insertSoftwareSchema>;

export type EditingStyle = typeof editingStyles.$inferSelect;
export type InsertEditingStyle = z.infer<typeof insertEditingStylesSchema>;

export type EditorProfile = typeof editorProfiles.$inferSelect;
export type InsertEditorProfile = z.infer<typeof insertEditorProfileSchema>;

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Brief = typeof briefs.$inferSelect;
export type InsertBrief = z.infer<typeof insertBriefSchema>;

// Forum types
export type ForumCategory = typeof forumCategories.$inferSelect;
export type InsertForumCategory = z.infer<typeof insertForumCategorySchema>;

export type ForumTopic = typeof forumTopics.$inferSelect;
export type InsertForumTopic = z.infer<typeof insertForumTopicSchema>;

export type ForumPost = typeof forumPosts.$inferSelect;
export type InsertForumPost = z.infer<typeof insertForumPostSchema>;

// Course types
export type CourseCategory = typeof courseCategories.$inferSelect;
export type InsertCourseCategory = z.infer<typeof insertCourseCategorySchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type CourseModule = typeof courseModules.$inferSelect;
export type InsertCourseModule = z.infer<typeof insertCourseModuleSchema>;

export type CourseLesson = typeof courseLessons.$inferSelect;
export type InsertCourseLesson = z.infer<typeof insertCourseLessonSchema>;

export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type InsertCourseEnrollment = z.infer<typeof insertCourseEnrollmentSchema>;

export type LessonProgress = typeof lessonProgress.$inferSelect;
export type InsertLessonProgress = z.infer<typeof insertLessonProgressSchema>;

// Relations - after all tables have been defined
export const usersRelations = relations(users, ({ one, many }) => ({
  editorProfile: one(editorProfiles),
  sentBriefs: many(briefs, { relationName: "user_briefs" }),
  forumTopics: many(forumTopics),
  forumPosts: many(forumPosts),
  instructorCourses: many(courses),
  courseEnrollments: many(courseEnrollments),
  lessonProgress: many(lessonProgress),
}));

export const editorProfilesRelations = relations(editorProfiles, ({ one, many }) => ({
  user: one(users),
  portfolioItems: many(portfolioItems),
  receivedBriefs: many(briefs, { relationName: "editor_briefs" }),
  reviews: many(reviews),
}));

export const portfolioItemsRelations = relations(portfolioItems, ({ one }) => ({
  editorProfile: one(editorProfiles),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  editorProfile: one(editorProfiles),
  client: one(users),
}));

export const briefsRelations = relations(briefs, ({ one }) => ({
  client: one(users, {
    fields: [briefs.clientId],
    references: [users.id],
    relationName: "user_briefs"
  }),
  editor: one(editorProfiles, {
    fields: [briefs.editorId],
    references: [editorProfiles.id],
    relationName: "editor_briefs"
  }),
}));

// FORUMS TABLES

// Forum Categories
export const forumCategories = pgTable("forum_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
  iconName: text("icon_name"), // Nombre del icono (Lucide React)
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertForumCategorySchema = createInsertSchema(forumCategories).pick({
  name: true,
  description: true,
  slug: true,
  iconName: true,
  order: true,
});

// Forum Topics
export const forumTopics = pgTable("forum_topics", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull(),
  isPinned: boolean("is_pinned").notNull().default(false),
  isClosed: boolean("is_closed").notNull().default(false),
  viewCount: integer("view_count").notNull().default(0),
  slug: text("slug").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertForumTopicSchema = createInsertSchema(forumTopics).pick({
  categoryId: true,
  title: true,
  content: true,
  authorId: true,
  isPinned: true,
  isClosed: true,
  slug: true,
});

// Forum Posts (replies)
export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull(),
  isAcceptedAnswer: boolean("is_accepted_answer").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertForumPostSchema = createInsertSchema(forumPosts).pick({
  topicId: true,
  content: true,
  authorId: true,
  isAcceptedAnswer: true,
});

// COURSES TABLES

// Course Categories
export const courseCategories = pgTable("course_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
  iconName: text("icon_name"), // Nombre del icono (Lucide React)
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCourseCategorySchema = createInsertSchema(courseCategories).pick({
  name: true,
  description: true,
  slug: true,
  iconName: true,
  order: true,
});

// Courses
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  instructorId: integer("instructor_id").notNull(),
  coverImage: text("cover_image"),
  level: text("level").notNull(), // beginner, intermediate, advanced
  duration: integer("duration"), // duración total en minutos
  price: real("price"), // null para cursos gratuitos
  slug: text("slug").notNull().unique(),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  categoryId: true,
  title: true,
  description: true,
  instructorId: true,
  coverImage: true,
  level: true,
  duration: true,
  price: true,
  slug: true,
  isPublished: true,
});

// Course Modules
export const courseModules = pgTable("course_modules", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCourseModuleSchema = createInsertSchema(courseModules).pick({
  courseId: true,
  title: true,
  description: true,
  order: true,
});

// Course Lessons
export const courseLessons = pgTable("course_lessons", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull(),
  title: text("title").notNull(),
  content: text("content"), // html content o null si es video
  videoUrl: text("video_url"), // url del video o null si es texto
  order: integer("order").notNull().default(0),
  duration: integer("duration"), // duración en minutos
  isFree: boolean("is_free").notNull().default(false), // si está disponible sin comprar el curso
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCourseLessonSchema = createInsertSchema(courseLessons).pick({
  moduleId: true,
  title: true,
  content: true,
  videoUrl: true,
  order: true,
  duration: true,
  isFree: true,
});

// Course Enrollments
export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  userId: integer("user_id").notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const insertCourseEnrollmentSchema = createInsertSchema(courseEnrollments).pick({
  courseId: true,
  userId: true,
});

// Lesson Progress
export const lessonProgress = pgTable("lesson_progress", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull(),
  userId: integer("user_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
});

export const insertLessonProgressSchema = createInsertSchema(lessonProgress).pick({
  lessonId: true,
  userId: true,
  completed: true,
});

// Foro relaciones
export const forumCategoriesRelations = relations(forumCategories, ({ many }) => ({
  topics: many(forumTopics),
}));

export const forumTopicsRelations = relations(forumTopics, ({ one, many }) => ({
  category: one(forumCategories, {
    fields: [forumTopics.categoryId],
    references: [forumCategories.id],
  }),
  author: one(users, {
    fields: [forumTopics.authorId],
    references: [users.id],
  }),
  posts: many(forumPosts),
}));

export const forumPostsRelations = relations(forumPosts, ({ one }) => ({
  topic: one(forumTopics, {
    fields: [forumPosts.topicId],
    references: [forumTopics.id],
  }),
  author: one(users, {
    fields: [forumPosts.authorId],
    references: [users.id],
  }),
}));

// Curso relaciones
export const courseCategoriesRelations = relations(courseCategories, ({ many }) => ({
  courses: many(courses),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  category: one(courseCategories, {
    fields: [courses.categoryId],
    references: [courseCategories.id],
  }),
  instructor: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
  }),
  modules: many(courseModules),
  enrollments: many(courseEnrollments),
}));

export const courseModulesRelations = relations(courseModules, ({ one, many }) => ({
  course: one(courses, {
    fields: [courseModules.courseId],
    references: [courses.id],
  }),
  lessons: many(courseLessons),
}));

export const courseLessonsRelations = relations(courseLessons, ({ one, many }) => ({
  module: one(courseModules, {
    fields: [courseLessons.moduleId],
    references: [courseModules.id],
  }),
  progress: many(lessonProgress),
}));

export const courseEnrollmentsRelations = relations(courseEnrollments, ({ one }) => ({
  course: one(courses, {
    fields: [courseEnrollments.courseId],
    references: [courses.id],
  }),
  user: one(users, {
    fields: [courseEnrollments.userId],
    references: [users.id],
  }),
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  lesson: one(courseLessons, {
    fields: [lessonProgress.lessonId],
    references: [courseLessons.id],
  }),
  user: one(users, {
    fields: [lessonProgress.userId],
    references: [users.id],
  }),
}));
