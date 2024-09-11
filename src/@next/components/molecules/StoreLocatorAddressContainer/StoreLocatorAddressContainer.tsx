import { StoreLocatorAddress } from "@components/atoms/StoreLocatorAddress";
import React from "react";
import * as S from "./style";

export interface IStoreAddress {
  storeName: string;
  address: string;
  area: string;
}

export interface IStoreLocatorAddressContainerProps {
  addressList: IStoreAddress[];
}

export const StoreLocatorAddressContainer: React.FC<IStoreLocatorAddressContainerProps> = ({
  addressList,
}) => {
  return (
    <>
      <S.Container>
        {addressList.map(address => (
          <StoreLocatorAddress key={address.address} singleAddress={address} />
        ))}
      </S.Container>
    </>
  );
};
StoreLocatorAddressContainer.displayName = "StoreLocatorAddressContainer";
export default StoreLocatorAddressContainer;
