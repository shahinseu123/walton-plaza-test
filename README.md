# Walton Plaza - E-commerce Platform

A modern, high-performance e-commerce platform built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Apollo Client GraphQL**. This project demonstrates advanced frontend engineering practices including server/client component architecture, optimistic UI updates, and efficient state management.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Architecture Decisions](#architecture-decisions)
- [Performance Optimizations](#performance-optimizations)
- [State Management](#state-management)
- [GraphQL Implementation](#graphql-implementation)
- [Styling Approach](#styling-approach)
- [Trade-offs](#trade-offs)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Evaluation Criteria](#evaluation-criteria)
- [Future Improvements](#future-improvements)

## Overview

This project is a complete e-commerce solution for Walton Plaza, featuring:

- **Product Listing Page (PLP)** with infinite scroll/pagination
- **Product Details Page (PDP)** with image gallery and variant selection
- **Shopping Cart** with optimistic updates and local persistence
- **Stock-aware Add to Cart** functionality
- **Fully Responsive Design** for all devices
- **Filtering & Sorting** (price, category, availability)
- **Dynamic Pricing** with discount calculations
- **Apollo Client** for efficient GraphQL data fetching and caching

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Framework | Next.js | 15.x | App Router, SSR, SSG |
| UI Library | React | 19.2.4 | Server/Client Components |
| Language | TypeScript | 5.x | Type safety (strict mode) |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| State Management | Zustand | 4.5.x | Global state + persistence |
| GraphQL Client | Apollo Client | 4.1.7 | Data fetching, caching |
| GraphQL | graphql | 16.x | Query parsing |
| Icons | Lucide React | - | Icon library |
| Notifications | Sonner | 1.4.x | Toast notifications |

## Project Structure

walton-plaza-test/
├── app/
│ ├── layout.tsx # Root layout with ApolloProvider
│ ├── page.tsx # Product listing (Server Component)
│ └── product/[id]/page.tsx # Product detail (Server Component)
├── components/
│ ├── product/
│ │ ├── ProductCard.tsx # Product card component
│ │ ├── ProductCardList.tsx # Product grid with load more
│ │ ├── FilterSidebar.tsx # Filtering UI
│ │ └── ProductAction.tsx # Add to cart actions
│ └── utility/
│ ├── ImageGallery.tsx # Product image gallery
│ └── SortSection.tsx # Sorting controls
├── graphql/
│ ├── fragments/
│ │ ├── productFragments.ts # Reusable GraphQL fragments
│ │ └── responseFragments.ts # Response type fragments
│ ├── queries/
│ │ ├── get-products.ts # Products listing query
│ │ └── get-product-details.ts # Single product query
│ └── mutations/
│ └── cart.ts # Cart mutations
├── lib/
│ ├── apollo/
│ │ └── client.ts # Apollo Client configuration
│ └── price-utils.ts # Price calculation utilities
├── providers/
│ └── apollo-provider.tsx # Apollo Provider wrapper
├── store/
│ └── cartStore.ts # Zustand cart store
├── types/
│ ├── product.ts # Product type definitions
│ └── cart.ts # Cart type definitions
└── hooks/
├── useProducts.ts # Products query hook
└── useAddToCart.ts # Add to cart mutation hook


## Key Features

### Product Listing Page (PLP)
- ✅ Fetch products via Apollo Client GraphQL
- ✅ Pagination / Infinite scroll (Load More button)
- ✅ Loading skeleton & error handling
- ✅ Filters (price range, availability)
- ✅ Sorting (price: low-to-high, high-to-low)
- ✅ Server-side rendering for SEO

### Product Card
- ✅ Reusable ProductCard component
- ✅ Optimized images with next/image
- ✅ Hover micro-interactions
- ✅ Optimistic add to cart with Apollo Client

### Product Details Page (PDP)
- ✅ Dynamic routing (product/[id])
- ✅ Fetch product details with Apollo Client
- ✅ Image gallery with zoom
- ✅ Variant selection
- ✅ Stock-aware CTA
- ✅ Dynamic pricing with discount display

### Cart System
- ✅ Add/remove/update items
- ✅ State persistence (localStorage)
- ✅ Optimistic updates with React 19
- ✅ Real-time price calculations

## Architecture Decisions

### 1. Next.js App Router with React 19

**Decision:** Use Next.js App Router with React 19 Server Components

**Why:**
- Server Components reduce client-side JavaScript bundle size
- Built-in SEO optimization with server-side rendering
- Streaming SSR with Suspense for progressive loading
- Access to React 19 features (`use`, `useOptimistic`, `useTransition`)

**Trade-off:** More complex data fetching patterns compared to Pages Router

**Example:**
```typescript
// Server Component - Critical for SEO
const product = await apolloClient.query({ query: GET_PRODUCT });

// Client Component - Interactive features
<Suspense fallback={<Skeleton />}>
  <ProductReviews productId={id} />
</Suspense>


2. Apollo Client for GraphQL
Decision: Use Apollo Client v4 for GraphQL data fetching

Why:

Built-in caching with InMemoryCache

Automatic background data refetching

Optimistic UI updates for better UX

TypeScript support with generated types

DevTools for debugging

Request batching and deduplication

Implementation:

// Apollo Client setup (lib/apollo/client.ts)
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://devapi.waltonplaza.com.bd/graphql',
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getProducts: {
            keyArgs: ['filter', 'pagination'],
            merge(existing, incoming) {
              return {
                ...incoming,
                result: {
                  ...incoming.result,
                  products: [
                    ...(existing?.result?.products || []),
                    ...(incoming?.result?.products || [])
                  ]
                }
              };
            }
          }
        }
      }
    }
  }),
  ssrMode: typeof window === 'undefined',
});

// Server Component usage
export default async function Page() {
  const { data } = await apolloClient.query({
    query: GET_PRODUCTS,
    variables: { skip: 0, limit: 12 },
  });
  
  const products = data.getProducts.result.products;
  return <ProductList products={products} />;
}

3. GraphQL Fragments for Reusability
Decision: Use GraphQL fragments to share field selections

Why:

Eliminate duplicate field definitions

Ensure consistent data fetching

Easier maintenance and updates

Better performance with precise data fetching

Example:

// fragments/productFragments.ts
import { gql } from '@apollo/client';

export const PRODUCT_VARIANT_FIELDS = gql`
  fragment ProductVariantFields on ProductVariant {
    mrpPrice
    ebsItemCode
    posItemCode
    quantity
    discount {
      amount
      value
      type
    }
  }
`;

export const PRODUCT_LISTING_FIELDS = gql`
  fragment ProductListingFields on Product {
    uid
    enName
    images {
      url
    }
    variants {
      ...ProductVariantFields
    }
  }
  ${PRODUCT_VARIANT_FIELDS}
`;

export const PRODUCT_DETAIL_FIELDS = gql`
  fragment ProductDetailFields on Product {
    uid
    enName
    images {
      url
    }
    variants {
      ...ProductVariantFields
    }
    productAttributes {
      enLabel
      values {
        enName
      }
    }
    detailedDescriptions {
      enLabel
      values {
        enName
      }
    }
    deliveries {
      enLabel
      values {
        enName
      }
    }
    serviceAndDeliveries {
      enLabel
      values {
        enName
      }
    }
    priceAndStocks {
      enLabel
      values {
        enName
      }
    }
  }
  ${PRODUCT_VARIANT_FIELDS}
`;

4. Zustand for State Management
Decision: Use Zustand instead of Redux or Context API

Why:

Minimal boilerplate code (60% less than Redux)

Built-in persistence middleware for localStorage

Selective re-renders with selector pattern

Small bundle size (~1KB)

Excellent TypeScript support

Example:

// store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Optimistic updates with React 19
const [optimisticCart, addOptimistic] = useOptimistic(cart, reducer);

const addToCart = (item) => {
  addOptimistic({ type: 'add', item }); // Instant update
  await actualAddToCart(item); // Background sync
};

Performance Optimizations
Apollo Client Caching
InMemoryCache with custom type policies

Automatic cache normalization

Pagination cache merging

Background refetching for stale data

Next.js Optimizations
Server Components for initial render

Image optimization with next/image

Dynamic imports for client components

Streaming SSR with Suspense boundaries

Code Splitting
Route-based code splitting with Next.js

Component-level lazy loading

GraphQL query batching

State Management
Zustand Store Structure

// Global cart state with persistence
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  }))
}));

React 19 Optimistic Updates

const [optimisticCart, addOptimistic] = useOptimistic(cart, reducer);

const addToCart = (item) => {
  addOptimistic({ type: 'add', item }); // Instant UI update
  await actualAddToCart(item); // Background sync
};

GraphQL Implementation

Query Structure

query GetProducts($skip: Int!, $limit: Int!) {
  getProducts(
    pagination: { skip: $skip, limit: $limit }
    filter: { isActive: true }
  ) {
    message
    statusCode
    result {
      count
      products {
        ...ProductListingFields
      }
    }
  }
}

Mutations

mutation AddToCart($productId: ID!, $quantity: Int!) {
  addToCart(productId: $productId, quantity: $quantity) {
    id
    items {
      productId
      quantity
      totalPrice
    }
    total
  }
}

Apollo Provider Setup

// providers/apollo-provider.tsx
'use client';

import { ApolloProvider as ApolloClientProvider } from '@apollo/client/react';
import { apolloClient } from '@/lib/apollo/client';

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloClientProvider client={apolloClient}>
      {children}
    </ApolloClientProvider>
  );
}

Styling Approach
Tailwind CSS Configuration
Utility-first CSS framework

Responsive design with breakpoints

Dark mode support

Custom theme configuration

Component Styling
Consistent spacing with Tailwind tokens

Hover and focus states

Responsive grid layouts

Custom animations and transitions

Trade-offs
Decision	Trade-off	Mitigation
Apollo Client	Larger bundle size	Tree shaking, code splitting
Server Components	Limited interactivity	Hybrid approach with client components
Zustand	No time-travel debugging	Good enough for cart state
GraphQL	Over-fetching prevention	Fragments for precise queries
Tailwind CSS	Large class names	PurgeCSS in production
Getting Started
Prerequisites
Node.js 18+ or later

Installation

1. Clone the repository:

git clone https://github.com/shahinseu123/walton-plaza-test.git
cd walton-plaza-test

2. Install dependencies:

npm install
# or
yarn install

3.Set up environment variables:

cp .env.example .env.local

4.Edit .env.local with your configuration:

NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://devapi.waltonplaza.com.bd/graphql