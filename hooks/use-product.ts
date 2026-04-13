'use client';

import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS, GET_PRODUCT_BY_UID } from '@/graphql/queries/get-products';
import type { Product, GetProductsResponse } from '@/types/product';

interface UseProductsOptions {
  limit?: number;
  skip?: number;
  uid?: string;
  posItemCode?: string;
  isActive?: boolean;
}

export function useProducts({ limit = 12, skip = 0, uid, posItemCode, isActive }: UseProductsOptions = {}) {
  const { loading, error, data, fetchMore, refetch } = useQuery<GetProductsResponse>(GET_PRODUCTS, {
    variables: { 
      skip, 
      limit,
      filter: { uid, posItemCode, isActive }
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const products = data?.getProducts?.result?.products || [];
  const totalCount = data?.getProducts?.result?.count || 0;
  const statusCode = data?.getProducts?.statusCode;
  const message = data?.getProducts?.message;

  const loadMore = () => {
    if (products.length < totalCount) {
      return fetchMore({
        variables: { skip: products.length, limit },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            getProducts: {
              ...fetchMoreResult.getProducts,
              result: {
                ...fetchMoreResult.getProducts.result,
                products: [
                  ...prev.getProducts.result.products,
                  ...fetchMoreResult.getProducts.result.products
                ]
              }
            }
          };
        },
      });
    }
    return Promise.resolve();
  };

  const hasMore = products.length < totalCount;

  return {
    products,
    loading,
    error,
    loadMore,
    hasMore,
    totalCount,
    statusCode,
    message,
    refetch,
  };
}

export function useProduct(uid: string) {
  const { loading, error, data, refetch } = useQuery<GetProductsResponse>(GET_PRODUCT_BY_UID, {
    variables: { uid },
    skip: !uid,
    fetchPolicy: 'cache-and-network',
  });

  const product = data?.getProducts?.result?.products?.[0];
  const statusCode = data?.getProducts?.statusCode;
  const message = data?.getProducts?.message;

  return {
    product,
    loading,
    error,
    statusCode,
    message,
    refetch,
  };
}