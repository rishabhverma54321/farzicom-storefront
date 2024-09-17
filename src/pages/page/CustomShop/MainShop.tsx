import React from "react";
import ShopV1 from "./ShopVariants/ShopV1";

const MainShop = ({ collectionDataArray, shopPageData, shopMeta }) => {
  const shopVariant: any = "v1";
  switch (shopVariant) {
    case "v1":
      return (
        <ShopV1
          collectionDataArray={collectionDataArray}
          shopPageData={shopPageData}
          shopMeta={shopMeta}
        />
      );
  }
};
MainShop.displayName = "MainShop";
export default React.memo(MainShop);
