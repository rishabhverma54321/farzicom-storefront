import React from "react";

import { AddNewTile } from "@components/atoms/AddNewTile";
import { TileGrid } from "@components/atoms/TileGrid";

import { AddressTile } from "@components/molecules/AddressTile";

import { IProps } from "./types";

/**
 * Addresses tiles with add new address tile opening address form addition modal.
 */
export const AddressGrid: React.FC<IProps> = ({
  addresses,
  addNewAddress,
}: IProps) => {
  // const addNewTile = (
  //   <AddNewTile key="newTile" type="address" onClick={addNewAddress} />
  // );

  const addressTiles = addresses.reduce(
    (elements, address,i) => {
      elements.push(
        <AddressTile key={`addressTile-${address.id}`} {...address} index={i}/>
      );
      return elements;
    },
    []
  );

  return <div className="address_tile_wrapper"><TileGrid columns={2} elements={addressTiles} updateWidth={true}/></div> ;
};
