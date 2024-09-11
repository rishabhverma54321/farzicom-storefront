import { styled } from "@styles/themes";

export const StageContent = styled.div`
  & div:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  & div:nth-child(2n + 1) {
    background: #f4f8f9;
  }
  & div {
    min-height: 2.2rem;
    padding: 0.625rem 0.25rem;
  }
  & .stage-doc {
    cursor: pointer;
  }
  & .stage-doc:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  }
  & .stage-doc:nth-child(2n) div {
    background: #f4f8f9;
    border-radius: 0;
  }
  & .stage-doc:nth-child(2n + 1) div {
    background: #ffffff;
    border-radius: 0;
  }
  & .stage-doc:last-child div {
    border-radius: 0 0 0.5rem 0.5rem;
  }
  & .stage-doc div p:last-child {
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & span {
      margin-left: 0.25rem;
    }
  }
`;
export const StageHorizontalLine = styled.hr`
  border: 1px solid #dadada;
  background: #dadada;
`;

// export const StageLowerPart = styled.div`
//   & div {
//     min-height: 2.2rem;
//   }
//   & div:first-child {
//     background: #f4f8f9;
//   }

// & div:last-child {
//   border-radius: 0 0 0.5rem 0.5rem;
//
