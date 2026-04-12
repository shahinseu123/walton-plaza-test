export const PRODUCT_BASIC_FRAGMENT = `
  fragment ProductBasic on Product {
    uid
    enName
    images {
      url
    }
  }
`

export const PRODUCT_VARIANT_FRAGMENT = `
  fragment ProductVariant on Variant {
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
`;

export const PRODUCT_ATTRIBUTES_FRAGMENT = `
  fragment ProductAttributes on Product {
    productAttributes {
      enLabel
      values {
        enName
      }
    }
    detailedDescriptions {
      enLabel
      values {
        enName
      }
    }
    deliveries {
      enLabel
      values {
        enName
      }
    }
    serviceAndDeliveries {
      enLabel
      values {
        enName
      }
    }
    priceAndStocks {
      enLabel
      values {
        enName
      }
    }
  }
`;

export const PRODUCT_FULL_FRAGMENT = `
  ${PRODUCT_BASIC_FRAGMENT}
  ${PRODUCT_ATTRIBUTES_FRAGMENT}

  fragment ProductFull on Product {
    ...ProductBasic
    ...ProductAttributes
  }
`  
