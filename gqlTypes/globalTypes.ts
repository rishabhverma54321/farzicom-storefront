/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum AddressTypeType {
  ADDRESSTYPES_HOME = "ADDRESSTYPES_HOME",
  ADDRESSTYPES_OTHER = "ADDRESSTYPES_OTHER",
  ADDRESSTYPES_WORK = "ADDRESSTYPES_WORK",
}

/**
 * An enumeration.
 */
export enum BannerType {
  BANNERTYPES_CATEGORY = "BANNERTYPES_CATEGORY",
  BANNERTYPES_COLLECTION = "BANNERTYPES_COLLECTION",
  BANNERTYPES_HOME_PAGE = "BANNERTYPES_HOME_PAGE",
  BANNERTYPES_HOME_PAGE_SECONDARY = "BANNERTYPES_HOME_PAGE_SECONDARY",
  BANNERTYPES_PRODUCT = "BANNERTYPES_PRODUCT",
  BANNERTYPES_SALE = "BANNERTYPES_SALE",
}

export enum CollectionPublished {
  HIDDEN = "HIDDEN",
  PUBLISHED = "PUBLISHED",
}

/**
 * An enumeration.
 */
export enum GenericFormErrorCode {
  PHONE_NUMBER_INVALID = "PHONE_NUMBER_INVALID",
}

/**
 * An enumeration.
 */
export enum JobStatusEnum {
  DELETED = "DELETED",
  FAILED = "FAILED",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
}

/**
 * An enumeration.
 */
export enum OTPErrorCodeEnum {
  INVALID_OTP = "INVALID_OTP",
  INVALID_PHONE = "INVALID_PHONE",
}

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

/**
 * An enumeration.
 */
export enum OrderStatus {
  CANCELED = "CANCELED",
  DRAFT = "DRAFT",
  FULFILLED = "FULFILLED",
  PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED",
  UNFULFILLED = "UNFULFILLED",
}

/**
 * An enumeration.
 */
export enum PaymentChargeStatusEnum {
  CANCELLED = "CANCELLED",
  FULLY_CHARGED = "FULLY_CHARGED",
  FULLY_REFUNDED = "FULLY_REFUNDED",
  NOT_CHARGED = "NOT_CHARGED",
  PARTIALLY_CHARGED = "PARTIALLY_CHARGED",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
  PENDING = "PENDING",
  REFUSED = "REFUSED",
}

/**
 * An enumeration.
 */
export enum ProductErrorCode {
  ALREADY_EXISTS = "ALREADY_EXISTS",
  ATTRIBUTE_ALREADY_ASSIGNED = "ATTRIBUTE_ALREADY_ASSIGNED",
  ATTRIBUTE_CANNOT_BE_ASSIGNED = "ATTRIBUTE_CANNOT_BE_ASSIGNED",
  ATTRIBUTE_VARIANTS_DISABLED = "ATTRIBUTE_VARIANTS_DISABLED",
  DUPLICATED_INPUT_ITEM = "DUPLICATED_INPUT_ITEM",
  GRAPHQL_ERROR = "GRAPHQL_ERROR",
  INVALID = "INVALID",
  NOT_FOUND = "NOT_FOUND",
  NOT_PRODUCTS_IMAGE = "NOT_PRODUCTS_IMAGE",
  NOT_PRODUCTS_VARIANT = "NOT_PRODUCTS_VARIANT",
  REQUIRED = "REQUIRED",
  UNIQUE = "UNIQUE",
  VARIANT_NO_DIGITAL_CONTENT = "VARIANT_NO_DIGITAL_CONTENT",
}

export enum ProductOrderField {
  COLLECTION = "COLLECTION",
  DATE = "DATE",
  MINIMAL_PRICE = "MINIMAL_PRICE",
  DEFAULT_VARIANT_PRICE = "DEFAULT_VARIANT_PRICE",
  NAME = "NAME",
  PRICE = "PRICE",
  PUBLICATION_DATE = "PUBLICATION_DATE",
  PUBLISHED = "PUBLISHED",
  SEARCH_SOLD_SCORE = "SEARCH_SOLD_SCORE",
  TYPE = "TYPE",
}

export enum ProductReviewSortOrders {
  HIGHEST_RATING = "HIGHEST_RATING",
  LEAST_HELPFUL = "LEAST_HELPFUL",
  LOWEST_RATING = "LOWEST_RATING",
  MOST_HELPFUL = "MOST_HELPFUL",
  NEWEST = "PUBLISHED_DATE_NEWEST",
  OLDEST = "OLDEST",
}

/**
 * An enumeration.
 */
export enum RazorpayErrorCodeEnum {
  INVALID = "INVALID",
  INVALID_AMOUNT = "INVALID_AMOUNT",
  INVALID_CURRENCY = "INVALID_CURRENCY",
}

/**
 * An enumeration.
 */
export enum ReviewRatingType {
  HELPFUL = "HELPFUL",
  UNHELPFUL = "UNHELPFUL",
  UNMARK_HELPFUL = "UNMARK_HELPFUL",
  UNMARK_UNHELPFUL = "UNMARK_UNHELPFUL",
}

/**
 * An enumeration.
 */
export enum StatusTypes {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  PAUSED = "PAUSED",
}

export enum StockAvailability {
  IN_STOCK = "IN_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

/**
 * An enumeration.
 */
export enum SubscriptionErrorCode {
  INVALID = "INVALID",
  REQUIRED = "REQUIRED",
}

/**
 * An enumeration.
 */
export enum SubscriptionStatus {
  STATUSTYPES_ACTIVE = "STATUSTYPES_ACTIVE",
  STATUSTYPES_CANCELLED = "STATUSTYPES_CANCELLED",
  STATUSTYPES_PAUSED = "STATUSTYPES_PAUSED",
}

/**
 * An enumeration.
 */
export enum SurveyErrorCode {
  INVALID = "INVALID",
  NAME_REQUIRED = "NAME_REQUIRED",
  QUESTIONS_REQUIRED = "QUESTIONS_REQUIRED",
  REQUIRED = "REQUIRED",
  SURVEY_ALREADY_EXISTS = "SURVEY_ALREADY_EXISTS",
}

export enum TagFilter {
  AND = "AND",
  OR = "OR",
}

/**
 * An enumeration.
 */
export enum WalletLogType {
  ADD = "ADD",
  SUB = "SUB",
}

/**
 * An enumeration.
 */
export enum WeightUnitsEnum {
  G = "G",
  KG = "KG",
  LB = "LB",
  OZ = "OZ",
}

export interface AttributeInput {
  slug: string;
  value?: string | null;
  values?: (string | null)[] | null;
}

export interface CategoryFilterInput {
  search?: string | null;
  ids?: (string | null)[] | null;
}

export interface CollectionFilterInput {
  published?: CollectionPublished | null;
  search?: string | null;
  ids?: (string | null)[] | null;
}

export interface ContactUsInput {
  name: string;
  phone: string;
  email: string;
  meta?: any | null;
  queryType: string;
  message?: string | null;
}

export interface GenericFormInput {
  name: string;
  phone: string;
  email: string;
  responseBody: string;
}

/**
 * Single Influencer Details.
 */
export interface InfluencerInput {
  name: string;
  phone?: string | null;
  email: string;
  metadata?: string | null;
}

export interface IntRangeInput {
  gte?: number | null;
  lte?: number | null;
}

export interface MetadataInput {
  key: string;
  value: string;
}

/**
 * Single Notification Details
 */
export interface NotificationInput {
  productId: string;
  email: string;
  phone: string;
  name: string;
}

export interface PriceRangeInput {
  gte?: number | null;
  lte?: number | null;
}

export interface ProductFilterInput {
  isPublished?: boolean | null;
  collections?: (string | null)[] | null;
  categories?: (string | null)[] | null;
  hasCategory?: boolean | null;
  attributes?: (AttributeInput | null)[] | null;
  stockAvailability?: StockAvailability | null;
  productType?: string | null;
  stocks?: ProductStockFilterInput | null;
  search?: string | null;
  tags?: TagsListInput | null;
  price?: PriceRangeInput | null;
  discount?: IntRangeInput | null;
  rating?: IntRangeInput | null;
  minimalPrice?: PriceRangeInput | null;
  productTypes?: (string | null)[] | null;
  ids?: (string | null)[] | null;
}

export interface ProductOrder {
  direction: OrderDirection;
  attributeId?: string | null;
  field?: ProductOrderField | null;
}

export interface ProductReviewImageCreateInput {
  alt?: string | null;
  image: any;
  productReview: string;
}

export interface ProductReviewInput {
  productId?: string | null;
  userName?: string | null;
  title?: string | null;
  review?: string | null;
  rating: number;
  isPublished?: boolean | null;
  publishedDate?: any | null;
  verified?: boolean | null;
  userEmail?: string | null;
  phone?: string | null;
  encryptedToken?: string | null;
}

export interface ProductStockFilterInput {
  warehouseIds?: string[] | null;
  quantity?: IntRangeInput | null;
}

export interface RazorpayCreateOrderInput {
  checkoutId: string;
}

export interface SubscriptionInput {
  productId: string;
  userId: string;
  quantity: (string | null)[];
  status: StatusTypes;
}

export interface SurveyAnswerInput {
  question: string;
  answer: string;
}

export interface SurveyInput {
  name: string;
}

export interface SurveyQuestionInput {
  text: string;
  order?: number | null;
  required?: boolean | null;
}

export interface TagsListInput {
  tagsList?: (string | null)[] | null;
  filterType: TagFilter;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
