import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Filter = styled.main`
  background: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  box-shadow: 0 0 16px 4px #dadada;
  & .filter-body {
    min-height: 7.5rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  position: absolute;
  z-index: 100;
  width: 25rem;
  top: 40%;
  right: 40%;
  display: none;
  ${media.largeScreen`
  width: 90vw;
  `}
`;
export const FiltersCategorySection = styled.section`
  background: #f4f8f9;
  width: 50%;
  height: 100%;
`;

export const FiltersListingSection = styled.section`
  background: #ffffff;
  width: 50%;
  height: 100%;
  padding: 0.5rem 0;
`;
export const FilterControl = styled.section`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & button {
    font-family: inherit;
    color: #33a532;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 0.94rem;
    height: 2.2rem;
  }
  & button.apply {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 9.94rem;
    background: #f4f8f9;
    border-radius: 0.25rem;
    margin: 0 1.5rem;
    & svg {
      margin-right: 0.5rem;
    }
  }
`;
