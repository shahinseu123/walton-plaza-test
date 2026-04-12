cat > README.md << 'EOF'
# Walton Plaza - E-commerce Platform

A modern, high-performance e-commerce platform built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and **GraphQL**. This project demonstrates advanced frontend engineering practices including server/client component architecture, optimistic UI updates, and efficient state management.

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
- **Responsive Design** for all devices
- **Filtering & Sorting** (price, category, availability)
- **Dynamic Pricing** with discount calculations

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Framework | Next.js | 15.x | App Router, SSR, SSG |
| UI Library | React | 19.2.4 | Server/Client Components |
| Language | TypeScript | 5.x | Type safety (strict mode) |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| State Management | Zustand | 4.5.x | Global state + persistence |
| API Layer | GraphQL | - | Data fetching |
| Icons | Lucide React | - | Icon library |
| Notifications | Sonner | 1.4.x | Toast notifications |

## Project Structure




## Key Features

### Product Listing Page (PLP)
- ✅ Fetch products via GraphQL
- ✅ Pagination / Infinite scroll (Load More button)
- ✅ Loading skeleton & error handling
- ✅ Filters (price range, availability)
- ✅ Sorting (price: low-to-high, high-to-low)

### Product Card
- ✅ Reusable ProductCard component
- ✅ Optimized images with next/image
- ✅ Hover micro-interactions
- ✅ Optimistic add to cart

### Product Details Page (PDP)
- ✅ Dynamic routing (product/[id])
- ✅ Fetch product details
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

### 2. Zustand for State Management

**Decision:** Use Zustand instead of Redux or Context API

**Why:**
- Minimal boilerplate code (60% less than Redux)
- Built-in persistence middleware for localStorage
- Selective re-renders with selector pattern
- Small bundle size (~1KB)
- Excellent TypeScript support

**Example:**
```typescript
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  }))
}));

const [optimisticCart, addOptimistic] = useOptimistic(cart, reducer);

const addToCart = (item) => {
  addOptimistic({ type: 'add', item }); // Instant update
  await actualAddToCart(item); // Background sync
};

// Server Component - Critical
const product = await fetchProduct(id);

// Client Component - Non-critical
<Suspense fallback={<Skeleton />}>
  <ProductReviews productId={id} />
</Suspense>