import React from "react";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import WhatsAppIcon from "@material-ui/icons/WhatsApp";
// import FacebookIcon from "@material-ui/icons/Facebook";
import { useCustomLocation } from "@hooks/useCustomLocation";

import ReactSVG from "react-svg";
import * as S from "./styles";
import { useRouter } from "next/router";

export enum Titles {
  twitter = "TWITTER",
  facebook = "FACEBOOK",
  whatsapp = "WhatsApp",
}

export interface IShareContainerProps {}

export const ShareContainer: React.FC<IShareContainerProps> = () => {
  const fullURL = typeof window !== "undefined" ? window?.location?.href : "/";

  const urlTwitter = `https://twitter.com/share?text=Know more about this product by clicking the link: ${fullURL}`;
  const urlFacebook = `https://www.facebook.com/sharer/sharer.php?u=${fullURL}`;
  const urlWhatsapp = `whatsapp://send?text=${fullURL}`;

  return (
    <>
      <S.Container>
        <S.Icon>
          <a
            href={urlTwitter}
            target="_blank"
            title={Titles.twitter}
            rel="noreferrer"
          >
            <ReactSVG path="/twitter.svg" />
          </a>
        </S.Icon>
        <S.Icon>
          <a
            href={urlFacebook}
            target="_blank"
            title={Titles.facebook}
            rel="noreferrer"
          >
            <ReactSVG path="/facebook.svg" />
          </a>
        </S.Icon>
        <S.Icon>
          <a
            href={urlWhatsapp}
            target="_blank"
            title={Titles.whatsapp}
            rel="noreferrer"
          >
            <ReactSVG path="/whatsapp.svg" />
          </a>
        </S.Icon>
      </S.Container>
    </>
  );
};
ShareContainer.displayName = "ShareContainer";
export default ShareContainer;
