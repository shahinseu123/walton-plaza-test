import { gql } from '@apollo/client';

export const GET_PRODUCTS_RESPONSE_FIELDS = gql`
  fragment GetProductsResponseFields on GetProductsResponse {
    message
    statusCode
    result {
      count
      products {
        ...ProductListingFields
      }
    }
  }
`;