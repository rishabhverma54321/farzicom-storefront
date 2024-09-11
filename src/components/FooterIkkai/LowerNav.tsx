import * as React from "react";
import ReactSVG from "react-svg";
import { Gap } from "@components/atoms/Gap";

import airtelSVG from "images/footer-svgs/f-airtel.svg";
import amexSVG from "images/footer-svgs/f-amex.svg";
import freechargeSVG from "images/footer-svgs/f-freecharge.svg";
import mastercardSVG from "images/footer-svgs/f-mastercard.svg";
import mobikwikSVG from "images/footer-svgs/f-mobikwik.svg";
import olaSVG from "images/footer-svgs/f-ola.svg";
import payzappSVG from "images/footer-svgs/f-payzapp.svg";
import rupaySVG from "images/footer-svgs/f-rupay.svg";
import visaSVG from "images/footer-svgs/f-visa.svg";
import { NavLink } from "..";

//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";
//FIXME:NextJs Make it a CSS module
//import "./scss/lower-nav.scss";
import { TypedSecondaryMenuQuery } from "./queries";

class LowerNav extends React.PureComponent {
  render() {
    return (
      <div className="lower-nav">
        <Gap size="3rem" />

        <div className="icons-container">
          <ReactSVG className="icon-wrapper" path={airtelSVG} />
          <ReactSVG className="icon-wrapper" path={amexSVG} />
          <ReactSVG className="icon-wrapper" path={freechargeSVG} />
          <ReactSVG className="icon-wrapper" path={mastercardSVG} />
          <ReactSVG className="icon-wrapper" path={mobikwikSVG} />
          <ReactSVG className="icon-wrapper" path={olaSVG} />
          <ReactSVG className="icon-wrapper" path={payzappSVG} />
          <ReactSVG className="icon-wrapper" path={rupaySVG} />
          <ReactSVG className="icon-wrapper" path={visaSVG} />
        </div>
        <Gap size="1rem" />

        <div className="links-container">
          <TypedSecondaryMenuQuery>
            {({ data }) => {
              if (data.shop.navigation.secondary)
                return data.shop.navigation.secondary.items.map(
                  (item, index) => (
                    <div className="link-wrapper" key={index}>
                      <NavLink item={item} />
                      <div className="slash"> / </div>
                    </div>
                  )
                );
              return <> </>;
            }}
          </TypedSecondaryMenuQuery>
        </div>
        <Gap size="2rem" />

        <div className="copyright-text">&#169;2020-21 Ikkai Beauty.</div>
        <Gap size="3rem" />
      </div>
    );
  }
}

export default LowerNav;
