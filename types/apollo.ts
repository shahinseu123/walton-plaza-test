import { apolloClient } from '@/lib/apollo/client';

// Helper type for query results
export type QueryResult<T> = {
  data: T;
  loading?: boolean;
  error?: Error;
};

// Helper function for server components
export async function executeQuery<T>(
  query: any,
  variables?: Record<string, any>
): Promise<T> {
  const { data } = await apolloClient.query({
    query,
    variables,
  });
  return data;
}