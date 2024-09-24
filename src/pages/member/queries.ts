import gql from "graphql-tag";

export const sectionFragment = gql`
  fragment Section on SectionType {
    id
    name
    isPublished
    metadata {
      key
      value
    }
    backgroundImage {
      url
      alt
    }
    images(first: 20) {
      edges {
        node {
          url
          id
          alt
        }
      }
    }
  }
`;

export const sectionFragmentWithCollectionProducts = gql`
  fragment SectionWithCollectionProducts on SectionType {
    id
    name
    isPublished
    metadata {
      key
      value
    }
    backgroundImage {
      url
      alt
    }
    images(first: 20) {
      edges {
        node {
          url
          id
          alt
        }
      }
    }
    collections(first: 10) {
      totalCount
      edges {
        node {
          id
          name
          isPublished
          backgroundImage {
            url
            alt
          }
          metadata {
            value
            key
          }
          products(first: 12, sortBy: { direction: ASC, field: COLLECTION }) {
            edges {
              node {
                id
                name
                slug

                isAvailableForPurchase
                thumbnail2x: thumbnail(size: 510) {
                  url
                }
                category {
                  id
                  name
                  slug
                }
                defaultVariant {
                  id
                  sku
                  name
                  metadata {
                    key
                    value
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

                  quantityAvailable(countryCode: IN)
                  images {
                    id
                    url
                    alt
                    sortOrder
                  }
                  pricing {
                    onSale
                    priceUndiscounted {
                      gross {
                        amount
                        currency
                      }
                      net {
                        amount
                        currency
                      }
                    }
                    price {
                      gross {
                        amount
                        currency
                      }
                      net {
                        amount
                        currency
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const membershipPageQuery = gql`
  ${sectionFragment}
  query MembershipPageQuery {
    membership: section(first:1, name: "Membership Levels"){
      edges{
        node{
          ...Section
        }
      }
    }
  }
`;