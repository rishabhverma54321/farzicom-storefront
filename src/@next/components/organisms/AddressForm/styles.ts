import { wishlistAddProduct } from './../../molecules/ProductCardPlixlife/gqlTypes/wishlistAddProduct';
import { media, minMedia } from "@styles/media";
import { styled } from "@styles/themes";
import { TextField } from "@components/molecules/TextField";
import { InputSelect } from "@components/molecules/InputSelect";

// type WrapperProps = {
//   active: boolean;
//   error: boolean;
//   disabled: boolean;
//   theme: DefaultTheme;
// };

// const getEdgeColor = (
//   { active, error, disabled, theme }: WrapperProps,
//   hovered = false
// ) => {
//   if (disabled) {
//     return theme.colors.disabled;
//   }

//   if (error) {
//     return theme.colors.error;
//   }

//   if (hovered) {
//     return theme.colors.secondary;
//   }

//   return active ? theme.colors.secondary : theme.colors.dark;
// };

export const AddressFormContainer = styled.div`
  width: 100%;
  padding: 10px 0px;
  ${media.mediumScreen`
  padding: 0px 0px;
  `}
`;

export const HR = styled.div`
  width: 100%;
  padding: 0 4vh;
  border: 1px solid rgb(217, 217, 217);
`;

export const AddressForm = styled.form`
  width: 100%;
  font-family: 'CocoSharp XL' !important;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  input{
    font-family: 'CocoSharp XL' !important;
    font-style: normal;
    font-weight: 400;
    font-size: 14px !important;
    line-height: 160%;
  }

`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.7rem;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin: 0px;
  ${({updatefont})=>
  updatefont && `
  font-family: 'CocoSharp XL';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  color: #000000;
  `   
 }
 ${media.smallScreen`
    margin-bottom:15px;
 `}
`;

export const RowWithTwoCells = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px !important;
  justify-content: space-between;
  & > div {
    width: calc(50% - ${props => props.theme.spacing.fieldSpacer} / 2);
    ${media.smallScreen`
      width: 48%;
    `}
  }
  label{
      font-family: 'CocoSharp XL' !important;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;

      color: #808080 !important;
    }

`;

export const RowWithThreeCells = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;

  > div ~ div {
    margin-top: 1rem;
  }

  label{
      font-family: 'CocoSharp XL' !important;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;

      color: #808080 !important;
  }


  ${minMedia.largeScreen`
    & > div {
      width: calc(33% - ${props => props.theme.spacing.fieldSpacer} / 3);
    }

    > div ~ div {
      margin-top: 0rem;
    }
  `}
`;

export const RowWithOneCell = styled.div`
  width: 100%;
  margin: 0px 0px 15px 0px!important;
  label{
      font-family: 'CocoSharp XL' !important;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 160%;

      color: #808080 !important;
    }
`;

export const Card = styled.div`
  width: 100%;
  box-shadow: 0 0.5px 2.5px 2px rgba(40, 44, 63, 0.1);
  padding: 25px 20px;
  margin-bottom: 20px;
  ${media.mediumScreen`
    padding: 20px 10px;
  `}
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 0px;
  border: 1px solid #d4d6d5;
  /* @media (max-width: 991px) {
    margin-bottom: ${props => (props.helpText ? "1rem" : null)};
  } */
  input{
    font-family: 'CocoSharp XL' !important;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
  }
  
`;

export const StyledInputSelect = styled(InputSelect)`
  margin-bottom: 0px;
  font-size: ${props => props.theme.typography.baseFontSize};
`;

export const SelectStateWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 0px;
  border: 1px solid #d4d6d5;
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 0px;
  /* border: 1px solid #d4d6d5; */

  &:hover {
    border-color: ${props => props.theme.colors.tertiary};
  }
`;

export const Select = styled.select`
  border-width: 0;
  padding: 0.8rem 1rem;
  background-color: white;
  font-size: medium;
  font-family: "MyriadPro", serif, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #444444;
  min-height: 34px;
  width: 95%;
  display: flex;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.tertiary};
  }

  &:focus {
    outline: none;
  }
`;

export const Option = styled.option`
  font-size: small;
  font-family: "MyriadPro", serif, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #444444;

  &:hover {
    color: #444444;
    background-color: green;
  }
`;

export const ErrorText = styled.span`
  color: ${props => props.theme.input.labelColor};
  font-size: ${props => props.theme.input.labelFontSize};
`;

export const ErrorTextWrapper = styled.div`
  position: absolute;
  top: 100%;
`;

export const Divider = styled.div`
  width: 100%;
  padding: 0 4vh;
`;

export const AddresslabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h4{
    font-family: 'CocoSharp XL';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 160%;
    color: #454545;
  }
`;

export const Addresslabels = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 12px 0px;
  span{
    font-family: 'CocoSharp XL';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 120%;
    color: #808080;
    border: 1px solid #E7E7E7;
    border-radius: 22px;
    padding: 7.5px 17px;
    &:not(:last-child){
      margin-right: 15px;
    }
  }
  .MuiFormGroup-root{
    display: flex;
    flex-direction: row;
  }
  label{
    margin-left: 0px;
    .MuiRadio-colorSecondary{
      width: 0px;
      height: 0px;
      padding: 0px;
      visibility: hidden;
      margin: 0px;

    }
  }
`;

export const SetDeafaultAddress = styled.div`
    display: flex;
    flex-direction: row;
    div{
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }
    input{
      margin-right: 8px;
      width: 20px;
      height: 20px;
      /* accent-color: darkgreen; */
    }
    label{
      font-family: 'CocoSharp XL';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 160%;
      color: #000000;
    }
`;

export const SelectedLabel = styled.div`
  span{
    background: #D1FFD9;
    border: 1px solid #1EAF6D;
    border-radius: 22px;
    font-family: 'CocoSharp XL';
    font-style: normal;
    font-weight: 800;
    font-size: 12px;
    line-height: 120%;
    color: #1EAF6D;
  }
`;


export const Defaultset = styled.div`
  background: #FFFFFF;
  border: 1px solid #E7E7E7;
  border-radius: 8px;
  padding: 13px 14px;
  font-family: 'CocoSharp XL';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: #808080;
  margin: 10px 0px 26px 0px;
  max-width: 50%;
  ${media.mediumScreen`
      width: 100%;
      max-width: 100%;
  `}
`;