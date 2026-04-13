import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int!, $offset: Int!, $sortBy: String, $filters: ProductFiltersInput) {
    products(limit: $limit, offset: $offset, sortBy: $sortBy, filters: $filters) {
      id
      name
      slug
      price
      discountPrice
      description
      images {
        id
        url
        alt
      }
      stock
      category {
        id
        name
        slug
      }
      inStock
      createdAt
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      slug
      description
      price
      discountPrice
      images {
        id
        url
        alt
      }
      variants {
        id
        name
        sku
        price
        stock
      }
      stock
      category {
        id
        name
        slug
      }
      inStock
      specifications
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!, $variantId: ID) {
    addToCart(productId: $productId, quantity: $quantity, variantId: $variantId) {
      id
      items {
        id
        productId
        productName
        quantity
        unitPrice
        totalPrice
        variant {
          id
          name
        }
      }
      subtotal
      total
      itemCount
    }
  }
`;