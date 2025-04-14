import { pgTable, text, serial, integer, jsonb, timestamp, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
  userId: integer("user_id").notNull(),
  software: jsonb("software").notNull().default([]), // Array of software IDs
  editingStyles: jsonb("editing_styles").notNull().default([]), // Array of editing style IDs
  equipment: jsonb("equipment").notNull().default([]), // Array of equipment items
  basicRate: real("basic_rate"),
  mediumRate: real("medium_rate"),
  advancedRate: real("advanced_rate"),
  weeklyAvailability: jsonb("weekly_availability").notNull().default({}), // JSON object
  paymentMethods: jsonb("payment_methods").notNull().default([]), // Array of payment methods
  viewCount: integer("view_count").notNull().default(0),
  contactClickCount: integer("contact_click_count").notNull().default(0),
});

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
});

// PORTFOLIO ITEMS TABLE
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  editorProfileId: integer("editor_profile_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  order: integer("order").notNull().default(0),
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).pick({
  editorProfileId: true,
  title: true,
  description: true,
  videoUrl: true,
  thumbnailUrl: true,
  order: true,
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
  status: text("status").notNull().default("pending"), // pending, accepted, rejected, completed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBriefSchema = createInsertSchema(briefs).pick({
  clientId: true,
  editorId: true,
  projectType: true,
  description: true,
  budget: true,
  deadline: true,
});

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

export type Brief = typeof briefs.$inferSelect;
export type InsertBrief = z.infer<typeof insertBriefSchema>;
