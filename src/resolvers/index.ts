import { bookResolvers } from './bookResolvers';

export const resolvers = {
  Query: {
    ...bookResolvers.Query,
  },
  Mutation: {
    ...bookResolvers.Mutation,
  },
};
