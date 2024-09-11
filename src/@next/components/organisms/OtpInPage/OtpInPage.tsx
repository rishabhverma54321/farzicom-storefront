import React, { useEffect } from "react";
import { CLIENT, META_DEFAULTS } from "Themes/config";
import { CollectionHeading } from "@components/atoms/CollectionHeading";
import { GoogleMaps } from "@components/atoms/GoogleMaps";
import { ContactUsForm } from "@components/molecules/ContactUsForm";
import { getGclid, getUtmData } from "@temp/core/utils";
import { useCustomLocation } from "@hooks/useCustomLocation";

import { useAuth, useAuthState, useCart } from "@saleor/sdk";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
// import ContactUsFormWonderChef from "@components/molecules/ContactUsFormWonderChef";
// import BugReportForm from "@components/molecules/BugReportForm";
import ContactInformation from "./ContactInformation";
// import { pages } from "gqlTypes/customGlobalTypes";
import * as S from "./styles";
// import OtpOutForm from "@components/molecules/OtpOutForm";
import OtpInForm from "@components/molecules/OtpInForm";

type field = {
  name: string;
  type: string;
  placeholder: string;
  options?: any[];
};
export interface IContactUsProps {
  fields: field[];
  title?: string;
}
export const OtpInPage: React.FC<IContactUsProps> = ({
  fields,
  title,
}) => {
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
    // if (clevertapEvents.selectContactUS.enable) {
    //   clevertap.event.push(clevertapEvents.selectContactUS.value, {
    //     timeStamp: Date.now(),
    //     pageTitle: document.title,
    //     clickTarget: document.location.href,
    //     clickSource: utm_data,
    //     clickLabel: "Contact Us",
    //   });
    // }
    if (gtmConfig.pageViews.enable) {
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
        ecommerce: {
          "Page Views": {
            URL: window.location.href,
            Title: META_DEFAULTS.title,
          },
        },
      });
    }
  }, []);
  if (CLIENT === "lotus")
    return (
      <>
        <CollectionHeading Heading="Contact Us" />
        <S.Container>
          <ContactUsForm />
          <GoogleMaps />
        </S.Container>
      </>
    );
  return (
    <S.ContactUsWrapper>
      <S.Container>
        <ContactInformation  />
        <OtpInForm fields={fields} title={title} />
      </S.Container>
    </S.ContactUsWrapper>
  );
};
OtpInPage.displayName = "OtpInPage";
export default OtpInPage;
