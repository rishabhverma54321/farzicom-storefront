import MemoBackArrow from "@components/atoms/SvgIcons/BackArrow";
import MemoDownArrowDropdown from "@components/atoms/SvgIcons/DownArrowDropDown";
import MemoEditPenIcon from "@components/atoms/SvgIcons/EditPenIcon";
import Input from "@components/farzicom-ui-kit/Input";
import Select from "@components/farzicom-ui-kit/Select";
import { CircularProgress } from '@mui/material';
import {
  AddressFragment,
  useAuthState,
  useCartState,
  useCheckout,
  useUser,
} from "@saleor/sdk";
import {
  CheckoutFormActionTypes,
  IAddressField,
  IIAddressFieldNames,
  onFocusOut,
  onInputChange,
  validateInput,
} from "@temp/pages/checkout/formUtilsNew";
import React, { useEffect, useState } from "react";
import MemoLocationMarker from "@components/atoms/SvgIcons/LocationMarker";
import MemoFormCloseXIcon from "@components/atoms/SvgIcons/FormCloseXIcon";
import { getMetadataValue, parseJson, truncateString } from "@utils/misc";
import MemoDeliveryTruck from "@components/atoms/SvgIcons/DeliveryTruckIcon";
import { CachedImage } from "@components/molecules/CachedImage";
import styles from "../index.module.scss";
import styles2 from "../index-2.module.scss";
import * as S2 from "../styles";
import newStyles from "./index.module.scss";

export const UserAddresses: React.FC<{
  isLoading: boolean;
  currentCheckoutStep: number;
  setCurrentCheckoutStep: React.Dispatch<React.SetStateAction<number>>;
  addressFileds2: IAddressField[][];
  dispatch: React.Dispatch<any>;
  formState: any;
  // addressFileds2Copy: any;
  addOrUpdateUserAddress: (
    address_id?: string | null | undefined,
    putEmailInUserMeta?: boolean
  ) => Promise<void>;
  setAddressOnEditMode: React.Dispatch<React.SetStateAction<string>>;
  handleNewFormToggle: (userMail: any) => void;
  handleAddressChange: (add_id: string) => void;
  onAddressEditClick: (address_id: string, validateMail: boolean) => void;
  addressOnEditMode: string;
  selectedAddressId: string;
  setSelectedAddressId: React.Dispatch<React.SetStateAction<string>>;
  currentlySelectedAddressData: AddressFragment;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckoutError: React.Dispatch<React.SetStateAction<string>>;
  setCheckoutLoading: React.Dispatch<React.SetStateAction<boolean>>;
  totalPrice: number;
  badgeSectionData: any;
  setPaymentStep: any;
}> = ({
  isLoading,
  currentCheckoutStep,
  setCurrentCheckoutStep,
  addressFileds2,
  dispatch,
  formState,
  addOrUpdateUserAddress,
  setAddressOnEditMode,
  handleNewFormToggle,
  handleAddressChange,
  onAddressEditClick,
  addressOnEditMode,
  setSelectedAddressId,
  selectedAddressId,
  currentlySelectedAddressData,
  modalOpen,
  setModalOpen,
  setCheckoutError,
  setCheckoutLoading,
  totalPrice,
  badgeSectionData,
  setPaymentStep,
}) => {
  const { user, authenticated } = useAuthState();
  const useCheckoutRes = useCheckout();
  const { deleteAccountAddress } = useUser();

  const onAccountAddressDelete = async (add_id: string) => {
    if (add_id) {
      setCheckoutLoading(true);
      try {
        const res = await deleteAccountAddress(add_id);
        const errorMessage =
          (res?.errors?.length && res?.errors[0]?.message) ||
          (res?.data?.accountAddressDelete?.accountErrors?.length &&
            res?.data?.accountAddressDelete?.accountErrors[0]?.message);
        if (errorMessage) {
          setCheckoutError(errorMessage);
          setCheckoutLoading(false);
          return;
        }
        if (add_id === selectedAddressId) {
          setSelectedAddressId("");
        }
      } catch (err) {
        console.log("Failed to delete account address", err);
      }
      setCheckoutLoading(false);
    }
  };

  const userAltEmail =
    getMetadataValue(user?.metadata, "alt_email") &&
    parseJson(getMetadataValue(user?.metadata, "alt_email"));
  const validUserMail =
    typeof user?.email === "string" && user?.email.includes("@example.com")
      ? userAltEmail
      : user?.email;

  const addressFieldsToDisplay =
    !!validUserMail && Array.isArray(addressFileds2)
      ? addressFileds2.slice(0, -1)
      : addressFileds2;

  useEffect(() => {
    if (user?.addresses?.length === 0 && currentCheckoutStep !== 2) {
      setCurrentCheckoutStep(2);
    }
  }, [user?.addresses?.length]);

  if (!modalOpen) {
    return (
      <>
        {currentCheckoutStep === 2 ? (
          <>
            <div
              className={`${newStyles.modalBackground} ${newStyles.onlySmallScreen}`}
            />
            <S2.NewFormWrapper
              className={`${styles.checkoutFormWrapper} ${newStyles.newUserFormWrapper}`}
            >
              <form id="checkoutAddressForm" className={styles.form}>
                <div className={styles.formFieldsContainer}>
                  {user && user?.addresses?.length === 0 ? (
                    <></>
                  ) : (
                    <div
                      className={styles.formBackButton}
                      onClick={() => {
                        setAddressOnEditMode("");
                        setCurrentCheckoutStep(3);
                      }}
                    >
                      <MemoBackArrow height={18} width={18} />
                    </div>
                  )}
                  <>
                    {addressFieldsToDisplay.map((rows, index) => {
                      return (
                        <div>
                          <div className={styles.row} key={index}>
                            {rows.map(row => {
                              if (row.type === "select") {
                                return (
                                  <div
                                    className={styles.inputErroDiv}
                                    key={row.name}
                                  >
                                    <Select
                                      key={row.name}
                                      variant={1}
                                      customStyles={styles}
                                      name={row.name}
                                      id={row.id}
                                      placeholder={row.placeholder}
                                      value={
                                        row.value || formState[row.name].value
                                      }
                                      // label={row.label}
                                      autoComplete={row.autoComplete}
                                      inputMode={row.inputMode}
                                      selectOptions={row?.selectOptions || []}
                                      onChange={e => {
                                        onInputChange(
                                          row.name,
                                          e.target.value,
                                          dispatch,
                                          formState,
                                          useCheckoutRes
                                        );
                                      }}
                                      onBlur={e => {
                                        onFocusOut(
                                          row.name,
                                          e.target.value,
                                          dispatch,
                                          formState,
                                          useCheckoutRes
                                        );
                                      }}
                                    />
                                    {formState[row.name].touched &&
                                      formState[row.name].hasError && (
                                        <div className={styles.errorMessage}>
                                          {formState[row.name].error}
                                        </div>
                                      )}
                                  </div>
                                );
                              }
                              return (
                                <>
                                  {row.id === "phone" ? (
                                    // <div className={styles.countryCodePrefix}>
                                    <div
                                      className={styles.countryCodePrefix}
                                      key={row.name}
                                    >
                                      <Input
                                        key="Country code"
                                        variant={1}
                                        customStyles={styles}
                                        type="text"
                                        name="Country code"
                                        id="country code"
                                        disabled
                                        placeholder="+91"
                                        // value="+91"
                                      />
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div
                                    className={styles.inputErroDiv}
                                    key={row.name}
                                  >
                                    <Input
                                      key={row.name}
                                      variant={1}
                                      customStyles={styles}
                                      type={row.type}
                                      name={row.name}
                                      id={row.id}
                                      // label={row.label}
                                      placeholder={row.placeholder}
                                      value={formState[row.name].value}
                                      autoComplete={row.autoComplete}
                                      inputMode={row.inputMode}
                                      isValidated={
                                        !validateInput(
                                          row.name,
                                          formState[row.name]?.value,
                                          dispatch,
                                          formState,
                                          useCheckoutRes
                                        )?.hasError
                                      }
                                      // showValidityTick
                                      onChange={e => {
                                        onInputChange(
                                          row.name,
                                          e.target.value,
                                          dispatch,
                                          formState,
                                          useCheckoutRes
                                        );
                                      }}
                                      onBlur={e => {
                                        if (
                                          row.name !==
                                          IIAddressFieldNames.POSTAL_CODE
                                        ) {
                                          onFocusOut(
                                            row.name,
                                            e.target.value,
                                            dispatch,
                                            formState,
                                            useCheckoutRes
                                          );
                                        }
                                      }}
                                    />
                                    {formState[row.name].touched &&
                                      formState[row.name].hasError && (
                                        <div className={styles.errorMessage}>
                                          {formState[row.name].error}
                                        </div>
                                      )}
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          {rows.map(row => {
                            if (row.subText) {
                              return (
                                <div className={styles.inputSubtext}>
                                  {row.subText}
                                </div>
                              );
                            }
                          })}
                        </div>
                      );
                    })}
                  </>
                </div>
              </form>
              {badgeSectionData ? (
                <div className={styles.badgeList}>
                  {Array.isArray(badgeSectionData?.badges) && (
                    <>
                      {badgeSectionData?.badges?.map(badge => {
                        return (
                          <div className={styles.badge}>
                            <CachedImage url={badge?.image} />
                            <span>{badge?.text}</span>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
              <button
                className={newStyles.submitButton}
                type="button"
                onClick={() => {
                  if (user?.phone && formState?.phone?.value !== user?.phone) {
                    dispatch({
                      type: CheckoutFormActionTypes.UPDATE_FORM_VALUE,
                      data: {
                        name: IIAddressFieldNames.PHONE,
                        value: user?.phone,
                        hasError: false,
                        error: "",
                        touched: true,
                        isFormValid: formState.isFormValid,
                      },
                    });
                  }
                  addOrUpdateUserAddress(null, !userAltEmail);
                }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress /> : "Save Address"}
              </button>
            </S2.NewFormWrapper>
          </>
        ) : currentCheckoutStep === 3 ? (
          <>
            <div className={styles.paymentStepAddressBox}>
              <div className={styles.addressDisplayBar}>
                <div>
                  <div>
                    <MemoLocationMarker />
                    Delivery to {currentlySelectedAddressData?.postalCode}
                  </div>
                </div>

                <div>
                  {truncateString(currentlySelectedAddressData?.streetAddress1)}
                  <span
                    onClick={() => {
                      setModalOpen(true);
                      //   openAddressForm();
                    }}
                    className={styles.changeButton}
                  >
                    CHANGE
                  </span>
                </div>
              </div>
            </div>
            <button
              className={newStyles.submitButton}
              type="button"
              onClick={() => setCurrentCheckoutStep(4)}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress /> : "Continue"}
            </button>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
  return (
    <>
      <div className={newStyles.modalBackground}>
        <div className={newStyles.modalWrapper}>
          <div className={newStyles.formCloseButton}>
            <span
              onClick={() => {
                if (!selectedAddressId) {
                  setCheckoutError("Please select or save a delivery address.");
                  return;
                }
                setModalOpen(false);
                setAddressOnEditMode("");
                setPaymentStep(1);
                setCurrentCheckoutStep(prevStep =>
                  prevStep === 3 ? 4 : user?.addresses?.length ? 3 : 2
                );
              }}
            >
              <MemoFormCloseXIcon />
            </span>
          </div>
          <div className={newStyles.modalContent}>
            {currentCheckoutStep === 2 ? (
              <>
                <S2.NewFormWrapper className={styles.checkoutFormWrapper}>
                  <div className={newStyles.modalAddressWrapper}>
                    <form id="checkoutAddressForm" className={styles.form}>
                      <div className={styles.formFieldsContainer}>
                        {user && user?.addresses?.length === 0 ? (
                          <></>
                        ) : (
                          <div
                            className={styles.formBackButton}
                            onClick={() => {
                              setCurrentCheckoutStep(3);
                              setAddressOnEditMode("");
                            }}
                          >
                            <MemoBackArrow height={18} width={18} />
                          </div>
                        )}
                        <>
                          {addressFieldsToDisplay.map((rows, index) => {
                            return (
                              <div>
                                <div className={styles.row} key={index}>
                                  {rows.map(row => {
                                    if (row.type === "select") {
                                      return (
                                        <div
                                          className={styles.inputErroDiv}
                                          key={row.name}
                                        >
                                          <Select
                                            key={row.name}
                                            variant={1}
                                            customStyles={styles}
                                            name={row.name}
                                            id={row.id}
                                            placeholder={row.placeholder}
                                            value={
                                              row.value ||
                                              formState[row.name].value
                                            }
                                            // label={row.label}
                                            autoComplete={row.autoComplete}
                                            inputMode={row.inputMode}
                                            selectOptions={
                                              row?.selectOptions || []
                                            }
                                            onChange={e => {
                                              onInputChange(
                                                row.name,
                                                e.target.value,
                                                dispatch,
                                                formState,
                                                useCheckoutRes
                                              );
                                            }}
                                            onBlur={e => {
                                              onFocusOut(
                                                row.name,
                                                e.target.value,
                                                dispatch,
                                                formState,
                                                useCheckoutRes
                                              );
                                            }}
                                          />
                                          {formState[row.name].touched &&
                                            formState[row.name].hasError && (
                                              <div
                                                className={styles.errorMessage}
                                              >
                                                {formState[row.name].error}
                                              </div>
                                            )}
                                        </div>
                                      );
                                    }
                                    return (
                                      <>
                                        {row.id === "phone" ? (
                                          // <div className={styles.countryCodePrefix}>
                                          <div
                                            className={styles.countryCodePrefix}
                                            key={row.name}
                                          >
                                            <Input
                                              key="Country code"
                                              variant={1}
                                              customStyles={styles}
                                              type="text"
                                              name="Country code"
                                              id="country code"
                                              disabled
                                              placeholder="+91"
                                              // value="+91"
                                            />
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        <div
                                          className={styles.inputErroDiv}
                                          key={row.name}
                                        >
                                          <Input
                                            key={row.name}
                                            variant={1}
                                            customStyles={styles}
                                            type={row.type}
                                            name={row.name}
                                            id={row.id}
                                            // label={row.label}
                                            placeholder={row.placeholder}
                                            value={formState[row.name].value}
                                            autoComplete={row.autoComplete}
                                            inputMode={row.inputMode}
                                            isValidated={
                                              !validateInput(
                                                row.name,
                                                formState[row.name]?.value,
                                                dispatch,
                                                formState,
                                                useCheckoutRes
                                              )?.hasError
                                            }
                                            // showValidityTick
                                            onChange={e => {
                                              onInputChange(
                                                row.name,
                                                e.target.value,
                                                dispatch,
                                                formState,
                                                useCheckoutRes
                                              );
                                            }}
                                            onBlur={e => {
                                              if (
                                                row.name !==
                                                IIAddressFieldNames.POSTAL_CODE
                                              ) {
                                                onFocusOut(
                                                  row.name,
                                                  e.target.value,
                                                  dispatch,
                                                  formState,
                                                  useCheckoutRes
                                                );
                                              }
                                            }}
                                          />
                                          {formState[row.name].touched &&
                                            formState[row.name].hasError && (
                                              <div
                                                className={styles.errorMessage}
                                              >
                                                {formState[row.name].error}
                                              </div>
                                            )}
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                                {rows.map(row => {
                                  if (row.subText) {
                                    return (
                                      <div className={styles.inputSubtext}>
                                        {row.subText}
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            );
                          })}
                        </>
                      </div>
                    </form>
                  </div>
                  <div
                    className={
                      newStyles.saveAddressButtonWithTotalAmountWrapper
                    }
                  >
                    <div className={newStyles.saveAddressButtonWithTotalAmount}>
                      {totalPrice && <span>Total &#8377;{totalPrice}</span>}

                      <button
                        className={newStyles.submitButton}
                        type="button"
                        onClick={() =>
                          addOrUpdateUserAddress(addressOnEditMode)
                        }
                        disabled={isLoading}
                      >
                        {isLoading ? <CircularProgress /> : "Save Address"}
                      </button>
                    </div>
                  </div>
                </S2.NewFormWrapper>
              </>
            ) : currentCheckoutStep === 3 &&
              authenticated &&
              user &&
              user?.addresses &&
              Array.isArray(user.addresses) &&
              user?.addresses.length ? (
              <>
                <S2.SavedAddressContainer
                  className={styles.addressContainer}
                  disabled={isLoading}
                >
                  <>
                    <div className={newStyles.deliveryTruckLabel}>
                      <MemoDeliveryTruck />
                      <span>Delivery in 2-3 days.</span>
                    </div>
                    <div className={styles.addressContainerHeader}>
                      <span>Saved Addresses :</span>
                    </div>
                    <div className={newStyles.addressList}>
                      {user?.addresses?.map((address, idx) => {
                        const isSelectedAddress =
                          selectedAddressId === address?.id;

                        const addressInString = `${address?.streetAddress1}, ${
                          address?.city
                        },${" "}
                      ${address?.countryArea}, ${address?.postalCode}`;
                        return (
                          <div
                            className={styles.savedAddressUnit}
                            onClick={() => handleAddressChange(address?.id)}
                          >
                            <S2.SavedAddressBar isSelected={isSelectedAddress}>
                              <div>
                                <div>
                                  <Input
                                    // key={row.name}
                                    label={<></>}
                                    checked={isSelectedAddress}
                                    variant={1}
                                    customStyles={styles}
                                    customStylesName={
                                      isSelectedAddress
                                        ? "userNotificationInputContainer-checked"
                                        : "userNotificationInputContainer"
                                    }
                                  />
                                </div>
                                <div>
                                  <div>
                                    {truncateString(addressInString, 80)}
                                  </div>
                                  <div
                                    className={
                                      newStyles.savedAddressUnitButtons
                                    }
                                  >
                                    {selectedAddressId === address?.id ? (
                                      <>
                                        <span
                                          onClick={e => {
                                            e.stopPropagation();
                                            setAddressOnEditMode(prev_id =>
                                              prev_id === address?.id
                                                ? ""
                                                : address?.id
                                            );
                                            onAddressEditClick(
                                              address?.id,
                                              !validUserMail
                                            );
                                          }}
                                        >
                                          Edit
                                        </span>
                                        <span
                                          onClick={e => {
                                            e.stopPropagation();
                                            onAccountAddressDelete(address?.id);
                                          }}
                                        >
                                          Delete
                                        </span>{" "}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </S2.SavedAddressBar>
                          </div>
                        );
                      })}
                    </div>
                  </>
                  <div className={newStyles.addressButtonList}>
                    <button
                      className={newStyles.addAddressButton}
                      type="button"
                      onClick={() => {
                        setAddressOnEditMode("");
                        handleNewFormToggle(validUserMail);
                      }}
                      disabled={isLoading}
                    >
                      + Add Address
                    </button>
                    <button
                      style={{ margin: "0.25rem 0rem 1rem" }}
                      className={newStyles.submitButton}
                      type="button"
                      onClick={() => {
                        if (!selectedAddressId) {
                          setCheckoutError("Please select a delivery address.");
                          return;
                        }
                        setModalOpen(false);
                        setCurrentCheckoutStep(4);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? <CircularProgress /> : "Save"}
                    </button>
                  </div>
                </S2.SavedAddressContainer>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
