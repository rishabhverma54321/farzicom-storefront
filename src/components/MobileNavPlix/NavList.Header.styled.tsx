import { css } from "styled-components";
import { LinkProps } from "react-router-dom";
import { styled } from "@styles/themes";
import { Wrapper as NavItemLi } from "./NavItem.styled";

const Container = styled.div<LinkProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  svg {
    width: 62px;
    height: 60px;
  }
`;

const Close = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const GreetText = styled.span`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 300;
  font-size: 0.775rem;
  line-height: 1.25em;

  color: #ffffff;
`;

const NameText = styled.span`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5em;

  color: #ffffff;
`;

const TextWrapper = styled.div`
  margin-left: 0.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Wrapper = styled.li`
  background-color: #5dd37c;
`;

const AvatarIcon = styled.div`
  font-size: 3rem !important;
  color: #ffeae6;
`;

const UserChevron = styled.div`
  font-size: 0.75rem;

  path {
    stroke: #ffeae6;
  }
`;

const contentStyles = css`
  padding: 1rem 1rem;
  display: flex;
  gap: 3rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  img {
    width: 15vw;
  }
`;

const ContentAsLink = styled.div`
  ${contentStyles}
`;

const Content = styled.div`
  ${contentStyles}
`;

const Separator = styled.hr`
  margin: 0 auto 0 auto !important;
  padding:0;
  width: ${props => props?.width || "100%"}
  border:${props => props?.border || "0.02rem"} solid #EDEDED

  ${NavItemLi} + & {
    margin-top: 0.5rem;
  }
`;


export {
  GreetText,
  NameText,
  TextWrapper,
  Wrapper,
  AvatarIcon,
  UserChevron,
  Content,
  ContentAsLink,
  Separator,
  Container,
  Close,
};
