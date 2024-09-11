import { styled } from "@styles/themes";
import { minMedia } from "@styles/media";

export const Wrapper = styled.div`
  padding: 1em;
  transition: 0.3s;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1em;
  outline: none;
  text-align: center;
  color: #60b246;
  border-radius: 1px;
  background-color: #f5fcef;

  svg {
    margin-right: 1rem;
    font-size: 1.4rem;
    vertical-align: bottom;
  }

  ${minMedia.largeScreen`
    font-size: 1rem;
  `}
`;
