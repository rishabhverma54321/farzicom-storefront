import { media, styled } from "@styles";

export const OtpWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  input {
    width: 50px;
    height: 60px;
    margin: 0rem 0.25rem;
    background: #ffffff;
    border: 2px solid ${props => props.theme.colors.newPlixGreen};
    border-radius: 9.81493px;
    text-align: center;
    font-weight: 400;
    font-size: 22px;
    line-height: 160%;
    color: #000000;
    font-weight: 700;
    &.errormsg {
      border: 1px solid #b50000;
    }
    @media (max-width: 767px) {
      width: 42px;
      height: 50px;
    }
    &::placeholder {
      color: #808080;
    }
    &::-webkit-placeholder {
      color: #808080;
    }
    &::-moz-placeholder {
      color: #808080;
    }
    &::-ms-placeholder {
      color: #808080;
    }
    &:focus-visible {
      outline: none;
      border: 2px solid ${props => props.theme.colors.plixDarkGreen};
    }
  }
`;
export const InputDiv = styled.div<{ errorstate: string }>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom:0.5rem;
  border: ${props =>
    `2px solid ${props.errorstate ? "red" : props.theme.colors.newPlixGreen}`}
  border-radius: 8px;
`;
export const CountryCode = styled.div<{ errorstate: string }>`
  width: 71px;
  height: 48px;
  background: #ffffff;
  border-right: ${props =>
    `1px solid ${props.errorstate ? "red" : props.theme.colors.newPlixGreen}`}
  border-radius: 8px 0px 0px 8px;
  // border: none !important;
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: #808080;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: #ffffff;
  // border: 1px solid #e7e7e7;
  border-radius: 8px;
  border: none !important;
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: #808080;
  appearance: none;
  outline: none;
`;
