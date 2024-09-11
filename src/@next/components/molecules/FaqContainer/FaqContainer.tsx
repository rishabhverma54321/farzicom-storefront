import { CollectionHeadingIkkai } from "@components/atoms/CollectionHeadingIkkai";
import { CollectionHeading } from "@components/atoms/CollectionHeading";
import { Faq } from "@components/atoms/Faq";
import React, { useEffect } from "react";
import { useAuth, useAuthState, useCart } from "@saleor/sdk";
import { getGclid, getUtmData } from "@temp/core/utils";
import { useCustomLocation } from "@hooks/useCustomLocation";

import { CLIENT, META_DEFAULTS } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import faqJson from "../../../../static data/faq.json";
import { Container } from "../PolicyPages";

export interface IFaqContainerProps {}

const faq = {
  q: "Can I pay through Net banking? What is the procedure?",
  a:
    "Yes, one can pay through net banking. You need to select net banking as an option on the checkout page and you will be redirected to the payment gateway. You will need to select net banking and the bank you wish to pay from and make the payment.",
};

export const faqArray = [faq, faq, faq, faq, faq, faq, faq, faq, faq];

export const FaqContainer: React.FC<IFaqContainerProps> = () => {
  const { user } = useAuthState();
  const { items } = useCart();
  const { pathname } = useCustomLocation();
  useEffect(() => {
    const utm_data = getUtmData(pathname);
    if (clevertapEvents.pageVisit.enable) {
      const clevertap = makeClevertap();
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
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);
  return (
    <>
      {CLIENT === "lotus" ? (
        <CollectionHeading Heading="FAQ's" />
      ) : (
        <CollectionHeadingIkkai Heading="FAQ's" />
      )}
      <Container>
        {faqJson.map(({ q, a }) => (
          <Faq question={q} answer={a} key={q + a} />
        ))}
      </Container>
    </>
  );
};
FaqContainer.displayName = "FaqContainer";
export default FaqContainer;
