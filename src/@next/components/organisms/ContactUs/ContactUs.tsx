import { ContactUsFormIkkai } from "@components/molecules/ContactUsFormIkkai";
import { ContactUsForm } from "@components/molecules/ContactUsForm";

import React, { useEffect } from "react";
import { CLIENT, META_DEFAULTS } from "Themes/config";
import { CollectionHeading } from "@components/atoms/CollectionHeading";
import { GoogleMaps } from "@components/atoms/GoogleMaps";
import style from "./scss/index.module.scss"
import { getGclid, getUtmData } from "@temp/core/utils";
import { useCustomLocation } from "@hooks/useCustomLocation";

import { useAuth, useAuthState, useCart } from "@saleor/sdk";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import * as S from "./styles";
import ContactInformation from "./ContactInformation";
import { getMetadataValue, parseJson } from "@utils/misc";
import { CachedImage } from "@components/molecules/CachedImage";

export interface IContactUsProps {
  content: any;
}
export const ContactUs: React.FC<IContactUsProps> = ({ content }) => {
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
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);

  const Images =
    getMetadataValue(content?.metadata, "backgroundImages") &&
    parseJson(getMetadataValue(content?.metadata, "backgroundImages"));

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
      {Images && Images?.upper_image ? (
        <>
          <S.UppderImageFirst>
          <CachedImage
            url={Images?.upper_image}
            isNextImage
            imageDimensions={{ height: 100, width: 100 }}
          />
          </S.UppderImageFirst>
          <S.UpperImageSecond>
          <CachedImage
            url={Images?.upper_image}
            isNextImage
            imageDimensions={{ height: 100, width: 100 }}
          />
          </S.UpperImageSecond>
          <S.UpperImageThird>
          <CachedImage
            url={Images?.upper_image}
            isNextImage
            imageDimensions={{ height: 100, width: 100 }}
          />
          </S.UpperImageThird>
        </>
      ) : (
        <></>
      )}
      <S.Container>
        <ContactInformation metaData={content?.metadata}/>
        {/* <ContactUsFormIkkai /> */}
      </S.Container>
      {Images && Images?.lower_image ?
        <S.LowerImage>
          <CachedImage
            url={Images?.lower_image}
            isNextImage
            imageDimensions={{ height: 100, width: 100 }}
          />
        </S.LowerImage> :
        <></>
      }
    </S.ContactUsWrapper>
  );
};
ContactUs.displayName = "ContactUs";
export default ContactUs;
