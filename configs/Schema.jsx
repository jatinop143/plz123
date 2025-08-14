import { boolean, integer, json, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// ---------------------
// Existing Tables
// ---------------------
export const CourseList = pgTable('courseList', {
    id: serial('id').primaryKey(),
    CourseId: varchar('CourseId').notNull(),
    name: varchar('name').notNull(),
    session: varchar('session').notNull(),
    Height: varchar('Height').notNull(),
    Weight: varchar('Weight').notNull(),
    are_u_happy: varchar('are_u_happy').notNull(),
    courseOutput: json('courseOutput').notNull(),
    createdBy: varchar('createdBy').notNull(),
    Username: varchar('Username'),
    userProfileImage: varchar('userProfileImage'),
    courseBanner: varchar('Banner').default('/placehold.png'),
    publish: boolean('publsh').default(false)
});

export const ITList = pgTable('ITList', {
    id: serial('id').primaryKey(),
    CourseId: varchar('CourseId').notNull(),
    name: varchar('name').notNull(),
    course: varchar('course').notNull(),
    Difficulty_level: varchar('Difficulty_level').notNull(),
    courseOutput: json('courseOutput').notNull(),
    createdBy: varchar('createdBy').notNull(),
    Username: varchar('Username'),
    userProfileImage: varchar('userProfileImage'),
    courseBanner: varchar('Banner').default('/placehold.png'),
    publish: boolean('publsh').default(false)
});

export const Chapter = pgTable('chapter', {
    id: serial('id').primaryKey(),
    course: varchar('courseId').notNull(),
    chapter: integer('chapterId').notNull(),
    content: json('content').notNull(),
    videoId: varchar('videoId').notNull()
});

export const ChapterITs = pgTable('chapterITs', {
    id: serial('id').primaryKey(),
    course: varchar('courseId').notNull(),
    chapter: integer('chapterId').notNull(),
    content: json('content').notNull(),
    videoId: varchar('videoId').notNull()
});

// Add this to your existing schema.jsx
export const HappyIndexResults = pgTable('happy_index_results', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull(), // Assuming you want to track by user
  score: integer('score').notNull(),
  answers: json('answers').notNull(), // Store all answers for reference
  date: timestamp('date').defaultNow(),
  username: varchar('username').notNull(),
});
