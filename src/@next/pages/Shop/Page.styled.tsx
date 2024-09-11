import { css } from "styled-components";
import { styled } from "@styles/themes";
import { minMedia } from "@styles/media";
import { Heading as SectionHeadingComponent } from "@components/atoms/Headings/styled";

export const SelectWrapper = styled.div`
  display: none;

  ${minMedia.largeScreen`
    display: block;
    align-self: center;
  `}
`;

export const HeadingWrapper = styled.div`
  ${minMedia.largeScreen`
    display: flex;
    justify-content: center;

    ${SectionHeadingComponent} {
      margin-left: auto;
    }
    ${SelectWrapper} {
      margin-left: auto;
    }
  `}
`;

export const TextCSS = css`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-size: 0.875rem;
  line-height: 1.4em;
  color: #1d2136;
  background-color: rgba(0, 0, 0, 0);
`;

export const PageWrapper = styled.div`
  background-color: #fff4f1;
`;

export const BreadcrumbsWrapper = styled.div`
  /* padding: 1rem; */

  .breadcrumbs a {
    ${TextCSS}
  }
`;
