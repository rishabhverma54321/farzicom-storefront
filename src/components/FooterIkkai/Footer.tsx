import * as React from "react";
import { useCustomLocation } from "@hooks/useCustomLocation";

import ReactSVG from "react-svg";

import freeShippingIcon from "images/service-promises/fs.svg";
import fastDeliveryIcon from "images/service-promises/fd.svg";
import securePaymentIcon from "images/service-promises/sp.svg";
import easyReturnsIcon from "images/service-promises/er.svg";

import { Gap } from "@components/atoms/Gap/styled";
import { RecentlyViewed } from "@components/molecules/RecentlyViewed";
import { checkoutUrl } from "@temp/app/routes/paths";
import { useIsMobile } from "@hooks/useIsMobile";

import Nav from "./Nav";
import LowerNav from "./LowerNav";

//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";
//FIXME:NextJs Make it a CSS module
//import "./scss/service-promises.scss";
import * as S from "./Footer.styled";

const promises = [
  { class: "free-shipping", url: freeShippingIcon, title: "Free Shipping" },
  { class: "fast-delivery", url: fastDeliveryIcon, title: "Fast Delivery" },
  { class: "secure-payment", url: securePaymentIcon, title: "Secure Payment" },
  { class: "easy-returns", url: easyReturnsIcon, title: "Easy Returns" },
];

const ServicePromises: React.FC = () => (
  <div className="service-promises">
    <div className="promises-wrapper">
      {promises.map(promise => (
        <div className={`promise ${promise.class}`} key={promise.url}>
          <ReactSVG className="icon-wrapper" path={promise.url} />
          <div className="text-wrapper">{promise.title}</div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Checkout page - show nothing
 *
 * Cart page - show only service promises (on mobile)
 */
const FooterIkkai: React.FC = () => {
  const location = useCustomLocation();
  const isMobile = useIsMobile();
  const isCheckout = location.pathname.includes(checkoutUrl);
  const isCartpage = location.pathname.includes("/cart");

  if (isCheckout) return <Gap size="4rem" />;
  if (isMobile && isCartpage) {
    return (
      <S.MobileCartPage>
        <ServicePromises />
      </S.MobileCartPage>
    );
  }

  const RECENTLY_VIEWED = "recently-viewed";
  const recentlyViewedStr = localStorage.getItem(RECENTLY_VIEWED);
  const recentlyViewed = recentlyViewedStr ? JSON.parse(recentlyViewedStr) : [];

  return (
    <>
      {recentlyViewed.length > 0 ? <RecentlyViewed /> : <> </>}
      <footer className="footer footer-color" id="footer">
        <ServicePromises />
        <section className="sections-wrapper">
          <Nav />
          <LowerNav />
        </section>
      </footer>
    </>
  );
};

export default FooterIkkai;
