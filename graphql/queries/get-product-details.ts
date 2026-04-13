import { gql } from '@apollo/client';

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: String!) {
    getProducts(
      filter: { uid: $id }
      pagination: { skip: 0, limit: 1 }
    ) {
      message
      statusCode
      result {
        products {
          uid
          enName
          images {
            url
          }
          variants {
            mrpPrice
            quantity
            discount {
              amount
              value
              type
            }
          }
        }
      }
    }
  }
`;