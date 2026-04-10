export const PRODUCT_FIELDS = `
  fragment ProductFields on Product {
    uid
    enName
    images { url }
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
`;