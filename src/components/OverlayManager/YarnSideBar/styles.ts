import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Header = styled.div`
  /* background-color: ${props => props.theme.modal.colors.headerBackground};
  color: ${props => props.theme.modal.colors.headerTextColor};
  font-size: ${props => props.theme.typography.h4FontSize}; */
  display:flex;
  justify-content:space-between;
  padding:1.2rem;


`;

export const Heading = styled.div`
  font-size: 1.2rem;
`;

export const CloseNavCon = styled.div`
  cursor: pointer;
`;

export const Container = styled.div`
  background-color: white;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50vw;
  ${media.mediumScreen`
  width: 75vw;
  `}
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0.95rem 0.85rem;
  padding: 1.05rem 1.2rem;
  background: #f4f8f9;
  box-shadow: 0px 0px 10px rgb(33 34 35 / 10%);
  border-radius: 8px;
`;

export const SidebarSubheader = styled.div`
  margin: 0.95rem 0.85rem;
  box-shadow: 0px 0px 10px rgb(33 34 35 / 10%);
  border-radius: 8px;

  &.mob-nav-switch {
    padding-top: 0.5rem;
  }
`;

export const Navlinks = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 2.938rem;
  position: relative;
  padding: 0.2rem 0.4rem;
  background-color: #f4f8f9;
  & div.nav-item:first-child {
    margin-right: 0.833rem;
  }
  & div.nav-item {
    min-width: 1.2rem;
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  min-height: 2.938rem;
  align-items: center;
  position: static;
  padding: 0.2rem 0.4rem;
`;

export const ButtonContent = styled.div``;

export const OptionsContainer = styled.div`
  width: 100%;
`;

export const InnerContainer = styled.div`
  width: 100%;
`;
