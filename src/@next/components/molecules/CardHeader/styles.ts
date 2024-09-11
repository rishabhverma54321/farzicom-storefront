import { styled } from "@styles/themes";
import { TitleSize } from "./types";

export const Header = styled.div<{ divider: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => `1.1rem ${props.theme.spacing.gutter}`};
  ${({ divider, theme }) =>
    divider && `border-bottom: 1px solid ${theme.colors.light};`}
  ${({ fixedposition })=> 
  fixedposition && `
    justify-content:flex-start;
  `
  }
`;

export const Title = styled.h4<{ size: TitleSize }>`
  font-size: ${({ size, theme: { typography } }) =>
    size === "lg" ? typography.h4FontSize : typography.baseFontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: ${props => props.theme.colors.baseFont};
  text-transform: uppercase;
  padding-right: 0.6rem;
  margin: 0;
  ${({ fixedposition })=> 
  fixedposition && `
    font-family: CocoSharp XL !important;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
  `
  }
`;

export const Paragraph = styled.p`
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.lightFont};
  padding-right: 0.6rem;
  margin: 0;
`;

export const Backbutton = styled.div`
    margin-right: 22px;
    cursor: pointer;
`;
