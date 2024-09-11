import { css } from "styled-components";
import { minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const commonSVGCSS = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  :not(.disabled):active svg path {
    stroke: #e95f5f;
  }

  ${minMedia.largeScreen`
    :not(.disabled) svg:hover path,
    :not(.disabled) svg:focus path {
      stroke: #e95f5f;
    }
  `}
`;

export const Plus = styled.div`
  cursor: pointer;

  ${commonSVGCSS}
`;

export const Minus = styled.div`
  pointer-events: auto;
  opacity: 1;
  cursor: pointer;

  ${commonSVGCSS}
`;

export const Quantity = styled.div`
  width: 4.5ch;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  margin-top: 2.5rem;
  padding: 0 0.85rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  border: 1px solid #000000;

  ${minMedia.largeScreen`
    margin-top: 0;
    padding: 0 1.05rem;
    height: 2.5rem;
  `}
`;
