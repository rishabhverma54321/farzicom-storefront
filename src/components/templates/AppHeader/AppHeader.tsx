// import MainMenuPlixlife from "@src/components/organisms/MainMenuPlixlifefc/MainMenu";

import { CLIENT } from "Themes/config";
import { clients } from "@globalTypes/customGlobalTypes";
import React, { useContext, useEffect, useState } from "react";
import { useCheckout, useCheckoutState } from "@saleor/sdk";
import queryString from "query-string";
import Cookies from "js-cookie";
import { getMetadataValue, parseJson } from "@utils/misc";
import { ShopMetaContext } from "@src/pages/_app";
import { updateMetadata } from "./queries";
import { apiUrl } from "@src/constants";
// import { mainMenu } from "@src/components/organisms/MainMenuPlixlifefc/queries";

export interface IAppHeaderProps {
  headerData?: any;
  checkoutHeaderProps?: { handleCheckoutBack: () => void };
}

export const AppHeader: React.FC<IAppHeaderProps> = ({
  headerData,
  checkoutHeaderProps,
}) => {
  const { checkout } = useCheckoutState();
  const shopmetadata = useContext(ShopMetaContext);
  const convertCookieStringToObj = (str: string) => {
    // input string -> "us=testSource; um=testMedium; uc=testCampaign"
    const strArray = str.split("; ");
    const result: any = {};
    for (const i in strArray) {
      const cur = strArray[i].split("=");
      result[cur[0]] = cur[1];
    }
    return result;
    // output object -> {us:"testSource", um:"testMedium", uc:"testCampaign"}
  };

  const updateCheckoutMetadata = () => {
    const cookieObj: any = convertCookieStringToObj(Cookies.get("fctrack"));
    const query = JSON.stringify({
      query: updateMetadata(
        checkout?.id,
        `[
          {
            key: "us",
            value: "${cookieObj?.us}"
          },
          {
            key: "um",
            value: "${cookieObj?.um}"
          },
          {
            key: "uc",
            value: "${cookieObj?.uc}"
          }
        ]`
      ),
    });

    const response = fetch(apiUrl, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: query,
    });
    return response;
  };

  const setFCtrackCookie = (queryValue: any, daysForExpiry: number) => {
    const cookieValue = `us=${queryValue?.utm_source}; um=${queryValue?.utm_medium}; uc=${queryValue?.utm_campaign}`;

    Cookies.set("fctrack", cookieValue, { expires: daysForExpiry });
  };

  useEffect(() => {
    const queryValue = queryString.parse(window.location.search);
    if (
      queryValue?.utm_source ||
      queryValue?.utm_medium ||
      queryValue?.utm_campaign
    ) {
      const shopMeta =
        getMetadataValue(shopmetadata, "fctrack_info") &&
        parseJson(getMetadataValue(shopmetadata, "fctrack_info"));

      const AMStrategy = shopMeta?.strategy.toLowerCase();
      if (AMStrategy === "first") {
        // don't overwrite if cookie already exists
        if (!Cookies.get("fctrack")) {
          setFCtrackCookie(queryValue, Number(shopMeta?.daysForExpiry));
        }
      } else {
        setFCtrackCookie(queryValue, Number(shopMeta?.daysForExpiry));
      }
      if (checkout?.id) {
        updateCheckoutMetadata();
      }
    }
  }, [checkout?.id]);

  // const renderSwitch = () => {
  //   switch (CLIENT) {
  //     case clients.PLIXLIFEFC:
  //       return (
  //         <MainMenuPlixlife
  //           headerData={headerData}
  //           checkoutHeaderProps={checkoutHeaderProps}
  //         />
  //       );

  //     default:
  //       return (
  //         <MainMenuPlixlife
  //           headerData={headerData}
  //           checkoutHeaderProps={checkoutHeaderProps}
  //         />
  //       );
  //   }
  // };
  // return <>{renderSwitch()}</>;
  return <></>
};
AppHeader.displayName = "AppHeader";
export default React.memo(AppHeader);
