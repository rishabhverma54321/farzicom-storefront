import styled from "styled-components";

export const IngredientDetails = styled.div`
  padding: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 99;
  height: 100%;
  overflow-y: auto;
  transition: 0.3s;
`;
export const IngredientData = styled.div`
  box-sizing: border-box;
  outline: none;
  text-decoration: none;
`;
export const IngreImage = styled.div`
  width: 45%;
  margin-bottom: 10px;
  @media (max-width: 720px) {
    width: 100%;
  }
`;
export const IngredientContent = styled.div`
  width: 45%;
  @media (max-width: 720px) {
    width: 100%;
  }
`;
export const WebHeading = styled.div`
  text-align: center;
  font-size: 20px;
  letter-spacing: 0.8px;
  position: relative;
  font-family: "Humanist521BT-Roman", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  color: #43693c;
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
  ::before {
    width: 150px;
    content: "";
    height: 2px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    bottom: 0;
    width: 100px;
    background-color: #43693c;
  }
  ::after {
    content: "";
    background: url("../src/images/lotus.png") no-repeat;
    position: absolute;
    bottom: -9px;
    left: 50%;
    transform: translateX(-50%);
    width: 28px;
    height: 18px;
    z-index: 1;
  }
`;
export const IngrePara = styled.div`
  p {
    margin-bottom: 10px;
    padding: 0;
    border: none;
    font-size: 15px;
    color: #444;
    font-family: "MyriadPro", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    line-height: 23px;
  }
  ul {
    padding-left: 15px;
    margin-top: 10px;
    font-size: 15px;
    color: #444;
    font-family: "MyriadPro", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    line-height: 23px;
    list-style: unset;
  }
  li {
    margin-bottom: 5px;
    font-size: 15px;
    color: #444;
    font-family: "MyriadPro", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    line-height: 23px;
  }
`;
export const DetailFirstRow = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: start;
  align-items: flex-start;
  flex-wrap: wrap;
`;
export const IngreFoundIn = styled.div`
  margin-top: 30px;
  @media (max-width: 720px) {
    margin-top: 0px;
  }
`;
export const CloseDetail = styled.span`
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 32px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1;
  @media (min-width: 767px) {
    right: 15px;
    top: 15px;
  }
`;
