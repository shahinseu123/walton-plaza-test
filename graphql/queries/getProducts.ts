export const GET_PRODUCTS = `
  query GetProducts($skip: Int, $limit: Int) {
    getProducts(pagination: { skip: $skip, limit: $limit }
    ) {
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