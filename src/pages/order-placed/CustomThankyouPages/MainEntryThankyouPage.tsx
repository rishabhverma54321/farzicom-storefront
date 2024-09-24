import React from "react";
import ThankyouPageV1 from "./ThankyouPageVariants/ThankyouPageV1/ThankyouPageV1";
import ThankyouPageV2 from "./ThankyouPageVariants/ThankyouPageV2/ThankyouPageV2";

const MainEntryThankyoupage = ({ headerAndFooterData, shopMeta }) => {
  const checkoutVariant: any = "V2";
  switch (checkoutVariant) {
    case "V1":
      return (
        <ThankyouPageV1
          headerAndFooterData={headerAndFooterData}
          shopMeta={shopMeta}
        />
      );
    case "V2":
      return (
        <ThankyouPageV2
          headerAndFooterData={headerAndFooterData}
          shopMeta={shopMeta}
        />
      );
  }
};

MainEntryThankyoupage.displayName = "MainEntryThankyoupage";
export default React.memo(MainEntryThankyoupage);
