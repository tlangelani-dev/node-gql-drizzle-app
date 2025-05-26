import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    isbn: String
    publishedYear: Int!
    genre: String!
    description: String
    price: Float!
    inStock: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateBookInput {
    title: String!
    author: String!
    isbn: String
    publishedYear: Int!
    genre: String!
    description: String
    price: Float!
    inStock: Boolean = true
  }

  input UpdateBookInput {
    id: ID!
    title: String
    author: String
    isbn: String
    publishedYear: Int
    genre: String
    description: String
    price: Float
    inStock: Boolean
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    booksByAuthor(author: String!): [Book!]!
    booksByGenre(genre: String!): [Book!]!
    booksInStock: [Book!]!
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book!
    updateBook(input: UpdateBookInput!): Book!
    deleteBook(id: ID!): Boolean!
  }
`;
