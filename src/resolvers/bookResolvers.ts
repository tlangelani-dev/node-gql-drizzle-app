import { BookService } from '../services/book.service';
import { CreateBookInput, UpdateBookInput } from '../models/Book';
import { Book } from '../db/schema';

export const bookResolvers = {
  Query: {
    books: async (): Promise<Book[]> => {
      return await BookService.getAllBooks();
    },

    book: async (_: any, { id }: { id: string }): Promise<Book | null> => {
      const book = await BookService.getBookById(id);
      return book || null;
    },

    booksByAuthor: async (_: any, { author }: { author: string }): Promise<Book[]> => {
      return await BookService.getBooksByAuthor(author);
    },

    booksByGenre: async (_: any, { genre }: { genre: string }): Promise<Book[]> => {
      return await BookService.getBooksByGenre(genre);
    },

    booksInStock: async (): Promise<Book[]> => {
      return await BookService.getBooksInStock();
    },
  },

  Mutation: {
    createBook: async (_: any, { input }: { input: CreateBookInput }): Promise<Book> => {
      return await BookService.createBook(input);
    },

    updateBook: async (_: any, { input }: { input: UpdateBookInput }): Promise<Book> => {
      return await BookService.updateBook(input);
    },

    deleteBook: async (_: any, { id }: { id: string }): Promise<boolean> => {
      return await BookService.deleteBook(id);
    },
  },

  Book: {
    price: (parent: Book) => parseFloat(parent.price),
    createdAt: (parent: Book) => parent.createdAt.toISOString(),
    updatedAt: (parent: Book) => parent.updatedAt.toISOString(),
  },
};
