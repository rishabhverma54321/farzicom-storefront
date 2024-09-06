// @ts-ignore
import { AddressTypes } from "@saleor/sdk";
import { IAddressWithEmail } from ".";

export interface IAddressWithEmailAndTypes extends IAddressWithEmail {
  addressLabel?: string;
  type?: AddressTypes;
}
