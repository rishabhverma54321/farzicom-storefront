import React from "react";
import InvoiceTextAndPrice from "@components/atoms/InvoiceTextAndPrice";
import { clients } from "@globalTypes/customGlobalTypes";
import { CLIENT, showCashback } from "Themes/config";
import * as S from "./style";

export interface ICartSideProps {
  subtotalPrice?: React.ReactNode;
  shippingPrice?: React.ReactNode;
  couponDiscount?: React.ReactNode;
  totalPrice?: React.ReactNode;
  mrp?: React.ReactNode;
  netPrice?: React.ReactNode;
  itemDiscount?: React.ReactNode;
  offerDiscount?: React.ReactNode;
  prepaidDiscount?: React.ReactNode;
  walletCredit?: React.ReactNode;
  membershipDiscount?: React.ReactNode;
  netTotal?: React.ReactNode;
  prepaidDiscountText?: string;
}

export const CartSide: React.FC<ICartSideProps> = ({
  subtotalPrice,
  shippingPrice,
  couponDiscount,
  totalPrice,
  mrp,
  netPrice,
  itemDiscount,
  offerDiscount,
  prepaidDiscount,
  netTotal,
  walletCredit,
  membershipDiscount,
  prepaidDiscountText = "Prepaid Discount",
}) => {
  if (clients.PLIXLIFEFC === CLIENT) {
    return (
      <S.Wrapper>
        <S.Heading style={{ fontWeight: 700 }}>Payment Summary:</S.Heading>
        <S.Container borderTop={false}>
          {mrp && (
            <InvoiceTextAndPrice text="MRP" money={mrp} className="plixlife" />
          )}
          {itemDiscount && (
            <InvoiceTextAndPrice
              text="Item Discount"
              money={itemDiscount}
              className="plixlife-itemDiscount"
            />
          )}

          {netPrice && (
            <InvoiceTextAndPrice
              text="Net Price"
              money={netPrice}
              className="plixlife"
            />
          )}

          {subtotalPrice && (
            <S.Container borderTop={false}>
              <InvoiceTextAndPrice
                className="plixlife-sub-total"
                text="Sub Total"
                money={subtotalPrice}
              />
            </S.Container>
          )}
          <S.Container borderTop={false}>
            <S.Hr />
          </S.Container>
          {offerDiscount && (
            <InvoiceTextAndPrice
              text="Offer Discount"
              money={offerDiscount}
              className="plixlife"
            />
          )}
        </S.Container>
        <S.Container borderTop={false}>
          {/* {shippingPrice && (
            <InvoiceTextAndPrice
              text="Delivery Charges"
              money={shippingPrice || 0}
              className="plixlife"
            />
          )} */}
          {walletCredit && showCashback ? (
            <InvoiceTextAndPrice
              text="Wallet Credit"
              money={walletCredit}
              className="plixlife"
            />
          ) : (
            <>
              {couponDiscount && (
                <InvoiceTextAndPrice
                  text="Coupon Discount"
                  money={couponDiscount}
                  className="plixlife"
                />
              )}
            </>
          )}
          {prepaidDiscount && (
            <InvoiceTextAndPrice
              text={prepaidDiscountText}
              money={prepaidDiscount}
              className="plixlife"
            />
          )}
          {netTotal && (
            <InvoiceTextAndPrice
              text="Net Total"
              money={netTotal}
              className="plixlife"
            />
          )}
        </S.Container>
        {membershipDiscount && (
          <InvoiceTextAndPrice
            text="Membership Discount (10%)"
            money={membershipDiscount}
            className="plixlife-membership"
          />
        )}
        <S.Container borderTop={false}>
          <S.Hr />
        </S.Container>
        {totalPrice && (
          <S.Container borderTop={false}>
            <InvoiceTextAndPrice
              className="plixlife-grand-total"
              text="Grand Total"
              money={totalPrice}
            />
          </S.Container>
        )}
      </S.Wrapper>
    );
  }
  return (
    <>
      <S.Container borderTop>
        {subtotalPrice && (
          <InvoiceTextAndPrice text="Sub Total" money={subtotalPrice} />
        )}
        {mrp && <InvoiceTextAndPrice text="MRP" money={mrp} />}
        {itemDiscount && (
          <InvoiceTextAndPrice text="Item Discount" money={itemDiscount} />
        )}
        {netPrice && <InvoiceTextAndPrice text="Net Price" money={netPrice} />}
        {couponDiscount && (
          <InvoiceTextAndPrice
            text="Coupon Discount"
            money={couponDiscount}
            className="discount"
          />
        )}
        {offerDiscount && (
          <InvoiceTextAndPrice text="Offer Discount" money={offerDiscount} />
        )}
      </S.Container>
      <S.Container borderTop>
        {/* {shippingPrice && (
          <InvoiceTextAndPrice
            text="Delivery Charges"
            money={shippingPrice || 0}
          />
        )} */}
        {prepaidDiscount && (
          <InvoiceTextAndPrice
            text="Prepaid Discount"
            money={prepaidDiscount}
          />
        )}
      </S.Container>
      {totalPrice && (
        <S.Container borderTop>
          <InvoiceTextAndPrice text="Total" money={totalPrice} />
        </S.Container>
      )}
    </>
  );
};
CartSide.displayName = "CartSide";
export default CartSide;
