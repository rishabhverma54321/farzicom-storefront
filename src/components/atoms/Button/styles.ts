import { media } from "@styles/media";
import { styled } from "@styles/themes";
import { Size } from "./types";

const padding = {
  md: "0.8rem 3.7rem",
  sm: "0.7rem 1.5rem",
  continue: "11px 20px 8px",
  none: "0",
};

const fontSize = (fontSize: string, smallFontSize: string) => ({
  md: fontSize,
  sm: smallFontSize,
  none: fontSize,
});

export const Primary = styled.button<{
  color: "primary" | "secondary" | "tertiary";
  fullWidth?: boolean;
  size: Size;
  btnRadius?: string;
}>`
  background-color: ${props =>
    props.theme?.button?.colors[props.color].background};
  padding: ${props => padding[props.size]};
  border: 1px solid
    ${props => props.theme?.button?.colors[props.color].activeBackground};
  transition: 0.3s;
  outline: none;
  cursor: pointer;
  color: ${props => props.theme?.button?.colors[props.color].color};
  width: ${props => (props.fullWidth ? "100%" : "auto")};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: ${props => (props.btnRadius ? props.btnRadius : "0px")};
  &:hover {
    background-color: ${props =>
      props.theme?.button?.colors[props.color].hoverBackground};
    color: ${props => props.theme?.button?.colors[props.color].hoverColor};
    border: 1px solid
      ${props => props.theme?.button?.colors[props.color].hoverColor};
  }

  &:active {
    background-color: ${props =>
      props.theme?.button?.colors[props.color].activeBackground};
    color: white;
  }

  &:disabled {
    background-color: ${props => props?.theme?.colors?.activeBackground};
    // border: 1px solid ${props => props.theme.colors?.activeBackground};

    &,
    &:hover {
      cursor: default;
    }
  }
  ${media.mediumScreen`
      padding: ${padding.sm}
    `}
`;

export const Secondary = styled(Primary as any)`
  border: ${props => `1px solid ${props?.theme?.colors?.secondary}`};
`;

export const Text = styled.span<{
  size: Size;
  btnColor?: string;
  toCapitalize?: boolean;
}>`
  display: inline-block;
  text-transform: ${props => (props.toCapitalize ? "uppercase" : "capitalize")};
  font-size: 15px;
  font-weight: ${props => props.theme?.button?.typography?.fontWeight};
  display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

`;
