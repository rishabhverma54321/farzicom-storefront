import React from "react";
import { FormattedMessage } from "react-intl";
import PriceOfVariant from "@components/molecules/Price/PriceOfVariant";
import { Free } from "@components/organisms/CartRowIkkai/styles";
import { commonMessages } from "@temp/intl";
import { useStockHelpers } from "@hooks/useStockHelpers";
import ReactSVG from "react-svg";
import { CLIENT } from "Themes/config";
import Media from "react-responsive";
import { mediumScreen } from "@styles/constants";

import Gift from "images/gift.svg";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";
import { CachedImage } from "../CachedImage";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Row with product to display in cart summary.
 */
const CartSummaryRow: React.FC<IProps> = ({
  sku,
  name,
  price,
  quantity,
  thumbnail,
  categorySlug,
  product,
}: IProps) => {
  const { weightWithUnit } = useStockHelpers(product);
  switch (CLIENT) {
    case clients.PLIXLIFEFC: {
      const sizeAtt =
        product.variant &&
        product.variant.attributes &&
        product.variant.attributes.find(att => att.attribute.name === "Size");

      const currSize =
        sizeAtt &&
        sizeAtt.values.length &&
        sizeAtt.values[0] !== null &&
        sizeAtt.values[0].value;
      const packSize =
        currSize && currSize.split("__").length ? currSize.split("__")[0] : "";

      const variantImages = product.variant.images;
      const sortImages =
        variantImages &&
        variantImages
          .slice()
          .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1));

      const image =
        variantImages && variantImages.length
          ? sortImages[0].url
          : thumbnail?.url;
      return (
        <>
          <Media maxWidth={mediumScreen}>
            {categorySlug.includes("free-gift-products") ? (
              <S.Wrapper
                data-test="cartSummary"
                data-test-id={sku}
                style={{ marginTop: "5px", marginBottom: "5px" }}
              >
                <S.Photo>
                  <CachedImage data-test="image" url={image} />
                </S.Photo>
                <S.Data>
                  <S.ProductName data-test="name" style={{ color: "#000" }}>
                    {name} - {weightWithUnit}{" "}
                  </S.ProductName>
                  <S.Quantity>
                    <FormattedMessage {...commonMessages.quantity} />
                    {": "}
                    <span data-test="quantity">{quantity}</span>
                  </S.Quantity>
                  <S.PriceWrapper style={{ color: "#000" }}>
                    <PriceOfVariant variantPricing={product?.variant?.pricing} />
                  </S.PriceWrapper>

                  <Free>
                    {/* <StyledGiftIcon /> */}
                    {/* <Icon name="heart" /> */}
                    <ReactSVG path={Gift} />
                    Free
                  </Free>
                </S.Data>
              </S.Wrapper>
            ) : (
              <S.Wrapper
                data-test="cartSummary"
                data-test-id={sku}
                style={{ marginTop: "5px", marginBottom: "5px" }}
              >
                <S.Photo>
                  <CachedImage data-test="image" url={image} />
                </S.Photo>
                <S.Data>
                  <S.ProductName data-test="name" style={{ color: "#000" }}>
                    {name} {weightWithUnit}{" "}
                  </S.ProductName>
                  <S.Quantity margin="4px 0 0 0">{packSize}</S.Quantity>
                  <S.Quantity margin="4px 0 4px 0">
                    <FormattedMessage {...commonMessages.quantity} />
                    {": "}
                    <span data-test="quantity">{quantity}</span>
                  </S.Quantity>
                  <S.PriceWrapper style={{ color: "#000" }}>
                    <PriceOfVariant variantPricing={product?.variant?.pricing} />
                  </S.PriceWrapper>
                </S.Data>
              </S.Wrapper>
            )}
          </Media>
          <Media minWidth={mediumScreen}>
            {categorySlug.includes("free-gift-products") ? (
              <S.Wrapper
                data-test="cartSummary"
                data-test-id={sku}
                style={{ marginTop: "5px", marginBottom: "5px" }}
              >
                <S.Photo>
                  <CachedImage data-test="image" url={image} />
                </S.Photo>
                <S.Data>
                  <S.ProductNameandPriceWrapper style={{ color: "#000" }}>
                    <S.ProductName
                      data-test="name"
                      style={{ paddingRight: "1vw" }}
                    >
                      {name} - {weightWithUnit}{" "}
                    </S.ProductName>
                    <S.PriceWrapper style={{ margin: "0" }}>
                      <PriceOfVariant
                        variantPricing={product?.variant?.pricing}
                      />
                    </S.PriceWrapper>

                    <Free>
                      {/* <StyledGiftIcon /> */}
                      {/* <Icon name="heart" /> */}
                      <ReactSVG path={Gift} />
                      Free
                    </Free>
                  </S.ProductNameandPriceWrapper>
                  <S.Quantity>
                    <FormattedMessage {...commonMessages.quantity} />
                    {": "}
                    <span data-test="quantity">{quantity}</span>
                  </S.Quantity>
                </S.Data>
              </S.Wrapper>
            ) : (
              <S.Wrapper
                data-test="cartSummary"
                data-test-id={sku}
                style={{ marginTop: "5px", marginBottom: "5px" }}
              >
                <S.Photo>
                  <CachedImage data-test="image" url={image} />
                </S.Photo>
                <S.Data style={{ marginRight: "0" }}>
                  <S.ProductNameandPriceWrapper style={{ color: "#000" }}>
                    <S.ProductName
                      data-test="name"
                      style={{ paddingRight: "1vw" }}
                    >
                      {name} {weightWithUnit}{" "}
                    </S.ProductName>
                    <S.PriceWrapper style={{ margin: "0" }}>
                      <PriceOfVariant
                        variantPricing={product?.variant?.pricing}
                      />
                    </S.PriceWrapper>
                  </S.ProductNameandPriceWrapper>
                  <S.Quantity> {packSize}</S.Quantity>

                  <S.Quantity>
                    <FormattedMessage {...commonMessages.quantity} />
                    {": "}
                    <span data-test="quantity">{quantity}</span>
                  </S.Quantity>
                </S.Data>
              </S.Wrapper>
            )}
          </Media>
        </>
      );
    }
    default:
      if (categorySlug.includes("free-gift-products")) {
        return (
          <S.Wrapper data-test="cartSummary" data-test-id={sku}>
            <S.Photo>
              <CachedImage data-test="image" {...thumbnail} />
            </S.Photo>
            <S.Data>
              <S.Name data-test="name">
                {name} - {weightWithUnit}{" "}
              </S.Name>
              <S.PriceWrapper>
                <PriceOfVariant variantPricing={product?.variant?.pricing} />
              </S.PriceWrapper>

              <Free>
                {/* <StyledGiftIcon /> */}
                {/* <Icon name="heart" /> */}
                <ReactSVG path={Gift} />
                Free
              </Free>
              <S.Quantity>
                <FormattedMessage {...commonMessages.quantity} />
                {": "}
                <span data-test="quantity">{quantity}</span>
              </S.Quantity>
            </S.Data>
          </S.Wrapper>
        );
      }
      return (
        <S.Wrapper data-test="cartSummary" data-test-id={sku}>
          <S.Photo>
            <CachedImage data-test="image" {...thumbnail} />
          </S.Photo>
          <S.Data>
            <S.Name data-test="name">
              {name} {weightWithUnit}{" "}
            </S.Name>
            <S.PriceWrapper>
              <PriceOfVariant variantPricing={product?.variant?.pricing} />
            </S.PriceWrapper>

            <S.Quantity>
              <FormattedMessage {...commonMessages.quantity} />
              {": "}
              <span data-test="quantity">{quantity}</span>
            </S.Quantity>
          </S.Data>
        </S.Wrapper>
      );
      break;
  }
};

export { CartSummaryRow };
