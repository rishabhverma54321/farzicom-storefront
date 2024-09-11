import { styled } from "@styles/themes";
import { media } from "@styles/media";
import Background from "./yarn-login-back.svg";

export const Container = styled.section`
  background-size: cover;
  position: fixed;
  z-index: 101;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: skyblue;
  background-image: url(${Background});
`;
export const LoginSection = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  & div.login-position {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (orientation: landscape) {
    & div.login-position {
      width: 100%;
      top: 20%;
      left: 50%;
      transform: translate(-50%);
    }
  }
`;
export const ErrorMsg = styled.div`
  color: ${props => props.theme.colors.textCut};
`;

export const WelcomeMsg = styled.header`
  color: #ffffff;
  margin-bottom: 3rem;
  ${media.largeScreen`
  `}
  transition: all 0.2s linear;
  & p {
    text-align: center;
    font-size: 3rem;
    line-height: 3.688rem;
    font-family: "RobotoLight";
  }
  & p:last-child {
    font-weight: 700;
  }
  @media (max-width: 480px) {
    margin-bottom: 2.5rem;
    & p {
      font-size: 2rem;
      line-height: 2.688rem;
      padding: 0.25rem;
    }
  }
  @media (max-width: 328px) {
    margin-bottom: 2rem;
    & p {
      font-size: 1.8rem;
      line-height: 2.25rem;
      padding: 0;
    }
  }
`;

export const LoginContainer = styled.div`
  padding: 1.25rem;
  max-width: 25.25rem;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  @media (max-width: 480px) {
    max-width: 22rem;
    padding: 1rem 0.625rem;
  }
  @media (max-width: 328px) {
    max-width: 20rem;
    padding: 0.75rem;
    margin: 0.25rem;
  }
`;
export const LoginHeader = styled.h2`
  font-weight: 500;
  font-size: 1.375rem;
  line-height: 1.625rem;
  color: #101010;
  margin: 0 0.313rem 1.625rem;
  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin: 0 0.2rem 1.25rem;
  }
  @media (max-width: 328px) {
    font-size: 1.125rem;
    margin: 0 0.175rem 1.125rem;
  }
  @media (max-width: 280px) {
    font-size: 1.125rem;
    text-align: center;
    margin: 0 0.175rem 0.625rem;
  }
`;

export const LoginDescription = styled.p`
  font-weight: 500;
  font-size: 1rem;
  line-height: 140%;
  letter-spacing: -0.0041em;
  color: #616161;
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
  @media (max-width: 328px) {
    font-size: 0.85rem;
  }
`;
export const Result = styled.div`
  &.result {
    padding: 0.25rem 0;
    border: 1px solid rgba(49, 61, 138, 0.29);
    border-radius: 0.25rem;
  }
  & div.result--body {
    height: 6rem;
    overflow-y: auto;
  }
  & div.result--body::-webkit-scrollbar {
    width: 0.5rem;
  }

  & div.result--body::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 2.5rem;
  }
  & p {
    font-size: 1rem;
    color: #616161;
    padding: 0.25rem 0.5rem;
    transition: all 0.2s linear;
    cursor: pointer;
  }
  & p:hover {
    background: rgba(16, 16, 16, 0.05);
  }
  & p:active {
    color: white;
    background: #f99f23;
  }
`;
export const Continue = styled.button<{ disableProp?: boolean }>`
  background-color: #f99f23;
  width: 100%;
  color: white;
  border-radius: 0.25rem;
  padding: 0.625rem 0.563rem;
  font-family: "Manrope";
  line-height: 150%;
  font-size: 1.125rem;
  letter-spacing: 0.005em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: ${props => (props.disableProp ? "not-allowed" : "pointer")}
  margin-top: 1.25rem;
  & span:first-child {
    margin: 0 0.625rem;
  }
  & span:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & svg.right-arrow {
    font-size: 1.5rem;
    stroke: #ffffff;
  }
  @media (max-width: 380px) {
    padding: 0.5rem 0.45rem;
    font-size: 1rem;
    & svg.right-arrow {
      font-size: 1.25rem;
    }
  }
`;
export const SocialBtn = styled.button`
  width: 50%;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 0.313rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.563rem;
  font-size: 1rem;
  font-family: "Manrope";
  font-weight: 600;
  &:first-child {
    margin-right: 0.313rem;
  }
  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    &:last-child {
      margin-left: 0.625rem;
    }
  }
  @media (max-width: 380px) {
    padding: 0.45rem;
    font-size: 0.9rem;
    & svg.right-arrow {
      font-size: 1.25rem;
    }
  }
`;

export const Navbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 100%;
  height: 62px;
  position: static;
  top: 0;
  padding: 1.25rem;
`;

export const Navlinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0.15;
`;

export const Link = styled.a`
  text-decoration: none;
  color: black;
  width: 32px;
  height: 14px;
  left: 0px;
  top: 0px;
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
`;

export const NavTitle = styled.h4`
  left: 19.89%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  font-family: Manrope;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;
  color: black;
  display: flex;
  align-items: center;
  flex-grow: 0.85;
`;
