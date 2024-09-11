import React, { useEffect } from "react";

import { useCheckout, useCheckoutState } from "@saleor/sdk";

import { CLIENT, showCashback } from "Themes/config";
import { SavingsStrip } from "@components/atoms/SavingsStrip";
import { ClientCollectionHeading } from "@components/atoms/ClientCollectionHeading";
import { IProps } from "./types";
import * as S from "./styles";

export const dummyAddress = {
  id: "1",
  firstName: "dummy",
  lastName: "dummy",
  companyName: "nkjnk",
  streetAddress1: "nlnn",
  streetAddress2: "nlnlll",
  city: "delhi",
  postalCode: "110006",
  countryArea: "Delhi",
  phone: "7894561230",
  country: {
    code: "IN",
    country: "India",
  },
};
/**
 * Cart template for cart page with list of products added by user.
 */

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
  totalPrice,
}: IProps) => {
  const {
    // setShippingAddress,
    setShippingMethod,
    // checkout,
  } = useCheckout();

  const { availableShippingMethods } = useCheckoutState();

  const lengthShippingMethod = availableShippingMethods?.length;

  // const { user } = useAuthState();

  // const { show } = useContext(OverlayContext);
  useEffect(() => {
    //

    if (availableShippingMethods && availableShippingMethods.length > 0)
      setShippingMethod(availableShippingMethods[0].id);
  }, [lengthShippingMethod]);

  const cashbackPercent =
    cashbackRecieve !== undefined && totalPrice !== undefined
      ? totalPrice === 0
        ? 0
        : Math.round((cashbackRecieve * 100) / totalPrice)
      : 0;

  return (
    <S.Wrapper>
      <S.Breadcrumbs>{breadcrumbs}</S.Breadcrumbs>
      {/* <S.Title>{title}</S.Title> */}
      <ClientCollectionHeading client={CLIENT} heading="Cart" />

      <S.Container>
        <S.LeftSide>
          <S.Cart>{cart}</S.Cart>
          {CLIENT === "lotus" && (
            <S.SanitizeStrip>{sanitizeStrip}</S.SanitizeStrip>
          )}
        </S.LeftSide>
        <S.RightSide>
          <S.CartFooter>{cartFooter}</S.CartFooter>
          {showCashback && (
            <S.CashbackStrip>
              You will get {cashbackPercent}% Cashback with this order.
            </S.CashbackStrip>
          )}
          {/* <S.SavingButton>
            Saving of &#8377;{totalDiscount} with this order
          </S.SavingButton> */}
          {totalDiscount !== undefined && totalDiscount >= 0 && (
            <S.SavingsWrapper>
              <SavingsStrip totalDiscount={totalDiscount} />
            </S.SavingsWrapper>
          )}
          <S.BottomStickButtons>
            <S.ProceedButton>{button}</S.ProceedButton>
            {/* <S.ContinueShoppingButton>
              {continueShopping}
            </S.ContinueShoppingButton> */}
          </S.BottomStickButtons>
        </S.RightSide>
      </S.Container>
      <> </>
    </S.Wrapper>
  );
};

export { Cart };
