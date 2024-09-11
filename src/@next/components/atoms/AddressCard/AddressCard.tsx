import React from "react";
import { BlankScreen } from "../BlankScreen";
import Quantity from "./Quantity";
import * as AC from "./styles";

export interface IAddressCardProps {
  info: any;
  color?: string;
}

export const AddressCard: React.FC<IAddressCardProps> = ({ info, color }) => {
  const weight = info?.items ? `${info?.items[0]?.itemQuantity}kg` : "--";
  const addressArr = info.shippingAddress.edges;
  return (
    <>
      <h3>Shipping Addresses</h3>
      {addressArr.length !== 0 ? (
        addressArr.map((item: any, index: any) => {
          const {
            node: {
              city,
              cityArea,
              firstName,
              country,
              companyName,
              lastName,
              postalCode,
              streetAddress1,
              streetAddress2,
            },
          } = item;
          return (
            <AC.AddressCard key={index}>
              <AC.Heading>
                Unloading address ({`${index + 1}/${addressArr.length}`})
              </AC.Heading>
              <Quantity fieldOne="QUANTITY" fieldTwo={weight} />
              <AC.Address>
                <h3>{`${companyName}`}</h3>
                <p>{`${firstName} ${lastName}`}</p>
                <p>{`${streetAddress1}`}</p>
                <p>{`${streetAddress2}`}</p>
                <p>{`${city} ${cityArea} ${country.country}`}</p>
                <p>{`${postalCode}`}</p>
              </AC.Address>
            </AC.AddressCard>
          );
        })
      ) : (
        <BlankScreen
          info="There is no Shipping Address
      for this dispatch!"
          color={color}
        />
      )}
    </>
  );
};
AddressCard.displayName = "AddressCard";
export default AddressCard;
