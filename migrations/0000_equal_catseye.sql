CREATE TABLE "briefs" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" integer NOT NULL,
	"editor_id" integer NOT NULL,
	"project_type" text NOT NULL,
	"description" text NOT NULL,
	"budget" real,
	"deadline" timestamp,
	"attachments" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "conversation_participants" (
	"conversation_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"is_read" boolean DEFAULT true NOT NULL,
	CONSTRAINT "conversation_participants_conversation_id_user_id_pk" PRIMARY KEY("conversation_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_message_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "course_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"slug" text NOT NULL,
	"icon_name" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "course_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "course_enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"enrolled_at" timestamp DEFAULT now(),
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "course_lessons" (
	"id" serial PRIMARY KEY NOT NULL,
	"module_id" integer NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"video_url" text,
	"order" integer DEFAULT 0 NOT NULL,
	"duration" integer,
	"is_free" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "course_modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"instructor_id" integer NOT NULL,
	"cover_image" text,
	"level" text NOT NULL,
	"duration" integer,
	"price" real,
	"slug" text NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "courses_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "editing_styles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "editor_editing_styles" (
	"editor_id" integer NOT NULL,
	"style_id" integer NOT NULL,
	CONSTRAINT "editor_editing_styles_editor_id_style_id_pk" PRIMARY KEY("editor_id","style_id")
);
--> statement-breakpoint
CREATE TABLE "editor_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"software" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"editing_styles" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"equipment" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"basic_rate" real,
	"medium_rate" real,
	"advanced_rate" real,
	"weekly_availability" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"payment_methods" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"technology_tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"experience" text,
	"expertise" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"professional_type" text DEFAULT 'editor',
	"view_count" integer DEFAULT 0 NOT NULL,
	"contact_click_count" integer DEFAULT 0 NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "editor_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "editor_software" (
	"editor_id" integer NOT NULL,
	"software_id" integer NOT NULL,
	CONSTRAINT "editor_software_editor_id_software_id_pk" PRIMARY KEY("editor_id","software_id")
);
--> statement-breakpoint
CREATE TABLE "forum_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"slug" text NOT NULL,
	"icon_name" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "forum_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "forum_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic_id" integer NOT NULL,
	"content" text NOT NULL,
	"author_id" integer NOT NULL,
	"is_accepted_answer" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "forum_topics" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"author_id" integer NOT NULL,
	"is_pinned" boolean DEFAULT false NOT NULL,
	"is_closed" boolean DEFAULT false NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lesson_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"lesson_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"last_accessed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversation_id" integer NOT NULL,
	"sender_id" integer NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "portfolio_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"editor_profile_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"video_url" text NOT NULL,
	"thumbnail_url" text,
	"video_type" text,
	"duration" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"editor_profile_id" integer NOT NULL,
	"client_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "software" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text NOT NULL,
	"profile_picture" text,
	"bio" text,
	"country" text,
	"timezone" text,
	"years_of_experience" integer,
	"user_type" text DEFAULT 'editor' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "conversation_participants" ADD CONSTRAINT "conversation_participants_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversation_participants" ADD CONSTRAINT "conversation_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;