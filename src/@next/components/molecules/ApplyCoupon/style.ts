import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { Button } from "@components/atoms/Button";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  > input {
    width: 30%;
    outline: none;
    border: none;
    border-bottom: 1px solid #8f8f8f;
    margin: 5px;
  }
`;

export const Input = styled.input`
  width: 30%;
  outline: none;
  border: none;
  border-bottom: 1px solid #8f8f8f;
  margin: 5px;
`;

export const StyledMyButton = styled(Button)`
  font-size: 12px;
  border: 1px solid ${props => props.theme.button.colors.applyCoupon};
  color: ${props => props.theme.button.colors.applyCoupon};
  background-color: #fff;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  width: 90px;
  margin: 5px;
  padding: 5px;
`;

export const ErrorMessage = styled.span`
  color: #fff;
  background-color: #ff0000;
  text-align: center;
  padding: 0.5vh;
  border-radius: 5px;
`;

export const Apply = styled.input`
  font-size: 12px;
  && {
    border: 1px solid ${props => props.theme.button.colors.applyCoupon};
  }
  :hover {
    color: #fff;
    background-color: ${props => props.theme.button.colors.applyCoupon};
  }
  color: ${props => props.theme.button.colors.applyCoupon};
  background-color: #fff;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  cursor: pointer;
  width: 100px;
  padding: 5px;
`;

export const CodeDisplayBox = styled.div`
  padding: 16px;
  /* background-color: green; */
  border: 1px dashed ${props => props.theme.button.colors.applyCoupon};
  border-radius: 4px;
  text-align: center;
  color: ${props => props.theme.button.colors.applyCoupon};
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
