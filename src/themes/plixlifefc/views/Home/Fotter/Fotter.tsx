import * as React from "react";
import { useCustomLocation } from "@hooks/useCustomLocation";

import Media from "react-media";
import ReactSVG from "react-svg";
//FIXME:NextJs Make it a CSS module
//import "./index.scss";
import { Gap } from "@components/atoms/Gap";
import { Footer_menu } from "@temp/components/Footer/gqlTypes/Footer";
import SecurePayment from "../fottersvg/Secure Payments.png";
import EasyReturn from "../fottersvg/Easy Returns.png";
import FastDelivery from "../fottersvg/Fast Delivery.png";
import FreeShipping from "../fottersvg/Free Shipping.png";

import Payment from "../fottersvg/Group 527.svg";
import List from "./List";
import Accordian from "./Accordian";
import ContactUs from "./ContactUs";

// const List1 = [
//   "ALL Skincare",
//   "haircare",
//   "Creams",
//   "Exfoliator",
//   "Face Oil",
//   "Face Wash",
//   "Mask",
//   "Serum",
//   "SunScreen",
//   "Toner",
//   "Moisturise",
// ];
// const List2 = [
//   "Our Story",
//   "ingredients",
//   "Blogs",
//   "FAQ's",
//   "CSR Policy",
//   "Return Policy",
//   "Privacy Policy",
//   "Term & Conditions",
// ];
// const List3 = ["My Account", "Track Order", "My Orders", "Store Locatior"];

const DrinkSwaFotter: React.FC<{
  menu: Footer_menu;
}> = ({ menu }) => {
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
          <img src={FreeShipping} width="30%" />
          <span>Free Shipping</span>
        </div>
        <div>
          <img src={FastDelivery} width="30%" />
          <span>Fast delivery</span>
        </div>
        <div>
          <img src={SecurePayment} width="30%" />
          <span>Secure Payment</span>
        </div>
        <div>
          <img src={EasyReturn} width="30%" />
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
      <div className="nsrcel">
        <img
          src="https://drinkswa-media.farziengineer.co/hosted/NSRCEL_Main_logo.png"
          alt=""
        />
      </div>
      <div className=" container paymentContainer">
        <ReactSVG path={Payment} />

        <p style={{ fontSize: "12px" }}>
          © 2016 – 2021, Raw Earth Food &amp; Beverages Pvt Ltd, Bengaluru,
          India. All Righs Reserved
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

export default DrinkSwaFotter;
