import React, { useEffect } from "react";

import { useCheckout, useCheckoutState } from "@saleor/sdk";

import { useIsMobile } from "@hooks/useIsMobile";
import { showCashback } from "Themes/config";
import SavingsStrip from "@components/atoms/SavingsStrip";
import { IProps } from "./types";
import * as S from "./styles";

// const dummyAddress = {
//   id: "1",
//   firstName: "dummy",
//   lastName: "dummy",
//   companyName: "nkjnk",
//   streetAddress1: "nlnn",
//   streetAddress2: "nlnlll",
//   city: "delhi",
//   postalCode: "110006",
//   countryArea: "Delhi",
//   phone: "7894561230",
//   country: {
//     code: "IN",
//     country: "India",
//   },
// };
/**
 * Cart template for cart page with list of products added by user.
 */

const CartIkkai: React.FC<IProps> = ({
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
}: IProps) => {
  const { setShippingMethod } = useCheckout();

  const { availableShippingMethods } = useCheckoutState();
  const isMobile = useIsMobile();

  const lengthShippingMethod = availableShippingMethods?.length;
  // const { user } = useAuthState();

  // const { show } = useContext(OverlayContext);
  useEffect(() => {
    //

    if (availableShippingMethods && availableShippingMethods.length > 0)
      setShippingMethod(availableShippingMethods[0].id);
  }, [lengthShippingMethod]);

  return (
    <S.Wrapper>
      <S.Breadcrumbs>{breadcrumbs}</S.Breadcrumbs>
      {!isMobile && <S.Title>{title}</S.Title>}
      {/* <S.CartHeader>{cartHeader}</S.CartHeader> */}
      <S.Container>
        <S.LeftSide>
          <S.Cart>{cart}</S.Cart>
          {/* <S.SanitizeStrip>{sanitizeStrip}</S.SanitizeStrip> */}
        </S.LeftSide>
        <S.RightSide>
          <S.CartFooter>{cartFooter}</S.CartFooter>
          {totalDiscount && (
            <S.SavingsWrapper>
              <SavingsStrip totalDiscount={totalDiscount} />
            </S.SavingsWrapper>
          )}
          {showCashback && (
            <S.CashbackStrip>
              You will get Cashback of ₹ {cashbackRecieve} with this order.
            </S.CashbackStrip>
          )}

          <S.BottomStickButtons>
            <S.ProceedButton>{button}</S.ProceedButton>
            {/* <S.ContinueShoppingButton>
              {continueShopping}
            </S.ContinueShoppingButton> */}
          </S.BottomStickButtons>
        </S.RightSide>
      </S.Container>
    </S.Wrapper>
  );
};

export { CartIkkai };
