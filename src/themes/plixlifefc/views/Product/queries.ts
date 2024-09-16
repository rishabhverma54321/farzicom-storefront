import { TypedQuery } from "@temp/core/queries";
import { OffersList, OffersListVariables } from "./gqlTypes/OffersList";
import {
  CheckForDelivery,
  CheckForDeliveryVariables,
} from "./gqlTypes/CheckForDelivery";
import {
  ProductDetails,
  ProductDetailsVariables,
} from "./gqlTypes/ProductDetails";
import {
  ProductListQuery,
  ProductListQueryVariables,
} from "./gqlTypes/ProductListQuery";
import { VariantList, VariantListVariables } from "./gqlTypes/VariantList";
import { sectionFragment } from "../Home/queries";
import {
  CreateUpdatedProductReview,
  CreateUpdatedProductReviewVariables,
} from "./gqlTypes/CreateUpdatedProductReview";
import {
  ProductDetailsWithSection,
  ProductDetailsWithSectionVariables,
} from "./gqlTypes/ProductDetailsWithSection";
import { TypedMutation } from "../../../../core/mutations";
import {
  CreateProductReviewVariables,
  CreateProductReview,
} from "./gqlTypes/CreateProductReview";
import {
  CreateProductReviewImage,
  CreateProductReviewImageVariables,
} from "./gqlTypes/CreateProductReviewImage";
import gql from "graphql-tag";

export const priceFragment = gql`
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

export const basicProductFragment = gql`
  fragment BasicProductFields on Product {
    id
    name
    slug
    thumbnail {
      url
      alt
    }
    thumbnail2x: thumbnail(size: 510) {
      url
    }
    isAvailableForPurchase
  }
`;

export const productPricingFragment = gql`
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

export const selectedAttributeFragment = gql`
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

export const productVariantFragment = gql`
  ${priceFragment}
  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    isAvailable
    quantityAvailable(countryCode: IN)
    images {
      id
      url
      alt
      sortOrder
    }
    weight {
      unit
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

export const productDetailsShortQuery = gql`
  ${basicProductFragment}
  ${productVariantFragment}
  ${productPricingFragment}

  query ProductDetailsPlixNew($id: ID!, $metaFields: [String]) {
    product(id: $id, metaFields: $metaFields) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
      weight {
        unit
        value
      }
      metadata {
        key
        value
      }
      category {
        id
        name
        slug
      }
      images {
        id
        alt
        url
      }
      variants {
        ...ProductVariantFields
        metadata {
          key
          value
        }
      }
      seoDescription
      seoTitle
      isAvailable
      isAvailableForPurchase
      availableForPurchase
      defaultVariant {
        ...ProductVariantFields
      }
    }
  }
`;

export const productDetailsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}

  query ProductDetailsPlixNew($id: ID!, $metaFields: [String]) {
    product(id: $id, metaFields: $metaFields) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
      weight {
        unit
        value
      }
      metadata {
        key
        value
      }
      category {
        id
        name
        slug
      }
      images {
        id
        alt
        url
      }
      attributes {
        ...SelectedAttributeFields
      }
      variants {
        ...ProductVariantFields
        metadata: customMetaData {
          key
          value
        }
      }
      seoDescription
      seoTitle
      isAvailable
      isAvailableForPurchase
      availableForPurchase
      defaultVariant {
        ...ProductVariantFields
        metadata: customMetaData {
          key
          value
        }
      }
    }

    productReviews(
      product: $id
      first: 20
      isPublished: true
      sort: MOST_HELPFUL
    ) {
      totalCount
      edges {
        node {
          id
          review
          rating
          created
          adminReply
          title
          rated
          verified
          helpfulRatings
          isPublished
          publishedDate
          unhelpfulRatings
          userName
          user {
            id
            firstName
            lastName
          }
          images(first: 2) {
            edges {
              node {
                id
                url
                alt
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const productDetailsQueryNew = gql`

  query ProductDetailsPlixNew($id: ID!, $metaFields: [String]) {
    product(id: $id, metaFields: $metaFields) {
      id
      name
      slug
      thumbnail {
        url
        alt
      }
      thumbnail2x: thumbnail(size: 510) {
        url
      }
      isAvailableForPurchase
      pricing {
        onSale
        priceRangeUndiscounted {
          start {
            gross {
              amount
              currency
            }
            net {
              amount
              currency
            }
          }
          stop {
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
        priceRange {
          start {
            gross {
              amount
              currency
            }
            net {
              amount
              currency
            }
          }
          stop {
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
      descriptionJson
      weight {
        unit
        value
      }
      metadata {
        key
        value
      }
      category {
        id
        name
        slug
      }
      images {
        id
        alt
        url
      }
      attributes {
        attribute {
          id
          name
        }
        values {
          id
          name
        }
      }
      variants {
        id
        sku
        name
        isAvailable
        quantityAvailable(countryCode: IN)
        images {
          id
          url
          alt
          sortOrder
        }
        weight {
          unit
          value
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
        metadata: customMetaData {
          key
          value
        }
      }
      seoDescription
      seoTitle
      isAvailable
      isAvailableForPurchase
      availableForPurchase
      defaultVariant {
        id
        sku
        name
        isAvailable
        quantityAvailable(countryCode: IN)
        images {
          id
          url
          alt
          sortOrder
        }
        weight {
          unit
          value
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
        metadata: customMetaData {
          key
          value
        }
      }
    }

    productReviews(
      product: $id
      first: 20
      isPublished: true
      sort: MOST_HELPFUL
    ) {
      totalCount
      edges {
        node {
          id
          review
          rating
          created
          adminReply
          title
          rated
          verified
          helpfulRatings
          isPublished
          publishedDate
          unhelpfulRatings
          userName
          user {
            id
            firstName
            lastName
          }
          images(first: 2) {
            edges {
              node {
                id
                url
                alt
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const getProductReviewsNext = gql`
  query ProductReviewsNext(
    $product: ID!
    $first: Int!
    $rating: Int!
    $picture: Boolean!
    $after: String!
    $sort: ProductReviewSortOrders!
  ) {
    productReviews(
      product: $product
      first: $first
      isPublished: true
      pictures: $picture
      sort: $sort
      after: $after
      rating: $rating
    ) {
      edges {
        node {
          id
          review
          rating
          created
          publishedDate
          adminReply
          title
          rated
          verified
          helpfulRatings
          isPublished
          unhelpfulRatings
          userName
          user {
            id
            firstName
            lastName
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                alt
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const getProductReviewById = gql`
  query ProductReviewById($id: ID!) {
    productReview(id: $id) {
      adminReply
      id
      phone
      publishedDate
      rating
      review
      title
      userEmail
      userName
      user {
        email
      }
    }
  }
`;

export const productDetailsWithSectionQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  ${sectionFragment}
  query ProductDetailsWithSection(
    $id: ID!
    $sectionId: ID
    $sectionName: String
  ) {
    product(id: $id) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
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
        slug
        products(first: 3) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
              variants {
                ...ProductVariantFields
                metadata {
                  key
                  value
                }
              }
              metadata {
                key
                value
              }

              isAvailable
              isAvailableForPurchase
              availableForPurchase
            }
          }
        }
      }
      images {
        id
        alt
        url
      }
      attributes {
        ...SelectedAttributeFields
      }
      variants {
        ...ProductVariantFields
        metadata {
          key
          value
        }
      }
      seoDescription
      seoTitle
      isAvailable
      isAvailableForPurchase
      availableForPurchase
      defaultVariant {
        ...ProductVariantFields
        metadata {
          key
          value
        }
      }
    }
    section(first: 1, id: $sectionId, name: $sectionName) {
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

// FIXME: Check how to handle pagination of `productVariants` in the UI.
// We need allow the user view  all cart items regardless of pagination.
export const productVariantsQuery = gql`
  ${basicProductFragment}
  ${productVariantFragment}
  query VariantList($ids: [ID!]) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          ...ProductVariantFields
          metadata {
            key
            value
          }
          product {
            ...BasicProductFields
          }
        }
      }
    }
  }
`;

export const productOffersQuery = gql`
  query OffersList($productId: ID!) {
    productOffers(productId: $productId)
  }
`;

export const checkForDeliveryQuery = gql`
  query CheckForDelivery($pincode: String) {
    pincode(pin: $pincode) {
      pin
      city
      state
      serviceable
      created
      updated
      id
    }
  }
`;

export const productListQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ProductListQuery($first: Int, $ids: [ID]) {
    products(first: $first, filter: { ids: $ids }) {
      totalCount
      edges {
        node {
          ...BasicProductFields
          ...ProductPricingField
          descriptionJson
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
            slug
          }
          images {
            id
            alt
            url
          }
          attributes {
            ...SelectedAttributeFields
          }
          variants {
            ...ProductVariantFields
            metadata {
              key
              value
            }
          }
          seoDescription
          seoTitle
          isAvailable
          isAvailableForPurchase
          availableForPurchase

          defaultVariant {
            ...ProductVariantFields
            metadata {
              key
              value
            }
          }
        }
      }
    }
  }
`;

const createUpdatedProductReview = gql`
  mutation CreateUpdatedProductReview($id: ID!, $input: ProductReviewInput!) {
    CreateUpdatedProductReview: editProductReviewHash(id: $id, input: $input) {
      productReview {
        id
      }
      productReviewErrors {
        field
        message
        code
      }
    }
  }
`;

const createProductReview = gql`
  mutation CreateProductReview($input: ProductReviewInput!) {
    CreateProductReview: productReviewCreate(input: $input) {
      productReview {
        id
        user {
          firstName
        }
        userName
        userEmail
        product {
          name
          id
        }
        review
        rating
      }
    }
  }
`;

const createProductReviewImage = gql`
  mutation CreateProductReviewImage($input: ProductReviewImageCreateInput!) {
    CreateProductReviewImage: productReviewImageCreate(input: $input) {
      productReview {
        id
      }
      image {
        id
      }
      productErrors {
        field
        message
        code
      }
    }
  }
`;

export const TypedProductDetailQuery = TypedQuery<
  ProductDetails,
  ProductDetailsVariables
>(productDetailsQuery);

export const TypedProductDetailShortQuery = TypedQuery<
  ProductDetails,
  ProductDetailsVariables
>(productDetailsShortQuery);

export const TypedProductDetailWithSectionQuery = TypedQuery<
  ProductDetailsWithSection,
  ProductDetailsWithSectionVariables
>(productDetailsWithSectionQuery);

export const TypedProductVariantsQuery = TypedQuery<
  VariantList,
  VariantListVariables
>(productVariantsQuery);

export const TypedProductOffersQuery = TypedQuery<
  OffersList,
  OffersListVariables
>(productOffersQuery);

export const TypedCheckForDelivery = TypedQuery<
  CheckForDelivery,
  CheckForDeliveryVariables
>(checkForDeliveryQuery);

export const TypedProductListQuery = TypedQuery<
  ProductListQuery,
  ProductListQueryVariables
>(productListQuery);

export const TypedCreateProductReview = TypedMutation<
  CreateProductReview,
  CreateProductReviewVariables
>(createProductReview);

export const TypedCreateUpdatedProductReview = TypedMutation<
  CreateUpdatedProductReview,
  CreateUpdatedProductReviewVariables
>(createUpdatedProductReview);

export const TypedCreateProductReviewImage = TypedMutation<
  CreateProductReviewImage,
  CreateProductReviewImageVariables
>(createProductReviewImage);

export const productDetailsQueryWithSlug = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ProductDetailsWithSlug($slug: String) {
    product(slug: $slug) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
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
        slug
        products(first: 3) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
              variants {
                ...ProductVariantFields
              }
              defaultVariant {
                ...ProductVariantFields
              }
              metadata {
                key
                value
              }

              isAvailable
              isAvailableForPurchase
              availableForPurchase
            }
          }
        }
      }
      images {
        id
        alt
        url
      }
      attributes {
        ...SelectedAttributeFields
      }
      variants {
        ...ProductVariantFields
      }
      defaultVariant {
        ...ProductVariantFields
        metadata {
          key
          value
        }
      }
      seoDescription
      seoTitle
      isAvailable
      isAvailableForPurchase
      availableForPurchase
    }
  }
`;
