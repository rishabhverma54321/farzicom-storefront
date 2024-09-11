import { minMedia } from "@styles/media";
import { styled } from "@styles/themes";

export const Heading = styled.h2`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1em;

  color: #2e3642;
  text-align: center;

  ${minMedia.largeScreen`
    font-size: 1.5rem;
  `}
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 7rem;
  object-fit: cover;

  :hover,
  :active {
    opacity: 0.8;
  }

  .featured & {
    height: 100%;
  }

  ${minMedia.largeScreen`
    height: 100%;
  `}
`;

export const ImageCaption = styled.figcaption`
  margin-block-start: 0.5rem;
  font-size: 0.775rem;
  line-height: 1.4em;

  .featured & {
    font-size: 0.95rem;
    font-weight: 500;
  }

  @media (min-width: 400px) {
    .featured & {
      font-size: 1rem;
    }
  }

  ${minMedia.largeScreen`
    margin-block-start: 0.75rem;
  `}
`;

export const ImageWrapper = styled.figure`
  &.featured {
    margin: 1.25rem auto auto;
    max-width: 375px;
  }

  :active ${ImageCaption} {
    color: #dd5c95;
  }

  ${minMedia.largeScreen`
    :hover ${Image} {
      opacity: 0.8;
    }

    &.featured {
      margin: 0;
      max-width: 450px;
      max-height: 450px;
    }

    &:not(.featured) ${Image} {
      max-height: 10rem;
    }
  `}
`;

export const PostsContainer = styled.div`
  margin: 0 auto;
  max-width: 375px;
  display: flex;
  flex-wrap: wrap;

  --right-margin: 0.75rem;

  > * {
    margin-block-start: 1rem;
    flex: 1 0 calc(50% - var(--right-margin));
  }

  > *:nth-child(odd) {
    margin-inline-end: var(--right-margin);
  }

  ${minMedia.largeScreen`
    margin: 0;
    max-width: none;
    --right-margin: 1.5rem;

    > * {
      margin-block-start: 0;
    }

    > *:nth-child(n + 3) {
      margin-top: var(--right-margin);
    }
  `}
`;

export const AllPostsContainer = styled.div`
  ${minMedia.largeScreen`
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
    margin-block: 3rem 1rem;
    display: flex;

    .featured-post-container {
      margin-right: 1rem;
      flex: 3 0;
    }

    ${PostsContainer} {
      flex: 4 0;
    }
  `}
`;

export const Wrapper = styled.section`
  margin: 2rem 1rem 1rem;

  @media (min-width: 1080px) {
    margin-left: 6vw;
    margin-right: 6vw;
    margin-bottom: 2rem;
  }
`;
