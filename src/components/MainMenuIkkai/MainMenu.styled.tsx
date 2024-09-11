import { styled } from "@styles/themes";

export const CartMobileHeading = styled.h2`
  margin-left: 1rem;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 600;
  font-size: 1rem;
  line-height: 1em;
  text-transform: uppercase;
  color: #2e3642;
`;

export const CartNavWrapper = styled.nav`
  &.main-menu {
    height: 3.5rem;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: baseline;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  }

  svg {
    font-size: 1.75rem;
  }
`;
