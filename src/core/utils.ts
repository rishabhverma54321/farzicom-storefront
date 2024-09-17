import { History, LocationState } from "history";
import { Base64 } from "js-base64";
import each from "lodash/each";
import {
  parse as parseQs,
  stringify as stringifyQs,
  ParsedQuery,
} from "query-string";
import queryString from 'query-string';
// import { FetchResult } from "react-apollo";

import Cookies from "js-cookie";

// import { PriceFragment, ProductVariantFragment } from "@saleor/sdk";
// import { getMetadataValue } from "@utils/misc";
import { PRODUCT_URL_VARAINT } from "Themes/config";
// import isEqual from "lodash/isEqual";
// import sortBy from "lodash/sortBy";
import { OrderDirection, ProductOrderField } from "../../gqlTypes/globalTypes";
import { IFilterAttributes } from "../@next/types";
// import { FormError } from "./types";

export const slugify = (text: string | number): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -

export const getDBIdFromGraphqlId = (
  graphqlId: string,
  schema?: string
): number => {
  // This is temporary solution, we will use slugs in the future
  const rawId = Base64.decode(graphqlId);
  const regexp = /(\w+):(\d+)/;
  const arr = regexp.exec(rawId);

  if (schema && schema !== arr![1]) {
    throw new Error("Schema is not correct");
  }
  return parseInt(arr![2], 10);
};

export const getGraphqlIdFromDBId = (id: string, schema: string): string =>
  // This is temporary solution, we will use slugs in the future
  Base64.encode(`${schema}:${id}`);

// export const phoneRegExp = /^[0-9]{10}$/;
// export const nameRegExp =  /^[aA-zZ\s]+$/;
// export const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// export const priceToString = (
//   price: { amount: number; currency: string },
//   locale?: string
// ): string => {
//   const { amount } = price;
//   if (locale) {
//     return amount.toLocaleString(locale, {
//       currency: price.currency,
//       style: "currency",
//     });
//   }
//   return `${price.currency} ${amount.toFixed(2)}`;
// };

export const generateProductUrl = (id: string, name: string, slug?: string) => {
  const urlProductId = `/product/${slugify(name)}/${getDBIdFromGraphqlId(
    id,
    "Product"
  )}/`;
  const urlProductSlug = `/product/${slug}/`;

  const urlProductsId = `/products/${slugify(name)}/${getDBIdFromGraphqlId(
    id,
    "Product"
  )}/`;
  const urlProductsSlug = `/products/${slug}/`;

  const urlProductSlugId = `/product/${slug}/${getDBIdFromGraphqlId(
    id,
    "Product"
  )}/`;

  switch (PRODUCT_URL_VARAINT) {
    case 1:
      return urlProductId;
    case 2: {
      if (slug) {
        return urlProductSlug;
      }
      return urlProductId;
    }
    case 3:
      return urlProductsId;
    case 4: {
      if (slug) {
        return urlProductsSlug;
      }
      return urlProductsId;
    }
    case 5:
      return urlProductSlugId;
  }
};

export const generateCategoryUrl = (id: string, name: string) =>
  `/category/${slugify(name)}/${getDBIdFromGraphqlId(id, "Category")}/`;

export const generateCollectionUrl = (id: string, name: string) =>
  `/collection/${slugify(name)}/${getDBIdFromGraphqlId(id, "Collection")}/`;

export const generatePageUrl = (slug: string) => `/page/${slug}/`;

interface AttributeDict {
  [attributeSlug: string]: string[];
}
export const convertToAttributeScalar = (
  attributes: AttributeDict | IFilterAttributes
) =>
  Object.entries(attributes)
    .map(([key, value]) =>
      value.map((attribute: any) => ({ slug: key, value: attribute }))
    )
    .reduce((prev, curr) => [...prev, ...curr], []);

interface QueryString {
  [key: string]: string[] | string | null | undefined;
}
// export const getAttributesFromQs = (qs: QueryString) =>
//   Object.keys(qs)
//     .filter(
//       key => !["pageSize", "priceGte", "priceLte", "sortBy", "q"].includes(key)
//     )
//     .reduce((prev: any, curr: any) => {
//       prev[curr] = typeof qs[curr] === "string" ? [qs[curr]] : qs[curr];
//       return prev;
//     }, {});

// export const getValueOrEmpty = <T>(value: T): T | string =>
//   value === undefined || value === null ? "" : value;

export const convertSortByFromString = (sortBy: string) => {
  if (!sortBy) {
    return null;
  }
  const direction = sortBy.startsWith("-")
    ? OrderDirection.DESC
    : OrderDirection.ASC;

  let field;
  switch (sortBy.replace(/^-/, "")) {
    case "name":
      field = ProductOrderField.NAME;
      break;

    case "price":
      field = ProductOrderField.DEFAULT_VARIANT_PRICE;
      break;

    case "updated_at":
      field = ProductOrderField.DATE;
      break;

    default:
      return null;
  }
  return { field, direction };
};

export const maybe = <T>(exp: () => T, d?: T) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};

export const parseQueryString = (
  location: LocationState
): ParsedQuery<string> => {
  let query: ParsedQuery<string> = queryString.parse(window.location.search.substr(1));

  each(query, (value, key) => {
    if (Array.isArray(value)) {
      query = {
        ...query,
        [key]: value[0],
      };
    }
  });
  return query;
};

// export const updateQueryString = (
//   location: LocationState,
//   history: History
// ) => {
//   const querystring = parseQueryString(location);

//   return (key: string, value?: any) => {
//     if (value === "") {
//       delete querystring[key];
//     } else {
//       querystring[key] = value || key;
//     }
//     history.replace(`?${stringifyQs(querystring)}`);
//   };
// };

// export const findFormErrors = (result: void | FetchResult): FormError[] => {
//   if (result) {
//     const data = Object.values(maybe(() => result.data) as object);

//     return data.reduce((prevVal: any, currVal: any) => {
//       const errors = currVal.errors || [];

//       return [...prevVal, ...errors];
//     }, []);
//   }
//   return [];
// };

// export const removeEmptySpaces = (text: string) => text.replace(/\s+/g, "");
export const getUtmData = (location: LocationState) => {
  const querystring = parseQueryString(location);

  if (
    querystring.utm_source ||
    querystring.utm_medium ||
    querystring.utm_campaign
  ) {
    const utm_data = [
      Cookies.get("utm_source"),
      Cookies.get("utm_medium"),
      Cookies.get("utm_campaign"),
    ];
    const concat_string = utm_data
      .filter(data => data !== "undefined" && data !== "null")
      .toString();
    return concat_string;
  }
  return "Direct";
};

export const getGclid = () => {
  const gclid = Cookies.get("gclid");
  return gclid === "undefined" || gclid === "null" ? "" : gclid;
};

// export const getThisVariantPrices = (
//   variant_data: ProductVariantFragment
// ): Array<PriceFragment> => {
//   const variant = {
//     ...variant_data,
//     pricing: {
//       ...variant_data.pricing,
//       price: {
//         ...variant_data.pricing.price,
//         gross: {
//           ...variant_data.pricing.price.gross,
//           amount: Number(variant_data.pricing.price.gross.amount),
//         },
//         net: {
//           ...variant_data.pricing.price.net,
//           amount: Number(variant_data.pricing.price.net.amount),
//         },
//       },
//       priceUndiscounted: {
//         ...variant_data.pricing.priceUndiscounted,
//         gross: {
//           ...variant_data.pricing.priceUndiscounted.gross,
//           amount: Number(variant_data.pricing.priceUndiscounted.gross.amount),
//         },
//         net: {
//           ...variant_data.pricing.priceUndiscounted.net,
//           amount: Number(variant_data.pricing.priceUndiscounted.net.amount),
//         },
//       },
//     }
//   };

//   const variantMetadata =
//     variant && variant?.metadata ? variant?.metadata : null;

//   const discountedPrice =
//     variant && variant?.pricing?.price ? variant?.pricing?.price : null;

//   const unDiscountedListPrice =
//     variantMetadata &&
//     variantMetadata.length &&
//     getMetadataValue(variantMetadata, "listPrice");

//   const undiscountedPrice = unDiscountedListPrice
//     ? {
//         gross: { amount: parseFloat(unDiscountedListPrice), currency: "INR" },
//         net: { amount: parseFloat(unDiscountedListPrice), currency: "INR" },
//       }
//     : variant?.pricing?.priceUndiscounted;

//   const discount =
//     undiscountedPrice?.gross?.amount - discountedPrice?.gross?.amount;

//   const discountPrice = {
//     gross: { amount: discount, currency: "INR" },
//     net: { amount: discount, currency: "INR" },
//   };

//   return [undiscountedPrice, discountedPrice, discountPrice];
// };

// export function loadScript(src: string, withCrossOrigin: boolean = true) {
//   const script = document.createElement("script");
//   script.src = src;
//   script.async = true;
//   script.defer = true;
//   if (withCrossOrigin) {
//     script.crossOrigin = "anonymous";
//   }

//   document.body.appendChild(script);

//   return script;
// }

// export function loadScriptWithContent(
//   src: string = "",
//   content: any = "",
//   withCrossOrigin: boolean = true,
//   addToHead: boolean = false
// ) {
//   if (src === "" && content === "") {
//     return;
//   }
//   const script = document.createElement("script");

//   if (src === "") {
//     script.text = content;
//   } else {
//     script.src = src;
//   }

//   script.async = true;
//   script.defer = true;

//   if (withCrossOrigin) {
//     script.crossOrigin = "anonymous";
//   }

//   if (addToHead) {
//     document.head.appendChild(script);
//   } else {
//     document.body.appendChild(script);
//   }

//   return script;
// }

// export const getDateInHumanFormat = (dateString: string) => {
//   if (!dateString) {
//     return "";
//   }
//   const date = new Date(dateString);
//   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
// };

// export const isSameArray = (arr1, arr2) => {
//   return isEqual(sortBy(arr1), sortBy(arr2));
// };
