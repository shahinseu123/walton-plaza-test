import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://devapi.waltonplaza.com.bd/graphql',

  }),
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined', 
});