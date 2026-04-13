import { gql } from '@apollo/client';

// Basic product fields fragment
export const PRODUCT_BASIC_FIELDS = gql`
  fragment ProductBasicFields on Product {
    uid
    enName
    images {
      url
    }
  }
`;

// Product variant fragment
export const PRODUCT_VARIANT_FIELDS = gql`
  fragment ProductVariantFields on ProductVariant {
    mrpPrice
    ebsItemCode
    posItemCode
    quantity
    discount {
      amount
      value
      type
    }
  }
`;

// Complete product fields for listing
export const PRODUCT_LISTING_FIELDS = gql`
  fragment ProductListingFields on Product {
    uid
    enName
    images {
      url
    }
    variants {
      ...ProductVariantFields
    }
  }
  ${PRODUCT_VARIANT_FIELDS}
`;

// Complete product fields for detail page
export const PRODUCT_DETAIL_FIELDS = gql`
  fragment ProductDetailFields on Product {
    uid
    enName
    images {
      url
    }
    variants {
      ...ProductVariantFields
    }
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
  ${PRODUCT_VARIANT_FIELDS}
`;