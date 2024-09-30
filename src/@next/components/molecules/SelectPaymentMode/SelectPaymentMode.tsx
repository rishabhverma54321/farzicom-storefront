import React, { useState } from "react";
import styled from "styled-components";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { RadioState } from "@app/pages/CheckoutPage";
import VisaRupay from "images/visa_rupay.jpg";
import { defaultTheme } from "Themes/globalStyles";
import * as S from "./style";
import { CLIENT } from "Themes/config";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";

const AddressBar = styled.div`
  /* -webkit-box-shadow: 0 .5px 2.5px 2px rgba(40,44,63,0.1); */
  /* box-shadow: 0 0.5px 2.5px 2px rgba(40, 44, 63, 0.1); */
  cursor: pointer;
  /* display: -webkit-box; */
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 10px;
  min-height: 70px;
  border: 1.5px solid #000;
  border-radius: 6px;
  margin-bottom: 20px;
`;
const AddressDetail = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  color: #345e2e;
  flex-direction: column;
`;

const VRupay = styled.img`
  max-width: 100%;
  width: 100%;
  @media (min-width: 767px) {
    width: 80%;
  }
`;
export interface ISelectPaymentModeProps {
  handleOnSelect: (value: RadioState) => void;
  initialValue: RadioState;
  setRadioState: React.Dispatch<React.SetStateAction<RadioState>>;
}

const cardImages = VisaRupay;

export const SelectPaymentMode: React.FC<ISelectPaymentModeProps> = ({
  initialValue,
  handleOnSelect,
  setRadioState,
}) => {
  const [paymentType, setPaymentType] = useState(initialValue);
  const handleTypeChange = () => {
    if (initialValue === "PayOnline") {
      setRadioState("COD");
      handleOnSelect("COD");
      setPaymentType("COD");
    } else {
      setRadioState("PayOnline");
      handleOnSelect("PayOnline");
      setPaymentType("PayOnline");
    }
  };
  return CLIENT === clients.PLIXLIFEFC || CLIENT === clients.BODY_FIRST ? (
    <>
      <S.PaymentSelectContainerPlix radiostate={initialValue}>
        <S.PaymentSelectTitle>Payment Method</S.PaymentSelectTitle>
        <RadioGroup value={initialValue} onChange={handleTypeChange}>
          <AddressBar>
            <AddressDetail>
              <S.RadioContainer className="CheckoutPaymentMethodRadioContainer">
                <FormControlLabel
                  value="PayOnline"
                  control={
                    <Radio
                      style={{ color: defaultTheme.colors.checkboxRadioColor }}
                    />
                  }
                  style={{ color: "#000" }}
                  label="Razorpay (Cards, UPI, NetBanking, Wallets)"
                />
              </S.RadioContainer>
              {paymentType === "PayOnline" && (
                <S.PaymentMethodDescription>
                  Applied : Extra 5% Off with Your Order
                  <br />
                  <br />
                  After clicking{" "}
                  <S.PaymentMethodDescriptionDarkSpan>
                    "Place Order"
                  </S.PaymentMethodDescriptionDarkSpan>
                  , you will be redirected to Razorpay (Cards, UPI, NetBanking,
                  Wallets) to complete your purchase securely.
                </S.PaymentMethodDescription>
              )}
            </AddressDetail>
          </AddressBar>
          <AddressBar>
            <AddressDetail>
              <S.RadioContainer className="CheckoutPaymentMethodRadioContainer">
                <FormControlLabel
                  value="COD"
                  control={
                    <Radio
                      style={{ color: defaultTheme.colors.checkboxRadioColor }}
                    />
                  }
                  style={{ color: "#000" }}
                  label="Cash on Delivery"
                />
              </S.RadioContainer>
              {paymentType === "COD" && (
                <S.PaymentMethodDescription>
                  Do you know you get an Extra 5% Off when you pay online?
                  <br />
                  For everyone’s safety, we advise paying online to limit
                  contact and help stop the spread of the virus.
                  <br />
                  <br />
                  Click{" "}
                  <S.PaymentMethodDescriptionDarkSpan>
                    "Place Order"
                  </S.PaymentMethodDescriptionDarkSpan>
                  &nbsp; to complete your purchase.
                </S.PaymentMethodDescription>
              )}
            </AddressDetail>
          </AddressBar>
        </RadioGroup>
      </S.PaymentSelectContainerPlix>
      {/* <Formik
        initialValues={{
          paymentMethod: "PayOnline",
        }}
        onSubmit={values => {
          //
        }}
      >
        {({ values }) => (
          <Form>
            <S.PaymentSelectContainer>
              <Field
                type="radio"
                name="paymentMethod"
                value="PayOnline"
                onClick={()=>handleOnSelect(values.paymentMethod)}

              />
              Pay Online
              <p>(Additional 5% prepaid discount on order above Rs.100)</p>
              <S.Photo>
                <img src={cardImages} alt="Payment Methods" />
              </S.Photo>
            </S.PaymentSelectContainer>
            <S.PaymentSelectContainer>
              <Field
                type="radio"
                name="paymentMethod"
                value="COD"
                onClick={()=>handleOnSelect(values.paymentMethod)}
              />
              Cash On Delivery
            </S.PaymentSelectContainer>
          </Form>
        )}
      </Formik> */}
    </>
  ) : (
    <>
      <S.PaymentSelectContainer radiostate={initialValue}>
        <RadioGroup value={initialValue} onChange={handleTypeChange}>
          <AddressBar>
            <AddressDetail>
              <FormControlLabel
                value="PayOnline"
                control={
                  <Radio
                    style={{ color: defaultTheme.colors.checkboxRadioColor }}
                  />
                }
                label="Pay Online"
              />
              <VRupay src={cardImages} />
            </AddressDetail>
          </AddressBar>
          <AddressBar>
            <AddressDetail>
              <FormControlLabel
                value="COD"
                control={
                  <Radio
                    style={{ color: defaultTheme.colors.checkboxRadioColor }}
                  />
                }
                label="Cash on Delivery"
              />
            </AddressDetail>
          </AddressBar>
        </RadioGroup>
      </S.PaymentSelectContainer>
      {/* <Formik
        initialValues={{
          paymentMethod: "PayOnline",
        }}
        onSubmit={values => {
          //
        }}
      >
        {({ values }) => (
          <Form>
            <S.PaymentSelectContainer>
              <Field
                type="radio"
                name="paymentMethod"
                value="PayOnline"
                onClick={()=>handleOnSelect(values.paymentMethod)}

              />
              Pay Online
              <p>(Additional 5% prepaid discount on order above Rs.100)</p>
              <S.Photo>
                <img src={cardImages} alt="Payment Methods" />
              </S.Photo>
            </S.PaymentSelectContainer>
            <S.PaymentSelectContainer>
              <Field
                type="radio"
                name="paymentMethod"
                value="COD"
                onClick={()=>handleOnSelect(values.paymentMethod)}
              />
              Cash On Delivery
            </S.PaymentSelectContainer>
          </Form>
        )}
      </Formik> */}
    </>
  );
};
SelectPaymentMode.displayName = "SelectPaymentMode";
export default SelectPaymentMode;
