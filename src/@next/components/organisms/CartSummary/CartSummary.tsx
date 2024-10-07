import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { Loader } from "@components/atoms/Loader";

import { SavingsStrip } from "@components/atoms/SavingsStrip";

import { YouSaveStrip } from "@components/atoms/YouSaveStrip";

import { CashbackStripNew } from "@components/atoms/CashbackStripNew";

import { TaxedMoney } from "@components/containers/TaxedMoney";
import { CartSummaryRow } from "@components/molecules/CartSummaryRow";
import { NewGetCashback } from "@components/molecules/NewGetCashback";

import { commonMessages } from "@temp/intl";
import { getTotalDiscount } from "@pages";
import { Header, Container } from "@components/templates/Checkout/styles";
import { generateCart } from "@temp/components/OverlayManager/LotusCart/CartPage";
import { generateProductUrl, getUtmData } from "@temp/core/utils";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { useCustomLocation } from "@hooks/useCustomLocation";

import { CLIENT, showCashback } from "Themes/config";

import { TypedGetCashbackRecieveAmount } from "@components/molecules/ApplyCoupon/queris";

import {
  useAuthState,
  useCart,
  useCartState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import { TypedGetWalletAmountWithLogs } from "../Cashbacks/queries";

import { ICostLine, ICosts, IProps } from "./types";
import * as S from "./styles";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";
import { OverlayContext } from "@temp/components";
//FIXME: NextJs Make it a CSS module
//import "../../../../themes/lotus-new/views/Home/scss/index.scss";

export const CostLine = ({
  name,
  cost,
  last = false,
  negative = false,
  className,
}: ICostLine) => {
  switch (CLIENT) {
    case clients.BODY_FIRST:
    case clients.PLIXLIFEFC:
      return (
        <S.CostLine last={last} className={`${className}__cost`}>
          <span style={{ fontSize: "inherit" }}>{name}</span>
          <span
            style={{ fontSize: "inherit" }}
            data-test={`cartSummaryCost${name.replace(/\s/g, "")}`}
          >
            {negative && "- "}
            <TaxedMoney taxedMoney={cost} style={{ fontSize: "inherit" }} />
          </span>
        </S.CostLine>
      );
      break;
    default:
      return (
        <S.CostLine last={last} className={`${className}__cost`}>
          <span>{name}</span>
          <span data-test={`cartSummaryCost${name.replace(/\s/g, "")}`}>
            {negative && "- "}
            <TaxedMoney taxedMoney={cost} />
          </span>
        </S.CostLine>
      );
      break;
  }
};

const Costs = ({
  totalPrice,
  shippingTaxedPrice,
  couponDiscount,
  subtotalPrice,
  mrp,
  netPrice,
  itemDiscount,
  offerDiscount,
  prepaidDiscount,
  cashbackDiscount,
}: ICosts) => {
  const intl = useIntl();
  if (CLIENT === "lotus-new" || CLIENT === "lotus-stage") {
    return (
      <S.Costs>
        {couponDiscount && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Coupon Discount" })}
            cost={couponDiscount}
            negative
          />
        )}
        {offerDiscount && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Offer Discount" })}
            cost={offerDiscount}
            negative
          />
        )}

        {shippingTaxedPrice && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Delivery Charges" })}
            cost={shippingTaxedPrice}
          />
        )}
        {prepaidDiscount && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Prepaid Discount" })}
            cost={prepaidDiscount}
            negative
          />
        )}

        <S.HR border="0.5px solid #E5E5E5" />

        {totalPrice && (
          <CostLine
            name={intl.formatMessage(commonMessages.total)}
            cost={totalPrice}
            last
          />
        )}
      </S.Costs>
    );
  }
  if (CLIENT === clients.PLIXLIFEFC || CLIENT === clients.BODY_FIRST) {
    return (
      <>
        <S.Costs style={{ color: "#808080", fontSize: "14px" }}>
          {subtotalPrice && (
            <CostLine
              name={intl.formatMessage({id:"item-total", defaultMessage: "Item Total" })}
              cost={subtotalPrice}
            />
          )}
          {shippingTaxedPrice && (
            <CostLine
              name={intl.formatMessage({id:"shipping-charges", defaultMessage: "Shipping Charges" })}
              cost={shippingTaxedPrice}
            />
          )}
          {couponDiscount && (
            <CostLine
              name={intl.formatMessage({id:"coupon-discount", defaultMessage: "Coupon Discount" })}
              cost={couponDiscount}
              negative
            />
          )}
          {cashbackDiscount && showCashback && (
            <CostLine
              name={intl.formatMessage({id:"wallet-credit", defaultMessage: "Wallet Credit" })}
              cost={cashbackDiscount}
              negative
            />
          )}
          {prepaidDiscount && (
            <CostLine
              name={intl.formatMessage({id:"prepaid-discount", defaultMessage: "Prepaid Discount" })}
              cost={prepaidDiscount}
              negative
            />
          )}
          <S.DashedHR />
        </S.Costs>
        <S.Costs
          style={{
            marginTop: "16px",
            fontSize: "16px",
            color: "#000",
          }}
        >
          {totalPrice && (
            <CostLine
              name={intl.formatMessage(commonMessages.grandTotal)}
              cost={totalPrice}
              last
            />
          )}
        </S.Costs>
      </>
    );
  }
  if (
    CLIENT === clients.WOW_HEALTH_NEW ||
    CLIENT === clients.WOWFC_NEW ||
    CLIENT === clients.LOTUS ||
    CLIENT === clients.BUY_WOW
  ) {
    return (
      <S.Costs>
        {mrp && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "MRP" })}
            cost={mrp}
          />
        )}
        {itemDiscount && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Item Discount" })}
            cost={itemDiscount}
            negative
          />
        )}
        {netPrice && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Net Price" })}
            cost={netPrice}
          />
        )}
        {couponDiscount && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Coupon Discount" })}
            cost={couponDiscount}
            negative
          />
        )}
        {offerDiscount && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Offer Discount" })}
            cost={offerDiscount}
            negative
          />
        )}
        <S.HR />
        {subtotalPrice && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Order Total" })}
            cost={subtotalPrice}
          />
        )}
        {shippingTaxedPrice && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Delivery Charges" })}
            cost={shippingTaxedPrice}
          />
        )}
        {prepaidDiscount && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Prepaid Discount" })}
            cost={prepaidDiscount}
            negative
          />
        )}
        {cashbackDiscount && (
          <CostLine
            name={intl.formatMessage({ defaultMessage: "Store Credit" })}
            cost={cashbackDiscount}
            negative
            className="storeCreditCostLine"
          />
        )}
        <S.HR />
        {totalPrice && (
          <CostLine
            name={intl.formatMessage(commonMessages.total)}
            cost={totalPrice}
            last
          />
        )}
      </S.Costs>
    );
  }
  return (
    <S.Costs>
      {mrp && (
        <CostLine
          name={intl.formatMessage({ defaultMessage: "MRP" })}
          cost={mrp}
        />
      )}
      {itemDiscount && (
        <CostLine
          name={intl.formatMessage({ defaultMessage: "Item Discount" })}
          cost={itemDiscount}
          negative
        />
      )}
      {netPrice && (
        <CostLine
          name={intl.formatMessage({ defaultMessage: "Net Price" })}
          cost={netPrice}
        />
      )}
      {couponDiscount && (
        <CostLine
          name={intl.formatMessage({ defaultMessage: "Coupon Discount" })}
          cost={couponDiscount}
          negative
        />
      )}
      {offerDiscount && (
        <CostLine
          name={intl.formatMessage({ defaultMessage: "Offer Discount" })}
          cost={offerDiscount}
          negative
        />
      )}
      <S.HR />
      {subtotalPrice && (
        <CostLine
          name={intl.formatMessage({ defaultMessage: "Order Total" })}
          cost={subtotalPrice}
        />
      )}
      {shippingTaxedPrice && (
        <CostLine
          name={intl.formatMessage({ defaultMessage: "Delivery Charges" })}
          cost={shippingTaxedPrice}
        />
      )}
      {prepaidDiscount && (
        <CostLine
          name={intl.formatMessage({ defaultMessage: "Prepaid Discount" })}
          cost={prepaidDiscount}
          negative
        />
      )}
      {cashbackDiscount && (
        <CostLine
          name={intl.formatMessage({ defaultMessage: "Store Credit" })}
          cost={cashbackDiscount}
          negative
          className="storeCreditCostLine"
        />
      )}
      <S.HR />
      {totalPrice && (
        <CostLine
          name={intl.formatMessage(commonMessages.total)}
          cost={totalPrice}
          last
        />
      )}
    </S.Costs>
  );
};

/**
 * Cart summary displayed in checkout page
 */
const CartSummary: React.FC<IProps> = ({
  totalPrice,
  subtotalPrice,
  shippingTaxedPrice,
  couponDiscount,
  mrp,
  netPrice,
  itemDiscount,
  offerDiscount,
  prepaidDiscount,
  cashbackDiscount,
  cashbackRecieveTaxedPrice,
  products,
  useCashback = false,
  handleCashbackClick,
  showPrepaidOffer,
}: IProps) => {
  const overlay = useContext(OverlayContext);

  const { show } = overlay;

  const [mobileCartOpened] = useState(false);
  const [cashbackPercent, setCashbackPercent] = useState(0);
  const totalDiscount = getTotalDiscount([
    couponDiscount,
    itemDiscount,
    offerDiscount,
    prepaidDiscount,
    cashbackDiscount,
    cashbackRecieveTaxedPrice,
  ]);

  const { checkout, promoCodeDiscount } = useCheckoutState();
  const { removeItem, updateItem } = useCart();
  const { items, cashbackRecieve } = useCartState();
  const { user } = useAuthState();
  // const { user } = useAuthState();
  // const { getWalletAmount } = useWallet();
  const { pathname } = useCustomLocation();
  const utm_data = getUtmData(pathname);
  const hooksData = {
    user,
    // getWalletAmount,
    promoCodeDiscount,
    utm_data,
  };
  switch (CLIENT) {
    case clients.WOW_HEALTH_NEW:
    case clients.WOWFC_NEW:
    case clients.LOTUS_STAGE:
    case clients.LOTUS_NEW:
    case clients.LOTUS:
    case clients.BUY_WOW:
      return (
        <S.Wrapper mobileCartOpened={mobileCartOpened}>
          <S.Content style={{ padding: "0 20px 0 20px" }}>
            <Container className="orderSummeryContainer">
              <Header>YOUR ORDER SUMMARY</Header>
              {generateCart(
                items,
                removeItem,
                updateItem,
                show,
                totalPrice,
                couponDiscount,
                hooksData
              )}
            </Container>
            <Container style={{ marginBottom: "0" }}>
              <Header>PAYMENT INFO</Header>
              {user && showCashback && (
                <TypedGetWalletAmountWithLogs>
                  {({ data, loading }) => {
                    const amount = data && data.wallet ? data.wallet.amount : 0;
                    if (loading)
                      return (
                        <div>
                          {" "}
                          <Loader />{" "}
                        </div>
                      );
                    if (data && amount > 0)
                      return (
                        <>
                          <NewGetCashback
                            useCashback={useCashback}
                            // setUseCashback={setUseCashback}
                            handleCashbackClick={handleCashbackClick}
                            userWallterBalance={amount}
                            borderBottom="2px dashed #e5e5e5"
                            marginBottom="10px"
                          />
                        </>
                      );
                    return <> </>;
                  }}
                </TypedGetWalletAmountWithLogs>
              )}
              {items?.length > 0 && (
                <>
                  <Costs
                    totalPrice={totalPrice}
                    shippingTaxedPrice={shippingTaxedPrice}
                    couponDiscount={couponDiscount}
                    subtotalPrice={subtotalPrice}
                    mrp={mrp}
                    netPrice={netPrice}
                    itemDiscount={itemDiscount}
                    offerDiscount={offerDiscount}
                    prepaidDiscount={prepaidDiscount}
                    cashbackDiscount={cashbackDiscount}
                  />
                  <YouSaveStrip price={totalDiscount} margin="10px 0" />
                  {CLIENT === clients.LOTUS_STAGE && (
                    <CashbackStripNew amount={cashbackRecieve?.amount} />
                  )}
                  {showPrepaidOffer && (
                    <S.ShowPrepaidOfferContainer>
                      <S.ShowPrepaidOffer>
                        Applied: Extra 5% Off with Your Order
                      </S.ShowPrepaidOffer>
                    </S.ShowPrepaidOfferContainer>
                  )}
                </>
              )}
            </Container>
          </S.Content>
        </S.Wrapper>
      );
      break;
    case clients.BODY_FIRST:
    case clients.PLIXLIFEFC:
      return (
        <>
          <S.WrapperPlix mobileCartOpened={mobileCartOpened}>
            <S.InnerTopWrapperPlix>
              <S.CartSummaryProductList>
                {products?.map((product, index) => {
                  if (product.id) {
                    const productUrl = generateProductUrl(
                      product.id,
                      product.name,
                      product.slug
                    );
                    if (product.categorySlug.includes("free-gift-products"))
                      return (
                        <>
                          <div key={product.sku}>
                            <CartSummaryRow
                              index={index}
                              sku={product.sku}
                              quantity={product.quantity}
                              name={product.name}
                              price={product.price}
                              thumbnail={product.thumbnail}
                              categorySlug={product.categorySlug}
                              product={product}
                            />
                          </div>
                          <S.HR />
                        </>
                      );
                    return (
                      <>
                        <div key={product.sku}>
                          <MyCustomLink href={productUrl}>
                            <CartSummaryRow
                              index={index}
                              sku={product.sku}
                              quantity={product.quantity}
                              name={product.name}
                              price={product.price}
                              thumbnail={product.thumbnail}
                              categorySlug={product.categorySlug}
                              product={product}
                            />
                          </MyCustomLink>
                        </div>
                      </>
                    );
                  }
                  return <> </>;
                })}
              </S.CartSummaryProductList>
            </S.InnerTopWrapperPlix>
            <S.HR />
            {/* <PlixLifeFcApplyCoupon
              setCouponPrepaidDiscounts={setCheckoutDiscounts}
            /> */}
            <S.InnerBottomWrapperPlix>
              <S.CartSummarySectionTitle>
                Payment Summary
              </S.CartSummarySectionTitle>
              <Costs
                totalPrice={totalPrice}
                shippingTaxedPrice={shippingTaxedPrice}
                couponDiscount={couponDiscount}
                subtotalPrice={subtotalPrice}
                mrp={mrp}
                netPrice={netPrice}
                itemDiscount={itemDiscount}
                offerDiscount={offerDiscount}
                prepaidDiscount={prepaidDiscount}
                cashbackDiscount={cashbackDiscount}
              />
              <S.StripContainer>
                {/* {showCashback && checkout?.token && (
                  <>
                    <S.CashbackStrip>
                      You will get {cashbackPercent}% Cashback with this order.
                    </S.CashbackStrip>
                  </>
                )} */}
                {/* <S.SavingButton>
            Saving of ₹ {totalDiscount} with this order.
          </S.SavingButton> */}
                {/* <S.SavingsWrapper>
              <SavingsStrip totalDiscount={totalDiscount} />
            </S.SavingsWrapper> */}
                {showCashback && checkout?.token && (
                  <>
                    <TypedGetCashbackRecieveAmount
                      variables={{ checkoutToken: checkout.token }}
                      renderOnError
                      alwaysRender
                    >
                      {({ data, error }) => {
                        if (
                          error ||
                          !data?.cashback ||
                          totalPrice?.gross.amount === 0
                        ) {
                          setCashbackPercent(0);
                          return (
                            <S.CashbackStrip>
                              You will get Cashback of ₹ 0 with this order.
                            </S.CashbackStrip>
                          );
                        }

                        if (data?.cashback?.amount) {
                          let amount = data?.cashback?.amount;
                          if (typeof amount === "string") {
                            amount = parseFloat(amount);
                          }
                          const cashbackPercentRecent = Math.round(
                            (amount * 100) / totalPrice?.gross.amount
                          );

                          setCashbackPercent(cashbackPercentRecent);
                        }

                        return (
                          <S.CashbackStrip>
                            You will get Cashback of ₹ {data?.cashback?.amount}{" "}
                            with this order.
                          </S.CashbackStrip>
                        );
                      }}
                    </TypedGetCashbackRecieveAmount>
                  </>
                )}
              </S.StripContainer>
            </S.InnerBottomWrapperPlix>
          </S.WrapperPlix>
        </>
      );
      break;
    default:
      return (
        <S.Wrapper mobileCartOpened={mobileCartOpened}>
          <S.Content>
            <S.CartSummaryProductList>
              {products?.map((product, index) => {
                if (product.id) {
                  const productUrl = generateProductUrl(
                    product.id,
                    product.name,
                    product.slug
                  );
                  if (product.categorySlug.includes("free-gift-products"))
                    return (
                      <div key={product.sku}>
                        <S.ProductCard>
                          <CartSummaryRow
                            index={index}
                            sku={product.sku}
                            quantity={product.quantity}
                            name={product.name}
                            price={product.price}
                            thumbnail={product.thumbnail}
                            categorySlug={product.categorySlug}
                            product={product}
                          />
                        </S.ProductCard>
                      </div>
                    );
                  return (
                    <div key={product.sku}>
                      <S.ProductCard>
                        <MyCustomLink href={productUrl}>
                          <CartSummaryRow
                            index={index}
                            sku={product.sku}
                            quantity={product.quantity}
                            name={product.name}
                            price={product.price}
                            thumbnail={product.thumbnail}
                            categorySlug={product.categorySlug}
                            product={product}
                          />
                        </MyCustomLink>
                      </S.ProductCard>
                    </div>
                  );
                }
                return <> </>;
              })}
            </S.CartSummaryProductList>
            {CLIENT === "lotus" && (
              <S.SanitizeStrip>
                Congratulations!♡ 10% of your total order value contributes to
                the funds of Wildlife Trust of India
                <br />
                {products?.filter(
                  product => product.id === "UHJvZHVjdDo4Ng=="
                ) &&
                  products?.filter(product => product.id === "UHJvZHVjdDo4Ng==")
                    .length > 0 &&
                  "Congrats! 100% of the Limited Edition Box value contributes to the funds of Wildlife Trust of India. You’re now a Sustainable Ambassador!"}
              </S.SanitizeStrip>
            )}

            <Costs
              totalPrice={totalPrice}
              shippingTaxedPrice={shippingTaxedPrice}
              couponDiscount={couponDiscount}
              subtotalPrice={subtotalPrice}
              mrp={mrp}
              netPrice={netPrice}
              itemDiscount={itemDiscount}
              offerDiscount={offerDiscount}
              prepaidDiscount={prepaidDiscount}
              cashbackDiscount={cashbackDiscount}
            />
            <S.StripContainer>
              {showCashback && checkout?.token && (
                <>
                  {/* <TypedGetCashbackPercent>
              {({ data, error }) => {

                return <div>yo</div>;
              }}
            </TypedGetCashbackPercent> */}
                  <S.CashbackStrip>
                    You will get {cashbackPercent}% Cashback with this order.
                  </S.CashbackStrip>
                </>
              )}
              {/* <S.SavingButton>
            Saving of ₹ {totalDiscount} with this order.
          </S.SavingButton> */}
              <S.SavingsWrapper>
                <SavingsStrip totalDiscount={totalDiscount} />
              </S.SavingsWrapper>
              {showCashback && checkout?.token && (
                <>
                  <TypedGetCashbackRecieveAmount
                    variables={{ checkoutToken: checkout.token }}
                    renderOnError
                    alwaysRender
                  >
                    {({ data, error }) => {
                      if (
                        error ||
                        !data?.cashback ||
                        totalPrice?.gross.amount === 0
                      ) {
                        setCashbackPercent(0);
                        return (
                          <S.CashbackStrip>
                            You will get Cashback of ₹ 0 with this order.
                          </S.CashbackStrip>
                        );
                      }

                      if (data?.cashback?.amount) {
                        let amount = data?.cashback?.amount;
                        if (typeof amount === "string") {
                          amount = parseFloat(amount);
                        }
                        const cashbackPercentRecent = Math.round(
                          (amount * 100) / totalPrice?.gross.amount
                        );

                        setCashbackPercent(cashbackPercentRecent);
                      }

                      return (
                        <S.CashbackStrip>
                          You will get Cashback of ₹ {data?.cashback?.amount}{" "}
                          with this order.
                        </S.CashbackStrip>
                      );
                    }}
                  </TypedGetCashbackRecieveAmount>
                </>
              )}
            </S.StripContainer>
          </S.Content>
        </S.Wrapper>
      );
      break;
  }
};

export { CartSummary };
