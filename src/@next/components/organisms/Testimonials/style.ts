import { styled } from "@styles/themes";
import { Heading as HeadingComponent } from "@components/atoms/Headings/styled";
import {
  Author as CardAuthorText,
  Profile as StyledProfile,
  TestimonialCardWrapper as StyledTestimonialCardWrapper,
  QuotesWrapper as StyledQuotesWrapper,
  Card as StyledCard,
  Text as StyledText,
} from "@components/molecules/TestimonialCard/style";

export const Heading = styled(HeadingComponent)`
  font-size: 1.75rem;
  text-align: center;

  @media (min-width: ${props => props.theme.breakpoints.largeScreen}) {
    font-size: 2.75rem;
  }
`;

export const SelectedProfile = styled.div`
  cursor: pointer;

  img {
    width: 25vw;
    border-radius: 50%;
    border: 3px #dd5c95 solid;
    max-width: 7rem;
  }
`;

export const Profile = styled.div`
  cursor: pointer;

  img {
    max-width: 5rem;
    width: 20vw;
    border-radius: 50%;
  }
`;

export const ProfilesWrapper = styled.div`
  .swiper-wrapper {
    align-items: center;
  }

  .swiper-slide {
    width: min-content;
    margin-right: 25px !important;
    margin-right: clamp(25px, 4vw, 3rem) !important;
  }
`;

export const TestimonialWrapper = styled.div``;

export const ContentWrapper = styled.div<{}>`
  padding: 0 1rem;

  ${StyledProfile}.active {
    position: absolute;
    bottom: 0.5rem;
    right: -4rem;

    img {
      width: 8rem;
    }
  }

  ${StyledTestimonialCardWrapper} {
    margin: 0 auto;
  }

  ${StyledQuotesWrapper} {
    font-size: 2.5rem;
  }

  ${StyledCard} {
    padding: ;

    $
  }

  ${StyledText} {
    font-size: 1rem;
    line-height: 1.6em;
  }

  ${CardAuthorText} {
    padding-bottom: 3px;
    padding-inline-end: 0rem;
    position: relative;
    font-size: 0.85rem;
    align-self: flex-end;
  }

  @media (min-width: ${props => props.theme.breakpoints.largeScreen}) {
    ${StyledText} {
      line-height: 1.75em;
    }

    ${StyledQuotesWrapper} {
      font-size: 3.25rem;
    }
  }
`;

export const TestimonialsContainer = styled.section<{}>`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff5f3;
`;
