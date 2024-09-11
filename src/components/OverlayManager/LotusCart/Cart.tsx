// import "./scss/index.scss";

import * as React from "react";
import { FormattedMessage } from "react-intl";
// import { useCustomHistory } from "@hooks/useCustomHistory";
// import ReactSVG from "react-svg";
import { TaxedMoney } from "@components/containers/TaxedMoney";
import { LotusApplyCoupon } from "@components/molecules/LotusApplyCoupon";

import { commonMessages } from "@temp/intl";
import { useCartState } from "@saleor/sdk";

import { CashbackStripNew } from "@components/atoms/CashbackStripNew";
import { Loader } from "@components/atoms/Loader";
import { YouSaveStrip } from "@components/atoms/YouSaveStrip";

import { Offline, OfflinePlaceholder, Online, Overlay } from "../..";
// import { checkoutLoginUrl, checkoutUrl } from "../../../app/routes";
// import Loader from "../../Loader";
// import SavingIcon from "../../../images/lotus-new/SavingIcon";

import Empty from "./Empty";
// import ProductList from "./ProductList";
import Header from "./Header";

// import CartImg from "../../../images/lotus-new/cartPageIcon";
// import CloseImg from "../../../images/lotus-new/cartClose";
import { IProps } from "./types";
import { clients } from "../../../../gqlTypes/customGlobalTypes";
import { CLIENT } from "Themes/config";
import MyCustomLink from "@components/next-react/MyCustomLink";
// import * as S from "./s";
// const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) =>

const Cart: React.FC<IProps> = ({
  breadcrumbs,
  title,
  cartHeader,
  cartFooter,
  cart,
  button,
  continueShopping,
  sanitizeStrip,
  totalDiscount,
  cashbackRecieve,
  emptyCart,
  //setCheckoutDiscounts,
  overlay,
  refetch,
  prepaidPercent,
  cashbackDiscountTaxedPrice,
  checkoutLoading,
}: // totalPrice,
IProps) => {
  // const { user } = useAuthState();
  // const { checkout } = useCheckout();
  const {
    items,

    totalPrice,
  } = useCartState();
  // const history = useCustomHistory();

  // const shippingTaxedPrice =
  //   checkout?.shippingMethod?.id && shippingPrice
  //     ? {
  //         gross: shippingPrice,
  //         net: shippingPrice,
  //       }
  //     : null;
  // const promoTaxedPrice = discount && {
  //   gross: discount,
  //   net: discount,
  // };

  const missingVariants = () => {
    return items.find(item => !item.variant || !item.totalPrice);
  };

  // const itemsQuantity =
  //   items?.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0) || 0;
  return (
    <Overlay testingContext="cartOverlay" context={overlay}>
      <Online>
        <div className="cart">
          <Header overlayHide={overlay.hide} />
          {items?.length || checkoutLoading ? (
            <>
              {
                <>
                  <div className="cart__productsRow">{cart}</div>
                  {/* <MemoizedProductList lines={items} remove={removeItem} /> */}
                  <div className="cart__footer">
                    {/* <div className="cart__footer__couponCode">
                      <input placeholder="Enter " type="text" />
                      <button type="submit">Apply</button>
                    </div> */}
                    <div className="cart__footer__couponCode">
                      <LotusApplyCoupon refetch={refetch} />
                    </div>
                    {cartFooter && (
                      <div className="cart__footer__price">{cartFooter}</div>
                    )}

                    {/* <div className="cart__footer__price">
                      <span>
                        <FormattedMessage {...commonMessages.subtotal} />
                      </span>
                      <span>
                        <TaxedMoney
                          data-test="subtotalPrice"
                          taxedMoney={subtotalPrice}
                        />
                      </span>
                    </div> */}

                    {/* {shippingTaxedPrice &&
                      shippingTaxedPrice.gross.amount !== 0 && (
                        <div className="cart__footer__price">
                          <span>
                            <FormattedMessage {...commonMessages.shipping} />
                          </span>
                          <span>
                            <TaxedMoney
                              data-test="shippingPrice"
                              taxedMoney={shippingTaxedPrice}
                            />
                          </span>
                        </div>
                      )} */}

                    {/* {promoTaxedPrice && promoTaxedPrice.gross.amount !== 0 && (
                      <div className="cart__footer__price">
                        <span>
                          <FormattedMessage {...commonMessages.promoCode} />
                        </span>
                        <span>
                          <TaxedMoney
                            data-test="promoCodePrice"
                            taxedMoney={promoTaxedPrice}
                          />
                        </span>
                      </div>
                    )} */}

                    <div className="cart__footer__totalPrice">
                      <span>
                        <FormattedMessage {...commonMessages.total} />
                      </span>
                      <span>
                        <TaxedMoney
                          data-test="totalPrice"
                          taxedMoney={totalPrice}
                        />
                      </span>
                    </div>
                    {totalDiscount !== undefined && totalDiscount >= 0 && (
                      <YouSaveStrip
                        price={totalDiscount}
                        margin="0 1rem 0.5rem"
                        padding="0.3rem"
                      />
                    )}
                    {CLIENT === clients.LOTUS_STAGE && (
                      <CashbackStripNew amount={cashbackRecieve} />
                    )}
                    <div className="cart__footer__button">
                      {/* <MyCustomLink href="/">
                        <button
                          data-test="continueShopping"
                          onClick={() => {
                            overlay.hide();
                            // history.push(`/checkout/address`);
                          }}
                          className="cart__footer__button__continue__shopping"
                        >
                          <span>Continue Shopping</span>
                        </button>
                      </MyCustomLink> */}

                      <MyCustomLink href="/checkout/address">
                        <button
                          data-test="gotoCheckoutButton"
                          onClick={() => {
                            overlay.hide();
                            // history.push(`/checkout/address`);
                          }}
                          className="cart__footer__button__place__order"
                        >
                          <span>Proceed to Pay</span>
                        </button>
                      </MyCustomLink>
                    </div>
                  </div>
                </>
              }
            </>
          ) : (
            <Empty />
          )}
        </div>
      </Online>
      <Offline>
        <div className="cart">
          <OfflinePlaceholder />
        </div>
      </Offline>
    </Overlay>
  );
};

export default React.memo(Cart);
