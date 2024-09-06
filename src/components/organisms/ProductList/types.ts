// import { cardtag } from "@components/molecules";
import { cardtag } from "@components/molecules/ProductCardPlixlife";
import { Settings } from "react-slick";

interface CarouselProps extends Settings {
  arrowClassName?: string;
}
export interface IProps {
  products: any;
  canLoadMore?: boolean;
  loading?: boolean;
  showCart?: boolean;
  onLoadMore?: () => void;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;
  isCarousel: boolean;
  isWishlist?: boolean;
  withATC?: boolean;
  from?: string;
  ctTitle?: string;
  onSearchPage?: boolean;
  refetch?: any;
  productDetailPopup?: any;
  desktopCarouselProps?: Settings;
  tabCarouselProps?: Settings;
  mobileCarouselProps?: Settings;
  carouselProps?: CarouselProps;
  slidesToScroll?: number;
  slidesOnDesktop?: number;
  slidesOnMobile?: number;
  slidesOnTab?: number;
  button?: boolean;
  bg?: string;
  hoverShadow?: string;
  priceUl?: boolean;
  productCardClassname?: string;
  cardTag?: cardtag;
  productListClassname?: string;
  productCardContainerClass?: string;
  preventClickToPdp?: boolean;
  productsBeforeCarousel?: number;
  searchTapProductCard?: boolean;
  wizzyProductCard?:boolean;
  buildYourBoxButtonProps?: {
    addtoBoxButtonText: string;
    addtoBoxOnClickHandler: (id: string, product?: any) => void;
    removeFromBoxButtonText: string;
    removeFromBoxClickHandler: (id: string, product?: any, sku?:any) => void;
    steps: { v_id: string; step_no: number }[];
    current_step_no: number;
  };
  showProductInfoPopup?: boolean;
  parentProducts?: string;
  productListId?: string;
  disableVisibilitySensor?: boolean;
  productDetailPopupOnImage?: any;
  popupstate?: any;
}
