
import { fetchGraphQL } from "../libs/api-client";
import { GET_PRODUCTS } from "@/graphql/queries/getProducts";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types";
import { ProductCardList } from "@/components/product/ProductCardList";

export default async function Page() {
  try {
    const data: any = await fetchGraphQL(GET_PRODUCTS, { skip: 0, limit: 12 });
    const products:Product[] = data.getProducts.result.products;

  // 2. Handling empty states
    if (!products || products.length === 0) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No products found.</p>
        </div>
      );
    }

  return (
      <main className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Explore Products</h1>
        <ProductCardList initialProducts={products} />
      </main>
    );
  } catch (error) {
    // If this throws, Next.js will automatically show your error.tsx
    console.error("Critical error fetching products:", error);
    throw error;
  }
  
} 
