import { GET_PRODUCT_DETAILS } from "@/graphql/queries/getProductDetails";
import { fetchGraphQL } from "@/libs/api-client";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Now pass the string ID to your fetcher
  const data = await fetchGraphQL(GET_PRODUCT_DETAILS, { uid: id });
  
//   return <h1>product page {id}</h1>;
  return <h1>{data.getProducts.result.products[0].enName}</h1>;
}