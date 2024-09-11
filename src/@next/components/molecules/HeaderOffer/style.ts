import { styled } from "@styles/themes";
import { minMedia } from "@styles/media";

export const HeaderText = styled.h2`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-size: 0.75rem !important;
  line-height: 1.5em;
  color: #ffffff;
  text-align: center;

  ${minMedia.largeScreen`
    font-size: 0.85rem;
    line-height: 1em;
    text-align: start;
  `}
`;

export const NavHeader = styled.header`
  padding: 0.45rem 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  // background-color: ${props => props.theme.homeHeaderText.backgroundColor};

  ${minMedia.largeScreen`
    padding: 0.55rem 0;
  `}
`;
