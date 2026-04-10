"use client";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { useState } from "react";
import { fetchGraphQL } from "@/libs/api-client";
import { GET_PRODUCTS } from "@/graphql/queries/getProducts";

export function ProductCardList({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [skip, setSkip] = useState(initialProducts.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      // Fetch the next batch of 12
      const data: any = await fetchGraphQL(GET_PRODUCTS, { skip, limit: 12 });
      const newProducts = data.getProducts.result.products;

      if (newProducts.length < 12) {
        setHasMore(false); // No more products left to fetch
      }

      setProducts((prev) => [...prev, ...newProducts]);
      setSkip((prev) => prev + 12);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.uid} product={p} />
        ))}
      </div>
      <div className="mt-5">
        {hasMore && (
          <div className="flex justify-center pb-10">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More Products"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
