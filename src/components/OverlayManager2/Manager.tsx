import * as React from "react";

import { OverlayContext2, OverlayType2 } from "..";

import CouponOffers from "./CouponOffers";
import MonthlyPack from "./MonthlyPack";
import PageExitWarning from "./PageExitWarning";

const OverlayManager2: React.FC = () => (
  <OverlayContext2.Consumer>
    {overlay => {
      switch (overlay.type) {
        case OverlayType2.CouponOffers:
          return (
            <CouponOffers overlay={overlay} testingContext="couponCodeModal" />
          );
        case OverlayType2.monthlypack:
          return (
            <MonthlyPack overlay={overlay} testingContext="monthlypackModal" />
          );
        case OverlayType2.pageExitWarning:
          return (
            <PageExitWarning overlay={overlay} testingContext="pagexitModal" />
          );

        default:
          return null;
      }
    }}
  </OverlayContext2.Consumer>
);

export default OverlayManager2;
