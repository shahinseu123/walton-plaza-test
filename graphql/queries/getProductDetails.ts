export const GET_PRODUCT_DETAILS = `
  query GetDetails($uid: String!) {
    getProducts(filter: { uid: $uid }, pagination: { skip: 0, limit: 1 }) {
      result {
        products {
          uid enName
          images { url }
          productAttributes { enLabel values { enName } }
          detailedDescriptions { enLabel values { enName } }
          deliveries { enLabel values { enName } }
          serviceAndDeliveries { enLabel values { enName } }
          variants { mrpPrice quantity discount { value } }
        }
      }
    }
  }
`;