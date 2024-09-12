import React, { useEffect, useState, useContext } from "react";
import styles from "./index.module.scss";
import MemoNewCartcloseIcon from "@components/atoms/SvgIcons/NewCartcloseIcon";
import { ShopMetaContext } from "@temp/pages/_app.page";
import { getMetadataValue, parseJson } from "@utils/misc";
import MemoDropDownSvg from "@components/atoms/SvgIcons/MemoDropDownSvg";
import ButtonNext from "../ButtonNext";
import MyCustomLink from "@components/next-react/MyCustomLink";
import parse from "html-react-parser";
import { useMutation } from "@apollo/client";
import { privacyPolicy, termsConditions } from "@temp/themes/plixlifefc/config";
import { OrderCancelByCustomer } from "@temp/pages/order-history/queries";
import { CircularProgress } from "@mui/material";
import { CachedImage } from "@components/molecules/CachedImage";

const OrderCancelSection = ({
  orderCancelStatus,
  setOrderCancelStatus,
}: {
  orderCancelStatus: any;
  setOrderCancelStatus: any;
}) => {
  const perpaidOrder =
    orderCancelStatus?.order?.paymentStatus === "FULLY_CHARGED";
  const [currStep, setcurrStep] = useState(0);
  const shopMetaDataValue = useContext(ShopMetaContext);
  const [showlist, setShowList] = useState(false);
  const [otherReason, setOtherReason] = useState("");
  const [errorPopup, setErrorPopup] = useState(
    perpaidOrder || orderCancelStatus?.awbNumber || false
  );
  const [uniwareError, setUniwareError] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [loader, setloader] = useState(false);
  useEffect(() => {
    let rootComponent = document?.querySelector(".root-component-container");
    if (rootComponent && orderCancelStatus?.open) {
      rootComponent.style.touchAction = "none";
      rootComponent.addEventListener("wheel", handlePreventScroll);
      return () => {
        rootComponent.style.touchAction = "unset";
        rootComponent.removeEventListener("wheel", handlePreventScroll);
      };
    }
    return () => {
      setOrderCancelStatus({
        ...orderCancelStatus,
        open: false,
        order: "",
        awbNumber: "",
      });
    };
  }, []);

  const shopifyOrderID =
    orderCancelStatus?.order?.metadata &&
    getMetadataValue(orderCancelStatus?.order?.metadata, "shopify_order_id") &&
    parseJson(
      getMetadataValue(orderCancelStatus?.order?.metadata, "shopify_order_id")
    );

  const shopifyOrderName =
    orderCancelStatus?.order?.metadata &&
    getMetadataValue(
      orderCancelStatus?.order?.metadata,
      "shopify_order_name"
    ) &&
    parseJson(
      getMetadataValue(orderCancelStatus?.order?.metadata, "shopify_order_name")
    );

  let actualOrderId =
    (orderCancelStatus?.order?.metadata && shopifyOrderName) ||
    orderCancelStatus?.order?.number;

  const isPushedToShopify = shopifyOrderID && shopifyOrderName;

  const handleEnableChildScroll = (event: any, component: any) => {
    const delta = event.deltaY;
    const scrollStep = 100;
    const currentScroll = component.scrollTop;
    const newScroll = currentScroll + delta * scrollStep;
    component.scrollTo({
      top: newScroll,
      behavior: "smooth",
    });
    event.preventDefault();
  };

  useEffect(() => {
    let orderCancelReasonList = document?.querySelector(
      "#ordercancel-reasonlist"
    );
    if (currStep === 1 && orderCancelReasonList) {
      orderCancelReasonList?.addEventListener("wheel", event => {
        handleEnableChildScroll(event, orderCancelReasonList);
      });
      return () => {
        orderCancelReasonList.removeEventListener("wheel", event => {
          handleEnableChildScroll(event, orderCancelReasonList);
        });
      };
    }
  }, [currStep]);

  const handleClickCancel = async (orderCancelMutation: any) => {
    if (currStep === 1) {
      if(reason.length > 0){
        setloader(true);
      try {
        const { data } = await orderCancelMutation({
          variables: {
            id: orderCancelStatus?.order?.id,
            reason: reason.toLowerCase() === "other" ? otherReason : reason,
          },
        });
        if (data && data?.orderCancelByCustomer?.order) {
          setErrorPopup(false);
          setUniwareError(false);
          setSuccessPopup(true);
          setloader(false);
        } else if (data &&  !!data?.orderCancelByCustomer?.orderErrors.length) {
          setErrorPopup(true);
          setSuccessPopup(false);
          setloader(false);
          if (
            Array.isArray(data?.orderCancelByCustomer?.orderErrors) &&
            !data?.orderCancelByCustomer?.orderErrors[0]?.message?.includes(
              "AWB FOUND"
            )
          ) {
            setUniwareError(true);
          }
        }
      } catch (err) {
        console.log(err);
        setErrorPopup(true);
        setloader(false);
      } finally {
        setloader(false);
      }
      }
    } else {
      setcurrStep(value => value + 1);
    }
  };

  const orderCancelData =
    getMetadataValue(shopMetaDataValue, "orderCancelData") &&
    parseJson(getMetadataValue(shopMetaDataValue, "orderCancelData"));

  const [reason, setReason] = useState("");

  const handleOnClose = () => {
    setOrderCancelStatus({
      ...orderCancelStatus,
      open: false,
      order: "",
      awbNumber: "",
    });
  };

  const handleSetReason = (item: string) => {
    setShowList(false);
    setReason(item);
  };

  const handlePreventScroll = e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <>
      <div className={styles.orderCancelBackground}>
        {successPopup ? (
          <div className={styles.orderCancelPopup}>
            <div className={styles.orderCancelPopup__image}>
              <CachedImage
                isNextImage
                url={orderCancelData?.OrdercancelledPopup?.img}
                imageDimensions={{ width: 100, height: 100 }}
              />
            </div>
            <div className={styles.orderCancelPopup__order}>
              Your Order #{actualOrderId || ""} has been cancelled!
            </div>
            <div className={styles.orderCancelPopup__text}>
              {orderCancelData?.OrdercancelledPopup?.text || ""}
            </div>
            <MyCustomLink
              href={orderCancelData?.OrdercancelledPopup?.link || "/"}
            >
              <div className={styles.orderCancelPopup__button}>
                CONTINUE SHOPPING
              </div>
            </MyCustomLink>
          </div>
        ) : (
          <div
            className={`${styles.orderCancelContainer} ${
              errorPopup &&
              !perpaidOrder &&
              !(uniwareError && isPushedToShopify)
                ? styles.orderNonCancelContainer
                : ""
            }`}
          >
            <div className={styles.orderCancelContainer__header}>
              <div>Cancel Order</div>
              <span onClick={handleOnClose}>
                <MemoNewCartcloseIcon />
              </span>
            </div>
            {errorPopup ? (
              <div
                className={`${styles.orderNonCancelContainer__body} ${
                  perpaidOrder ? styles.orderPrepaid : ""
                }`}
              >
                <div className={styles.orderNonCancelContainer__body__order}>
                  Order ID: #{actualOrderId || ""} <br />
                  {!perpaidOrder && !(uniwareError && isPushedToShopify) ? (
                    <span>
                      {orderCancelData?.nonCancellableOrder?.status || ""}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className={styles.orderNonCancelContainer__body__cross}
                  onClick={handleOnClose}
                >
                  <MemoNewCartcloseIcon />
                </div>
                {!perpaidOrder ? (
                  <>
                    {uniwareError && isPushedToShopify ? (
                      <div
                        className={styles.orderNonCancelContainer__body__cod}
                      >
                        {parse(
                          orderCancelData?.orderNotPushedToUniware?.text || ""
                        )}
                      </div>
                    ) : (
                      <>
                        <div
                          className={
                            styles.orderNonCancelContainer__body__prepaid
                          }
                        >
                          {parse(
                            orderCancelData?.nonCancellableOrder
                              ?.prepaidOrder || ""
                          )}
                        </div>
                        <div
                          className={styles.orderNonCancelContainer__body__cod}
                        >
                          {parse(
                            orderCancelData?.nonCancellableOrder?.codOrder || ""
                          )}
                        </div>
                      </>
                    )}
                    <div
                      className={styles.orderNonCancelContainer__body__contact}
                    >
                      For any queries, please contact us on
                      <MyCustomLink
                        href={`mailto:${orderCancelData?.nonCancellableOrder?.contactus_link}`}
                      >
                        {orderCancelData?.nonCancellableOrder?.contactus_link ||
                          ""}
                      </MyCustomLink>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.orderPrepaid__body}>
                      {orderCancelData?.prepaidOrder?.text || ""}{" "}
                      <MyCustomLink
                        href={`mailto:${orderCancelData?.prepaidOrder?.contactus_link}`}
                      >
                        {orderCancelData?.prepaidOrder?.contactus_link || ""}
                      </MyCustomLink>
                      <span></span>
                    </div>
                    <MyCustomLink
                      href={orderCancelData?.prepaidORder?.link || "/"}
                    >
                      <div
                        className={`${styles.orderCancelPopup__button} ${styles.orderPrepaid__button}`}
                      >
                        CONTINUE SHOPPING
                      </div>
                    </MyCustomLink>
                  </>
                )}
                <div className={styles.orderCancelContainer__footer}>
                  <MyCustomLink href={termsConditions}>T&C</MyCustomLink>{" "}
                  <span>|</span>
                  <MyCustomLink href={privacyPolicy}>
                    {" "}
                    Privacy{" "}
                  </MyCustomLink>{" "}
                  <span>|</span>
                  <span> Ce5853e4</span>
                </div>
              </div>
            ) : (
              <div
                className={`${styles.orderCancelContainer__body} ${
                  currStep === 0 ? styles.orderCancelContainer__body__mob : ""
                }`}
              >
                <div className={styles.orderCancelContainer__body__id}>
                  Order ID: #{actualOrderId || ""}
                </div>
                <div
                  className={styles.orderCancelContainer__body__cross}
                  onClick={handleOnClose}
                >
                  <MemoNewCartcloseIcon />
                </div>
                <div className={styles.orderCancelContainer__body__text}>
                  {orderCancelData?.cancellableOrder?.text || ""}
                  {currStep === 0 ? (
                    <span
                      className={styles.orderCancelContainer__body__text__mob}
                    ></span>
                  ) : (
                    <></>
                  )}
                </div>
                {currStep === 1 ? (
                  <>
                    <div className={styles.orderCancelContainer__body__reasons}>
                      {Array.isArray(
                        orderCancelData?.cancellableOrder?.reasons
                      ) && (
                        <>
                          <div
                            className={
                              styles.orderCancelContainer__body__reasons__title
                            }
                          >
                            Reason for cancelling
                          </div>
                          <ul
                            className={`${
                              showlist
                                ? styles.orderCancelContainer__body__reasons__list
                                : ""
                            } ${
                              styles.orderCancelContainer__body__reasons__ul
                            }`}
                          >
                            <li
                              className={
                                styles.orderCancelContainer__body__reasons__li
                              }
                              onClick={() => {
                                setShowList(!showlist);
                              }}
                            >
                              {reason}{" "}
                              <div>
                                <MemoDropDownSvg />
                              </div>
                            </li>
                            <ul id="ordercancel-reasonlist">
                              {showlist &&
                                orderCancelData?.cancellableOrder?.reasons
                                  ?.filter((value: string) => value !== reason)
                                  ?.map((item: string) => (
                                    <li
                                      onClick={() => {
                                        handleSetReason(item);
                                      }}
                                    >
                                      {item}
                                    </li>
                                  ))}
                            </ul>
                          </ul>
                        </>
                      )}
                    </div>
                    {!showlist ? (
                      <div
                        className={
                          styles.orderCancelContainer__body__reasons__others
                        }
                      >
                        <div
                          className={
                            styles.orderCancelContainer__body__reasons__title
                          }
                        >
                          Other
                        </div>
                        <textarea
                          rows={5}
                          value={otherReason}
                          required
                          onChange={e => {
                            setOtherReason(e.target.value);
                          }}
                          cols={41}
                          placeholder="Type something"
                          disabled={reason.toLowerCase() !== "other"}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
                <OrderCancelByCustomer>
                  {ordersCancel => {
                    return (
                      <div
                        className={`${
                          styles.orderCancelContainer__body__buttons
                        } ${
                          currStep === 1
                            ? styles.orderCancelContainer__body__buttons__new
                            : ""
                        }`}
                      >
                        {currStep === 0 ? (
                          <div
                            className={
                              styles.orderCancelContainer__body__buttons__back
                            }
                            onClick={handleOnClose}
                          >
                            BACK
                          </div>
                        ) : (
                          <></>
                        )}
                        <div
                          className={`${
                            styles.orderCancelContainer__body__buttons__cancel
                          } ${
                            loader ||
                            (reason.toLowerCase() === "other" && !otherReason)
                              ? styles.orderCancelContainer__body__buttons__cancel__disable
                              : ""
                          } ${currStep === 1 && (reason.length > 0 ? '' : styles.orderCancelBtnDisable)}`}
                          onClick={() => {
                            handleClickCancel(ordersCancel);
                          }}
                        //   style={{"opacity":`${currStep === 1 && (reason.length > 0 ? "1" : "0.5")}`,
                        // "cursor":`${currStep === 1 && (reason.length > 0 ? "pointer" : "default")}`}}
                        >
                          {loader ? (
                            <CircularProgress
                              style={{ color: "#000" }}
                              size="18px"
                            />
                          ) : (
                            <>YES, CANCEL</>
                          )}
                        </div>
                      </div>
                    );
                  }}
                </OrderCancelByCustomer>
                <div className={styles.orderCancelContainer__footer}>
                  <MyCustomLink href={termsConditions}>T&C</MyCustomLink>{" "}
                  <span>|</span>
                  <MyCustomLink href={privacyPolicy}>
                    {" "}
                    Privacy{" "}
                  </MyCustomLink>{" "}
                  <span>|</span>
                  <span> Ce5853e4</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderCancelSection;
