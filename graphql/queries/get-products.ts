import { gql } from '@apollo/client';
import { PRODUCT_LISTING_FIELDS } from '../fragments/ProductFragments';

export const GET_PRODUCTS = gql`
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
  ${PRODUCT_LISTING_FIELDS}
`;