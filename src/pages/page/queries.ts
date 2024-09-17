import gql from "graphql-tag";

export const shopPageQuery = gql`
  query ShopPage {
    page(slug: "shop") {
      id
      contentJson
      seoDescription
      seoTitle
      slug
      title
      metadata {
        key
        value
      }
    }

    collectionList: section(first: 1, name: "Collection List") {
      edges {
        node {
          id
          name
          isPublished
          collections(first: 50) {
            totalCount
            edges {
              node {
                id
                name
                descriptionJson
                metadata {
                  value
                  key
                }
              }
            }
          }
        }
      }
    }
  }
`;

const basicProductFragment = gql`
  fragment BasicProductFields on Product {
    id
    name
    slug

    thumbnail2x: thumbnail(size: 510) {
      url
    }
    isAvailableForPurchase
  }
`;

const selectedAttributeFragment = gql`
  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
    }
    values {
      id
      name
    }
  }
`;

const priceFragment = gql`
  fragment Price on TaxedMoney {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
`;

const productVariantFragment = gql`
  ${priceFragment}
  fragment ProductVariantFieldsShop on ProductVariant {
    id
    sku
    name
    isAvailable
    quantityAvailable(countryCode: IN)

    images {
      id
      sortOrder
      alt
      url
    }

    weight {
      unit
      value
    }
    metadata {
      key
      value
    }
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    attributes {
      attribute {
        id
        name
        slug
        metadata {
          key
          value
        }
      }
      values {
        id
        name
        value: name
      }
    }
  }
`;

export const ShopNextProductsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  query ShopNextProducts($filter: ProductFilterInput, $first: Int) {
    products(
      first: $first
      filter: $filter
      sortBy: { direction: ASC, field: COLLECTION }
    ) {
      edges {
        node {
          ...BasicProductFields
          descriptionJson
          productType {
            id
            name
            slug
          }
          metadata {
            key
            value
          }
          weight {
            unit
            value
          }
          category {
            id
            name
          }

          attributes {
            ...SelectedAttributeFields
          }

          isAvailable
          isAvailableForPurchase
          availableForPurchase

          defaultVariant {
            ...ProductVariantFieldsShop
          }
        }
      }
      totalCount
    }
  }
`;

export const pagesListQuery = gql`
  query PagesList($first: Int, $last: Int, $after: String, $before: String) {
    pages(first: $first, last: $last, after: $after, before: $before) {
      totalCount
      edges {
        node {
          id
          slug
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const pagesDetailsQuery = gql`
  query pagesDetails($slug: String!) {
    page(slug: $slug) {
      contentJson
      id
      seoDescription
      seoTitle
      slug
      title
      metadata {
        key
        value
      }
    }
  }
`;
