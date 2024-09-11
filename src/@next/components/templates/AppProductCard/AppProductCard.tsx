import React from "react";
import { CLIENT } from "Themes/config";
import { clients } from "gqlTypes/customGlobalTypes";
import dynamic from "next/dynamic";

// import { ProductCardIkkai } from "@components/molecules/ProductCardIkkai";
// import ProductCardNext from "@components/farzicom-ui-kit/ProductCard";

import {
  cardtag,
  ProductCardPlixlife,
} from "@components/molecules/ProductCardPlixlife";
import { ProductCardST } from "@components/molecules/ProductCardST";
import { useAuthState } from "@saleor/sdk";
import { ProductCardWizzy } from "@components/molecules/ProductCardWizzy";

export interface IAppProductCardProps {
  product: any;
  hoverBg?: boolean | undefined;
  showCart?: boolean;
  bg?: string;
  withATC?: boolean;
  isWishlist?: boolean;
  from?: string;
  ctTitle?: string;
  onSearchPage?: boolean;
  button?: boolean;
  hoverShadow?: string;
  priceUl?: boolean;
  productDetailPopup?: any;
  refetch?: (variables?: {}) => any;
  classname?: string;
  productCardClassname?: string;
  cardTag?: cardtag;
  productCardContainerClass?: string;
  preventClickToPdp?: boolean;
  searchTapProductCard?: boolean;
  wizzyProductCard?:boolean;
  buildYourBoxButtonProps?: {
    addtoBoxButtonText: string;
    addtoBoxOnClickHandler: (id: string, product?: any) => void;
    removeFromBoxButtonText: string;
    removeFromBoxClickHandler: (id: string, product?: any) => void;
    steps: { v_id: string; step_no: number }[];
    current_step_no: number;
  };
  showProductInfoPopup?: boolean;
  productDetailPopupOnImage?: boolean;
  popupstate?: any;
  productIndex?: number;
  parentProducts?: string;
  productListId?: string;
}

export const AppProductCard: React.FC<IAppProductCardProps> = ({
  hoverBg = false,
  showCart,
  product,
  bg,
  button,
  classname,
  ctTitle,
  from,
  hoverShadow,
  withATC,
  isWishlist,
  onSearchPage,
  priceUl,
  productCardClassname,
  productCardContainerClass,
  refetch,
  cardTag,
  preventClickToPdp,
  searchTapProductCard,
  wizzyProductCard,
  buildYourBoxButtonProps,
  productDetailPopup,
  showProductInfoPopup,
  popupstate,
  productIndex,
  parentProducts,
  productListId,
  productDetailPopupOnImage,
}) => {
  const { user } = useAuthState();
  const renderSwitch = () => {
    switch (CLIENT) {
      case clients.IKKAI:
        const ProductCardIkkai = dynamic(() =>
          import("@components/molecules/ProductCardIkkai")
        );
        return (
          <ProductCardIkkai
            withATC={withATC}
            product={product}
            from={from}
            ctTitle={ctTitle}
            isWishlist={isWishlist}
            refetch={refetch}
            onSearchPage={onSearchPage}
          />
        );

      case clients.BODY_FIRST:
        return (
          <div className={`productCardContainer ${productCardContainerClass}`}>
            <ProductCardPlixlife
              product={product}
              hoverBg={hoverBg}
              from={from}
              ctTitle={ctTitle}
              isWishlist={isWishlist}
              refetch={refetch}
              button={button}
              bg={bg}
              priceUl={priceUl}
              hoverShadow={hoverShadow}
              classname={productCardClassname}
              onSearchPage={onSearchPage}
              cardTag={cardTag}
            />
          </div>
        );
      case clients.PLIXLIFEFC:
        if (wizzyProductCard) {
          return (
            <div
              className={`productCardContainer ${productCardContainerClass}`}
            >
              <ProductCardWizzy
                product={product}
                hoverBg={hoverBg}
                from={from}
                ctTitle={ctTitle}
                isWishlist={isWishlist}
                refetch={refetch}
                button={button}
                bg={bg}
                priceUl={priceUl}
                hoverShadow={hoverShadow}
                classname={productCardClassname}
                onSearchPage={onSearchPage}
                cardTag={cardTag}
                preventClickToPdp={preventClickToPdp}
                parentProducts={parentProducts}
                productListId={productListId}
                index={productIndex}
              />
            </div>
          );
        }
        if (searchTapProductCard) {
          return (
            <div
              className={`productCardContainer ${productCardContainerClass}`}
            >
              <ProductCardST
                product={product}
                hoverBg={hoverBg}
                from={from}
                ctTitle={ctTitle}
                isWishlist={isWishlist}
                refetch={refetch}
                button={button}
                bg={bg}
                priceUl={priceUl}
                hoverShadow={hoverShadow}
                classname={productCardClassname}
                onSearchPage={onSearchPage}
                cardTag={cardTag}
                preventClickToPdp={preventClickToPdp}
                parentProducts={parentProducts}
                productListId={productListId}
                index={productIndex}
              />
            </div>
          );
        }
        return (
          <div className={`productCardContainer ${productCardContainerClass}`}>
            <ProductCardPlixlife
              product={product}
              hoverBg={hoverBg}
              from={from}
              showCart={showCart}
              ctTitle={ctTitle}
              isWishlist={isWishlist}
              refetch={refetch}
              button={button}
              bg={bg}
              priceUl={priceUl}
              hoverShadow={hoverShadow}
              productDetailPopupOnImage={productDetailPopupOnImage}
              classname={productCardClassname}
              onSearchPage={onSearchPage}
              productDetailPopup={productDetailPopup}
              cardTag={cardTag}
              preventClickToPdp={preventClickToPdp}
              buildYourBoxButtonProps={buildYourBoxButtonProps}
              showProductInfoPopup={showProductInfoPopup}
              popupstate={popupstate}
              parentProducts={parentProducts}
              productListId={productListId}
              index={productIndex}
            />
          </div>
        );

      case clients.WOWFC_NEW:
      case clients.BUY_WOW:
      default:
        const ProductCardNext = dynamic(() =>
          import("@components/farzicom-ui-kit/ProductCard")
        );
        return <ProductCardNext product={product} />;
    }
  };
  return <>{renderSwitch()}</>;
};
AppProductCard.displayName = "AppProductCard";
export default React.memo(AppProductCard);
