import React from "react";
import { useIntl, FormattedMessage } from "react-intl";

import { Address } from "@components/atoms/Address";
import { DropdownMenu } from "@components/atoms/DropdownMenu";
import { Tile } from "@components/atoms/Tile";
import { IconButton } from "@components/atoms/IconButton";

import * as S from "./styles";
import { IProps } from "./types";
import MemoGreenTickIcon from "@components/atoms/SvgIcons/GreenTickIcon";
import MemoGreenTickSvg from "@components/atoms/SvgIcons/GreenTickSvg";
import MemoAddressTickIcon from "@components/atoms/SvgIcons/AddressTickIcon";
import MemoEditNewIcon from "@components/atoms/SvgIcons/EditNewIcon";
import MemoTrashNewIcon from "@components/atoms/SvgIcons/TrashINewcon";
import { customEventTrigger, getMetadataValue, parseJson } from "@utils/misc";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { useAuthState } from "@saleor/sdk";

const defaultShippingAddress = (
  <S.MenuItem>
    <FormattedMessage defaultMessage="Set as default shipping address" />
  </S.MenuItem>
);
const defaultBillingAddress = (
  <S.MenuItem>
    <FormattedMessage defaultMessage="Set as default billing address" />
  </S.MenuItem>
);

export const AddressTile: React.FC<IProps> = ({
  onEdit,
  onRemove,
  setDefault,
  address,
  index
}: IProps) => {
  const intl = useIntl();
  const {user} = useAuthState();
  const header = (
    <S.HeaderContent>
      <S.HeaderContentWrapper>
        <S.FooterContent>
          {/* <div>
            <IconButton
              testingContext="editButton"
              name="edit"
              onClick={onEdit}
              size={22}
            />
          </div> */}
          <div onClick={()=> {
            onEdit();
            if(gtmConfig.updateAddressClick.enable){
              customEventTrigger(gtmConfig.updateAddressClick.value, user, {
                cta_name: "edit_icon_click"
              });
            }
          }}>
            <MemoEditNewIcon />
          </div>
          {/* <div>
            <IconButton
              testingContext="removeButton"
              name="trash"
              onClick={onRemove}
              size={19}
            />
          </div> */}
          <div onClick={()=> {
            onRemove();
            if(gtmConfig.updateAddressClick.enable){
              customEventTrigger(gtmConfig.updateAddressClick.value, user, {
                cta_name: "delete_icon_click"
              });
            }
          }}>
            <MemoTrashNewIcon />
          </div>
        </S.FooterContent>
        <DropdownMenu
          type="clickable"
          header={
            <IconButton testingContext="expandButton" name="expand" size={24} />
          }
          items={[
            {
              content: defaultBillingAddress,
              onClick: () => {
                setDefault("BILLING");
              },
              testingContext: "set-billing",
            },
            {
              content: defaultShippingAddress,
              onClick: () => {
                setDefault("SHIPPING");
              },
              testingContext: "set-shipping",
            },
          ]}
        />

      </S.HeaderContentWrapper>
      <S.Addressnum>Address {index+1}</S.Addressnum>

      {/* {address.isDefaultBillingAddress && address.isDefaultShippingAddress
        ? intl.formatMessage({ defaultMessage: "Default Address" })
        : address.isDefaultShippingAddress
        ? intl.formatMessage({ defaultMessage: "Default Shipping Address" })
        : address.isDefaultBillingAddress
        ? intl.formatMessage({ defaultMessage: "Default Billing Address" })
        : null} */}
    </S.HeaderContent>
  );
  // const footer = (
  //   <S.FooterContent>
  //     <div>
  //       <IconButton
  //         testingContext="editButton"
  //         name="edit"
  //         onClick={onEdit}
  //         size={22}
  //       />
  //     </div>
  //     <div>
  //       <IconButton
  //         testingContext="removeButton"
  //         name="trash"
  //         onClick={onRemove}
  //         size={19}
  //       />
  //     </div>
  //   </S.FooterContent>
  // );

  const footer = (
      <>
      {(address.isDefaultBillingAddress || address.isDefaultShippingAddress) && 
      <S.DefaultAddress>
        <MemoAddressTickIcon />
        <p>
          {address.isDefaultBillingAddress && address.isDefaultShippingAddress
            ? intl.formatMessage({ defaultMessage: "Default Address" })
            : address.isDefaultShippingAddress
            ? intl.formatMessage({ defaultMessage: "Default Shipping Address" })
            : address.isDefaultBillingAddress
            ? intl.formatMessage({ defaultMessage: "Default Billing Address" })
            : null}
        </p>
      </S.DefaultAddress>
      }
      </>
    );

  const address_type =
  getMetadataValue(address?.metadata, "address_type") &&
  parseJson(getMetadataValue(address?.metadata, "address_type"));
  const content = <Address {...address} updateAddressstyle={true} address_type={address_type}/>;
  return (
    <S.Wrapper
      data-test-billing-default={address.isDefaultBillingAddress}
      data-test-shipping-default={address.isDefaultShippingAddress}
    >
      <Tile footer={footer} header={header}>
        {content}
      </Tile>
    </S.Wrapper>
  );
};
