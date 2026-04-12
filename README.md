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



walton-plaza/
├── app/ # Next.js App Router
│ ├── product/ # Product routes
│ │ ├── [id]/ # Dynamic product page
│ │ │ ├── page.tsx # Product details (Server)
│ │ │ ├── loading.tsx # Loading spinner
│ │ │ └── ProductDetailsClient.tsx
│ │ └── page.tsx # Product listing
│ ├── cart/ # Cart page
│ │ └── page.tsx
│ ├── layout.tsx # Root layout
│ └── globals.css # Global styles
│
├── components/ # Reusable components
│ ├── product/ # Product-specific
│ │ ├── ProductCard.tsx
│ │ ├── ProductActions.tsx
│ │ ├── PriceSection.tsx
│ │ ├── ProductTabs.tsx
│ │ └── VariantSelector.tsx
│ ├── cart/ # Cart components
│ │ ├── CartDrawer.tsx
│ │ ├── CartItemsList.tsx
│ │ ├── CartItemCard.tsx
│ │ ├── OrderSummary.tsx
│ │ └── PromoCodeForm.tsx
│ └── ui/ # Generic UI
│ ├── Breadcrumbs.tsx
│ └── RatingStars.tsx
│
├── store/ # Zustand stores
│ └── useCartStore.ts # Cart state management
│
├── libs/ # Utilities
│ ├── api-client.ts # GraphQL client
│ ├── price-utils.ts # Price calculations
│ └── cart-utils.ts # Cart helpers
│
├── graphql/ # GraphQL
│ ├── queries/ # GraphQL queries
│ │ ├── getProducts.ts
│ │ └── getProductDetails.ts
│ |
│ └── productFragments.ts
│
├── hooks/ # Custom React hooks
│ └── useProducts.ts # Products fetching logic
│
├── types/ # TypeScript types
│ ├── product.ts
│ └── cart.ts
│
|
└── images/ # Placeholder images