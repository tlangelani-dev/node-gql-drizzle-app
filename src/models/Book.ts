export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  publishedYear: number;
  genre: string;
  description?: string;
  price: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookInput {
  title: string;
  author: string;
  isbn?: string;
  publishedYear: number;
  genre: string;
  description?: string;
  price: number;
  inStock?: boolean;
}

export interface UpdateBookInput {
  id: string;
  title?: string;
  author?: string;
  isbn?: string;
  publishedYear?: number;
  genre?: string;
  description?: string;
  price?: number;
  inStock?: boolean;
}

export interface CreateBookInput {
  title: string;
  author: string;
  isbn?: string;
  publishedYear: number;
  genre: string;
  description?: string;
  price: number;
  inStock?: boolean;
}

export interface UpdateBookInput {
  id: string;
  title?: string;
  author?: string;
  isbn?: string;
  publishedYear?: number;
  genre?: string;
  description?: string;
  price?: number;
  inStock?: boolean;
}
