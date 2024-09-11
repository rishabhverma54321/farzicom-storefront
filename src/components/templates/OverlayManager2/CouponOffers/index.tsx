import React, { useContext, useEffect, useRef, useState } from "react";
// import CloseIcon from "@material-ui/icons/Close";
import { PlixLifeFcApplyCoupon } from "@components/molecules/PlixLifeFcApplyCoupon";
import ReactSVG from "react-svg";
import { getMetadataValue, isBoxProduct, isComboProduct, parseJson } from "@utils/misc";
import { Overlay2, OverlayContextInterface2 } from "../..";
import { useMessageStateUpdate } from "@src/MessageContext";
//FIXME:NextJs Make it a CSS module
// import "./scss/index.scss";
import { useCart, useCartState, useCheckoutState } from "@saleor/sdk";
import MemoArrowLeftIcon from "@components/atoms/SvgIcons/ArrowLeftIcon";
import { ShopMetaContext } from "@src/pages/_app";
import { Gap } from "@components/atoms/Gap";
interface ICouponOffersProps {
  overlay: OverlayContextInterface2;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext: string;
}

const CouponOffers: React.FunctionComponent<ICouponOffersProps> = ({
  overlay,
  testingContext,
}) => {
  const {
    hide,
    context: { data },
  } = overlay;
  const { items } = useCartState();
  const { checkCouponValidation } = useCart()
  const { checkoutLoading } = useCheckoutState()
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [moreCouponToggle, setMoreCouponToggle] = useState(false)
  const [selectedcouponIndex, setselectedcouponIndex] = useState(null);
  const containerRef = useRef(null);
  const [couponState, setCouponState] = useState({ loading: false, codes: {} })
  const container = containerRef.current;
  const [disableApplyButton, setDisableApplyButton] = useState<boolean>(
    items && items.some(item => isBoxProduct(item))
  );
  const shopMetadata = useContext(ShopMetaContext);

  // Disable coupon apply button if any personalised box item is present in cart	
  useEffect(() => {
    setDisableApplyButton(items && items.some(item => isBoxProduct(item) && !isComboProduct(item)));
  }, [items]);
  useEffect(() => {
    // elementRef is now available	
    if (!!selectedCoupon) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [selectedCoupon]);

  useEffect(() => {
    if (!checkoutLoading) {
      checkAllCouponCodes();
    }
  }, [checkoutLoading]);

  const available_offers =
    getMetadataValue(shopMetadata, "available_offers_new") &&
    parseJson(getMetadataValue(shopMetadata, "available_offers_new"));

  const checkAllCouponCodes = async () => {
    const couponCodes: Array<string> =
      Array.isArray(available_offers) && available_offers.length > 0
        ? available_offers.reduce((acc, item) => {
          if (item?.code) {
            acc.push(item?.code.toLowerCase());
          }
          return acc;
        }, [])
        : [];

    setCouponState({
      ...couponState,
      loading: true,
    });
    try {
      const data = await checkCouponValidation(couponCodes);
      if (data) {
        const result =
          typeof data === "object" && !Array.isArray(data) ? data : {};
        setCouponState({
          codes: result,
          loading: false
        });
      }
    } catch (err) {
      console.log("couponValidation Failed", err);
      setCouponState({
        ...couponState,
        loading: false
      });
    }
  };
// For copy coupon code
const messageUpdate = useMessageStateUpdate();
const handleCopyToClipBoard = async (code: string) => {
  if (!!code?.trim()) {
    try {
      await navigator.clipboard.writeText(code);
      messageUpdate("Text copied to clipboard", "success");
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  }
};
  return (
    <Overlay2 context={overlay} testingContext={testingContext}>
      <div ref={containerRef} className="co__wrapper">
        <div className="co__head">
          {/* <img src="/plixlifefc/assets/arrow-left.svg" alt="arrow_left" onClick={() => hide()}/> */}
          <div className="" onClick={() => hide()}>
            <MemoArrowLeftIcon />
          </div>
          <h5>Apply Offers</h5>
        </div>
        <div className="co__applycoupon">
          <PlixLifeFcApplyCoupon
            modal
            hide={hide}
            refetch={data.refetch}
            selectedCoupon={selectedCoupon}
            setSelectedCoupon={setSelectedCoupon}
            disableCouponApply={disableApplyButton}
            disableCartOpenOnApply={data?.disableCartOpenOnApply}
          />
        </div>
        <div className="co__available">
          <div className="co__available__head">
            <h5>Available Coupons</h5>
          </div>
          <div className="co__available__body">
            {
              Array.isArray(available_offers) && available_offers.map((item, index) => {
                let couponTermsCondition = item?.content_T_C
                const code = item?.code?.toLowerCase();
                const isValid = couponState?.codes[`${code}`];
                const disableCoupon =
                disableApplyButton || typeof isValid === "boolean"|| typeof isValid === "undefined"
                  ? !isValid
                  : false;
                return (
                  <div className={`new-offer-coupon-section ${disableCoupon && 'nw-cpn-none'}`} key={`offer_${index}`}>
                    <div className="new-offer-coupon">
                      <div className="off-num">
                        <p>{item?.priceOff}</p>
                      </div>
                      <div className="new-offer-content">
                        <div className="">
                          <span className="new-coupon-code">{code}</span>
                          <span className={`new-coupon-copy theme-text-color`} onClick={(e) => {disableCoupon ? (e.preventDefault()) : handleCopyToClipBoard(item?.code)}}>COPY</span>
                        </div>
                        <p className="theme-text-color nw-coupon-title">{item?.title}</p>
                        <hr className="content-separator" />
                        <p className="nw-coupon-text">{item?.text} </p>
                        {item["enableT&C"] && <span className="more-less-btn" onClick={() => setMoreCouponToggle(moreCouponToggle === index ? null : index)}>{moreCouponToggle === index ? '- Hide' : '+ More'}</span>}
                      </div>
                      <div className="circle-container">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div key={index} className="circle"></div>
                        ))}
                      </div>
                    </div>
                    {moreCouponToggle === index && (
                      <div className="more-less-desc">
                      <p>Terms & Conditions apply</p>
                      <ul>
                          {Array.isArray(couponTermsCondition)? (
                          couponTermsCondition.map((tc,i)=>{
                            return(
                              <li key={`tc_${i}`}>{tc}</li>
                            )
                          })
                        ) : (<p>There are no terms and conditions</p>)}
                        </ul>
                    </div>
                    )}
                    
                  </div>
                )
              })
            }
            {/* {Array.isArray(available_offers) && available_offers.map((offer, index) => {
              const code = offer?.code?.toLowerCase();
              const isValid = couponState?.codes[`${code}`];
              const disableCoupon =
                disableApplyButton || typeof isValid === "boolean"
                  ? !isValid
                  : false;
              return (
                <div className="offer_coupon">
                  <div className="offer__actions">
                    <div>{offer.code}</div>
                    {!couponState?.loading ?
                      <button
                        onClick={() => {
                          setSelectedCoupon(offer.code);
                        }}
                        style={{
                          pointerEvents: disableCoupon
                            ? "none"
                            : "all",
                          color: disableCoupon ? "gray" : "",
                        }}
                      >
                        Apply
                      </button> :
                      <span className="co_available_loading">loading...</span>
                    }
                  </div>
                  {offer?.title && offer?.text ? (
                    <div className="offer__description">
                      <div className="offer__description__title">
                        {offer.title.split("off")[0] + "off"}
                        {offer.title}
                      </div>
                      {offer["enableT&C"] ? (
                        <span className="offer__description__detail">
                          {selectedcouponIndex !== index ?
                            <span onClick={() =>
                              setselectedcouponIndex(index)
                            }
                            >T&C
                              <span><NewMemoOfferShowmore /></span>
                            </span>
                            :
                            <>
                              <p onClick={() => {
                                selectedcouponIndex === index ?
                                  setselectedcouponIndex("") :
                                  setselectedcouponIndex(index);
                              }}>T&C<span><NewMemoOfferShowmore /></span></p>
                              {offer.title.split("off")[1]}
                              {offer.text}
                            </>
                          }
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}

                </div>
              );
            })} */}
            <div className="co__avialable__mobile-gap">
              <Gap size="5rem" />
            </div>
          </div>
        </div>
      </div>

    </Overlay2>
  );
};

export default CouponOffers;