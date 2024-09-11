import { styled } from "@styles/themes";
import { minMedia } from "@styles/media";
import { TruncateCss } from "@components/atoms/Text/Text.styled";

export const Wrapper = styled.div`
  padding: 1rem;

  &:not(.isEven) {
    background-color: ${props => props.theme.colors.searchResultOdd}; // #e2f0d1
  }
  &.isEven {
    background-color: ${props =>
      props.theme.colors.searchResultEven}; // #f1fae6
  }

  > a {
    display: flex;
    gap: 1.5rem;
  }

  .image-wrapper {
    width: 5rem;
    height: 5rem;
  }

  img {
    display: block;
    width: inherit;
    height: inherit;
    object-fit: contain;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    ${minMedia.largeScreen`
      margin: 0;
    `}
    ${minMedia.xLargeScreen`
      margin: 0;
    `}
  }

  h4 {
    font-weight: 500;
    text-transform: uppercase;
    ${TruncateCss}
  }

  p {
    font-weight: 300;
  }
`;
