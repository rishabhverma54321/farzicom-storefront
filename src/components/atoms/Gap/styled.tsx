import { styled, defaultTheme } from "@styles/themes";
import { css } from "styled-components";


export const Gap = styled.div<{
  size?: string;
  largeScreenSize?: string;
  customSize?: { breakpoint: string; size: string };
}>`
  width: 100%;
  height: ${({ size }) => size || "2rem"};

  @media (min-width: ${props => props.theme.breakpoints.largeScreen}) {
    height: ${({ size, largeScreenSize }) => largeScreenSize || size || "2rem"};
  }

  ${props =>
    props.customSize
      ? css`
          @media (min-width: ${props.customSize.breakpoint}) {
            height: ${props.customSize.size};
          }
        `
      : ""}
`;

// TODO: Next.js I don't know why I had to do this.
Gap.defaultProps = {
  theme: defaultTheme
};