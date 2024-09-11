import * as React from "react";

export enum OverlayType2 {
  cart = "cart",
  monthlypack = "monthlypack",
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
  pageExitWarning = "page-exit-warning",
}

export enum OverlayTheme2 {
  left = "left",
  right = "right",
  modal = "modal",
  bottom = "bottom", // Added
}

export interface InnerOverlayContextInterface2 {
  title?: string;
  content?: string | React.ReactNode;
  status?: "success" | "error";
  data?: any;
}

export type ShowOverlayType2 = (
  type: OverlayType2,
  theme?: OverlayTheme2,
  context?: InnerOverlayContextInterface2
) => void;

export interface OverlayContextInterface2 {
  type: OverlayType2 | null;
  theme: OverlayTheme2 | null;
  context: InnerOverlayContextInterface2;
  show: ShowOverlayType2;
  hide(): void;
}

/* tslint:disable:no-empty */
export const OverlayContext2 = React.createContext<OverlayContextInterface2>({
  context: null,
  hide: () => {},
  show: type => {},
  theme: null,
  type: null,
});
/* tslint:enable:no-empty */

OverlayContext2.displayName = "OverlayContext2";
