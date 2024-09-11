import { minMedia } from "@styles/media";
import { styled } from "@styles/themes";
import { TruncateCss } from "../../atoms/Text/Text.styled";

export const CardDiv = styled.div<{}>`
  font-family: "MyriadPro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 20px;
  text-align: center;
  margin: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  background: #fff;
  text-transform: capitalize;
`;
export const QuotesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-70%, -30%);
  font-size: 3rem;
`;

export const Text = styled.p`
  ${TruncateCss}
  --number-of-lines: 6;
  max-height: none;
  height: 22ex;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.6em;
  color: #2e3642;

  @media (min-width: 420px) {
    height: 20ex;
  }

  ${minMedia.largeScreen`
    height: auto;
    padding-bottom: 1rem;
  `}
`;

export const TextAlignWrapper = styled.div`
  ${minMedia.largeScreen`
    height: 20ex;
    overflow: hidden;
    display: flex;
    align-items: center;
  `}
`;

export const Highlight = styled.span`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.6em;
  color: #dd5c95;
`;

export const Author = styled.div`
  padding-inline-end: 2.5rem;
  padding-bottom: 0.2rem;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.925rem;
  line-height: 1em;
  white-space: nowrap;
  text-align: end;
  color: #575757;

  :after {
    content: "";
    position: absolute;
    width: calc(100% + var(--card-pad-right));
    border-top: 1px solid;
    top: -50%;
    left: 0;
    color: rgba(183, 183, 183, 0.25);
  }
`;

export const Profile = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: -4rem;

  img {
    width: 7.5rem;
    border-radius: 50%;
  }

  ${minMedia.xLargeScreen`
    bottom: -2rem;
  `}
`;

export const Card = styled.div`
  --card-pad-right: 0.75rem;
  padding: 2.3rem var(--card-pad-right) 1.25rem 1.3rem;
  background: #ffffff;
  box-shadow: 3px 4px 21px rgba(176, 176, 176, 0.25);
  border-radius: 9px;

  display: flex;
  flex-direction: column;

  ${minMedia.largeScreen`
    padding: 1rem 1.5rem;
  `}
`;

export const Ratings = styled.div`
  .MuiRating-root {
    font-size: 1.25rem;
  }
`;

export const CardInfo = styled.div<{}>`
  font-family: "MyriadPro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 20px 0;
`;
export const RatingAuthorRow = styled.div`
  display: inline-flex;
  justify-content: space-between;
`;

export const TestimonialCardWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  width: 90%;
  max-width: 30ch;
  transform: translateX(0.5rem);

  ${minMedia.largeScreen`
    max-width: 38ch;
  `}

  ${minMedia.xLargeScreen`
    transform: translateX(-35%);
  `};
`;
