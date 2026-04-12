const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;


export async function fetchGraphQL<T>(query: string, variables = {}): Promise<T> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 }, 
  });

  const json = await response.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}