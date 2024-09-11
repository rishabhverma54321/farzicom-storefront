import { YarnAddress } from "@components/atoms/YarnAddress";
import React from "react";
import BlankScreen from "../../atoms/BlankScreen";

export interface IAddressGridProps {
  userInfo: any;
}

export const AddressGrid: React.FC<IAddressGridProps> = ({ userInfo }) => {
  const isDefaultShippingPresent = userInfo.defaultShippingAddress
    ? true
    : false;
  return (
    <div className={userInfo?.shippingAddress.length && "grid"}>
      {userInfo.defaultShippingAddress && (
        <YarnAddress
          title="Address 1 - Default Shipping"
          name={`${userInfo.defaultShippingAddress?.firstName || ""}  ${
            userInfo.defaultShippingAddress?.lastName || ""
          }`}
          companyName={userInfo.defaultShippingAddress?.companyName || ""}
          id={userInfo.defaultShippingAddress?.id}
          addressL1={userInfo.defaultShippingAddress?.streetAddress1 || ""}
          addressL2={userInfo.defaultShippingAddress?.streetAddress2 || ""}
          addressL3={`${userInfo.defaultShippingAddress?.city}, ${userInfo.defaultShippingAddress?.country?.country}`}
          pincode={userInfo.defaultShippingAddress?.postalCode || ""}
          // bgColor="white"
        />
      )}
      {userInfo?.shippingAddress?.map((item: any, idx: number) => (
        <YarnAddress
          title={`Address ${isDefaultShippingPresent ? idx + 2 : idx + 1}`}
          name={`${item?.node?.firstName ? item?.node?.firstName : ""} ${
            item?.node?.lastName ? item?.node?.lastName : ""
          }`}
          companyName={item?.node?.companyName ? item?.node?.companyName : ""}
          id={item?.node?.id ? item?.node?.id : ""}
          addressL1={item?.node?.streetAddress1}
          addressL2={item?.node?.streetAddress2}
          addressL3={`${item?.node?.city} ${item?.node?.countryArea} ${item?.node?.country?.country}`}
          pincode={item?.node?.postalCode}
          key={idx}
        />
      ))}
      {!userInfo?.shippingAddress.length &&
        !userInfo?.defaultShippingAddress && (
          <BlankScreen info="No Address added yet!" color="#005BC2" />
        )}
    </div>
  );
};
AddressGrid.displayName = "AddressGrid";
export default AddressGrid;
