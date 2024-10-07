import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const FilterHeader = styled.h3`
  text-transform: uppercase;
`;

export const FilterTable = styled.div`
  margin-top: 0.5rem;
  input {
    cursor: pointer;
  }
`;

export const ResultDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const AccordionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0rem;
  margin: 0.5rem 0rem;
  margin-right: 16px;
  h3 {
    text-transform: capitalize;
  }
  .invert-arrow {
    svg {
      transform: rotate(180deg);
    }
  }
  svg{
    cursor: pointer;
  }
`;
export const Accordian = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0rem;
`;

export const FilterList = styled.div`
  // display: flex;
  // flex-direction: column;
  padding: 0.75rem 0rem;
  max-height: 300px;
  overflow-y: scroll;
  border-bottom: 1px solid lightgray;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
  }
  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 16px;
    span {
    }
    > span:nth-child(2) {
      color: gray;
      font-size: 12px;
    }
    > div {
      padding: 0.2rem;
      input {
        margin-right: 8px;
      }
      &:checked {
        background-color: #69ea72;
        color: white;
        /* &::before{ 
          content: "";
        } */
      }
    }
  }
  ${media.smallScreen`
  max-height: 200px;
  `}
`;

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
export const SliderHeader = styled.h4``;

export const SortWrapper = styled.div`
  ${media.largeScreen`
display:none;
`}
`;
export const SortSelect = styled.select`
  padding: 8px;
  border: 2px solid darkgray;
  border-radius: 8px;
  background: transparent;
  text-align: center;
  margin-top: 8px;
  margin-right: 5px;
  cursor: pointer;
`;
export const SortOption = styled.option`
  padding: 4px;
  cursor: pointer;
`;

export const Header = styled.h3`
  padding: 5px;
`;
