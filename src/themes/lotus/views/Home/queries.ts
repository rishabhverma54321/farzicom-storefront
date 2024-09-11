import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";
import { ProductsList, ProductsListVariables } from "./gqlTypes/ProductsList";
import { Section, SectionVariables } from "./gqlTypes/Section";

export const homePageQuery = gql`
  query ProductsList($firstPage: Int!, $id: ID, $name: String) {
    shop {
      description
      name
      homepageCollection {
        id
        backgroundImage {
          url
        }
        name
      }
    }
    section(first: $firstPage, id: $id, name: $name) {
      edges {
        node {
          id
          name
          isPublished
          metadata {
            key
            value
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
                products(first: 30) {
                  edges {
                    node {
                      id
                      name
                      slug
                      category {
                        id
                        name
                        slug
                      }
                      isAvailableForPurchase
                      metadata {
                        key
                        value
                      }
                      thumbnail {
                        url
                        alt
                      }
                      thumbnail2x: thumbnail(size: 510) {
                        url
                        alt
                      }
                      images {
                        url
                      }
                      defaultVariant {
                        id
                        sku
                        name
                        metadata {
                          key
                          value
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
                      variants {
                        id
                        sku
                        name

                        quantityAvailable(countryCode: IN)
                        images {
                          id
                          url
                          alt
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

                      pricing {
                        priceRangeUndiscounted {
                          start {
                            net {
                              amount
                              currency
                            }
                            gross {
                              amount
                              currency
                            }
                          }
                          stop {
                            net {
                              amount
                              currency
                            }
                            gross {
                              amount
                              currency
                            }
                          }
                        }
                        priceRange {
                          start {
                            net {
                              amount
                              currency
                            }
                            gross {
                              amount
                              currency
                            }
                          }
                          stop {
                            net {
                              amount
                              currency
                            }
                            gross {
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
      }
    }

    banners(first: 20, isEnabled: true) {
      edges {
        node {
          id
          text
          type
          relatedId
          link
          name
          created
          imageUrl
          imageMobileUrl
          position
          isEnabled
        }
      }
    }
  }
`;

export const TypedHomePageQuery = TypedQuery<
  ProductsList,
  ProductsListVariables
>(homePageQuery);

export const section = gql`
  query Section($firstPage: Int!, $id: ID, $name: String) {
    section(first: $firstPage, id: $id, name: $name) {
      edges {
        node {
          id
          name
          isPublished
          metadata {
            key
            value
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
                products(first: 30) {
                  edges {
                    node {
                      id
                      name
                      slug
                      category {
                        id
                        name
                        slug
                      }
                      isAvailableForPurchase
                      metadata {
                        key
                        value
                      }
                      thumbnail {
                        url
                        alt
                      }
                      thumbnail2x: thumbnail(size: 510) {
                        url
                        alt
                      }
                      images {
                        url
                      }
                      variants {
                        id
                        sku
                        name

                        quantityAvailable(countryCode: IN)
                        images {
                          id
                          url
                          alt
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
                      defaultVariant {
                        id
                        sku
                        name
                        metadata {
                          key
                          value
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

                      pricing {
                        priceRangeUndiscounted {
                          start {
                            net {
                              amount
                              currency
                            }
                            gross {
                              amount
                              currency
                            }
                          }
                          stop {
                            net {
                              amount
                              currency
                            }
                            gross {
                              amount
                              currency
                            }
                          }
                        }
                        priceRange {
                          start {
                            net {
                              amount
                              currency
                            }
                            gross {
                              amount
                              currency
                            }
                          }
                          stop {
                            net {
                              amount
                              currency
                            }
                            gross {
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
      }
    }
  }
`;

export const TypedSectionQuery = TypedQuery<Section, SectionVariables>(section);

export const sectionFragment = gql`
  fragment Section on SectionType {
    id
    name
    isPublished
    metadata {
      key
      value
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
          products(first: 30) {
            edges {
              node {
                id
                name
                slug
                category {
                  id
                  name
                  slug
                }
                isAvailableForPurchase
                metadata {
                  key
                  value
                }
                thumbnail {
                  url
                  alt
                }
                thumbnail2x: thumbnail(size: 510) {
                  url
                  alt
                }
                images {
                  url
                }
                variants {
                  id
                  sku
                  name

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
                defaultVariant {
                  id
                  sku
                  name
                  metadata {
                    key
                    value
                  }
                  quantityAvailable(countryCode: IN)
                  images {
                    id
                    url
                    alt
                    sortOrder
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

                pricing {
                  priceRangeUndiscounted {
                    start {
                      net {
                        amount
                        currency
                      }
                      gross {
                        amount
                        currency
                      }
                    }
                    stop {
                      net {
                        amount
                        currency
                      }
                      gross {
                        amount
                        currency
                      }
                    }
                  }
                  priceRange {
                    start {
                      net {
                        amount
                        currency
                      }
                      gross {
                        amount
                        currency
                      }
                    }
                    stop {
                      net {
                        amount
                        currency
                      }
                      gross {
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

export const homePageQueryNext = gql`
  ${sectionFragment}
  query HomePageQueryNext {
    shop {
      description
      name
      homepageCollection {
        id
        backgroundImage {
          url
        }
        name
      }
    }
    subnavbar: section(first: 1, name: "subNavbar") {
      edges {
        node {
          ...Section
        }
      }
    }

    homePageIcons: section(first: 1, name: "Homepage Icons") {
      edges {
        node {
          ...Section
        }
      }
    }

    featuredCollections: section(first: 1, name: "Featured Collections") {
      edges {
        node {
          ...Section
        }
      }
    }

    ourOrganicRanges: section(first: 1, name: "Our Organic Ranges") {
      edges {
        node {
          ...Section
        }
      }
    }

    whatsNew: section(first: 1, name: "Whats New") {
      edges {
        node {
          ...Section
        }
      }
    }

    purestCare: section(first: 1, name: "The purest care for pure beauty") {
      edges {
        node {
          ...Section
        }
      }
    }

    byConcern: section(first: 1, name: "By Concern") {
      edges {
        node {
          ...Section
        }
      }
    }

    customersSay: section(first: 1, name: "What our customer’s say") {
      edges {
        node {
          ...Section
        }
      }
    }

    instagramShots: section(first: 1, name: "Instagram Shots") {
      edges {
        node {
          ...Section
        }
      }
    }

    reasonsToLove: section(first: 1, name: "Reasons To Love Us") {
      edges {
        node {
          ...Section
        }
      }
    }

    blogsSection: section(first: 1, name: "Blogs Section") {
      edges {
        node {
          ...Section
        }
      }
    }

    seedSection: section(first: 1, name: "Seed Section") {
      edges {
        node {
          ...Section
        }
      }
    }

    banners(first: 20, isEnabled: true) {
      edges {
        node {
          id
          text
          type
          relatedId
          link
          name
          created
          imageUrl
          imageMobileUrl
          position
          isEnabled
        }
      }
    }
  }
`;
