import { ApolloQueryResult } from "@apollo/client";
import ShopNext from "@components/farzicom-ui-kit/ShopNext";
import { PlixShop } from "@components/organisms/PlixShop";
import React from "react";
import { ShopNextProducts } from "../../gqlTypes/ShopNextProducts";
import { ShopPage } from "../../gqlTypes/ShopPage";
import { IShopNextProductsWithID } from "../../shop.page";

interface IShopV1 {
  collectionDataArray: IShopNextProductsWithID[];
  shopPageData: ApolloQueryResult<ShopPage>;
  shopMeta?: any;
}

const ShopV1: React.FC<IShopV1> = ({
  collectionDataArray,
  shopPageData,
  shopMeta,
}) => {
  return (
    <>
      {/* <PlixShop content={shopPageData.data.page} /> */}
      <ShopNext
        type="shop"
        data={{
          shopPageData,
          collectionDataArray,
          shopMeta,
        }}
      />
    </>
  );
};
ShopV1.displayName = "ShopV1";
export default React.memo(ShopV1);
