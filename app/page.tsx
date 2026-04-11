import { fetchGraphQL } from "../libs/api-client";
import { GET_PRODUCTS } from "@/graphql/queries/getProducts";
import { Product } from "@/types";
import { ProductCardList } from "@/components/product/ProductCardList";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { SortSection } from "@/components/utility/SortSection";
import { Suspense } from "react";
import { ProductListSkeleton } from "@/components/product/ProductListSkeleton";

export default async function Page() {
  try {
    const data: any = await fetchGraphQL(GET_PRODUCTS, { skip: 0, limit: 12 });
    const products: Product[] = data.getProducts.result.products;

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
        <div className="flex items-start">
          <div className="w-1/4 sticky top-24 h-fit">
            <FilterSidebar />
          </div>
          <div className="w-3/4">
            <div>
              <SortSection />
            </div>
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductCardList initialProducts={products} />
            </Suspense>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    // If this throws, Next.js will automatically show your error.tsx
    console.error("Critical error fetching products:", error);
    throw error;
  }
}
