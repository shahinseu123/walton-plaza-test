'use client';

import { useQuery, useMutation } from '@apollo/client/react';
import { GET_PRODUCTS, ADD_TO_CART } from '@/graphql/queries';

interface UseProductsOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  filters?: Record<string, any>;
}

export function useProducts({ limit = 12, offset = 0, sortBy, filters }: UseProductsOptions = {}) {
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_PRODUCTS, {
    variables: { limit, offset, sortBy, filters },
    notifyOnNetworkStatusChange: true,
  });

  const products = data?.products || [];

  const loadMore = () => {
    if (products.length >= limit) {
      return fetchMore({
        variables: { offset: products.length },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            products: [...prev.products, ...fetchMoreResult.products],
          };
        },
      });
    }
    return Promise.resolve();
  };

  return {
    products,
    loading,
    error,
    loadMore,
    hasMore: products.length === limit,
    refetch,
  };
}

export function useAddToCart() {
  const [addToCartMutation, { loading, error }] = useMutation(ADD_TO_CART);

  const addToCart = async (productId: string, quantity: number = 1, variantId?: string) => {
    try {
      const result = await addToCartMutation({
        variables: { productId, quantity, variantId },
      });
      return result.data?.addToCart;
    } catch (err) {
      console.error('Failed to add to cart:', err);
      throw err;
    }
  };

  return { addToCart, loading, error };
}