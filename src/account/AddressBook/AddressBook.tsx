import React, { useEffect, useRef } from "react";
import { useIntl } from "react-intl";
// FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";

import { checkoutMessages, commonMessages } from "@temp/intl";
import { useUser, useAuthState, useCart, UserFragment } from "@saleor/sdk";

import { useCustomLocation } from "@hooks/useCustomLocation";

import { getGclid, getUtmData } from "@temp/core/utils";

// import { getUserDetailsQuery } from "@saleor/sdk/lib/queries/user";
import { META_DEFAULTS } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import gtmConfig from "Themes/lib/gtmConfig.js";
import AddressFormModal from "@components/organisms/AddressFormModal/AddressFormModal";
import { AddressGrid } from "@components/organisms/AddressGrid";
import { ShopContext } from "../../components/ShopProvider/context";
import styles from "./scss/index.module.scss";
import { AddNewTile } from "@components/atoms/AddNewTile";
import { CachedImage } from "@components/molecules/CachedImage";

const AddressBook: React.FC<{
  user: UserFragment;
}> = ({ user }) => {
  const { setAccountDefaultAddress, deleteAccountAddress } = useUser();
  const { defaultCountry, countries } = React.useContext(ShopContext);
  const [displayNewModal, setDisplayNewModal] = React.useState(false);
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [addressData, setAddressData] = React.useState(null);

  const intl = useIntl();
  const targetRef = useRef(null);
  const userAddresses = user.addresses.map(address => {
    const addressToDisplay: any = { address: { ...address } };

    addressToDisplay.onEdit = () => {
      setDisplayEditModal(true);
      localStorage.setItem(
        "selectedAddress",
        JSON.stringify({
          address,
          id: address.id,
        })
      );
      setAddressData({
        address,
        id: address.id,
      });
    };

    addressToDisplay.onRemove = () => deleteAccountAddress(address.id);

    addressToDisplay.setDefault = (type: string) => {
      setAccountDefaultAddress({
        id: address.id,
        type: type === "BILLING" ? "BILLING" : "SHIPPING",
      });
    };
    return addressToDisplay;
  });
  const { user: customer } = useAuthState();
  const { items } = useCart();
  const { pathname } = useCustomLocation();
  useEffect(() => {
    const clevertap = makeClevertap();
    const utm_data = getUtmData(pathname);
    if (clevertapEvents.pageVisit.enable) {
      clevertap.event.push(clevertapEvents.pageVisit.value, {
        gaUserId: getGclid(),
        clickSource: utm_data,
        timeStamp: Date.now(),
        pageTitle: META_DEFAULTS.title,
        customerEmail: customer?.email,
        customerPhone: customer?.defaultBillingAddress?.phone,
        quantity: items?.length || 0,
        URL: window.location.href,
      });
    }
    if (gtmConfig.pageViews.enable) {
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      (window.dataLayer = window.dataLayer || []).push({
        event: gtmConfig.pageViews.value,
      });
    }
  }, []);

  return (
    <div className={styles.address_book_container}>
      {!displayNewModal && !displayEditModal &&
      <>
        <div className={styles.addresswrapper}>
          <span>Addresses</span>
        </div>
        {userAddresses.length==0 &&
        <div className={styles.Noaddress_content}>
          <div className={styles.Noaddress_icon}>
            {/* <img src="/plixlifefc/assets/No_address.png" /> */}
            <CachedImage 
            className="wb_sideicon"
            url="https://plixlifefc-media.farziengineer.co/hosted/No_address-d4eaea69e8ff.png"	
            isNextImage={true}	
            nextImageLayout="fill"	
            nextImageObjectFit="contain"	
          />
          </div>
          <p>No Addresses Added</p>
        </div>
        }
        <AddressGrid
          addresses={userAddresses}
          addNewAddress={() => {
            setDisplayNewModal(true);
          }}
          displayNewModal={displayNewModal}
        />
        <div className={styles.Add_adres_wrapper}>
          <button className={styles.Add_adress} onClick={()=>setDisplayNewModal(true)}>Add new address</button>
        </div>
         
      </>
      }
      <div id="address-modal-root" className={styles.modal_root2} ref={targetRef}></div>
      
      {displayNewModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayNewModal(false);
          }}
          userId={user.id}
          {...{ defaultValue: defaultCountry || {} }}
          submitBtnText={intl.formatMessage(commonMessages.add)}
          title={intl.formatMessage(checkoutMessages.addNewAddress)}
          {...{ countriesOptions: countries }}
          formId="address-form"
          target={typeof window !== "undefined" && document.getElementById("address-modal-root")}
        />
      )}
      {displayEditModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayEditModal(false);
          }}
          address={addressData}
          submitBtnText={intl.formatMessage(commonMessages.add)}
          title={intl.formatMessage({id:"edit-address", defaultMessage: "Edit address" })}
          {...{ countriesOptions: countries }}
          formId="address-form"
          target={typeof window !== "undefined" && document.getElementById("address-modal-root")}

        />
       )} 
    </div>
  );
};

export default AddressBook;