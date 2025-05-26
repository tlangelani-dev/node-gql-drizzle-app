import { pgTable, uuid, varchar, integer, text, decimal, boolean, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const books = pgTable('books', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  isbn: varchar('isbn', { length: 17 }),
  publishedYear: integer('published_year').notNull(),
  genre: varchar('genre', { length: 100 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  inStock: boolean('in_stock').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Zod schemas for validation
export const insertBookSchema = z.object({
  title: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  isbn: z.string().optional(),
  publishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
  genre: z.string().min(1).max(100),
  description: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  inStock: z.boolean().optional().default(true),
});

export const selectBookSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  author: z.string(),
  isbn: z.string().nullable(),
  publishedYear: z.number(),
  genre: z.string(),
  description: z.string().nullable(),
  price: z.string(),
  inStock: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const updateBookSchema = insertBookSchema.partial().extend({
  id: z.string().uuid(),
});

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;
