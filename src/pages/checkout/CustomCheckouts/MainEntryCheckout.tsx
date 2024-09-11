import { getMetadataValue, parseJson } from "@utils/misc";
import React from "react";
import CheckoutV1 from "./CheckoutVariants/CheckoutV1/CheckoutV1";
import CheckoutV2 from "./CheckoutVariants/CheckoutV2/CheckoutV2";
import CheckoutV3 from "./CheckoutVariants/CheckoutV3/CheckoutV3";
import CheckoutV4 from "./CheckoutVariants/CheckoutV4/CheckoutV4";
import AbandonedCheckout from "./CheckoutVariants/AbandonedCheckout/AbandonedCheckout";
import { useRouter } from "next/router";
import queryString from "query-string";

const MainEntryCheckout = ({ headerAndFooterData, shopMeta }) => {
  const router = useRouter();
  const abandonedCheckout = router?.query?.token ? "abandonCheckout" : null;
  const defaultCheckout =
    shopMeta?.data?.shopmeta?.edges[0]?.node?.metadata &&
    getMetadataValue(
      shopMeta?.data.shopmeta.edges[0].node.metadata,
      "default_checkout_variant"
    ) &&
    parseJson(
      getMetadataValue(
        shopMeta?.data.shopmeta.edges[0].node.metadata,
        "default_checkout_variant"
      )
    );
  let checkoutVariant: any = defaultCheckout || "V3";
  if (typeof window !== "undefined") {
    const routerQuery = queryString.parse(window.location.search);
    if (routerQuery && routerQuery?.checkout_variant) {
      checkoutVariant = routerQuery?.checkout_variant;
    } else {
      checkoutVariant =
        sessionStorage.getItem("checkout_variation") == "New-Variation"
          ? "V4"
          : checkoutVariant;
    }
  }
  switch (abandonedCheckout || checkoutVariant) {
    case "V1":
      return (
        <CheckoutV1
          headerAndFooterData={headerAndFooterData}
          shopMeta={shopMeta}
        />
      );
    case "V2":
      return (
        <CheckoutV2
          headerAndFooterData={headerAndFooterData}
          shopMeta={shopMeta}
        />
      );
    case "V3":
      return (
        <CheckoutV3
          headerAndFooterData={headerAndFooterData}
          shopMeta={shopMeta}
        />
      );
    case "V4":
      return (
        <CheckoutV4
          headerAndFooterData={headerAndFooterData}
          shopMeta={shopMeta}
        />
      );
    case "abandonCheckout":
      return (
        <AbandonedCheckout
          headerAndFooterData={headerAndFooterData}
          shopMeta={shopMeta}
        />
      );
    default:
      return (
        <CheckoutV3
          headerAndFooterData={headerAndFooterData}
          shopMeta={shopMeta}
        />
      );
  }
};

MainEntryCheckout.displayName = "MainEntryCheckout";
export default React.memo(MainEntryCheckout);
