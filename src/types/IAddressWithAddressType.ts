import { IAddress } from ".";

export interface IAddressWithAddressType extends IAddress {
  metadata?: any;
  isDefaultShippingAddress: boolean;
  isDefaultBillingAddress: boolean;
}
