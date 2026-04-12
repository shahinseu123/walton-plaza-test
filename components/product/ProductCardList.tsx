"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
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
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort-by")
  const minPriceAttr = searchParams.get("min-price");
  const maxPriceAttr = searchParams.get("max-price");
  const status = searchParams.get("status")
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [skip, setSkip] = useState(initialProducts.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  
const processedProducts = useMemo(() => {
  const getEffectivePrice = (product: Product): number => {
    const variant = product.variants?.[0];
    if (!variant) return 0;
    
    const { mrpPrice, discount } = variant;
    if (!discount) return mrpPrice;
    
    return discount.type === "percentage" 
      ? mrpPrice - (mrpPrice * discount.value / 100)
      : mrpPrice - discount.value;
  };

  let result = products.filter(product => {
    const price = getEffectivePrice(product);
    const quantity = product.variants?.[0]?.quantity ?? 0;
    
    const meetsPriceRange = (!minPriceAttr || price >= Number(minPriceAttr)) &&
                           (!maxPriceAttr || price <= Number(maxPriceAttr));
    
    const meetsStockStatus = 
      status === "in-stock" ? quantity > 0 : 
      status === "out-of-stock" ? quantity === 0 : 
      true; 
    
    return meetsPriceRange && meetsStockStatus;
  });

  if (sortBy === 'price-asc') {
    result.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
  } else if (sortBy === 'price-desc') {
    result.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
  }
  
  return result;
}, [products, sortBy, minPriceAttr, maxPriceAttr, status]);
  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data: any = await fetchGraphQL(GET_PRODUCTS, { skip, limit: 12 });
      const newProducts = data.getProducts.result.products;

      if (newProducts.length < 12) {
        setHasMore(false); 
      }

      setProducts((prev) => [...prev, ...newProducts]);
      setSkip((prev) => prev + 12);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {processedProducts.map((p) => (
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
