import { css } from "styled-components";
import { styled } from "@styles/themes";

export const TextCss = css`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-size: 0.9rem;
  line-height: 1.5em;
  color: #1d2136;
`;

export const TruncateCss = css`
  --number-of-lines: 2;
  overflow: hidden;
  max-height: 8rem;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: var(--number-of-lines);
`;

export const Text = styled.h2`
  ${TextCss}
`;
