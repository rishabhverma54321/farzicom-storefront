import React, { useEffect } from "react";
import { useCustomLocation } from "@hooks/useCustomLocation";

import { AccountTabTiles } from "@components/molecules/AccountTabTiles";
import { META_DEFAULTS } from "Themes/config";
import { getGclid, getUtmData } from "@temp/core/utils";
import { useAuthState, useCart } from "@saleor/sdk";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import * as S from "./styles";

export const AccountTab: React.FC = () => {
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
        timeStamp: Date.now(),
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
    <S.Wrapper>
      <AccountTabTiles />
    </S.Wrapper>
  );
};
