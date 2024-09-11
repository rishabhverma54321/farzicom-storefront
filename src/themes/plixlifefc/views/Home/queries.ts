import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";

import {
  HomePageEntireQuery,
  HomePageEntireQueryVariables,
} from "./gqlTypes/HomePageEntireQuery";
import {
  SectionDetails,
  SectionDetailsVariables,
} from "./gqlTypes/SectionDetails";
import { BannerQuery } from "./gqlTypes/BannerQuery";
import { SubNavbarSectionQuery } from "./gqlTypes/SubNavbarSectionQuery";
import {
  SectionDetailsWithoutChildren,
  SectionDetailsWithoutChildrenVariables,
} from "./gqlTypes/SectionDetailsWithoutChildren";
import {
  SectionDetailsWithoutChildrenPlix,
  SectionDetailsWithoutChildrenPlixVariables,
} from "./gqlTypes/SectionDetailsWithoutChildrenPlix";
// import { basicProductFragment } from "../Product/queries";

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

export const productVariantFragmentHome = gql`
  ${priceFragment}
  fragment ProductVariantFieldsHome on ProductVariant {
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

export const productVariantFragmentHomeNew = gql`
  ${priceFragment}
  fragment ProductVariantFieldsHome on ProductVariant {
    id
    sku
    name
    isAvailable
    quantityAvailable(countryCode: IN)

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

const productPricingFragment = gql`
  ${priceFragment}
  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
      priceRange {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
    }
  }
`;

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

export const sectionFragmentWithCollectionWithoutProduct = gql`
  fragment SectionWithCollectionWithoutProducts on SectionType {
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
          slug
          isPublished
          backgroundImage {
            url
            alt
          }
          metadata {
            value
            key
          }
        }
      }
    }
  }
`;

export const sectionWithoutChildrenOptimized = gql`
  ${productVariantFragmentHomeNew}
  query sectionWithoutChildrenOptimized(
    $firstPage: Int!
    $id: ID
    $name: String
    $productMetafields: [String]
    $firstProducts: Int
    $afterCursor: String
  ) {
    section(first: $firstPage, id: $id, name: $name) {
      edges {
        node {
          id
          name
          isPublished
          backgroundImage {
            url
            alt
          }
          images(first: 10) {
            edges {
              node {
                url
                alt
                id
              }
            }
          }
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
                products(
                  first: $firstProducts
                  metaFields: $productMetafields
                  sortBy: { direction: ASC, field: COLLECTION }
                  after: $afterCursor
                ) {
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
                      metadata: customMetaData {
                        key
                        value
                      }
                      thumbnail2x: thumbnail(size: 510) {
                        url
                      }
                      defaultVariant {
                        ...ProductVariantFieldsHome
                      }
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
            }
          }
        }
      }
    }
  }
`;

export const collectionWithProducts = gql`
  query CollectionWithProductsPlix(
    $slug: String
    $id: ID
    $productMetafields: [String]
  ) {
    collection(slug: $slug, id: $id) {
      id
      name
      slug
      isPublished
      backgroundImage {
        url
        alt
      }
      metadata {
        value
        key
      }
      products(
        first: 12
        metaFields: $productMetafields
        sortBy: { direction: ASC, field: COLLECTION }
      ) {
        edges {
          node {
            id
            name
            slug

            isAvailableForPurchase
            thumbnail2x: thumbnail(size: 510) {
              url
            }
            metadata: customMetaData {
              key
              value
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
`;

export const TypedCollectionWithProducts = TypedQuery<any, any>(
  collectionWithProducts
);

export const homePageQuery = gql`
  query HomePageEntireQuery {
    shop {
      description
      name
    }
    banners(first: 10, isEnabled: true) {
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

export const bannerQuery = gql`
  query BannerQuery {
    banners(first: 10, isEnabled: true) {
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
  HomePageEntireQuery,
  HomePageEntireQueryVariables
>(homePageQuery);

export const TypedBannerQuery = TypedQuery<BannerQuery, {}>(bannerQuery);

export const section = gql`
  ${sectionFragment}
  query SectionDetails($firstPage: Int!, $id: ID, $name: String) {
    section(first: $firstPage, id: $id, name: $name) {
      edges {
        node {
          ...Section
          children(first: 20) {
            edges {
              node {
                ...Section
                children(first: 20) {
                  edges {
                    node {
                      ...Section
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

export const TypedSectionQuery = TypedQuery<
  SectionDetails,
  SectionDetailsVariables
>(section);

export const subNavbarSectionQuery = gql`
  query SubNavbarSectionQuery {
    section(first: 1, name: "Sub Navbar New") {
      edges {
        node {
          id
          name
          isPublished

          collections(first: 10) {
            edges {
              node {
                id
                name
                isPublished

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

export const TypedSubNavbarSectionQuery = TypedQuery<SubNavbarSectionQuery, {}>(
  subNavbarSectionQuery
);

export const sectionWithoutChildrenNew = gql`
  ${productVariantFragmentHome}
  query SectionDetailsWithoutChildrenPlixlife(
    $firstPage: Int!
    $id: ID
    $name: String
  ) {
    section(first: $firstPage, id: $id, name: $name) {
      edges {
        node {
          id
          name
          isPublished
          backgroundImage {
            url
            alt
          }
          images(first: 10) {
            edges {
              node {
                url
                alt
                id
              }
            }
          }
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
                products(
                  first: 100
                  sortBy: { direction: ASC, field: COLLECTION }
                ) {
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
                      thumbnail2x: thumbnail(size: 510) {
                        url
                      }
                      images {
                        url
                      }
                      defaultVariant {
                        ...ProductVariantFieldsHome
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

export const sectionWithoutChildren = gql`
  ${productVariantFragmentHome}
  query SectionDetailsWithoutChildrenPlixlife(
    $firstPage: Int!
    $id: ID
    $name: String
  ) {
    section(first: $firstPage, id: $id, name: $name) {
      edges {
        node {
          id
          name
          isPublished
          backgroundImage {
            url
            alt
          }
          images(first: 10) {
            edges {
              node {
                url
                alt
                id
              }
            }
          }
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
                products(
                  first: 10
                  sortBy: { direction: ASC, field: COLLECTION }
                ) {
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
                      thumbnail2x: thumbnail(size: 510) {
                        url
                      }
                      images {
                        url
                      }
                      defaultVariant {
                        ...ProductVariantFieldsHome
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

export const sectionWithCustomMetadataProducts = gql`
  ${productVariantFragmentHome}
  query SectionDetailsWithoutChildrenPlix(
    $firstPage: Int!
    $id: ID
    $name: String
    $productMetafields: [String]
  ) {
    section(first: $firstPage, id: $id, name: $name) {
      edges {
        node {
          id
          name
          isPublished
          backgroundImage {
            url
            alt
          }
          images(first: 10) {
            edges {
              node {
                url
                alt
                id
              }
            }
          }
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
                products(
                  first: 10
                  metaFields: $productMetafields
                  sortBy: { direction: ASC, field: COLLECTION }
                ) {
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
                      metadata: customMetaData {
                        key
                        value
                      }
                      thumbnail2x: thumbnail(size: 510) {
                        url
                      }
                      images {
                        url
                      }
                      defaultVariant {
                        ...ProductVariantFieldsHome
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

export const TypedSectionWithCustomMetadataProducts = TypedQuery<
  SectionDetailsWithoutChildrenPlix,
  SectionDetailsWithoutChildrenPlixVariables
>(sectionWithCustomMetadataProducts);

export const TypedSectionWithoutChildrenQuery = TypedQuery<
  SectionDetailsWithoutChildrenPlix,
  SectionDetailsWithoutChildrenPlixVariables
>(sectionWithoutChildren);

export const TypedSectionWithoutChildrenOptimized = TypedQuery<any, any>(
  sectionWithoutChildrenOptimized
);

export const homePageQueryNext = gql`
  ${sectionFragment}
  ${sectionFragmentWithCollectionProducts}
  ${sectionFragmentWithCollectionWithoutProduct}
  query HomePageQueryNextNew {
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
    quizSection: section(first: 1, name: "Quiz section") {
      edges {
        node {
          ...Section
        }
      }
    }
    subnavbarNew: section(first: 1, name: "Sub Navbar New") {
      edges {
        node {
          ...Section
        }
      }
    }

    brandLogosNew: section(first: 1, name: "Brand Logos New") {
      edges {
        node {
          ...Section
        }
      }
    }

    bestSellersNew: section(first: 1, name: "Best Sellers New") {
      edges {
        node {
          ...SectionWithCollectionWithoutProducts
        }
      }
    }

    nutritionBrand: section(first: 1, name: "Nutrition brand") {
      edges {
        node {
          ...Section
        }
      }
    }
    takeCare: section(first: 1, name: "Take care have fun") {
      edges {
        node {
          ...Section
        }
      }
    }
    pledgeTree: section(first: 1, name: "Pledge a tree") {
      edges {
        node {
          ...Section
        }
      }
    }
    rainingRewards: section(first: 1, name: "Raining rewards") {
      edges {
        node {
          ...Section
        }
      }
    }

    cleanLabel: section(first: 1, name: "CleanLabel") {
      edges {
        node {
          ...Section
        }
      }
    }

    plantBasedSupplimentsNew: section(
      first: 1
      name: "Plant based suppliments New"
    ) {
      edges {
        node {
          ...Section
        }
      }
    }
    nutritionistNew: section(first: 1, name: "Nutritionist New") {
      edges {
        node {
          ...Section
        }
      }
    }
    testimonialsNew: section(first: 1, name: "Testimonials New") {
      edges {
        node {
          ...SectionWithCollectionProducts
        }
      }
    }
    moneyBackGuarantee: section(first: 1, name: "Money Back Guarantee") {
      edges {
        node {
          ...Section
        }
      }
    }

    textStripNew: section(first: 1, name: "Text Strip New") {
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
          link
          type
          name
          created
          imageUrl
          imageMobileUrl
          position
        }
      }
    }
  }
`;
export const sectionWithCollection = gql`
  query SectionDetailsWithoutChildren(
    $firstPage: Int!
    $id: ID
    $name: String
  ) {
    section(first: $firstPage, id: $id, name: $name) {
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
export const TypedSectionWithCollectionQuery = TypedQuery<any, any>(
  sectionWithCollection
);
