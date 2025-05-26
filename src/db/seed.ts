import { db } from './connection';
import { books } from './schema';

async function seed() {
  console.log('Seeding database...');

  try {
    await db.insert(books).values([
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '978-0-7432-7356-5',
        publishedYear: 1925,
        genre: 'Fiction',
        description: 'A classic American novel set in the Jazz Age',
        price: '12.99',
        inStock: true,
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '978-0-06-112008-4',
        publishedYear: 1960,
        genre: 'Fiction',
        description: 'A gripping tale of racial injustice and childhood innocence',
        price: '14.99',
        inStock: true,
      },
      {
        title: '1984',
        author: 'George Orwell',
        isbn: '978-0-452-28423-4',
        publishedYear: 1949,
        genre: 'Dystopian Fiction',
        description: 'A dystopian social science fiction novel',
        price: '13.99',
        inStock: false,
      },
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  }

  process.exit(0);
}

seed();
