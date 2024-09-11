// import { IStoreAddress } from "@components/molecules/";
import { IStoreAddress } from "@components/molecules/StoreLocatorAddressContainer";
import React from "react";
import * as S from "./style";

export interface IStoreLocatorAddressProps {
  singleAddress: IStoreAddress;
}

enum AddressKeys {
  storeName = "Store Name: ",
  address = "Address: ",
  area = "Area: ",
}

export const StoreLocatorAddress: React.FC<IStoreLocatorAddressProps> = ({
  singleAddress: { storeName, address, area },
}) => {
  return (
    <>
      <S.Container>
        <div>
          {AddressKeys.storeName}
          {storeName}
        </div>
        <div>
          {AddressKeys.address}
          {address}
        </div>
        <div>
          {AddressKeys.area}
          {area}
        </div>
      </S.Container>
    </>
  );
};
StoreLocatorAddress.displayName = "StoreLocatorAddress";
export default StoreLocatorAddress;
