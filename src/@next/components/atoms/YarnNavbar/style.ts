import { styled } from "@styles/themes";

export const Navbar = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #ffffff;
  width: 100%;
  position: fixed;
  margin-left: 4.125rem;
  height: 3.625rem;
  padding: 1.25rem;
  z-index: 3;
  top: 0;
  overflow: hidden;
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Navlinks = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & div.nav-item:first-child {
    margin-right: 0.833rem;
  }
  & div.nav-item {
    min-width: 8.5rem;
  }
  & div.nav-item p {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1rem;
    color: #000000;
    margin: 0 0.125rem;
  }
  & div.nav-item svg {
    font-size: 5rem;
  }
`;

export const Separator = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 1.75rem;
  display: flex;
  justify-content: center;
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
`;
