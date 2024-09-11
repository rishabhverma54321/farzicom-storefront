import { styled } from "@styles/themes";

export const Container = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1.2em;
`;

export const Heading = styled.div`
  font-size: 1.4em;
  color: #616161;
  margin: 0.625rem 0 0.625rem 2rem;
`;

export const LowerContent = styled.div`
  & > :hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  }
  & .dispatch-doc {
    cursor: pointer;
    & .dispatch-doc__row {
      height: 3.5rem;
    }
    &:nth-child(2n + 1) {
      background: #f4f8f9;
    }
    /* &:nth-child(2n + 1):hover {
      box-shadow: 0 4px 4px 0 orange;
    } */
    & article:first-child {
      color: #212223;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1rem;
    }
    & article:last-child {
      font-size: 1.25rem;
      color: #212223;
    }
  }
`;
