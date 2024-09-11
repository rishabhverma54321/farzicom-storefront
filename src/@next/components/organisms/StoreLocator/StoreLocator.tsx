import { CollectionHeading } from "@components/atoms/CollectionHeading";
import { StoreLocatorAddressContainer } from "@components/molecules/StoreLocatorAddressContainer";
import { getGclid, getUtmData } from "@temp/core/utils";
import { useCustomLocation } from "@hooks/useCustomLocation";

// import StoreLocatorForm from "@components/molecules/StoreLocatorForm";
import { useAuth, useAuthState, useCart } from "@saleor/sdk";
import React, { useEffect } from "react";
import { META_DEFAULTS } from "Themes/config";

import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import storeLocator from "../../../../static data/storeLocator.json";

export interface IStoreLocatorProps {}

export const singleAddress = {
  storeName: "Acropolis Mall, Kolkata",
  address:
    "Shop No. GK-002, Situated at 1858/1, Rajdanga Main Road, Kolkata, 70017, P.S",
  area: "Kolkata, West Bengal",
};

export const StoreLocator: React.FC<IStoreLocatorProps> = () => {
  const { user } = useAuthState();
  const { items } = useCart();
  const { pathname } = useCustomLocation();
  useEffect(() => {
    const clevertap = makeClevertap();
    const utm_data = getUtmData(pathname);
    if (clevertapEvents.pageVisit.enable) {
      clevertap.event.push(clevertapEvents.pageVisit.value, {
        gaUserId: getGclid(),
        clickSource: utm_data,
        pageTitle: META_DEFAULTS.title,
        customerEmail: user?.email,
        customerPhone: user?.defaultBillingAddress?.phone,
        quantity: items?.length || 0,
        URL: window.location.href,
      });
    }
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);
  return (
    <>
      <CollectionHeading Heading="LOTUS ORGANICS + STORE LOCATORS" />
      {/* <StoreLocatorForm /> */}
      <StoreLocatorAddressContainer addressList={storeLocator} />
    </>
  );
};
StoreLocator.displayName = "StoreLocator";
export default StoreLocator;
