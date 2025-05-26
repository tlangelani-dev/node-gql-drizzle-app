import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const port = parseInt(process.env.PORT || '4000');

  const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
      // Add authentication logic here if needed
      return {
        // Add context data here
      };
    },
  });

  console.log(`🚀 Server ready at: ${url}`);
  console.log(`📚 GraphQL Playground available at: ${url}`);
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
