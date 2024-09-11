import {
  CartMethodsReturn,
  PriceFragment,
  UserFragment,
  CheckoutLine,
  ProductVariant,
  MetadataInputV2,
} from "@saleor/sdk";
// import {
//   SecondaryMenu_shop_navigation_secondary_items,
//   SecondaryMenu_shop_navigation_secondary_items_children,
// } from "@temp/components/FooterIkkai/gqlTypes/SecondaryMenu";
// import { MainMenu_shop_navigation_main_items } from "@temp/components/MainMenuIkkai/gqlTypes/MainMenu";
// import { MainMenuSubItem } from "@temp/components/MainMenuIkkai/gqlTypes/MainMenuSubItem";
import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
  generateProductUrl,
  getDBIdFromGraphqlId,
} from "@src/core/utils";
import parse from "html-react-parser";
import gtmConfig from "Themes/lib/gtmConfig";
import queryString from "query-string";
import {
  CLIENT,
  ENABLE_GA4,
  IMAGE_CDN,
  IMAGE_CDN_PROVIDERS,
  META_DEFAULTS,
} from "Themes/config";
import { clients, pages } from "@globalTypes/customGlobalTypes";
import makeClevertap from "Themes/lib/makeClevertap";
// import makeClevertap from "Themes/lib/makeClevertap.js";
// import clevertapEvents from "@temp/themes/plixlifefc/lib/clevertapEvents";
// import { client } from "@temp/clients";
// import { ORDER_COUNT_BY_PHONE } from "../../pages/order-placed/queries";

export const REFRESH_TOKEN = "refresh_token";
export const CSRF_TOKEN = "csrf_token";
export const SKIN_QUIZ_STATE = "skin_quiz_state";
export const WEIGHT_QUIZ_STATE = "weight_quiz_state";
export const HAIR_QUIZ_STATE = "hair_quiz_state"
export const RECENTLY_DELETED_PRODUCTS = "recently_deleted_products";

// export function maybe<T>(exp: () => T): T | undefined;
// export function maybe<T>(exp: () => T, d: T): T;
// export function maybe(exp: any, d?: any) {
//   try {
//     const result = exp();
//     return result === undefined ? d : result;
//   } catch {
//     return d;
//   }
// }

// export function filterNotEmptyArrayItems<TValue>(
//   value: TValue | null | undefined
// ): value is TValue {
//   return value !== null && value !== undefined;
// }

export function getMetadataValue<T>(
  metadata: any,
  key: string,
  alternateValue?: string | number
): string | null {
  if (metadata) {
    const metaValue = metadata?.filter(
      (meta: { key: string }) => meta?.key === key
    )[0]?.value;
    if (!metaValue && alternateValue !== undefined && alternateValue !== null)
      return alternateValue.toString();
    return metaValue;
  }
  return null;
}

export const getUrlWithParams = (url: string, params: object = {}) => {
  let href = url;
  if (typeof window !== "undefined" && !!location?.search) {
    let parsedSearch = queryString.parse(location.search);
    if (typeof params === "object" && Object.keys(params)?.length) {
      let parsedQuery = { ...parsedSearch, ...params };
      let stringifiedQuery = queryString.stringify(parsedQuery);
      href = `${href}?${stringifiedQuery}`;
    } else {
      href = `${href}${location?.search}`;
    }
  } else if (typeof params === "object" && Object.keys(params).length > 0) {
    const stringifiedParams = queryString.stringify(params);
    href = `${href}?${stringifiedParams}`;
  }
  return href;
};

export const imageURLReplaceWithCDN = (imageURL: string | null) => {
  if (imageURL && IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN) {
    return imageURL.replace(
      IMAGE_CDN_PROVIDERS[IMAGE_CDN].mediaBucketURL,
      IMAGE_CDN_PROVIDERS[IMAGE_CDN].cdnSourceURL
    );
  }
  if (imageURL) return imageURL;
  return "";
};

// export const getMenuUrl = (
//   item:
//     | MainMenu_shop_navigation_main_items
//     | MainMenuSubItem
//     | SecondaryMenu_shop_navigation_secondary_items
//     | SecondaryMenu_shop_navigation_secondary_items_children
// ) => {
//   const { url, category, collection, page } = item;
//   if (url) {
//     return url;
//   }
//   if (category) {
//     return generateCategoryUrl(category.id, category.name);
//   }
//   if (collection) {
//     return generateCollectionUrl(collection.id, collection.name);
//   }
//   if (page) {
//     return generatePageUrl(page.slug);
//   }
// };

// export const preserveTimestamp = (product_item: any, variant_id: string) => {
//   const variants: [] = product_item?.variants;
//   const currentVariant = variants
//     ? variants.find((v: any) => v.id === variant_id)
//     : product_item?.defaultVariant;
//   const upsell_product =
//     currentVariant?.metadata &&
//     getMetadataValue(currentVariant?.metadata, "upsell_product") &&
//     parseJson(getMetadataValue(currentVariant?.metadata, "upsell_product"))
//       .length &&
//     parseJson(getMetadataValue(currentVariant?.metadata, "upsell_product"))[0];
//   if (upsell_product) {
//     localStorage.setItem(`${upsell_product.id}`, `${Date.now()}`);
//   }
// };

// export const isUrl = (string: string) => {
//   try {
//     return Boolean(new URL(string));
//   } catch (e) {
//     return false;
//   }
// };

// export const trimUrl = (url: string) => {
//   if (
//     typeof window !== "undefined" &&
//     typeof url === "string" &&
//     url &&
//     url?.includes(window.location?.origin)
//   ) {
//     let newUrl = url?.replace(window?.location?.origin, "");
//     return newUrl;
//   }
//   return url;
// };

export const createTaxedPriceFromAmount = (
  amount: number | string,
  currency: string = "INR"
): PriceFragment => {
  const actualAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return {
    gross: {
      amount: actualAmount || 0,
      currency,
    },
    net: {
      amount: actualAmount || 0,
      currency,
    },
  };
};

export const useImageURLReplaceWithCDN = (imageURL: string | null) => {
  if (imageURL && IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN) {
    return imageURL.replace(
      IMAGE_CDN_PROVIDERS[IMAGE_CDN].mediaBucketURL,
      IMAGE_CDN_PROVIDERS[IMAGE_CDN].cdnSourceURL
    );
  }
  if (imageURL) return imageURL;
  return "";
};

export const filterOnKey = (
  array: Array<{ key: string; value: string }>,
  key: string
) => {
  if (array && array.length) {
    const filteredResult = array.filter(item => item.key === key);

    return filteredResult && filteredResult.length
      ? filteredResult[0].value
      : "";
  }

  return "";
};

export const removeItemFromLinesJourney = v_id => {
  try {
    const itemsWithJourneyInfo =
      localStorage.getItem("lines_journey_info") &&
      JSON.parse(localStorage.getItem("lines_journey_info"));
    if (Array.isArray(itemsWithJourneyInfo)) {
      const updatedItems = itemsWithJourneyInfo?.filter(
        item => item?.variant_id !== v_id
      );
      localStorage.setItem("lines_journey_info", JSON.stringify(updatedItems));
    }
  } catch (err) {
    console.log("Error in updated lines_journey_info", err);
  }
};

export const membershipDiscountData: any = (metaDataValue: any, key: any) => {
  const membership =
    metaDataValue && Array.isArray(metaDataValue)
      ? metaDataValue?.filter(item => item?.discount_rule === key)
      : [];
  return membership;
};

export const trackItemsJourney = (
  items,
  addedItemId: string,
  parentProduct: string,
  addedFrom: string,
  productListId?: string
) => {
  try {
    if (typeof window !== "undefined" && addedItemId) {
      const prevItemsWithJourneyInfo =
        localStorage.getItem("lines_journey_info") &&
        JSON.parse(localStorage.getItem("lines_journey_info"));

      const itemJourneyInfo = items?.map(item => {
        if (item?.variant?.id === addedItemId) {
          const prevparentProducts =
            (prevItemsWithJourneyInfo &&
              Array.isArray(prevItemsWithJourneyInfo) &&
              prevItemsWithJourneyInfo?.find(i => i?.variant_id === addedItemId)
                ?.parentProducts) ||
            [];

          const updatedParentProducts = parentProduct
            ? [...prevparentProducts, parentProduct]
            : prevparentProducts;

          const prevProductListIds =
            (prevItemsWithJourneyInfo &&
              Array.isArray(prevItemsWithJourneyInfo) &&
              prevItemsWithJourneyInfo?.find(i => i?.variant_id === addedItemId)
                ?.productListId) ||
            [];

          const updatedProductListIds = productListId
            ? [...prevProductListIds, productListId]
            : prevProductListIds;

          const prevAddedFrom =
            (prevItemsWithJourneyInfo &&
              Array.isArray(prevItemsWithJourneyInfo) &&
              prevItemsWithJourneyInfo?.find(i => i?.variant_id === addedItemId)
                ?.addedFrom) ||
            [];

          const updatedAddedFrom = addedFrom
            ? [...prevAddedFrom, addedFrom]
            : addedFrom;
          return {
            variant_id: item?.variant?.id,
            quantity: item?.quantity,
            parentProducts: updatedParentProducts,
            addedFrom: updatedAddedFrom,
            productListId: updatedProductListIds,
          };
        }

        const isItemAlreadyAdded =
          prevItemsWithJourneyInfo &&
          Array.isArray(prevItemsWithJourneyInfo) &&
          prevItemsWithJourneyInfo?.find(
            i => i.variant_id === item?.variant?.id
          );
        if (isItemAlreadyAdded) {
          return {
            variant_id: item?.variant?.id,
            quantity: item?.quantity,
            parentProducts: isItemAlreadyAdded?.parentProducts,
            addedFrom: isItemAlreadyAdded?.addedFrom,
            productListId: isItemAlreadyAdded?.productListId,
          };
        }
      });
      console.log("lines_journey_info", itemJourneyInfo);
      localStorage.setItem(
        "lines_journey_info",
        JSON.stringify(itemJourneyInfo)
      );
    }
  } catch (err) {
    console.log("Error in storing items journey info", err);
  }
};

export const getItemJourneyInfo = variant_id => {
  try {
    const itemsWithJourneyInfo =
      localStorage.getItem("lines_journey_info") &&
      parseJson(localStorage.getItem("lines_journey_info"));
    if (Array.isArray(itemsWithJourneyInfo)) {
      let requiredItem = itemsWithJourneyInfo?.find(
        item => item.variant_id == variant_id
      );
      if (requiredItem) {
        requiredItem = {
          ...requiredItem,
          productListId: requiredItem?.productListId?.slice(0, 1)?.join(","),
          addedFrom: requiredItem?.addedFrom
            ?.slice(0, 1)
            ?.map(addedfrom => getItemListName(addedfrom))
            ?.join(","),
        };
      }
      return requiredItem;
    }
  } catch (err) {
    console.log("Error in updated lines_journey_info", err);
  }
};

export const addToCartDataLayer = (
  res: CartMethodsReturn,
  product: any,
  variantId: string,
  selectedVariantProvided?: any,
  ctTitle?: string | null,
  user?: UserFragment,
  productListId?: string,
  cta_type?: string,
  parentProducts?: string,
  index?: number,
  cta_position?: string
) => {
  console.log("indexinmisc", index);
  const selectedVariant =
    selectedVariantProvided?.variant ||
    product?.variants?.filter((variant: any) => variant?.id === variantId)[0];

  const productMetadata = product?.metadata;
  const productDetails =
    getMetadataValue(productMetadata, "product_details") &&
    JSON.parse(getMetadataValue(productMetadata, "product_details"));

  const manufacturedBy = filterOnKey(
    productDetails?.product_information,
    "Manufactured By"
  );

  const countryOfOrigin = filterOnKey(
    productDetails?.product_information,
    "Country of origin"
  );

  const checkoutMetadata = res?.data?.metadata;
  const variantMetadata = selectedVariant?.metadata;

  const trackingId = getMetadataValue(checkoutMetadata, "tracking_id");
  const salePrice = getMetadataValue(variantMetadata, "listPrice");
  const attributes = selectedVariant?.attributes?.map((item: any) => {
    return {
      key: `${item?.attribute?.name}`,
      value: `${item?.values[0]?.name}`,
    };
  });
  const product_url = generateProductUrl(
    product?.id,
    product?.name,
    product?.slug
  );
  if (
    selectedVariant?.attributes?.length &&
    selectedVariant?.attributes[0]?.values.length &&
    selectedVariant?.attributes[0]?.values[0]?.value
  ) {
    const slug = selectedVariant?.attributes[0].attribute.slug;
    const slug_value = selectedVariant?.attributes[0].values[0].value;
    var variant_url = queryString.stringifyUrl(
      {
        query: { [slug]: slug_value },
        url: product_url,
      },
      { skipEmptyString: true }
    );
  } else {
    var variant_url = product_url;
  }
  let product_id;
  try {
    product_id = getDBIdFromGraphqlId(product?.id, "Product");
  } catch (err) {
    product_id = product?.id;
  }
  if (selectedVariant?.sku) {
    skuToUserPropertyClevertap(selectedVariant?.sku, "ADD");
  }

  if (window.dataLayer) {
    window.dataLayer.push({ ecommerce: null });
  }

  const eventName = getAtcEventName(ctTitle);

  // const eventName =
  //   ctTitle === "plixlife-faster-results"
  //     ? gtmConfig.pdpCrossSellAtc.value
  //     : ctTitle === "plixlife-faster-results-cart"
  //     ? gtmConfig.cartCrossSellAtc.value
  //     : gtmConfig.addedToCart.value;

  (window.dataLayer = window.dataLayer || []).push({
    event: eventName,
    ecommerce: {
      currencyCode: "INR",
      parentProduct: parentProducts || undefined,
      add: {
        productName: product?.name,
        products: [
          {
            name: product?.name,
            id: product_id,
            price: selectedVariant?.pricing?.price?.gross?.amount,
            mrp: Number(salePrice),
            quantity: 1,
            brand: META_DEFAULTS.name,
            manufacturedBy,
            countryOfOrigin,
            sku: selectedVariant?.sku,
            attributes,
            category: product?.category?.name,
            image_url: product.thumbnail2x?.url,
            variant_url,
            product_url,
          },
        ],
        trackingId,
      },
    },
  });
  const productVariantName = getVariantAttributes("Flavors", selectedVariant);
  const sizeAttr = getVariantAttributes("Size", selectedVariant);
  const { listprice, discountedPrice, discountAmount } = getPrices(
    product,
    false,
    selectedVariant
  );

  if (ENABLE_GA4) {
    const categories = getItemCategoriesFromAttribute(selectedVariant);
    const isMonthIncluded = categories?.sizeCategory2
      ?.toLowerCase()
      ?.includes("month");
    if (window.dataLayer) {
      window.dataLayer.push({ ecommerce: null });
    }
    (window.dataLayer = window.dataLayer || []).push({
      event: gtmConfig.addToCart.value,
      user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
      user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
      membership_status: isMember(user)
        ? "plix_club_member"
        : "not_a_plix_club_member",
      cta_position: cta_position || "NA",
      cta_type,
      ecommerce: {
        currency: "INR",
        value: discountedPrice,
        items: [
          {
            item_name: product?.name,
            item_id: product_id,
            price: discountedPrice,
            item_list_name: getItemListName(ctTitle) || "NA",
            item_list_id: productListId || "NA",
            currency: "INR",
            item_variant: productVariantName,
            discount: discountAmount,
            quantity: 1,
            item_brand:
              META_DEFAULTS.name === "plixlifefc"
                ? "plixlife"
                : META_DEFAULTS.name,
            item_category: product?.category?.name,
            item_category2: isMonthIncluded ? categories?.sizeCategory2 : "NA",
            item_category3: categories?.sizeCategory1 || "NA",
            item_category4: isMonthIncluded
              ? "NA"
              : categories?.sizeCategory2 || "NA",
            index: typeof index === "number" ? index + 1 : "NA",
          },
        ],
      },
    });
  }
};

// export const trackScrollAndTime = () => {
//   if (ENABLE_GA4 && gtmConfig?.engagedVisit?.enable) {
//     (window.dataLayer = window.dataLayer || []).push({
//       event: gtmConfig.engagedVisit.value,
//       page: window?.location?.href,
//     });
//   }
// };

export const datalayerEventForByb = (
  eventType = "add",
  mainProductVaraintLines: any,
  user: any,
  lines: any,
  cta_type = "add"
) => {
  if (ENABLE_GA4) {
    const product = mainProductVaraintLines?.product;
    const pageurl = generatePageUrl(lines?.boxType);
    const selectedVariant = product?.variant;
    const categories = getItemCategoriesFromAttribute(selectedVariant);
    const isMonthIncluded = categories?.sizeCategory2
      ?.toLowerCase()
      ?.includes("month");

    const giftBoxItemsProducts = isGiftBoxProduct(lines?.boxItemSKU);
    const bybItems = lines?.items?.map((item: any) => {
      return {
        item_name: item?.name,
        item_id: item?.variant_id,
        price: item?.price,
        item_list_name: lines?.boxType,
        currency: "INR",
        quantity: 1,
        item_brand:
          META_DEFAULTS.name === "plixlifefc" ? "plixlife" : META_DEFAULTS.name,
        item_category: product?.category?.name,
        item_category2: isMonthIncluded ? categories?.sizeCategory2 : "NA",
        item_category3: categories?.sizeCategory1 || "NA",
        item_category4: isMonthIncluded
          ? "NA"
          : categories?.sizeCategory2 || "NA",
        index: "NA",
      };
    });
    if (window.dataLayer) {
      window.dataLayer.push({ ecommerce: null });
    }
    (window.dataLayer = window.dataLayer || []).push({
      event:
        eventType === "remove"
          ? gtmConfig.removeFromCartGa4.value
          : gtmConfig.addToCart.value,
      user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
      user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
      membership_status: isMember(user)
        ? "plix_club_member"
        : "not_a_plix_club_member",
      cta_position: "NA",
      cta_type,
      ecommerce: {
        currency: "INR",
        name: product?.name,
        id: product?.id,
        value: mainProductVaraintLines?.pricing?.price?.gross?.amount,
        quantity: 1,
        brand: META_DEFAULTS.name,
        sku: mainProductVaraintLines?.sku,
        category: product?.category?.name,
        image_url: product.thumbnail2x?.url,
        pageurl: giftBoxItemsProducts ? pages.GIFT_BOX : pageurl,
        items: bybItems,
      },
    });
    if (mainProductVaraintLines?.sku) {
      skuToUserPropertyClevertap(mainProductVaraintLines?.sku, "ADD");
    }
  }
};

// export const productAddedToCartForByob = (
//   mainVariantlines: any,
//   lines: any
// ) => {
//   const product = mainVariantlines?.product;
//   const pageurl = generatePageUrl(lines?.boxType);
//   let newLines = [...lines?.items];
//   const updatedLines = newLines.reduce((acc, curr) => {
//     let updatedAcc = [...acc];
//     let index = acc?.findIndex(item => item?.name === curr?.name);
//     if (acc.length && index !== -1) {
//       updatedAcc[index].quantity = acc[index].quantity + 1;
//     } else {
//       curr["quantity"] = 1;
//       updatedAcc.push(curr);
//     }
//     return updatedAcc;
//   }, []);
//   const ctp = {
//     "Product name": product?.name,
//     value: mainVariantlines?.pricing?.price?.gross?.amount,
//     Quantity: 1,
//     url: pageurl,
//     sku: mainVariantlines?.sku,
//     "items name": updatedLines?.map(item => item?.name).join(","),
//     "items mrp": updatedLines?.map(item => item?.price).join(","),
//     "items Quantity": updatedLines?.map(item => item?.quantity).join(","),
//     "items sku": updatedLines?.map(item => item?.sku).join(","),
//     "items variantID": updatedLines?.map(item => item?.variant_id).join(","),
//   };
//   const clevertap = makeClevertap();
//   clevertap.event.push(clevertapEvents.addedByobToCart.value, ctp);
// };

// export const isAvailableForPurchase = (product: any, variantId: string) => {
//   const selectedVariant = product?.variants?.filter(
//     (variant: any) => variant?.id === variantId
//   )[0];

//   const isAvailable =
//     product?.isAvailableForPurchase &&
//     product?.isAvailable &&
//     selectedVariant?.isAvailable &&
//     selectedVariant?.quantityAvailable > 0;

//   return isAvailable;
// };

export const parseJson = (value: any) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

// export const getIntervalToDuration = ({
//   start,
//   end,
// }: {
//   start: number | Date;
//   end: number | Date;
// }) => {
//   const durations = {
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   };
//   if (end && start && end > start) {
//     let gapInSecs = (end - start) / 1000;
//     durations.days = Math.floor(gapInSecs / 86400);
//     gapInSecs -= durations.days * 86400;
//     durations.hours = Math.floor(gapInSecs / 3600);
//     gapInSecs -= durations.hours * 3600;
//     durations.minutes = Math.floor(gapInSecs / 60);
//     gapInSecs -= durations.minutes * 60;
//     durations.seconds = Math.floor(gapInSecs);
//   }
//   return durations;
// };

export const getScriptMeta = (shopMetaData: any, Datatype: string) => {
  const scripts =
    Datatype &&
    getMetadataValue(shopMetaData, "scripts_meta") &&
    parseJson(getMetadataValue(shopMetaData, "scripts_meta"));
  const pageScripts = scripts && scripts[Datatype];

  return pageScripts?.map((script: any) => parse(`${script?.tag}`));
};

export const bannerImpressionDatalayer = (bannerArray: any[], user = null) => {
  if (
    typeof window !== "undefined" &&
    window.dataLayer &&
    gtmConfig.bannerImpression.enable
  ) {
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: gtmConfig.bannerImpression.value,
      ecommerce: {
        bannerView: {
          banners: bannerArray,
        },
      },
    });
  }

  if (ENABLE_GA4) {
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.viewPromotion.enable
    ) {
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        event: gtmConfig.viewPromotion.value,
        user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
        ecommerce: {
          items: bannerArray,
        },
      });
    }
  }
};

export const bannerClickDatalayer = (eventData, user: UserFragment) => {
  if (gtmConfig.selectPromotion.enable) {
    if (window.dataLayer) {
      window.dataLayer.push({ ecommerce: null });
    }
    (window.dataLayer = window.dataLayer || []).push({
      event: gtmConfig.selectPromotion.value,
      user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
      user_type: user ? "logged_in" : "logged_out",
      membership_status: isMember(user)
        ? "plix_club_member"
        : "not_a_plix_club_member",
      ecommerce: {
        items: eventData,
      },
    });
  }
};

export const productListImpressionDatalayer = (
  products: any[],
  user = null,
  ctTitle?: string,
  productListId?: string,
  isSearchTapProduct?: boolean
) => {
  if (Array.isArray(products) && products?.length === 0) {
    return;
  }
  const productImpressions =
    products &&
    products.map(product => {
      let product_id;
      try {
        product_id = getDBIdFromGraphqlId(product?.id, "Product");
      } catch (err) {
        product_id = product?.id;
      }
      return {
        brand: CLIENT === clients.PLIXLIFEFC ? "plixlife" : META_DEFAULTS.name,
        id: product_id,
        sku: product?.defaultVariant?.sku,
        name: product?.name,
        category: product?.category?.name,
        variant: product?.defaultVariant?.name,
        price: product?.defaultVariant?.pricing?.price?.gross?.amount,
      };
    });
  if (
    typeof window !== "undefined" &&
    window.dataLayer &&
    gtmConfig.productImpression.enable
  ) {
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: gtmConfig.productImpression.value,
      ecommerce: {
        currencyCode: "INR",
        impressions: productImpressions,
      },
    });
  }

  if (ENABLE_GA4) {
    const productImpressionsGa4 =
      products &&
      products.map((product, idx) => {
        const defaultVariant = isSearchTapProduct
          ? product?.default_variant
          : product?.defaultVariant;

        const { listprice, discountedPrice, discountAmount } = getPrices(
          product,
          isSearchTapProduct,
          defaultVariant
        );

        let product_id;
        let itemVariantValue;
        try {
          product_id = isSearchTapProduct
            ? product?.id
            : getDBIdFromGraphqlId(product?.id, "Product");
          const falvorsAtt =
            product?.defaultVariant &&
            product?.defaultVariant.attributes?.find(
              att => att.attribute.slug === "flavors"
            );
          itemVariantValue =
            falvorsAtt &&
            falvorsAtt.values.length &&
            falvorsAtt.values[0].value;
        } catch (err) {
          product_id = product?.id;
        }
        return {
          item_brand:
            CLIENT === clients.PLIXLIFEFC ? "plixlife" : META_DEFAULTS.name,
          item_id: product_id,
          // item_sku: product?.defaultVariant?.sku,
          item_name: product?.name,
          item_category: isSearchTapProduct
            ? product?.category
            : product?.category?.name,
          item_variant: itemVariantValue || "NA",
          currency: "INR",
          item_list_name: getItemListName(ctTitle) || "NA",
          item_list_id: productListId || "NA",
          price: discountedPrice,
          discount: discountAmount,
          index: typeof idx === "number" ? idx + 1 : undefined,
        };
      });
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.viewItemList.enable
    ) {
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        event: gtmConfig.viewItemList.value,
        user_ID: user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined,
        user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
        ecommerce: {
          items: productImpressionsGa4,
        },
      });
    }
  }
};

const getAtcEventName = (ctTitle: string) => {
  switch (ctTitle) {
    case "plixlife-faster-results":
      return gtmConfig.pdpCrossSellAtc.value;
    case "plixlife-faster-results-cart":
      return gtmConfig.cartCrossSellAtc.value;
    case "upsell-product-cart":
      return "ATC - Cart Upsell";
    case "variant-picker-cart":
      return "ATC - Cart Variant Picker";
    default:
      return gtmConfig.addedToCart.value;
  }
};

export const getItemListName = (ctTitle: string) => {
  switch (ctTitle) {
    case "plixlife-faster-results":
      return "PDP Cross Sell";
    case "plixlife-faster-results-cart":
      return "Cart Cross Sell";
    case "upsell-product-cart":
      return "Cart Upsell";
    case "variant-picker-cart":
      return "Cart Variant Picker";
    default:
      return ctTitle;
  }
};

export const productClickDatalayer = (
  product: any,
  user: any,
  productIndex: number,
  ctTitle?: string,
  productListId?: string,
  isSearchTapProduct?: boolean
) => {
  let product_id;
  try {
    product_id = getDBIdFromGraphqlId(product?.id, "Product");
  } catch (err) {
    product_id = product?.id;
  }
  if (
    typeof window !== "undefined" &&
    window.dataLayer &&
    gtmConfig.productClick.enable
  ) {
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: gtmConfig.productClick.value,
      UserID: user?.id,
      user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
      ecommerce: {
        currencyCode: "INR",
        click: {
          actionField: { list: "productlist", action: "click" },
          products: [
            {
              name: product?.name,
              id: product_id,
              price: product?.defaultVariant?.pricing?.price?.gross?.amount,
              brand: META_DEFAULTS.name,
              category: product?.category?.name,
              quantity: 1,
              variant: product?.defaultVariant?.name,
              // position: "{{dynamic}}",
            },
          ],
        },
      },
    });
  }

  if (ENABLE_GA4) {
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      gtmConfig.selectItem.enable
    ) {
      const defaultVariant = isSearchTapProduct
        ? product?.default_variant
        : product?.defaultVariant;

      const listprice =
        getMetadataValue(defaultVariant?.metadata, "listPrice") &&
        parseJson(getMetadataValue(defaultVariant?.metadata, "listPrice"));

      const discountedPrice = isSearchTapProduct
        ? product?.discounted_price
        : product?.defaultVariant?.pricing?.price?.gross?.amount;

      let discountAmount = 0;
      let itemVariantValue;
      let userId;
      try {
        discountAmount = listprice - discountedPrice;
        userId = user?.id ? getDBIdFromGraphqlId(user?.id, "User") : undefined;
        const falvorsAtt =
          product?.defaultVariant &&
          product?.defaultVariant.attributes?.find(
            att => att.attribute.slug === "flavors"
          );
        itemVariantValue =
          falvorsAtt && falvorsAtt.values.length && falvorsAtt.values[0].value;
      } catch (err) {
        product_id = product?.id;
      }
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        event: gtmConfig.selectItem.value,
        user_ID: userId || undefined,
        user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
        membership_status: isMember(user)
          ? "plix_club_member"
          : "not_a_plix_club_member",
        ecommerce: {
          items: [
            {
              item_name: product?.name,
              item_id: product_id,
              currency: "INR",
              price: discountedPrice,
              item_brand:
                CLIENT === clients.PLIXLIFEFC ? "plixlife" : META_DEFAULTS.name,
              discount: discountAmount,
              item_category: isSearchTapProduct
                ? product?.category
                : product?.category?.name,
              item_variant: itemVariantValue || "NA",
              index: typeof productIndex === "number" ? productIndex + 1 : "NA",
              item_list_id: productListId || "NA",
              item_list_name: getItemListName(ctTitle) || "NA",
            },
          ],
        },
      });
    }
  }
};

export const isBoxProduct = (item: any) => {
  return item?.variant?.sku?.includes("BOXITEM-");
};

export const isComboProduct = (item: any) => {
  return item?.variant?.sku?.includes("BOXITEM-COMBO-");
};

export const isGiftBoxProduct = (sku: any) => {
  return sku?.includes("BOXITEM-GIFT-");
};

// export const setRefreshToken = (token: string | null): void => {
//   if (typeof window !== "undefined") {
//     if (token) {
//       localStorage.setItem(REFRESH_TOKEN, token);
//     } else {
//       localStorage.removeItem(REFRESH_TOKEN);
//     }
//   }
// };

// export const setCSRFToken = (token: string | null): void => {
//   if (typeof window !== "undefined") {
//     if (token) {
//       localStorage.setItem(CSRF_TOKEN, token);
//     } else {
//       localStorage.removeItem(CSRF_TOKEN);
//     }
//   }
// };

// export const getCSRFToken =
//   typeof window !== "undefined"
//     ? parseJson(localStorage.getItem(CSRF_TOKEN))
//     : null;

// export const getRefreshToken =
//   typeof window !== "undefined"
//     ? parseJson(localStorage.getItem(REFRESH_TOKEN))
//     : null;

// export const getPhoneNoWithoutPrefix = (number: string) => {
//   if (number && typeof number === "string") {
//     if (number.length === 10 && number.charAt(0) !== "+") {
//       return number;
//     }
//     if (number.length === 13 && number.substring(0, 3) === "+91") {
//       return number.substring(3);
//     }
//   }
//   return null;
// };
// // Firework Helper Functions
// export const createFWProduct = (remoteVariant: any) => {
//   // const {  } = remoteVariant;
//   return window?._fwn?.shopping?.productFactory((productbuilder: any) => {
//     // 1. Update the product title.
//     productbuilder
//       .extId(getDBIdFromGraphqlId(remoteVariant?.id, "ProductVariant"))
//       .name(remoteVariant?.product?.name)
//       .currency("INR");
//     // 2. Update product variant price and availability.
//     Array(1).map((remoteVariant: any) => {
//       const {
//         id: v_id,
//         isAvailable,
//         quantityAvailable,
//         pricing,
//       } = remoteVariant;
//       productbuilder.variant((variantBuilder: any) => {
//         variantBuilder
//           .extId(getDBIdFromGraphqlId(v_id, "ProductVariant"))
//           .isAvailable(isAvailable && quantityAvailable)
//           .price(pricing?.price?.gross?.amount);
//       });
//     });
//   });
// };

// export const parseFwProduct = (remoteProduct: any, v_id: any) => {
//   return window?._fwn?.shopping.productFactory((builder: any) => {
//     builder
//       // .description(remoteProduct.description)
//       .extId(getDBIdFromGraphqlId(v_id, "ProductVariant"))
//       .name(remoteProduct?.name)
//       .currency("INR");
//     remoteProduct.variants
//       ?.filter((v: any) => v?.id === v_id)
//       ?.forEach((remoteVariant: any) => {
//         builder.variant((variantBuilder: any) => {
//           const sortedImages = remoteVariant?.images.sort((prev, next) =>
//             prev?.sortOrder > next?.sortOrder ? 1 : -1
//           );
//           variantBuilder
//             .extId(getDBIdFromGraphqlId(remoteVariant?.id, "ProductVariant"))
//             .isAvailable(remoteVariant?.isAvailable)
//             .name(remoteVariant?.name)
//             .price(remoteVariant?.pricing?.price?.gross?.amount)
//             .sku(remoteVariant?.sku)
//             // .url("https://www.example.com")
//             .image((imageBuilder: any) => {
//               imageBuilder
//                 .extId(
//                   getDBIdFromGraphqlId(sortedImages[0]?.id, "ProductImage")
//                 )
//                 .position(sortedImages[0]?.sortOrder)
//                 .title(sortedImages[0]?.alt)
//                 .url(sortedImages[0]?.url);
//             });
//         });
//       });
//   }, true);
// };

export const skuToUserPropertyClevertap = (
  sku: string,
  actionType: "ADD" | "REMOVE"
) => {
  const clevertap = makeClevertap();
  switch (actionType) {
    case "ADD":
      if (typeof clevertap?.addMultiValuesForKey === "function" && sku) {
        clevertap.addMultiValuesForKey("variant_sku", [sku]);
      }
      break;
    case "REMOVE":
      if (typeof clevertap?.removeMultiValuesForKey === "function" && sku) {
        clevertap.removeMultiValuesForKey("variant_sku", [sku]);
      }
      break;
    default:
      break;
  }
};

// export const dateformatter = (date: any) => {
//   let options = { year: "numeric", month: "short", day: "numeric" };
//   let scheduleDate = new Date(date.split(" ")[0]).toLocaleDateString(
//     "en-US",
//     options
//   );
//   let temptime = date.split(" ")[1];
//   let time = temptime.split(":");
//   let delivertime =
//     parseInt(time[0]) > 12
//       ? `${parseInt(time[0]) % 12}:${time[1]}:${time[2]} PM`
//       : `${temptime} AM`;
//   return `${scheduleDate}, ${delivertime}`;
// };

// export const getdate = (date: any) => {
//   let options = { weekday: "short", month: "short", day: "numeric" };
//   let scheduleDate = new Date(date.split(" ")[0]).toLocaleDateString(
//     "en-US",
//     options
//   );
//   return scheduleDate;
// };

// let mS = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "June",
//   "July",
//   "Aug",
//   "Sept",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// export const getformatteddate = (date: string) => {
//   let arrayDate = date?.split("/");
//   const newFormatDate = `${arrayDate[1]}/${arrayDate[0]}/${arrayDate[2]}`;
//   if (typeof date == "string") {
//     let newDate = new Date(newFormatDate);
//     let resultdate =
//       `${newDate.getDate()}` +
//       " " +
//       mS[newDate.getMonth() + 1 - 1] +
//       ", " +
//       newDate.getFullYear();
//     return resultdate;
//   }
//   return date;
// };

// export const formatedDate = (date: string) => {
//   if (typeof date == "string") {
//     let newDate = new Date(date);
//     let resultdate =
//       `${newDate.getDate()}` +
//       " " +
//       mS[newDate.getMonth() + 1 - 1] +
//       ", " +
//       newDate.getFullYear();
//     return resultdate;
//   }
//   return date;
// };

// export const getDatewithoutweekday = (date: any) => {
//   let options = { day: "numeric", month: "short", year: "numeric" };
//   let scheduleDate = new Date(date.split(" ")).toLocaleDateString(
//     "en-US",
//     options
//   );
//   return scheduleDate;
// };

// export const timeformatter = (date: any) => {
//   let temptime = date.split(" ")[1];
//   let time = temptime.split(":");
//   let delivertime =
//     parseInt(time[0]) > 12
//       ? `${parseInt(time[0]) % 12}:${time[1]}:${time[2]} PM`
//       : `${temptime} AM`;
//   return `${delivertime}`;
// };

// export const truncateString = (str: string, length?: number) => {
//   const lengthToTruncate = length || 50;
//   if (typeof str === "string" && str.length > lengthToTruncate) {
//     return `${str.slice(0, lengthToTruncate)}...`;
//   }
//   return str;
// };

// export const serverSideLog = (errorMessage: any) => {
//   fetch(`/api/server-logs`, {
//     method: "POST",
//     body: JSON.stringify({
//       errorMsg: errorMessage,
//     }),
//   });
// };

export const isMember = (user: UserFragment) => {
  if (user) {
    return user?.tags?.length && user.tags.some(tags => tags.name === "member");
  }
  return false;
};

export const customEventTrigger = (
  event: string,
  user?: UserFragment,
  extraProperties = {}
) => {
  let userId;
  try {
    userId = user?.id && getDBIdFromGraphqlId(user.id, "User");
  } catch (error) {
    userId = null;
  }

  if (typeof window !== "undefined") {
    (window.dataLayer = window.dataLayer || []).push({
      event,
      user_ID: userId || undefined,
      user_type: user ? "logged_in" : "logged_out",
      membership_status: isMember(user)
        ? "plix_club_member"
        : "not_a_plix_club_member",
      ...extraProperties,
    });
  }
};

export const getVariantAttributes = (attr_name, variant) => {
  const attribute = variant?.attributes?.find(
    item => item?.attribute?.name === attr_name
  );
  return Array.isArray(attribute?.values) && attribute?.values[0]?.value;
};

export const getItemCategoriesFromAttribute = variant => {
  if (variant) {
    const sizeAttribute = variant?.attributes?.find(
      item => item?.attribute?.name === "Size"
    )?.values[0]?.value;

    const flavourAttribute = variant?.attributes?.find(
      item => item?.attribute?.name === "Flavors"
    )?.values[0]?.value;
    const sizeCategory1 =
      typeof sizeAttribute === "string" ? sizeAttribute?.split("__")[0] : "NA";
    const sizeCategory2 =
      typeof sizeAttribute === "string" ? sizeAttribute?.split("__")[1] : "NA";
    const flavourCategory = flavourAttribute;

    return { sizeCategory1, sizeCategory2, flavourCategory };
  }
  return {};
};

export const getPrices = (
  product: any,
  isSearchtapProduct?: boolean,
  variant?: any
) => {
  const defaultVariant = variant
    ? variant
    : isSearchtapProduct
      ? product?.default_variant
      : product?.defaultVariant;

  const listprice =
    getMetadataValue(defaultVariant?.metadata, "listPrice") &&
    parseJson(getMetadataValue(defaultVariant?.metadata, "listPrice"));

  const discountedPrice = isSearchtapProduct
    ? product?.discounted_price
    : variant
      ? variant?.pricing?.price?.gross?.amount
      : product?.defaultVariant?.pricing?.price?.gross?.amount;

  let discountAmount = 0;
  try {
    discountAmount = listprice - discountedPrice;
  } catch (err) {
    console.log("error in getPrices", err);
  }

  return { listprice, discountedPrice, discountAmount };
};

// export const getTextWithoutEmoji = (text: string) => {
//   if (typeof text === "string") {
//     return text.replace(
//       /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
//       ""
//     );
//   }
//   return text;
// };
// export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// export const isIOSDevice =
//   typeof window !== "undefined" &&
//   /iPad|iPhone|iPod/.test(navigator.userAgent) &&
//   !window?.MSStream;

// export const isMobileDevice =
//   typeof window !== "undefined" &&
//   (navigator.userAgent.match(/Android/i) ||
//     navigator.userAgent.match(/webOS/i) ||
//     navigator.userAgent.match(/iPhone/i) ||
//     navigator.userAgent.match(/iPad/i) ||
//     navigator.userAgent.match(/iPod/i) ||
//     navigator.userAgent.match(/BlackBerry/i) ||
//     navigator.userAgent.match(/Windows Phone/i));

// export const getMobileOs = () => {
//     var userAgent = navigator.userAgent;

//     if (/windows phone/i.test(userAgent)) {
//         return "Windows Phone";
//     }

//     if (/android/i.test(userAgent)) {
//         return "Android";
//     }
//     if (/iPad|iPhone|iPod/.test(userAgent) && !window?.MSStream) {
//         return "iOS";
//     }

//     return "unknown";
// }

// export const isInAppBrowser =
//   typeof window !== "undefined" &&
//   (/FBAN|FBAV/i.test(navigator.userAgent) ||
//     /Instagram/i.test(navigator.userAgent) ||
//     /Twitter/i.test(navigator.userAgent));

// export const isItemInCart = (items, v_id: string) => {
//   if (items && Array.isArray(items) && v_id) {
//     return items?.find(item => item?.variant?.id === v_id);
//   }
//   return false;
// };

export const triggerHomepageBannerEvent = (
  id,
  name,
  position,
  user: UserFragment,
  eventType: "view" | "click" = "view"
) => {
  const eventData = [
    {
      promotion_id: getDBIdFromGraphqlId(id, "SectionType"),
      promotion_name: `${name}-Banner`,
      creative_name: name,
      creative_slot: position,
    },
  ];
  if (eventType === "view") {
    bannerImpressionDatalayer(eventData, user);
  } else if (eventType === "click") {
    bannerClickDatalayer(eventData, user);
  }
};

// export const getRoundedRating = (rating_value: number | string) => {
//   if (!(rating_value === null || rating_value === undefined)) {
//     const rating = Number(rating_value);
//     if (rating < 0.3) {
//       return 0;
//     } else if (rating >= 0.3 && rating < 0.7) {
//       return 0.5;
//     } else if (rating >= 0.7 && rating < 1.3) {
//       return 1;
//     } else if (rating >= 1.3 && rating < 1.7) {
//       return 1.5;
//     } else if (rating >= 1.7 && rating < 2.3) {
//       return 2;
//     } else if (rating >= 2.3 && rating < 2.7) {
//       return 2.5;
//     } else if (rating >= 2.7 && rating < 3.3) {
//       return 3;
//     } else if (rating >= 3.3 && rating < 3.7) {
//       return 3.5;
//     } else if (rating >= 3.7 && rating < 4.3) {
//       return 4;
//     } else if (rating >= 4.3 && rating < 4.7) {
//       return 4.5;
//     } else if (rating >= 4.7) {
//       return 5;
//     }
//   } else {
//     throw new Error("Rating not provided");
//   }
// };

// export const getMembershipTag = (user: UserFragment) => {
//   const tagNames = user?.tags?.map(tag => tag.name);
//   const isMember = tagNames.some(tagName => tagName === "member");
//   if (tagNames.includes("ULTIMATE")) {
//     return "Ultimate";
//   } else if (tagNames.includes("ELITE")) {
//     return "Elite";
//   } else if (tagNames.includes("CLASSIC")) {
//     return "Classic";
//   } else if (isMember) {
//     return "Plix Club";
//   }
//   return "";
// };
// export const getVariantDiscount = (
//   variant: any,
//   customPricing?: {
//     undiscounted: number;
//     discounted: number;
//   }
// ) => {
//   if (customPricing) {
//     const discountPercent = Math.ceil(
//       ((customPricing?.undiscounted - customPricing?.discounted) * 100) /
//       customPricing?.undiscounted
//     );
//     return discountPercent;
//   }
//   const discountedPrice = variant && variant?.pricing?.price;

//   const variantMetadata = variant && variant?.metadata;

//   const discountedListPrice =
//     variantMetadata &&
//     variantMetadata.length &&
//     getMetadataValue(variantMetadata, "listPrice");

//   const undiscountedPrice = discountedListPrice
//     ? {
//       gross: { amount: parseFloat(discountedListPrice), currency: "INR" },
//       net: { amount: parseFloat(discountedListPrice), currency: "INR" },
//     }
//     : variant?.pricing?.priceUndiscounted;
//   const totalDiscount = Math.ceil(
//     ((undiscountedPrice?.gross?.amount - discountedPrice?.gross?.amount) *
//       100) /
//     undiscountedPrice?.gross?.amount
//   );
//   return totalDiscount;
// };

export const getCheckoutMetaForSubscription = (
  variant: ProductVariant,
  checkoutMetaData: MetadataInputV2,
  actionType: "ADD" | "REMOVE"
) => {
  let subscriptionKeyData =
    checkoutMetaData &&
    getMetadataValue(checkoutMetaData, "subscription_skus") &&
    parseJson(getMetadataValue(checkoutMetaData, "subscription_skus"));

  subscriptionKeyData = Array.isArray(subscriptionKeyData)
    ? subscriptionKeyData
    : [];
  if (variant?.sku) {
    if (actionType === "ADD") {
      if (!subscriptionKeyData?.includes(variant.sku)) {
        console.log("subscriptionKeyData", subscriptionKeyData, variant.sku);
        subscriptionKeyData = [...subscriptionKeyData, variant.sku];
        return subscriptionKeyData;
      }
    } else if (actionType === "REMOVE") {
      if (subscriptionKeyData?.includes(variant.sku)) {
        return subscriptionKeyData.filter(
          (v_sku: string) => v_sku !== variant.sku
        );
      }
    }
  }

  return subscriptionKeyData;
};

export const getCheckoutMetaForVariantAttributeWeight = (
  variantId: string,
  checkoutMetaData: MetadataInputV2,
  actionType: "ADD" | "REMOVE" | "UPDATE",
  weight?: string,
  removeVariantId?: string
) => {
  let variantAttributeWeightValue =
    (checkoutMetaData &&
      getMetadataValue(checkoutMetaData, "variant_attribute_weight") &&
      parseJson(
        getMetadataValue(checkoutMetaData, "variant_attribute_weight")
      )) ||
    [];

  const addAttributeWeight = (
    getIndexOfAttributeWeight: any,
    variantWeightData: any
  ) => {
    if (
      getIndexOfAttributeWeight !== -1 &&
      !!variantWeightData[getIndexOfAttributeWeight]?.weight
    ) {
      variantWeightData[getIndexOfAttributeWeight].weight = weight;
    } else {
      variantWeightData.push({
        variant_id: variantId,
        weight: weight,
      });
    }
  };

  let variantWeightData =
    Array.isArray(variantAttributeWeightValue) &&
      variantAttributeWeightValue?.length
      ? variantAttributeWeightValue
      : [];

  let getIndexOfAttributeWeight: number =
    variantWeightData?.length &&
    variantWeightData?.findIndex((item: any) => variantId === item?.variant_id);

  switch (actionType) {
    case "ADD":
      addAttributeWeight(getIndexOfAttributeWeight, variantWeightData);
      return {
        key: "variant_attribute_weight",
        value: JSON.stringify(variantWeightData),
      };
    case "REMOVE":
      let deleteVariantWeightData = variantWeightData?.filter(
        (item: any) => variantId !== item?.variant_id
      );
      return {
        key: "variant_attribute_weight",
        value: JSON.stringify(deleteVariantWeightData),
      };

    case "UPDATE":
      addAttributeWeight(getIndexOfAttributeWeight, variantWeightData);
      let deleteVariantWeightDataNew = variantWeightData?.filter(
        (item: any) => removeVariantId !== item?.variant_id
      );
      return {
        key: "variant_attribute_weight",
        value: JSON.stringify(deleteVariantWeightDataNew),
      };

    default: {
    }
  }
};

// export const convertStepsData = (steps: any) => {
//   const result: any = {};
//   if (steps && Array.isArray(steps)) {
//     steps.forEach((item: any) => {
//       const { name, collection } = item;
//       result[name] = collection;
//     });
//   }
//   return result;
// }
// export const getOrderCountByPhone = async phone => {
//   const updatedPhone = getPhoneNoWithoutPrefix(phone);
//   if (updatedPhone) {
//     const res = await client.query({
//       query: ORDER_COUNT_BY_PHONE,
//       variables: {
//         phone: `+91${updatedPhone}`,
//       },
//       fetchPolicy: "network-only",
//     });
//     console.log("totalCount", res?.data?.userOrders?.totalCount);
//     return res?.data?.userOrders?.totalCount;
//   }
//   return null;
// };
