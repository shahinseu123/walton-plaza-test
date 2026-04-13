import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://your-graphql-endpoint.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: ['filters', 'sortBy'],
            merge(existing = [], incoming, { args }) {
              if (args?.offset === 0) return incoming;
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});