import { styled } from "@styles/themes";
import { minMedia } from "@styles/media";
import { SectionHeading } from "@components/atoms/CollectionHeadingIkkai/style";
import { List as StyledProductList } from "@components/organisms/ProductList/styles";
import { TextCSS } from "./Page.styled";

export const FiltersCard = styled.div`
  margin: 1rem;
  padding: 1.75rem 1.25rem 1.75rem;
  background-color: #e95f5f;
  border-radius: 30px;

  ${minMedia.mediumScreen`
    margin: 1rem 0;
    padding: 2.5rem 0 8rem;
  `}
`;

export const FilteredWrapper = styled.div`
  width: 100%;

  ${SectionHeading} {
    color: #fff;
    font-size: 1.5rem;
  }

  ${minMedia.mediumScreen`
    font-size: 2.75rem;
    ${StyledProductList} {
      margin-top: -7.5rem;
      gap: 0 1rem;
    }

    ${SectionHeading} {
      font-size: 2.75rem;
    }
  `}
  ${minMedia.largeScreen`
    font-size: 2.75rem;
  `}
`;

export const Filters = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;

  ${minMedia.mediumScreen`
    width: 55%;
    margin: 0 auto;
    justify-content: center;
  `}
`;

export const Filter = styled.li`
  ${TextCSS}
  padding: 0.35rem 0.95rem;
  line-height: 1.5em;
  text-transform: uppercase;
  color: #fff;
  border: 1px solid #ffffff;
  border-radius: 30px;
  cursor: pointer;
  &.isActive {
    background-color: #fff;
    color: #1d2136;
  }

  ${minMedia.mediumScreen`
    margin: 0 24px;
    padding: 0.5rem 2rem;
    font-size: 0.9rem;
  `}
`;
