import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { Icon } from "@components/atoms/Icon";
import { Loader } from "@components/atoms/Loader";
import PriceOfVariant from "@components/molecules/Price/PriceOfVariant";
import ReactSVG from "react-svg";

import Gift from "images/gift.svg";

import { CachedImage } from "@components/molecules/CachedImage";
import { commonMessages } from "@temp/intl";
// import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { useStockHelpers } from "@hooks/useStockHelpers";
import { generateProductUrl } from "../../../../core/utils";
import { IProps } from "./types";
import * as S from "./styles";

const Minus = (
  subtract: () => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  tempQuantity: string
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

const Plus = (
  add: () => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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

/**
 * Product row displayed on cart page
 */

// export const StyledGiftIcon = withStyles({
//   root: {
//     width: "0.8rem",
//     height: "0.8rem",
//   },
// })(CardGiftcardRoundedIcon);

export const CartRowIkkai: React.FC<IProps> = ({
  index,
  unitPrice,
  name,
  sku,
  quantity,
  maxQuantity,
  onQuantityChange,
  thumbnail,
  onRemove,
  id,
  categorySlug,
  weightValue,
  metadata,
  variant,
  totalPrice,
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

  // const {
  //   items: wishlistItems,
  //   addItemInWishlist,
  //   removeItemInWishlist,
  // } = useWishlist();

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

  const add = React.useCallback(() => {
    onQuantityChange(quantity + 1, quantity);
  }, [quantity]);
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

  const productUrl = id && name && generateProductUrl(id, name);

  const { weightWithUnit } = useStockHelpers(variant.product);
  const { isAvailable } = variant;
  const { isAvailableForPurchase } = variant.product;

  if (
    categorySlug === "free-gift-products-2" ||
    categorySlug === "free-gift-products"
  ) {
    return (
      <S.Container loading={false}>
        <S.Wrapper data-test="cartRow" data-test-id={sku}>
          <S.Photo>
            <CachedImage data-test="itemImage" {...thumbnail} />
          </S.Photo>
          <S.Description>
            <S.Name data-test="itemName">
              {name} {weightWithUnit}{" "}
            </S.Name>
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

            <S.PriceWrapper>
              <PriceOfVariant variantPricing={variant.pricing} />
            </S.PriceWrapper>

            <S.Free>
              {" "}
              {/* <StyledGiftIcon /> Free */}
              <ReactSVG path={Gift} />
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
          <MyCustomLink href={productUrl}>
            <S.Name data-test="itemName">{name}</S.Name>
          </MyCustomLink>
          <S.Name>{weightWithUnit}</S.Name>
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

          <S.PriceWrapper>
            <PriceOfVariant variantPricing={variant.pricing} />
          </S.PriceWrapper>

          {!isAvailable || !isAvailableForPurchase ? (
            <S.ErrorMessage>Out of stock</S.ErrorMessage>
          ) : (
            <S.Row>
              <S.Quantity>
                <S.QuntityField
                  name="quantity"
                  value={tempQuantity}
                  onBlur={handleBlurQuantityInput}
                  onChange={handleQuantityChange}
                  contentRight={Plus(add, setLoading)}
                  contentLeft={Minus(subtract, setLoading, tempQuantity)}
                  errors={quantityErrors}
                />
              </S.Quantity>

              <S.Trash
                onClick={() => {
                  setLoading(true);
                  onRemove();
                }}
              >
                <Icon name="trash" size={16} />
                <p>Remove</p>
              </S.Trash>
            </S.Row>
          )}
        </S.Description>
      </S.Wrapper>
      {/* 
      <S.Row>
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
      </S.Row>
     */}
    </S.Container>
  );
};
