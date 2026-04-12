// graphql/queries/getProducts.ts
import { PRODUCT_BASIC_FRAGMENT } from "../fragments/ProductFragments";

export const GET_PRODUCTS = `
  ${PRODUCT_BASIC_FRAGMENT}
  
  query GetProducts(
    $skip: Int, 
    $limit: Int, 
    $filter: ProductFilterInput
  ) {
    getProducts(
      pagination: { skip: $skip, limit: $limit }
      filter: $filter
    ) {
      message
      statusCode
      result {
        count
        products {
          ...ProductBasic
          variants {
            mrpPrice
            quantity
            ebsItemCode
            posItemCode
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