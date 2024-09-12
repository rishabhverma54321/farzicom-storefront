import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
// import { Link } from "react-router-dom";

import { Icon } from "@components/atoms/Icon";
import PlusIcon from "@components/atoms/SvgIcons/PlixPlusNew";
import { CircularProgress } from "@mui/material";

import ReactSVG from "react-svg";

import GiftIcon from "images/gift.svg";
import TrashIcon from "@components/atoms/SvgIcons/TrashIcon";

import { commonMessages } from "@temp/intl";

import { getThisVariantPrice, getVariantPriceForFreeProduct } from "@components/molecules/ProductCardPlixlife/stockHelpers";
// import "./index.scss";
import {
  addToCartDataLayer,
  datalayerEventForByb,
  getItemCategoriesFromAttribute,
  getItemJourneyInfo,
  getMetadataValue,
  getPrices,
  getVariantAttributes,
  isBoxProduct,
  isGiftBoxProduct,
  isMember,
  parseJson,
} from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";
import NewAddToCartButton from "@components/molecules/NewAddToCartButton";
import MyCustomLink from "@components/next-react/MyCustomLink";
import {
  useAuthState,
  useCart,
  useCartState,
  useCheckoutState,
} from "@saleor/sdk";
import gtmConfig from "Themes/lib/gtmConfig.js";
import { getDBIdFromGraphqlId } from "@utils/core";
import { ShopMetaContext } from "@temp/pages/_app.page";
import ProductInfoPopUp from "@components/molecules/ProductInfoPopUp";
import * as S from "./styles";
import { IProps } from "./types";
import {
  generateProductUrl,
  getGraphqlIdFromDBId,
} from "../../../../core/utils";
import { checkoutDetails } from "@components/templates/AppHeader/queries";
import CardsContainer from "@components/organisms/CardsContainer";
import MemoStopwatch from "@components/atoms/SvgIcons/Stopwatch";
import MemoInfocircle from "@components/atoms/SvgIcons/Infocircle";
import MemoPopCloseIcon from "@components/atoms/SvgIcons/PopupcloseIcon";
import MemoCaretRightIcon from "@components/atoms/SvgIcons/CarratRightIcon";
import MemoCartPlusIcon from "@components/atoms/SvgIcons/CartPlusIcon";
import {
  OverlayContext2,
  OverlayTheme2,
  OverlayType2,
} from "@temp/components/Overlay2";
import { TypedProductDetailQuery } from "@temp/pages/product/[name]/queries";
import ProductDetailPopup from "../ProductDetailPopup";
import { OverlayTheme, OverlayType } from "@temp/components/Overlay/context";
import { ENABLE_GA4, META_DEFAULTS } from "@temp/themes/plixlifefc/config";
import { useMessageStateUpdate } from "@temp/MessageContext";

function mmatchPropsAreEqual(prevMatch, nextMatch) {
  return (
    prevMatch?.quantity === nextMatch?.quantity &&
    prevMatch?.freeProduct === nextMatch?.freeProduct &&
    prevMatch?.newQuantity === nextMatch?.newQuantity
  );
}

const CartRow: React.FC<IProps> = ({
  items,
  index,
  totalPrice,
  unitPrice,
  name,
  sku,
  showDiscount,
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
  newQuantity,
  freeProduct = false,
  quantityAndRemove = true,
  showMore = 0,
  handleShowMore,
  preventClickToPdp,
  isPersonalisedBox,
  discountedItemsBXGY
}: IProps) => {
  const { items: itemsFromCartState } = useCartState();
  const { user } = useAuthState();
  const { checkout,promoCodeDiscount } = useCheckoutState();
  const { addToCartRest } = useCart();
  const shopmetadata = useContext(ShopMetaContext);
  const { show } = useContext(OverlayContext2);
  const messageUpdate = useMessageStateUpdate();
  const memberShipProduct =
    getMetadataValue(shopmetadata, "membership_v3") &&
    parseJson(getMetadataValue(shopmetadata, "membership_v3"));
  const codChargeProductData =
    getMetadataValue(shopmetadata, "cod_charge_product") &&
    parseJson(getMetadataValue(shopmetadata, "cod_charge_product"));
  const isRecalculate =
    getMetadataValue(shopmetadata, "atc_recalculation") &&
    parseJson(getMetadataValue(shopmetadata, "atc_recalculation"));

  const [activeOrderSwitch, setactiveOrderSwitch] = useState(false);
  const isMemberShipProduct =
    memberShipProduct && memberShipProduct?.variantID == variant?.id;

  const isCodChargeProduct =
    codChargeProductData && codChargeProductData?.variantId == variant?.id;

  const codChargeProductDescriptionText =
    (variant?.product?.metadata &&
      getMetadataValue(variant?.product?.metadata, "cod_charge_description") &&
      parseJson(
        getMetadataValue(variant?.product?.metadata, "cod_charge_description")
      )) ||
    (variant?.metadata &&
      getMetadataValue(variant?.metadata, "cod_charge_description") &&
      parseJson(getMetadataValue(variant?.metadata, "cod_charge_description")));

  const variantConfig =
    getMetadataValue(variant?.metadata, "variant_config") &&
    parseJson(getMetadataValue(variant?.metadata, "variant_config"));

  const subscriptionProductData =
    metadata &&
    getMetadataValue(metadata, "subscription_data") &&
    parseJson(getMetadataValue(metadata, "subscription_data"));

  const productDescriptionText = isCodChargeProduct
    ? codChargeProductDescriptionText
    : null;

  const sortImages =
    variant.images &&
    variant.images
      .slice()
      .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1));

  const image = variant.images && variant.images.length
    ? sortImages[0].url
    : thumbnail?.url;

  const isBxGyData = variant?.product?.metadata
  const isBxGy = isBxGyData && 
  getMetadataValue(isBxGyData, "product_config") && 
  parseJson(getMetadataValue(isBxGyData, "product_config"));

  const [tempQuantity, setTempQuantity] = useState<string>(quantity.toString());
  const [isTooMuch, setIsTooMuch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalProps, setModalProps] = useState({
    modalOpen: false,
    modalStartPosition: null,
  });
  const intl = useIntl();

  const handleBlurQuantityInput = () => {
    let newQuantity = parseInt(tempQuantity, 10);

    if (isNaN(newQuantity) || newQuantity <= 0) {
      newQuantity = quantity;
    } else if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    }

    if (quantity !== newQuantity) {
      onQuantityChange(newQuantity, quantity, setLoading);
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

  const add = React.useCallback(() => {
    if (quantity < maxQuantity) {
      setLoading(true);
      addToCartRest(variant.id, 1, [], null, false, isRecalculate)
        .then(res => {
          if (res?.data?.lines.length) {
            const newQuantity = res?.data?.lines.find(
              (line: any) => line.variant.id === variant.id
            ).quantity;
            const errMsg = "Limited product stock!";
            if (newQuantity === quantity) {
              console.log("Error in adding to cart");
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // quantity < maxQuantity &&
    // onQuantityChange(quantity + 1, quantity, setLoading)
  }, [quantity]);
  const subtract = React.useCallback(
    () => quantity > 1 && onQuantityChange(quantity - 1, quantity, setLoading),
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
          message: intl.formatMessage(commonMessages.maxQtyIs, {
            maxQuantity,
          }),
        },
      ]
    : undefined;

  const productUrl =
    id &&
    variant?.product?.slug &&
    generateProductUrl(id, variant?.product?.name, variant?.product?.slug);
  const weightUnit = metadata?.filter(meta => meta?.key === "weight_unit")[0]
    ? metadata?.filter(meta => meta?.key === "weight_unit")[0].value
    : "GM";

  const weightWithUnit = `${weightValue} ${weightUnit.replace(/['"]+/g, "")}`;

  const { isAvailable } = variant;
  const { isAvailableForPurchase } = variant?.product
    ? variant?.product
    : { isAvailableForPurchase: false };

  // Upsell Product Properties

  const upsell_product =
    variant?.metadata &&
    getMetadataValue(variant?.metadata, "upsell_product") &&
    parseJson(getMetadataValue(variant?.metadata, "upsell_product")).length &&
    parseJson(getMetadataValue(variant?.metadata, "upsell_product"))[0];

  const freebie_product =
    variant?.metadata &&
    getMetadataValue(variant?.metadata, "freebie_includes") &&
    parseJson(getMetadataValue(variant?.metadata, "freebie_includes"));
    
  const freebie_quiz =
    variant?.metadata &&
    getMetadataValue(variant?.metadata, "freebie_with_quiz") &&
    parseJson(getMetadataValue(variant?.metadata, "freebie_with_quiz"));

  const upsell_headerText =
    variant?.metadata &&
    getMetadataValue(variant?.metadata, "upsell_headerText");

  const sortUpsellImages =
    upsell_product?.images &&
    upsell_product?.images.sort((prev, next) =>
      prev.sortOrder > next.sortOrder ? 1 : -1
    );

  const isItemInCart = (v_id: string) => {
    const itemExists = items.filter(item => item?.variant?.id === v_id);
    return !!itemExists.length;
  };
  const [upsellAdded, setUpsellAdded] = useState(
    upsell_product ? isItemInCart(upsell_product?.id) : false
  );
  const upsell_product_url =
    upsell_product?.product?.id &&
    upsell_product?.product?.name &&
    generateProductUrl(
      upsell_product?.product?.id,
      upsell_product?.product?.name,
      upsell_product?.product?.slug
    );
  const upsell_thumbnail = {
    ...upsell_product?.product?.thumbnail,
    alt: upsell_product?.product?.thumbnail?.alt || "",
  };

  const upsell_image =
    upsell_product?.images && upsell_product?.images.length
      ? sortUpsellImages[0].url
      : upsell_thumbnail?.url;

  const upsell_WeightUnit =
    upsell_product &&
    upsell_product?.product?.metadata?.filter(
      meta => meta?.key === "weight_unit"
    )[0]
      ? metadata?.filter(meta => meta?.key === "weight_unit")[0].value
      : "GM";

  const upsell_WeightWithUnit = `${
    upsell_product?.product?.weight?.value
  } ${upsell_WeightUnit.replace(/['"]+/g, "")}`;

  const getInitialTimerValue = () => {
    if (typeof window !== "undefined" && upsell_product) {
      const timeValue = localStorage.getItem(`${upsell_product.id}`);
      const diffInSecs = timeValue
        ? Math.round(
            (parseInt(timeValue) + 93 * 1000 - new Date().getTime()) / 1000
          )
        : 0;
      if (diffInSecs > 0) {
        return diffInSecs;
      }
    }
    return 0;
  };

  const [upsellTimer, setUpsellTimer] = useState<number>(
    getInitialTimerValue()
  );

  let interval_id = null;

  useEffect(() => {
    if (upsell_product) {
      const timeValue = localStorage.getItem(`${upsell_product.id}`);
      if (timeValue) {
        interval_id = setInterval(() => {
          const diffInSecs = Math.round(
            (parseInt(timeValue) + 93 * 1000 - new Date().getTime()) / 1000
          );
          if (diffInSecs > 0) {
            setUpsellTimer(diffInSecs);
          } else {
            setUpsellTimer(0);
            clearInterval(interval_id);
          }
        }, 1000);
      }
    }
    return () => {
      if (interval_id) {
        clearInterval(interval_id);
      }
    };
  }, []);

  const subscription_product_skus =
    checkout?.metadata &&
    getMetadataValue(checkout?.metadata, "subscription_skus") &&
    parseJson(getMetadataValue(checkout?.metadata, "subscription_skus"));

  const isSubscriptionProduct =
    Array.isArray(subscription_product_skus) &&
    subscription_product_skus.includes(variant.sku);

  const onUpsellAdd = () => {
    setUpsellAdded(true);
  };

  const Plus = (
    add: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    index?: number
  ) => (
    <S.Plus
      onClick={e => {
        if ((!e.detail || e.detail == 1) && !loading) {
          if (
            variant?.product?.category?.name === "Others also Liked Products" &&
            items.some(
              item =>
                item.variant.product.category?.name ===
                "Others also Liked Products"
            )
          ) {
            return;
          }
          const maxCapping = variantConfig?.variant_capping || null;
          if (
            quantity &&
            typeof maxCapping === "number" &&
            maxCapping < quantity + 1   // Adding +1 because assuming product adding before ATC
          ) {
            messageUpdate(
              `Maximum ${maxCapping} units of this product can be added`,
              "error"
            );
            return;
          }
          // Datalayer Event for quantity increase
          if (
            typeof window !== "undefined" &&
            window.dataLayer &&
            gtmConfig.addedToCart.enable
          ) {
            window.dataLayer.push({ ecommerce: null });
            window.dataLayer.push({
              event: gtmConfig.addedToCart.value,
              ecommerce: {
                currencyCode: "INR",
                add: {
                  products: [
                    {
                      name,
                      id: id ? getDBIdFromGraphqlId(id, "Product") : null,
                      price: variant?.pricing?.price?.gross?.amount,
                      brand: "Plixlife",
                      variant_name: variant?.name,
                      variant_id: variant?.id
                        ? getDBIdFromGraphqlId(variant?.id, "ProductVariant")
                        : null,
                      quantity: 1,
                      category: variant?.product?.category?.name,
                    },
                  ],
                },
              },
            });
          }
          // setLoading(true);
          add();
        }
        const itemJourneyInfo = getItemJourneyInfo(variant?.id);
        const sizeAttr = getVariantAttributes("Size", variant);
        const productVariantName = getVariantAttributes("Flavors", variant);
        const { listprice, discountedPrice, discountAmount } = getPrices(
          variant?.product,
          false,
          variant
        );
        const boxItems: any =
          getMetadataValue(checkout?.metadata, "byobItems") &&
          parseJson(getMetadataValue(checkout?.metadata, "byobItems"));

        const boxItemLines = boxItems?.filter(
          item => item?.boxItemSKU === variant?.sku
        )?.length
          ? boxItems?.filter(item => item?.boxItemSKU === variant?.sku)[0]
          : [];

        if (ENABLE_GA4) {
          const categories = getItemCategoriesFromAttribute(variant);
          const isMonthIncluded = categories?.sizeCategory2;
          if (
            typeof window !== "undefined" &&
            window.dataLayer &&
            gtmConfig.addToCart.enable
          ) {
            if (window.dataLayer) {
              window.dataLayer.push({ ecommerce: null });
            }
            if (giftBoxItemsProducts) {
              datalayerEventForByb(
                "add",
                variant,
                user,
                boxItemLines,
                "plus_icon"
              );
            } else {
              (window.dataLayer = window.dataLayer || []).push({
                event: gtmConfig.addToCart.value,
                user_ID: user?.id
                  ? getDBIdFromGraphqlId(user?.id, "User")
                  : undefined,
                user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
                membership_status: isMember(user)
                  ? "plix_club_member"
                  : "not_a_plix_club_member",
                cta_type: "plus_icon",
                ecommerce: {
                  currency: "INR",
                  value: variant?.pricing?.price?.gross?.amount,
                  items: [
                    {
                      item_name: variant?.product?.name,
                      item_id: id ? getDBIdFromGraphqlId(id, "Product") : null,
                      price: discountedPrice,
                      quantity: 1,
                      item_brand:
                        META_DEFAULTS.name === "plixlifefc"
                          ? "plixlife"
                          : META_DEFAULTS.name,
                      discount: discountAmount || 0,
                      currency: "INR",
                      item_variant: productVariantName,
                      item_category: variant?.product?.category?.name,
                      item_category2: isMonthIncluded
                        ? categories?.sizeCategory2
                        : "NA",
                      item_category3: categories?.sizeCategory1 || "NA",
                      item_category4: isMonthIncluded
                        ? "NA"
                        : categories?.sizeCategory2 || "NA",
                      item_list_name: itemJourneyInfo?.addedFrom || "NA",
                      item_list_id: itemJourneyInfo?.productListId || "NA",
                      index: "NA",
                    },
                  ],
                },
              });
            }
          }
        }
        // setLoading(true);
      }}
    >
      <div data-test="increaseButton">
        <Icon size={10} name="plus" />
      </div>
    </S.Plus>
  );
  const Minus = (
    subtract: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    tempQuantity: string,
    index?: number
  ) => (
    <S.Minus
      loading={loading}
      quantity={parseInt(tempQuantity, 10)}
      data-test="quantityControls"
      onClick={e => {
        if (
          parseInt(tempQuantity, 10) > 1 &&
          (!e.detail || e.detail == 1) &&
          !loading
        ) {
          // setLoading(true);
          // Datalayer Event for quantity decrease
          if (
            typeof window !== "undefined" &&
            window.dataLayer &&
            gtmConfig.removeFromCart.enable
          ) {
            window.dataLayer.push({ ecommerce: null });
            window.dataLayer.push({
              event: gtmConfig.removeFromCart.value,
              ecommerce: {
                currencyCode: "INR",
                remove: {
                  products: [
                    {
                      name,
                      id: id ? getDBIdFromGraphqlId(id, "Product") : null,
                      price: variant?.pricing?.price?.gross?.amount,
                      brand: "Plixlife",
                      variant_name: variant?.name,
                      variant_id: variant?.id
                        ? getDBIdFromGraphqlId(variant?.id, "ProductVariant")
                        : null,
                      quantity: 1,
                      category: variant?.product?.category?.name,
                    },
                  ],
                },
              },
            });
          }

          const itemJourneyInfo = getItemJourneyInfo(variant?.id);
          const categories = getItemCategoriesFromAttribute(variant);
          const isMonthIncluded = categories?.sizeCategory2
            ?.toLowerCase()
            ?.includes("month");
          const { listprice, discountedPrice, discountAmount } = getPrices(
            variant?.product,
            false,
            variant
          );
          const boxItems: any =
            getMetadataValue(checkout?.metadata, "byobItems") &&
            parseJson(getMetadataValue(checkout?.metadata, "byobItems"));

          const boxItemLines = boxItems?.filter(
            item => item?.boxItemSKU === variant?.sku
          )?.length
            ? boxItems?.filter(item => item?.boxItemSKU === variant?.sku)[0]
            : [];

          const productVariantName = getVariantAttributes("Flavors", variant);
          if (ENABLE_GA4) {
            if (
              typeof window !== "undefined" &&
              window.dataLayer &&
              gtmConfig.removeFromCartGa4.enable
            ) {
              window.dataLayer.push({ ecommerce: null });
              if (giftBoxItemsProducts) {
                datalayerEventForByb(
                  "remove",
                  variant,
                  user,
                  boxItemLines,
                  "minus"
                );
              } else {
                window.dataLayer.push({
                  event: gtmConfig.removeFromCartGa4.value,
                  user_ID: user?.id
                    ? getDBIdFromGraphqlId(user?.id, "User")
                    : undefined,
                  user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
                  membership_status: isMember(user)
                    ? "plix_club_member"
                    : "not_a_plix_club_member",
                  cta_type: "minus",
                  ecommerce: {
                    currency: "INR",
                    value: variant?.pricing?.price?.gross?.amount,
                    items: [
                      {
                        item_id: id
                          ? getDBIdFromGraphqlId(id, "Product")
                          : null,
                        item_name: name,
                        item_brand: "plixlife",
                        currency: "INR",
                        quantity: 1,
                        discount: discountAmount || 0,
                        item_category: variant?.product?.category?.name,
                        item_category2: isMonthIncluded
                          ? categories?.sizeCategory2
                          : "NA",
                        item_category3: categories?.sizeCategory1 || "NA",
                        item_category4: isMonthIncluded
                          ? "NA"
                          : categories?.sizeCategory2,
                        price: variant?.pricing?.price?.gross?.amount,
                        item_variant: productVariantName,
                        item_list_name: itemJourneyInfo?.addedFrom,
                        item_list_id: itemJourneyInfo?.productListId,
                      },
                    ],
                  },
                });
              }
            }
          }

          subtract();
        }
      }}
    >
      <div data-test="subtractButton">
        <Icon size={10} name="horizontal_line" />
      </div>
    </S.Minus>
  );

  // if (categorySlug === "free-gift-products") {
  //   return (
  //     <S.Container loading={false}>
  //       <S.Wrapper data-test="cartRow" data-test-id={sku}>
  //         <S.Photo>
  //           <CachedImage
  //             data-test="itemImage"
  //             url={image}
  //             imgixSizes="10vw"
  //             imageDimensions={{
  //               width: 80,
  //               height: 80,
  //             }}
  //           />
  //         </S.Photo>
  //         <S.Description>
  //           <S.Name data-test="itemName">{name}</S.Name>
  //           <S.Weight>{weightWithUnit}</S.Weight>

  //           <S.UnitPriceStrike>
  //             <p data-test="unitPrice">{unitPrice}</p>
  //           </S.UnitPriceStrike>

  //           <S.Free>
  //             {" "}
  //             {/* <StyledGiftIcon /> Free */}
  //             <ReactSVG path={"/src/images/gift.svg"} />
  //             Free
  //           </S.Free>

  //           <S.QuantityFree>Quantity: {tempQuantity}</S.QuantityFree>
  //         </S.Description>
  //       </S.Wrapper>
  //     </S.Container>
  //   );
  // }
  const timeOut = upsellTimer <= 0;

  const [popupstate, setpopupstate] = React.useState(false);

  // Personalised box products content
  let specificboxItem: any = {};
  const boxItems: any =
    items &&
    checkout &&
    getMetadataValue(checkout?.metadata, "byobItems") &&
    parseJson(getMetadataValue(checkout?.metadata, "byobItems"));

  // const personalisedBoxConfigNew =
  //   getMetadataValue(shopmetadata, "personalised_box_config_new") &&
  //   parseJson(getMetadataValue(shopmetadata, "personalised_box_config_new"));
  // let personalisedBoxConfigKey =
  //   personalisedBoxConfigNew &&
  //   Object.keys(personalisedBoxConfigNew)?.filter(
  //     item => personalisedBoxConfigNew[item]?.variant_id === variant?.id
  //   );
  let specificItem =
    (boxItems &&
      boxItems?.length &&
      boxItems?.filter(item => item?.boxItemSKU === variant?.sku)) ||
    [];

  specificboxItem = !!specificItem.length && specificItem[0];

  const boxItemstotalPrice =
    specificboxItem?.items &&
    specificboxItem?.items?.reduce((total, item) => {
      return total + Number(item?.price);
    }, 0);

  const giftBoxItemsProducts = isGiftBoxProduct(variant?.sku);

  const personlisedBoxPricing = {
    discounted: !giftBoxItemsProducts
      ? variant?.pricing?.price?.gross?.amount
      : Math.trunc(variant?.pricing?.price?.gross?.amount),
    undiscounted: boxItemstotalPrice,
  };

  const canShowPersonalisedBox =
    isPersonalisedBox &&
    boxItems &&
    Array.isArray(boxItems) &&
    Array.isArray(specificboxItem?.items);

  let showUpsellKnowmore;
  if (upsell_product) {
    showUpsellKnowmore = getMetadataValue(
      upsell_product?.metadata,
      "product_details"
    );
  }

  const variants_detail =
    getMetadataValue(metadata, "variants_details") &&
    parseJson(getMetadataValue(metadata, "variants_details"));

  const variantChangeHeaderText = variants_detail?.headerText;
  const variantHeaderSubText = variants_detail?.subHeaderText;

  const productdata = {
    id: id,
    flavours:
      attributes?.[0]?.attribute?.name == "Flavors"
        ? attributes?.[0]?.values[0]?.name
        : attributes?.[1]?.attribute?.name == "Flavors"
        ? attributes?.[1]?.values[0]?.name
        : null,
    concern:
      attributes?.[0]?.attribute?.name == "concern"
        ? attributes?.[0]?.values[0]?.name
        : attributes?.[1]?.attribute?.name == "concern"
        ? attributes?.[1]?.values[0]?.name
        : null,
    variantID: variant?.id,
    upsell_product: upsell_product,
    itemsFromCartState: itemsFromCartState,
    sku: sku,
    remove: onRemove,
    setloading: setLoading,
    switchPack: setactiveOrderSwitch,
    headerText: variantChangeHeaderText,
    metadata: metadata,
  };

  const variants_pack = variants_detail?.order_pack;
  // Adding this check for four variant attributes is an alternative solution because we cannot access the key 'product_variant' from product metadata here. (*seletedVariantConcern*)
  const seletedVariantConcern =
    attributes?.length == 4 &&
    attributes?.filter(a => a?.attribute?.name == "concern");
  const selectedVariantflavour = attributes?.filter(
    a => a.attribute.name == "Flavors"
  );
  let higherOrderKey =
    seletedVariantConcern[0]?.values[0]?.name ||
    selectedVariantflavour[0]?.values[0]?.name;

  let higherOrderText = "";
  let hightestKey =
    Array.isArray(variants_detail?.variants_order) &&
    variants_detail?.variants_order?.filter(
      item => item.name === higherOrderKey
    );
  let selectedVariantPack =
    Array.isArray(variants_pack) &&
    variants_pack?.filter(item => item?.name === higherOrderKey);

  if (
    Array.isArray(variants_detail?.variants_order) &&
    variants_detail?.variants_order &&
    hightestKey
  ) {
    if (hightestKey && hightestKey.length > 0) {
      higherOrderText = hightestKey[0]?.highestPack;
    }
  }
  const checkHigherVariantAvailabilty = () => {
    if (
      typeof Array.isArray(variants_pack) &&
      hightestKey &&
      selectedVariantPack
    ) {
      if (
        selectedVariantPack[0]?.sizes[
          selectedVariantPack[0]?.sizes?.length - 1
        ] === variant?.sku
      ) {
        return false;
      } else {
        return true;
      }
    }
  };
  const variantMetaData = variant && variant?.metadata
  const variantIsBxGyMetaData = variantMetaData && getMetadataValue(variantMetaData, "variant_config") &&
  parseJson(getMetadataValue(variantMetaData, "variant_config"));
  // console.log({name,variantIsBxGyMetaData, variant, variantMetaData})
  return (
    <>
      <div className="popup_wrapper_box">
        {popupstate && !upsellAdded && upsellTimer > 0 && (
          <ProductDetailPopup
            productdata={upsell_product}
            setpopupstate={setpopupstate}
            showTimer={true}
            upsellTimer={upsellTimer}
            upsell_product={upsell_product}
            upsell_image={upsell_image}
            onUpsellAdd={onUpsellAdd}
          />
        )}
      </div>
      <S.Container>
        {subscriptionProductData?.productCardData?.upperText &&
          isSubscriptionProduct && (
            <S.SubscriptionUpperText>
              {subscriptionProductData?.productCardData?.upperText}
            </S.SubscriptionUpperText>
          )}
        {subscriptionProductData?.productCardData?.lowerText &&
          isSubscriptionProduct && (
            <S.SubscriptionBottomText>
              {subscriptionProductData?.productCardData?.lowerText}
            </S.SubscriptionBottomText>
          )}
        {loading && (
          <div className="cart__loader">
            <CircularProgress color="inherit" />
          </div>
        )}
        {variant?.product?.category?.name === "Upsell Products" ? (
          <div className="upsell-tag-container">
            <S.UpsellTag margin="0.25rem 0.25rem">
              <span>Limited Time Deal</span>
            </S.UpsellTag>
          </div>
        ) : (
          <></>
        )}

        <S.Wrapper
          data-test="cartRow"
          data-test-id={sku}
          marginTop={isSubscriptionProduct ? "65px" : "10px"}
          marginBottom={isSubscriptionProduct ? "40px" : "10px"}
        >
          <S.Info>
            <S.Photo>
              <MyCustomLink
                href={productUrl}
                disable
                // onClick={e => {
                //   if (preventClickToPdp) {
                //     e.preventDefault();
                //   }
                // }}
              >
                <CachedImage
                  data-test="itemImage"
                  url={image}
                  imageDimensions={{
                    width: 80,
                    height: 80,
                  }}
                />
              </MyCustomLink>
            </S.Photo>
            <S.Description>
              <div style={{ width: "100%" }}>
                <MyCustomLink
                  href={productUrl}
                  disable
                  // onClick={e => {
                  //   if (preventClickToPdp) {
                  //     e.preventDefault();
                  //   }
                  // }}
                >
                  <S.Name data-test="itemName">{name} </S.Name>
                </MyCustomLink>
                {categorySlug === "free-gift-products" ||
                  categorySlug === "freebies-with-product" ||
                  isPersonalisedBox ? (
                  <></>
                ) : (
                  <S.Weight>
                    <span>
                    {
                      variant?.attributes
                        ?.filter(item => {
                          return (
                            item?.attribute?.slug === "size" ||
                            item?.attribute?.name === "Size"
                          );
                        })[0]
                        ?.values[0]?.name?.split("__")[0]
                    }
                    </span>
                  </S.Weight>
                )}
                {discountedItemsBXGY && isBxGy?.is_bxgy_product == true && variantIsBxGyMetaData?.isBxGy ? (
                  <S.BToGTo><button>{promoCodeDiscount?.voucherCode} Applied 🎉</button></S.BToGTo>
                ) : <></>}
                
                
              </div>
              <p>{productDescriptionText || ""}</p>
            </S.Description>
            {categorySlug === "free-gift-products" ||
            categorySlug === "freebies-with-product" ||
            isCodChargeProduct ? (
              <></>
            ) : (
              <S.Trash
                onClick={() => {
                  setLoading(true);
                  if(freebie_quiz?.enable && Array.isArray(freebie_quiz?.products) && freebie_quiz?.products?.length){
                    onRemove(setLoading, upsell_product?.id, itemsFromCartState,null, freebie_quiz?.products);
                  }else if(freebie_product?.enable && freebie_product?.variant_id){
                    onRemove(setLoading, upsell_product?.id, itemsFromCartState,freebie_product?.variant_id);
                  }else{
                    onRemove(setLoading, upsell_product?.id, itemsFromCartState)
                  }
                }}
              >
                <TrashIcon />
              </S.Trash>
            )}
          </S.Info>
          {canShowPersonalisedBox ? (
            <S.BoxItemList>
              {specificboxItem?.items &&
                Array.isArray(specificboxItem?.items) && (
                  <>
                    {specificboxItem?.items?.map(box => {
                      return (
                        <S.BoxItem key={box?.stepNumber}>
                          <span>Item {box.stepNumber}</span>
                          <S.BoxItemName>
                            {box?.name?.slice(0, 50)}
                            ...
                          </S.BoxItemName>
                        </S.BoxItem>
                      );
                    })}
                  </>
                )}
            </S.BoxItemList>
          ) : (
            <></>
          )}

          {quantityAndRemove ? (
            freeProduct ||
            categorySlug === "free-gift-products" ||
            categorySlug === "freebies-with-product" ||
            isCodChargeProduct ? (
              <>
                {" "}
                <S.Free>
                  {" "}
                  {/* <StyledGiftIcon /> Free */}
                  <div className="free-text-wrapper">
                    {" "}
                    {/* <ReactSVG path={GiftIcon} /> */}
                    <S.Price className="free-gift-products-price">
                      {getVariantPriceForFreeProduct(variant, showDiscount) }
                    </S.Price>
                  </div>
                  <S.QuantityFree>QTY: {tempQuantity}</S.QuantityFree>
                </S.Free>
              </>
            ) : (
              <>
                <S.Row>
                  {(quantityAndRemove && !isAvailableForPurchase) ||
                  !isAvailableForPurchase ? (
                    <S.ErrorMessage>Out of stock</S.ErrorMessage>
                  ) : categorySlug !== "upsell-products" &&
                    categorySlug !== "others-also-liked-products" &&
                    !isMemberShipProduct &&
                    (!isPersonalisedBox || giftBoxItemsProducts) ? (
                    <S.Quantity className="plixlife__QuntityField__div">
                      <S.QuntityField
                        name="quantity"
                        value={newQuantity}
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
                    </S.Quantity>
                  ) : (
                    <></>
                  )}
                  <S.Price
                    personalisedBox={isPersonalisedBox}
                    className="upsell-price-wrapper"
                  >
                    {isPersonalisedBox && personlisedBoxPricing
                      ? getThisVariantPrice(
                          variant,
                          showDiscount,
                          personlisedBoxPricing
                        )
                      : getThisVariantPrice(variant, showDiscount)}
                  </S.Price>
                </S.Row>
              </>
            )
          ) : (
            showMore > 0 && (
              <S.Row>
                <S.MoreButton
                  onClick={() => handleShowMore(true)}
                >{`+ ${showMore} more items`}</S.MoreButton>
              </S.Row>
            )
          )}
        </S.Wrapper>
      </S.Container>
      {variants_detail && checkHigherVariantAvailabilty() && (
        <div className="monthlypackoffer">
          <div className="threemonth_pack">
            <div className="offerlabel">
              <input
                type="radio"
                id={`monthpack-${variant?.id}`}
                value={`3 months pack-${variant?.id}`}
                onChange={e => {
                  setactiveOrderSwitch(true);
                  show(OverlayType2.monthlypack, OverlayTheme2.modal, {
                    data: productdata,
                  });
                }}
                checked={activeOrderSwitch}
              />
              <label htmlFor={`monthpack-${variant?.id}`}>
                <div>
                  {variantChangeHeaderText ||
                    `Switch to ${higherOrderText} pack`}{" "}
                  {variantHeaderSubText && <span>{variantHeaderSubText}</span>}
                </div>
                <p>
                  {/* <CachedImage
                  className="wb_sideicon"
                  url="https://plixlifefc-media.farziengineer.co/hosted/electric-light-bulb_1f4a1_1-5b19a4c0deb7.png"
                  isNextImage={true}
                  nextImageLayout="fill"
                  nextImageObjectFit="contain"
                /> */}
                  {variants_detail?.fact}
                </p>
              </label>
            </div>
          </div>
        </div>
      )}
      {upsell_product && !upsellAdded && !timeOut ? (
        <S.UpsellContainer>
          <S.UpsellHeader>
            {/* <div className="you-may-like">
                {upsell_headerText || "YOU MAY ALSO LIKE.."}
              </div> */}
            <div className="limited_time">Limited time deal</div>
            {upsellTimer && upsellTimer > 0 ? (
              <>
                <S.UpsellTimerTag>
                  <div className="timer">
                    <MemoStopwatch />
                  </div>
                  <span>
                    {Math.floor(upsellTimer / 60)}:{upsellTimer % 60} Left!
                  </span>
                  {/* <span>{upsellTimer} Left!</span> */}
                </S.UpsellTimerTag>
              </>
            ) : (
              <></>
            )}
          </S.UpsellHeader>
          <div className="offer_header">
            <div className="header_contemt">
              {upsell_headerText || "YOU MAY ALSO LIKE.."}
            </div>
            <div className="learn_more">
              <MemoInfocircle />
              <span onClick={() => setpopupstate(true)}>Learn</span>
            </div>
          </div>
          <S.UpsellInfo>
            <S.UpsellPhoto>
              <MyCustomLink
                href="/"
                disable
                // onClick={e => {
                //   if (preventClickToPdp) {
                //     e.preventDefault();
                //   }
                // }}
              >
                <CachedImage data-test="itemImage" url={upsell_image} />
              </MyCustomLink>
            </S.UpsellPhoto>
            <S.UpsellDescription>
              <div style={{ width: "100%" }}>
                <MyCustomLink href="/" disable>
                  <S.UpsellName data-test="itemName">
                    {upsell_product?.product?.name}
                  </S.UpsellName>
                </MyCustomLink>
                <S.UpsellWeight>
                  {upsell_product?.attributes
                    ?.filter(item => {
                      return (
                        item?.attribute?.slug === "size" ||
                        item?.attribute?.name === "Size"
                      );
                    })[0]
                    ?.values[0]?.name?.split("__")[0] || upsell_WeightWithUnit}
                </S.UpsellWeight>
              </div>
            </S.UpsellDescription>
          </S.UpsellInfo>
          <S.UpsellPriceAndButtonContainer>
            <S.UpsellPriceContainer>
              <p className="upsell-price-container">
                {getThisVariantPrice(upsell_product, (showDiscount = true))}
              </p>
            </S.UpsellPriceContainer>
            <NewAddToCartButton
              onSubmit={() => {
                onUpsellAdd();
              }}
              size="sm"
              itemAdded={upsellAdded}
              disabled={upsellAdded}
              fullyDisabled={timeOut}
              page=""
              productId={upsell_product?.product?.id}
              leftIcon={<PlusIcon />}
              ctTitle="upsell-product-cart"
              withIcons
              mainText="Add"
              variantId={upsell_product?.id}
              buttonClassName={
                !timeOut ? "atc-button-upsell" : "atc-button-upsell-disabled"
              }
              product={upsell_product?.product}
              productListId={"cart-upsell"}
              parentProducts={id}
            />
          </S.UpsellPriceAndButtonContainer>
        </S.UpsellContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default React.memo(CartRow, mmatchPropsAreEqual);
