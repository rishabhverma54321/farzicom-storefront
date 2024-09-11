import * as React from "react";

export enum OverlayType {
  cart = "cart",
  lotusCart = "lotusCart",
  plixlifefcCart = "plixlifefcCart",
  CouponOffers = "CouponOffers",
  checkout = "checkout",
  login = "login",
  message = "message",
  sideNav = "side-nav",
  password = "password",
  search = "search",
  mainMenuNav = "main-menu-nav",
  modal = "modal",
  imageNav = "image-nav",
  register = "register",
  mobileNumberInput = "mobile-number-input",
  otpInput = "otp-input",
  youtubeVideoPlayer = "youtube-video-player",
  writeAReview = "write-a-review",
  viewMoreReview = "view-more-review",
  ingredientDetails = "ingredient-details",
  couponCode = "coupon-code",
  outOfStock = "out-of-stock",
  subscribe = "subscribe",
  yarnSideBar = "yarn-side-bar",
  yarnSetting = "yarn-setting",
  plixBottomFilter = "plix-bottom-filter", // Added
  cardOverlay = "card-overlay",
  couponList = "coupon-list",
  searchFiltersOverlay = "search-filters-overlay",
  searchSortList = "search-sort-list",
}

export enum OverlayTheme {
  left = "left",
  right = "right",
  modal = "modal",
  bottom = "bottom", // Added
}

export interface InnerOverlayContextInterface {
  title?: string;
  content?: string | React.ReactNode;
  status?: "success" | "error";
  data?: any;
  className?: string;
  disableHide?: boolean;
}

export type ShowOverlayType = (
  type: OverlayType,
  theme?: OverlayTheme,
  context?: InnerOverlayContextInterface
) => void;

export interface OverlayContextInterface {
  type: OverlayType | null;
  theme: OverlayTheme | null;
  context: InnerOverlayContextInterface;
  show: ShowOverlayType;
  hide(): void;
}

/* tslint:disable:no-empty */
export const OverlayContext = React.createContext<OverlayContextInterface>({
  context: null,
  hide: () => {},
  show: type => {},
  theme: null,
  type: null,
});
/* tslint:enable:no-empty */

OverlayContext.displayName = "OverlayContext";
