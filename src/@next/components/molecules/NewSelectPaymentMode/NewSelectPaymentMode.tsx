import React from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";
import RadioGroup from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material";
import { RadioState } from "@app/pages/CheckoutPage";
// import VisaRupay from "images/visa_rupay.jpg";
// import { defaultTheme } from "Themes/globalStyles";
import PaymentIcon from "images/lotus-new/pay.svg";
import * as S from "./styles";

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
  /* min-height: 70px; */
  font-family: "Humanist521BT-Roman", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  border: 1px solid #fff;
`;
const AddressDetail = styled.div`
  display: flex;
  width: 100%;
  /* padding: 20px; */
  font-family: "Humanist521BT-Roman", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  color: #686b78;
  flex-direction: column;
`;
const OfferStrip = styled.span`
  margin-left: 1.9rem;
  font-style: italic;
  font-size: 14px;
  margin-bottom: 10px;
`;

// const VRupay = styled.img`
//   max-width: 100%;
//   width: 100%;
//   @media (min-width: 767px) {
//     width: 80%;
//   }
// `;
export interface INewSelectPaymentModeProps {
  handleOnSelect: (value: RadioState) => void;
  initialValue: RadioState;
  setRadioState: React.Dispatch<React.SetStateAction<RadioState>>;
}

// const cardImages = VisaRupay;

export const NewSelectPaymentMode: React.FC<INewSelectPaymentModeProps> = ({
  initialValue,
  handleOnSelect,
  setRadioState,
}) => {
  // const [paymentType, setPaymentType] = useState(initialValue);
  const handleTypeChange = () => {
    if (initialValue === "PayOnline") {
      setRadioState("COD");
      handleOnSelect("COD");
    } else {
      setRadioState("PayOnline");
      handleOnSelect("PayOnline");
    }
  };
  return (
    <>
      <S.PaymentSelectContainer radiostate={initialValue}>
        <RadioGroup value={initialValue} onChange={handleTypeChange}>
          <AddressBar>
            <AddressDetail
              style={{
                borderBottom: "2px dashed #e5e5e5",
                paddingBottom: "15px",
              }}
            >
              <FormControlLabel
                value="PayOnline"
                control={<Radio style={{ color: "#56774D" }} />}
                label="Pay Online"
              />
              <OfferStrip>Get extra 5% off on prepaid orders.</OfferStrip>
              <ReactSVG path={PaymentIcon} style={{ marginLeft: "1.9rem" }} />
              {/* <VRupay src={cardImages} /> */}
            </AddressDetail>
          </AddressBar>
          <AddressBar style={{ marginBottom: 0 }}>
            <AddressDetail>
              <FormControlLabel
                value="COD"
                control={<Radio style={{ color: "#56774D" }} />}
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
NewSelectPaymentMode.displayName = "NewSelectPaymentMode";
export default NewSelectPaymentMode;
