import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { Icon } from "@components/atoms/Icon";
import { Loader } from "@components/atoms/Loader";
import { PriceShow } from "@components/atoms/PriceShow";

// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import CardGiftcardRoundedIcon from "@material-ui/icons/CardGiftcardRounded";
// import { withStyles } from "@material-ui/core/styles";
import ReactSVG from "react-svg";
import { useProductPriceNew } from "@hooks/useProductPriceNew";

// import Heart from "images/heart8.svg";
// import HeartFill from "images/heart7.svg";
import GiftIcon from "images/gift.svg";

import { CachedImage } from "@components/molecules/CachedImage";
import { commonMessages } from "@temp/intl";
// import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
// import { OverlayContext, } from "@temp/components";
// import { defaultTheme } from "@styles/themes";
// import { useStockHelpers } from "@hooks/useStockHelpers";
import { generateProductUrl } from "../../../../core/utils";
import { IProps } from "./types";
import * as S from "./styles";
import { getThisVariantPrice } from "./stockHelpers";
//FIXME:NextJs Make it a CSS module
//import "./index.scss";
const Minus = (
  subtract: () => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  tempQuantity: string,
  index?: number
) => (
  <S.Minus
    quantity={parseInt(tempQuantity, 10)}
    data-test="quantityControls"
    onClick={() => {
      if (parseInt(tempQuantity, 10) > 1) {
        setLoading(true);
        subtract();
      }
    }}
  >
    <div data-test="subtractButton">
      <Icon size={10} name="horizontal_line" />
    </div>
  </S.Minus>
);

/**
 * Product row displayed on cart page
 */

// export const StyledGiftIcon = withStyles({
//   root: {
//     width: "0.8rem",
//     height: "0.8rem",
//   },
// })(CardGiftcardRoundedIcon);

export const CartRow: React.FC<IProps> = ({
  index,
  totalPrice,
  unitPrice,
  name,
  slug,
  sku,
  quantity,
  maxQuantity,
  onQuantityChange,
  thumbnail,
  attributes = [],
  onRemove,
  id,
  categorySlug,
  weightValue,
  metadata,
  variant,
  quantityAndRemove = true,
  showMore = 0,
  handleShowMore,
  showVariantListPrice,
}: IProps) => {
  if (!name) {
    return <Loader />;
  }
  const [tempQuantity, setTempQuantity] = useState<string>(quantity.toString());
  const [isTooMuch, setIsTooMuch] = useState(false);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  // const { user } = useAuthState();
  // const overlay = useContext(OverlayContext);
  // const { show } = overlay;

  // const getItem = (id: string): boolean => {
  //   const itemsInWishlist = wishlistItems;
  //   const isItemInCart = itemsInWishlist
  //     ?.map((item: any) => {
  //       return item.id;
  //     })
  //     .findIndex((element: string) => element === id);
  //   if (isItemInCart === -1 || isItemInCart === undefined) return false;
  //   if (isItemInCart >= 0) return true;

  //   return false;
  // };

  // const [addedToWishlist, setaddedToWishlist] = useState(getItem(id));

  const handleBlurQuantityInput = () => {
    let newQuantity = parseInt(tempQuantity, 10);

    if (isNaN(newQuantity) || newQuantity <= 0) {
      newQuantity = quantity;
    } else if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    }

    if (quantity !== newQuantity) {
      onQuantityChange(newQuantity, quantity);
    }

    const newTempQuantity = newQuantity.toString();
    if (tempQuantity !== newTempQuantity) {
      setTempQuantity(newTempQuantity);
    }

    setIsTooMuch(false);
  };

  useEffect(() => {
    setTempQuantity(quantity.toString());
  }, [quantity]);

  useEffect(() => {
    // setTempQuantity(quantity.toString());
    setLoading(false);
  }, [tempQuantity]);

  const add = React.useCallback(
    () => quantity < maxQuantity && onQuantityChange(quantity + 1, quantity),
    [quantity]
  );
  const subtract = React.useCallback(
    () => quantity > 1 && onQuantityChange(quantity - 1, quantity),
    [quantity]
  );
  const handleQuantityChange = (evt: React.ChangeEvent<any>) => {
    // setLoading(true);
    const newQuantity = parseInt(evt.target.value, 10);

    setTempQuantity(evt.target.value);

    setIsTooMuch(!isNaN(newQuantity) && newQuantity > maxQuantity);
  };

  const quantityErrors = isTooMuch
    ? [
        {
          message: intl.formatMessage(commonMessages.maxQtyIs, { maxQuantity }),
        },
      ]
    : undefined;

  const productUrl = id && name && generateProductUrl(id, name, slug);

  // console.log("productUrl", productUrl, id, name, slug);
  const weightUnit = metadata?.filter(meta => meta?.key === "weight_unit")[0]
    ? metadata?.filter(meta => meta?.key === "weight_unit")[0].value
    : "GM";

  const weightWithUnit = `${weightValue || 50} ${weightUnit.replace(
    /['"]+/g,
    ""
  )}`;

  const listPriceArray =
    metadata && metadata.filter((item: any) => item.key === "listPrice");

  const listPrice =
    listPriceArray && listPriceArray.length > 0
      ? JSON.parse(listPriceArray[0].value)
      : null;

  // const { items } = useCart();

  const {
    // quantityAvailable: variantStock,
    pricing: variantPricing,
  } = variant;
  const { isAvailableForPurchase, pricing } = variant.product;
  const Plus = (
    add: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    index?: number
  ) => (
    <S.Plus
      onClick={() => {
        setLoading(true);
        add();
      }}
    >
      <div data-test="increaseButton">
        <Icon size={10} name="plus" />
      </div>
    </S.Plus>
  );

  // const { productPrice } = useStockHelpers(
  //   items,
  //   !!isAvailableForPurchase,
  //   id,
  //   variantStock,
  //   1,
  //   pricing,
  //   listPrice,
  //   variantPricing
  // );
  const percentDiscount = false;
  const productPrice = useProductPriceNew(
    pricing,
    listPrice,
    variantPricing,
    percentDiscount
  );

  if (categorySlug === "free-gift-products") {
    return (
      <S.Container loading={false}>
        <S.Wrapper data-test="cartRow" data-test-id={sku}>
          <S.Photo>
            <CachedImage data-test="itemImage" {...thumbnail} />
          </S.Photo>
          <S.Description>
            <S.Name data-test="itemName">{name}</S.Name>
            {/* <S.Weight>{weightWithUnit}</S.Weight> */}
            {/* 
            <S.Attributes data-test="itemAttributes">
              {attributes.map(({ attribute, values }, attributeIndex) => (
                <S.SingleAttribute key={attribute.id}>
                  <span
                    data-test="itemSingleAttribute"
                    data-test-id={attributeIndex}
                  >
                    <S.LightFont>{attribute.name}:</S.LightFont>{" "}
                    {values.map(value => value.name).join(", ")}
                  </span>
                </S.SingleAttribute>
              ))}
            </S.Attributes> */}

            <S.UnitPriceStrike>
              <p data-test="unitPrice">{unitPrice}</p>
            </S.UnitPriceStrike>

            <S.Free>
              {" "}
              {/* <StyledGiftIcon /> Free */}
              <ReactSVG path={GiftIcon} />
              Free
            </S.Free>

            <S.QuantityFree>Quantity: {tempQuantity}</S.QuantityFree>
          </S.Description>
        </S.Wrapper>
      </S.Container>
    );
  }

  return (
    <S.Container loading={loading}>
      <S.Wrapper data-test="cartRow" data-test-id={sku}>
        <S.Photo>
          <MyCustomLink href={productUrl}>
            <CachedImage data-test="itemImage" {...thumbnail} />
          </MyCustomLink>
        </S.Photo>
        <S.Description>
          <div style={{ width: "100%" }}>
            <MyCustomLink href={productUrl}>
              <S.Name data-test="itemName">{name} </S.Name>
            </MyCustomLink>
            <S.Weight>
              {weightValue
                ? weightUnit
                : variant?.attributes[0]?.values[0]?.value}
            </S.Weight>
            {/* 
          <S.Attributes data-test="itemAttributes">
            {attributes.map(({ attribute, values }, attributeIndex) => (
              <S.SingleAttribute key={attribute.id}>
                <span
                  data-test="itemSingleAttribute"
                  data-test-id={attributeIndex}
                >
                  <S.LightFont>{attribute.name}:</S.LightFont>{" "}
                  {values.map(value => value.name).join(", ")}
                </span>
              </S.SingleAttribute>
            ))}
          </S.Attributes> */}

            <S.Price>
              {/* <p data-test="unitPrice">{unitPrice}</p> */}
              <>
                {showVariantListPrice ? (
                  getThisVariantPrice(variant)
                ) : (
                  <PriceShow price={productPrice} alignMent="flex-start" />
                )}
              </>
            </S.Price>
          </div>

          {quantityAndRemove ? (
            <>
              <S.Row>
                {!isAvailableForPurchase ? (
                  <S.ErrorMessage>Out of stock</S.ErrorMessage>
                ) : (
                  <S.Quantity>
                    <S.QuntityField
                      name="quantity"
                      value={tempQuantity}
                      onBlur={handleBlurQuantityInput}
                      onChange={handleQuantityChange}
                      contentRight={Plus(add, setLoading, index)}
                      contentLeft={Minus(
                        subtract,
                        setLoading,
                        tempQuantity,
                        index
                      )}
                      errors={quantityErrors}
                    />
                    {/* <div>
                  <span>
                    {Minus(subtract, setLoading, tempQuantity, index)}
                  </span>
                  <span>{tempQuantity}</span>
                  <span>{Plus(add, setLoading, index)}</span>
                </div> */}
                  </S.Quantity>
                )}
                <S.Trash
                  onClick={() => {
                    setLoading(true);
                    onRemove();
                  }}
                >
                  REMOVE
                </S.Trash>
              </S.Row>
            </>
          ) : (
            showMore > 0 && (
              <S.Row>
                <S.MoreButton
                  onClick={() => handleShowMore(true)}
                >{`+ ${showMore} more items`}</S.MoreButton>
              </S.Row>
            )
          )}
        </S.Description>
      </S.Wrapper>
      {/* <S.Row>
        <S.Trash
          onClick={() => {
            //   if (addedToWishlist) removeItemInWishlist(id);
            //   addItemInWishlist(id);
            //   setaddedToWishlist(prev => !prev);
            // }}
            if (!user) {
              show(OverlayType.mobileNumberInput, OverlayTheme.modal);
            } else if (addedToWishlist) {
              removeItemInWishlist(id);
              setaddedToWishlist(prev => !prev);
            } else {
              setaddedToWishlist(prev => !prev);
              addItemInWishlist(id);
            }
          }}
          style={{
            color: addedToWishlist
              ? defaultTheme.colors.primaryDark
              : "#444444",
          }}
        >
          {addedToWishlist ? (
            // <FavoriteIcon
            //   fontSize="small"
            //   style={{
            //     fontSize: "16px",
            //     // color: addedToWishlist ? "red" : "#444444",
            //     color: defaultTheme.colors.primaryDark,
            //   }}
            // />
            <img src={HeartFill} alt="heart" width="16px" height="16px" />
          ) : (
            // <ReactSVG path={HeartFill} svgStyle={{ height: "16px" }} />
            // <Icon name="heart_filled" />
            // <Icon name="heart" size={16} />

            // <ReactSVG path={Heart} />
            <img src={Heart} alt="heart" width="16px" height="16px" />
          )}
          <div>WISHLIST</div>
        </S.Trash>
      </S.Row> */}
    </S.Container>
  );
};
