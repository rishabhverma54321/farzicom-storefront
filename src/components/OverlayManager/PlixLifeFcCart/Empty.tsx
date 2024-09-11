import * as React from "react";
// import { FormattedMessage } from "react-intl";
import Cart from "../../../images/lotus-new/EmptyCart";
import { useMessageStateUpdate } from "@temp/MessageContext";
import { CachedImage } from "@components/molecules/CachedImage";
import MyCustomLink from "@components/next-react/MyCustomLink";

// import { Button } from "../..";

const Empty: React.FC<{ offersDataList: any,overlay:any }> = ({ offersDataList,overlay }) => {
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
  if (
    offersDataList &&
    Array.isArray(offersDataList) &&
    !!offersDataList?.length
  ) {
    return (
      <div className="cart-plix__empty_coupons">
        <div className="cart-plix__empty_coupons_heading">
          <h2>Get Exciting Offers!!</h2>
          <div className="cart-plix__empty_coupons_bg">
            <CachedImage
              url="https://plixlifefc-media.farziengineer.co/hosted/party-popper_1f389_1-f89acd11ee5c.svg"
              imageDimensions={{ width: 100, height: 100 }}
              isNextImage
            />
          </div>
        </div>
        <div className="cart-plix__empty_coupons_body">
          {offersDataList?.map(item => (
            <div className="cart-plix__empty_coupons_body_card">
              <div className="cart-plix__empty_coupons_body_card_head">
                <div>
                  <div className="cart-plix__empty_coupons_body_card_head_heading">
                    <span>{item?.title}{" "}</span>
                    {!!item?.code.trim() ? <span>{item?.code}</span> : <></>}
                  </div>
                  <p>{item?.text}</p>
                </div>
                <div
                  onClick={() => {
                    handleCopyToClipBoard(item?.code);
                  }}
                  className="cart-plix__empty_coupons_body_card_head_code"
                >
                  {!!item?.code ? "COPY" : "No code REQUIRED"}
                </div>
              </div>
              <MyCustomLink onClick={()=>{overlay.hide()}} href={item?.shop || "/"}>
                <button className="cart-plix__empty_coupons_body_card_button">
                  + SHOP NOW
                </button>
              </MyCustomLink>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="cart-plix__empty">
      <Cart width="5rem" height="5rem" margin="auto" />
      <span>Your Shopping Cart is Empty!</span>
      {/* <h4>
      <FormattedMessage defaultMessage="Your bag is empty" />
    </h4>
    <p>
      <FormattedMessage defaultMessage="You haven’t added anything to your bag. We’re sure you’ll find something in our store" />
    </p>
    <div className="cart__empty__action">
      <Button
        testingContext="emptyCartHideOverlayButton"
        secondary
        onClick={overlayHide}
      >
        <FormattedMessage defaultMessage="Continue Shopping" />
      </Button>
    </div> */}
    </div>
  );
};

export default Empty;
