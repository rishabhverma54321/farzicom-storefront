import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { Heading as SectionHeadingComponent } from "@components/atoms/Headings/styled";

export const SectionHeading = styled(SectionHeadingComponent as any)`
  font-size: 1.7rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 3rem;
  font-family: ${props => props.theme.typography.headingFontFamily};
    ${media.mediumScreen`
  margin-top: 1rem;
  margin-bottom: 2rem;
  `} @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    font-size: 2rem;
  }
  &.wowCollectionHeading{
    margin-bottom: 1rem !important;
    ${media.mediumScreen`
    
    margin-bottom: 0.7rem !important;
    `}
  }
`;
