# Walton Plaza – Senior Frontend Developer Evaluation Task

A high-performance product listing and product detail system built with **Next.js (App Router), React 19, TypeScript, Tailwind CSS, and GraphQL**.

The project focuses on **scalable frontend architecture, performance optimization, and modern React/Next.js patterns**.

---

# 🚀 Tech Stack

- Next.js (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS
- GraphQL (Custom Client)
- Native Fetch API

---

# 🧠 Architecture Overview

The application follows a **feature-based, server-first architecture** using Next.js App Router.

### Core Principles

- Server Components for data fetching and SEO
- Client Components for interactivity only
- Minimal client-side JavaScript
- Strict TypeScript enforcement
- Explicit data flow (no hidden abstractions)

---

# 📁 Project Structure

```txt

├── app/                      # App Router routes (Next.js)
│   ├── cart/                 # Cart page
│   ├── product/[id]/        # Product Details Page (PDP)
│   ├── layout.tsx
│   ├── page.tsx             # Product listing page
│
├── components/
│   ├── product/              # Product-related UI components
│   ├── layout/                   # Reusable UI components
│   ├── product/                   # Reusable product UI components
│   ├── utility/                   # Reusable utility UI components
│
├── graphql/
│   ├── fragment/              # GraphQL client utilities
│   ├── queries               # Custom GraphQL queries
│
├── store/                    # Cart state management
├── hooks/                    # Custom React hooks
├── types/                    # Global TypeScript types

---

# 🔌 GraphQL Strategy

## Custom GraphQL Client (No Apollo)

Instead of Apollo Client, a **custom lightweight GraphQL fetch layer** is implemented.

### Why not Apollo?

### 1. Server Components Compatibility
Next.js App Router relies heavily on Server Components.

Apollo introduces:
- Client-side cache dependency
- Provider wrapper requirement
- Hydration complexity

✔ Custom fetch works natively in:
- Server Components
- Server Actions
- Client Components

---

### 2. Performance Benefits

Custom GraphQL approach:

- Uses native `fetch`
- No runtime abstraction overhead
- Smaller bundle size
- Better tree-shaking
- No cache normalization cost

---

### 3. Better Alignment with Next.js

Next.js already provides:
- Request caching
- Revalidation strategies
- Streaming support

So Apollo cache becomes redundant.

---

### 4. Simplicity & Predictability

GraphQL requests are explicit:

```ts
fetchGraphQL(query, variables)
```

No hidden caching layers or side effects.

---

# 🛍 Product Listing Page (PLP)

## Features

- GraphQL product fetching
- Pagination-based loading
- Filtering:
  - Category
  - Price range
  - Availability
- Sorting:
  - Price (asc/desc)
  - Rating

## Why Pagination (not Infinite Scroll)?

- Better SEO performance
- Stable memory usage
- Easier caching strategy
- Predictable server load

---

# 🧱 Product Card Component

## Features

- Optimized image rendering (`next/image`)
- Hover micro-interactions
- Memoized rendering
- Stock indicator
- Reusable across PLP and recommendations

## Optimistic Cart Behavior

- UI updates instantly on "Add to Cart"
- Rollback supported on failure

---

# 📄 Product Details Page (PDP)

## Features

- Dynamic route: `/product/[id]`
- Server-side GraphQL fetch
- Image gallery
- Variant selection (size/color)
- Stock-aware CTA
- Dynamic pricing per variant

---

# 🧠 State Management (Cart)

## Approach

A lightweight global store is used instead of Redux.

- Client-side state only
- Persistent via `localStorage`
- Hydration-safe initialization

---

## Why not Redux?

- Overkill for current scope
- Adds unnecessary boilerplate
- Increases bundle complexity

✔ Chosen approach:
- simpler
- faster
- easier to maintain

---



# ⚡ Performance Optimizations

## 1. Server Components First

- Product data fetched on server
- Reduced client JS bundle

---

## 2. Memoization Strategy

- `React.memo` for ProductCard
- `useMemo` for derived filters
- `useCallback` for event handlers

---

## 3. GraphQL Optimization

- Only required fields requested
- Query co-location per route
- No over-fetching

---

## 4. Image Optimization

- Next.js Image component
- Lazy loading enabled
- Responsive image sizes

---

# ⚛ React 19 Features Used

- Concurrent rendering compatibility
- Suspense-based loading UI
- Server Actions (for mutations where applicable)
- Future-ready component structure (React Compiler aligned patterns)

---

# 🔥 Key Architecture Decisions

| Area | Decision | Reason |
|------|----------|--------|
| GraphQL Client | Custom fetch wrapper | Better Server Component support |
| State Management | Lightweight store | Avoid Redux complexity |
| Data Fetching | Server Components | Performance + SEO |
| Pagination | Page-based | Stable performance + SEO |
| Styling | Tailwind CSS | Rapid UI development |

---

# ⚖ Trade-offs

## Custom GraphQL Client

### ❌ Cons
- No built-in cache like Apollo
- Manual optimization required

### ✔ Pros
- Fully compatible with Server Components
- Smaller bundle size
- Full control over caching strategy

---

## No Redux

### ❌ Cons
- Less structured for large-scale global state

### ✔ Pros
- Simpler architecture
- Less boilerplate
- Faster development speed

---

## Pagination over Infinite Scroll

### ❌ Cons
- Slightly less smooth UX

### ✔ Pros
- Better SEO
- More predictable performance
- Easier debugging

---

# 🚀 Future Improvements

- Introduce persisted GraphQL caching layer
- Add Redis edge caching for PLP
- Move cart to server-synced state
- Add analytics-driven product ranking
- Implement A/B testing for sorting strategies

---

# 📦 Repository

> Add GitHub link here

---

# 📌 Summary

This project prioritizes:

- Performance-first architecture
- Minimal client-side JavaScript
- Explicit data handling
- Scalable component structure
- Next.js App Router best practices
```

