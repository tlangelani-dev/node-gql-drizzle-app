import { eq, ilike, and } from 'drizzle-orm';
import { db } from '../db/connection';
import { books, type Book, type NewBook } from '../db/schema';
import { CreateBookInput, UpdateBookInput } from '../models/Book';

export class BookService {
  static async getAllBooks(): Promise<Book[]> {
    return await db.select().from(books);
  }

  static async getBookById(id: string): Promise<Book | undefined> {
    const result = await db.select().from(books).where(eq(books.id, id));
    return result[0];
  }

  static async getBooksByAuthor(author: string): Promise<Book[]> {
    return await db
      .select()
      .from(books)
      .where(ilike(books.author, `%${author}%`));
  }

  static async getBooksByGenre(genre: string): Promise<Book[]> {
    return await db
      .select()
      .from(books)
      .where(ilike(books.genre, `%${genre}%`));
  }

  static async getBooksInStock(): Promise<Book[]> {
    return await db.select().from(books).where(eq(books.inStock, true));
  }

  static async createBook(input: CreateBookInput): Promise<Book> {
    const newBook: NewBook = {
      ...input,
      price: input.price.toString(),
      inStock: input.inStock ?? true,
    };

    const result = await db.insert(books).values(newBook).returning();
    return result[0];
  }

  static async updateBook(input: UpdateBookInput): Promise<Book> {
    const { id, ...updateData } = input;

    const updateValues: Partial<NewBook> = {
      ...updateData,
      ...(updateData.price && { price: updateData.price.toString() }),
      updatedAt: new Date(),
    };

    const result = await db.update(books).set(updateValues).where(eq(books.id, id)).returning();

    if (result.length === 0) {
      throw new Error(`Book with id ${id} not found`);
    }

    return result[0];
  }

  static async deleteBook(id: string): Promise<boolean> {
    const result = await db.delete(books).where(eq(books.id, id)).returning();
    return result.length > 0;
  }
}
