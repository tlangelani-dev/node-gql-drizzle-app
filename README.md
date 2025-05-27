# GraphQL Book API with Drizzle ORM and PostgreSQL

A production-ready TypeScript GraphQL API for managing books using Apollo Server, Drizzle ORM, and PostgreSQL.

## Features

- **GraphQL API** with Apollo Server
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **PostgreSQL** database
- **Docker** containerization
- **Zod** validation schemas
- **Book Management** with CRUD operations
- **Query Support** for filtering by author, genre, and stock status
- **Database migrations** and seeding

## Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Docker (optional)

## Installation

```bash
npm install
```

## Environment Setup

Copy `.env.example` to `.env` and configure your database connection:

```bash
cp .env.example .env
```

Update the `.env` file with your PostgreSQL credentials:

```
DATABASE_URL=postgresql://username:password@localhost:5432/bookdb
NODE_ENV=development
PORT=4000
```

## Database Setup

### Generate migrations

```bash
npm run db:generate
```

### Run migrations

```bash
npm run db:migrate
```

### Seed the database

```bash
npm run db:seed
```

### Open Drizzle Studio (Database GUI)

```bash
npm run db:studio
```

## Development

```bash
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Start PostgreSQL and the API
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
# Build the image
docker build -t graphql-book-api .

# Run with external PostgreSQL
docker run -p 4000:4000 \
  -e DATABASE_URL=postgresql://username:password@host:5432/bookdb \
  graphql-book-api
```

## API Endpoints

The GraphQL endpoint is available at: `http://localhost:4000/`

## Database Schema

The `books` table includes:

- `id` - UUID primary key
- `title` - Book title (required)
- `author` - Author name (required)
- `isbn` - ISBN number (optional)
- `publishedYear` - Publication year (required)
- `genre` - Book genre (required)
- `description` - Book description (optional)
- `price` - Book price (required, decimal)
- `inStock` - Availability status (boolean)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Example Queries

### Get all books

```graphql
query {
  books {
    id
    title
    author
    price
    inStock
  }
}
```

### Get a specific book

```graphql
query {
  book(id: "uuid-here") {
    id
    title
    author
    description
    price
  }
}
```

### Get books by author

```graphql
query {
  booksByAuthor(author: "Harper Lee") {
    id
    title
    publishedYear
  }
}
```

## Example Mutations

### Create a book

```graphql
mutation {
  createBook(
    input: {
      title: "The Catcher in the Rye"
      author: "J.D. Salinger"
      publishedYear: 1951
      genre: "Fiction"
      price: 15.99
      description: "Coming-of-age story"
    }
  ) {
    id
    title
    author
  }
}
```

### Update a book

```graphql
mutation {
  updateBook(input: { id: "uuid-here", price: 10.99, inStock: false }) {
    id
    title
    price
    inStock
  }
}
```

### Delete a book

```graphql
mutation {
  deleteBook(id: "uuid-here")
}
```

## Project Structure

```
src/
├── db/
│   ├── schema.ts       # Drizzle schema definitions
│   ├── connection.ts   # Database connection
│   ├── migrate.ts      # Migration runner
│   └── seed.ts         # Database seeding
├── models/             # TypeScript interfaces
├── services/           # Business logic layer
├── schema/             # GraphQL type definitions
├── resolvers/          # GraphQL resolvers
└── index.ts            # Server entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Drizzle Studio
- `npm run type-check` - Check TypeScript types

## Database Operations

This API uses Drizzle ORM with PostgreSQL, providing:

- Type-safe database queries
- Automatic migrations
- Connection pooling
- Schema validation with Zod
- Database introspection with Drizzle Studio

## Deployment

The application is containerized and can be deployed to any platform supporting Docker:

- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- Railway
- Render
- Heroku (with Docker)

Make sure to configure your production database URL and environment variables accordingly.
