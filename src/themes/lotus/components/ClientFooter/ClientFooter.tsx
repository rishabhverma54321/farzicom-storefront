import React from "react";
import Media from "react-media";
// import "./index.scss";
import { Gap } from "@components/atoms/Gap";
import { Footer_menu } from "@temp/components/Footer/gqlTypes/Footer";
import List from "./List";
import Accordian from "./Accordian";
import ContactUs from "./ContactUs";
import { useCustomLocation } from "@hooks/useCustomLocation";
import MemoSecurePaymentSVG from "@components/atoms/SvgIcons/SecurePaymentSVG";
import MemoFreeShippingSVG from "@components/atoms/SvgIcons/FreeShippingSVG";
import MemoFastDeliverySVG from "@components/atoms/SvgIcons/FastDeliverySVG";
import MemoEasyReturnsSVG from "@components/atoms/SvgIcons/EasyReturnsSVG";
import MemoPaymentLogosSVG from "@components/atoms/SvgIcons/PaymentLogosSVG";

export interface IClientFooterProps {
  menu: Footer_menu;
}

export const ClientFooter: React.FC<IClientFooterProps> = ({ menu }) => {
  const location = useCustomLocation();
  const RegExp = /\/product\//;
  const productPage = RegExp.test(location.pathname);
  const collectionRegExp = /\/collection\//;
  const categoryRegExp = /\/category\//;
  const PLP =
    collectionRegExp.test(location.pathname) ||
    categoryRegExp.test(location.pathname);

  return (
    <>
      <div className="container upper">
        <div>
          <MemoFreeShippingSVG fontSize={32} />
          <span>Free Shipping</span>
        </div>
        <div>
          <MemoFastDeliverySVG fontSize={32} />
          <span>Fast delivery</span>
        </div>
        <div>
          <MemoSecurePaymentSVG fontSize={32} />
          <span>Secure Payment</span>
        </div>
        <div>
          <MemoEasyReturnsSVG fontSize={32} />
          <span>Easy Returns</span>
        </div>
      </div>

      <div className="container lower" style={{ backgroundColor: "#FFFDF6" }}>
        <Media
          query={{ minWidth: "720px" }}
          render={() => (
            <>
              {menu.items.map(item => (
                <List key={item.id} heading={item.name} Lists={item.children} />
              ))}

              {/* <List heading="About" Lists={List2} />
              <List heading="Useful links" Lists={List3} /> */}
              <ContactUs />
            </>
          )}
        />
        <Media
          query={{ maxWidth: "720px" }}
          render={() => (
            <div style={{ width: "100%" }}>
              <Accordian menu={menu} />
              <ContactUs />
            </div>
          )}
        />
      </div>
      <div className=" container paymentContainer">
        <MemoPaymentLogosSVG fontSize={192} />
        <p style={{ fontSize: "12px", textAlign: "center" }}>
          Made in India. Manufactured by Lotus Herbals Color Cosmetics Pvt Ltd.
          Marketed by Lotus Herbals Pvt Ltd.
        </p>
        <p style={{ fontSize: "12px" }}>
          2022 Lotus Organics. All rights reserved.
        </p>
      </div>
      {productPage && (
        <Gap size="3.5rem" customSize={{ breakpoint: "720px", size: "0px" }} />
      )}
      {PLP && (
        <Gap size="2.5rem" customSize={{ breakpoint: "540px", size: "0px" }} />
      )}
    </>
  );
};
ClientFooter.displayName = "ClientFooter";
export default ClientFooter;
