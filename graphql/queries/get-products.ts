import { gql } from '@apollo/client';

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