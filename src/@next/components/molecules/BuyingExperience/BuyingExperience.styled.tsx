import { minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const EmojisWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;

  svg ~ svg {
    margin-left: 1rem;
  }

  svg path {
    transition: opacity 0.15s ease-in-out;
  }

  svg:hover {
    cursor: pointer;
  }

  /* Only hovered emojis styles: */
  svg:hover:not(.selected) path.rating-bg {
    stroke: #ffcb5c;
    fill: #ffcb5c;
    opacity: 0.5;
  }

  svg:hover:not(.selected) path:not(.rating-bg) {
    stroke: #e95f5f;
    fill: #e95f5f;
    opacity: 0.5;
  }

  /* Select/Active Emojis styles: */
  svg.selected path.rating-bg,
  svg.active path.rating-bg {
    stroke: #ffcb5c;
    fill: #ffcb5c;
  }

  svg.selected path:not(.rating-bg),
  svg.active path:not(.rating-bg) {
    stroke: #e95f5f;
    fill: #e95f5f;
  }
`;

export const Heading = styled.h3`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4em;
  color: #1d2136;
  text-align: center;

  ${minMedia.largeScreen`
    font-size: 1.25rem;
  `}
`;

export const Wrapper = styled.div`
  padding: 1rem 1rem 1.25rem;
  max-width: 375px;
  background: #ffffff;
  border-radius: 6px;

  ${minMedia.largeScreen`
    padding: 1.5rem 1rem 1.75rem;
    max-width: 540px;
  `}
`;
