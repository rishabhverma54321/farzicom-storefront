import styled from "styled-components";

export const FullContainer = styled.div`
  width: 100%;
`;
export const Container = styled.div`
  padding: 15px 60px;
  margin-bottom: 100px;
  position: relative;
`;
export const WebHeading = styled.div`
  text-align: center;
  position: relative;
  font-family: "Humanist521BT-Roman", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  font-size: 20px;
  color: ${props => props.theme.colors.checkboxRadioColor};
  text-transform: uppercase;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 15px 0;
  margin-bottom: 30px;
  width: 100%;
  @media (min-width: 1040px) {
    font-size: 25px;
    letter-spacing: 0.8px;
  }
`;
export const LoginSignBox = styled.div`
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  @media (min-width: 767px) {
    margin-bottom: 50px;
  }
`;
export const LoginBox = styled.div`
  width: 96%;
  padding: 10px;
  box-shadow: 0 0.5px 2.5px 2px rgba(40, 44, 63, 0.1);
  font-family: "Humanist521BT-Roman", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;

  @media (min-width: 767px) {
    width: 420px;
  }
`;
export const ShowBox = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 10px;
  height: 100%;
`;
export const Form = styled.form`
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
`;
export const InputDiv = styled.div`
  position: relative;
  margin-bottom: 10px;
`;
export const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: none;
  border-bottom: 1px solid #000;
  font-family: "Humanist521BT-Roman", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  font-size: 15px;
  background-color: rgb(255, 255, 255);
  appearance: none;
  border-radius: 0px;
  outline: none;
`;
export const Span = styled.span`
  /* position: absolute; */
  right: 0;
  color: red;
  font-size: 12px;
  border-radius: 10px;
  padding: 2px 10px;
`;
export const ButtonDiv = styled.div`
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 15px;
  -webkit-box-pack: center;
  justify-content: center;
`;
export const Button = styled.button`
  background-color: ${props => props.theme.button.colors.primary.background};
  text-transform: uppercase;
  color: #fff;
  font-size: 15px;
  padding: 11px 20px 8px;
  transition-duration: 0.5s;
  border: none;
  cursor: pointer;
  display: flex;
  font-family: "MyriadPro-Regular", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
`;
