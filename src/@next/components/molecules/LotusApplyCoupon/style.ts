import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { Button } from "@components/atoms/Button";
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 10px; */
  flex-direction: column;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  > input {
    font-size: 16px;
    width: 100%;
    outline: none;
    border: none;
    height: 45px;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: 600;
    color: #686b78 !important;
    background-color: white !important;
    ::-webkit-input-placeholder {
      font-weight: 400;
    }

    /* border-bottom: 1px solid #8f8f8f;
    margin: 5px; */
  }
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  /* border-bottom: 1px solid #8f8f8f;
  margin: 5px; */
`;

export const StyledMyButton = styled(Button)`
  font-size: 12px;
  border: 1px solid ${props => props.theme.button.colors.primary.applyCoupon};
  color: ${props => props.theme.button.colors.primary.applyCoupon};
  background-color: #fff;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  width: 90px;
  margin: 5px;
  padding: 5px;
`;

export const ErrorMessage = styled.div`
  font-weight: 400;
  margin-top: 5px;
  color: #e95f5f;
  font-size: 12px;
  font-style: italic;
`;

export const Apply = styled.button`
  color: ${props => props.theme.button.colors.primary.applyCoupon};
  background-color: #fff;
  cursor: pointer;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 600;
  height: 45px;
`;

export const CodeDisplayBox = styled.div`
  padding: 16px;
  /* background-color: green; */
  border: 1px dashed ${props => props.theme.button.colors.primary.applyCoupon};
  border-radius: 4px;
  text-align: center;
  color: ${props => props.theme.button.colors.primary.applyCoupon};
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.smallScreen`
    flex-direction: column;
    padding: 12px;
    font-size: 0.9rem;
  `}
`;

export const AppliedMsg = styled.span`
  color: #56774d;
  align-self: flex-start;
  font-size: 14px;
  font-style: italic;
  margin-top: 5px;
`;

export const ViewAllOffersButton = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  text-align: left;
  margin-top: 8px;
  color: rgb(96, 178, 70);
  :after {
    content: "";
    font-size: 15px;
    display: inline-block;
    text-decoration: none;
    color: #69de7a;
    transform: rotate(90deg);
  }
`;
