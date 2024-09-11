import React, { useEffect } from "react";
// import { pages } from "Themes/views/Article/Page";
import { CollectionHeadingIkkai } from "@components/atoms/CollectionHeadingIkkai";
import { CollectionHeading } from "@components/atoms/CollectionHeading";
import { TitleAndPara } from "@components/atoms/TitleAndPara";

import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { useAuth, useAuthState, useCart } from "@saleor/sdk";
import { useCustomLocation } from "@hooks/useCustomLocation";

import { getGclid, getUtmData } from "@temp/core/utils";
import { META_DEFAULTS, CLIENT } from "Themes/config";
import { pages } from "gqlTypes/customGlobalTypes";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import csr from "../../../../static data/csr.json";
import privacy from "../../../../static data/privacy.json";
import terms from "../../../../static data/terms.json";
import returnPolicy from "../../../../static data/return.json";

export interface IPolicyPagesProps {
  type: pages;
}

export const Container = styled.div`
  width: 70%;
  max-width: 1140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  line-height: 1.5;
  margin: auto;
  font-size: 1rem;

  ${media.mediumScreen`
    width: 90%;
  `}
`;

const getArray = (type: pages) => {
  switch (type) {
    case pages.CSR_Policy:
      return csr;
    case pages.PRIVACY_POLICY:
      return privacy;
    case pages.TERMS_AND_CONDITIONS:
      return terms;
    case pages.RETURN_POLICY:
      return returnPolicy;
    default:
      return csr;
  }
};

export const PolicyPages: React.FC<IPolicyPagesProps> = ({ type }) => {
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
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);
  const arrayToMap = getArray(type);
  return (
    <>
      {CLIENT === "lotus" ? (
        <CollectionHeading Heading="Policy Page" />
      ) : (
        <CollectionHeadingIkkai Heading="Policy Page" />
      )}
      <Container>
        {arrayToMap.map((item: any) => (
          <TitleAndPara item={item} />
        ))}
      </Container>
    </>
  );
};
PolicyPages.displayName = "PolicyPages";
export default PolicyPages;
