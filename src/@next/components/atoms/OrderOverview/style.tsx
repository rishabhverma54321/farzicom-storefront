import { styled } from "@styles/themes";

export const Container = styled.section`
  width: 100%;
`;

export const Heading = styled.h2`
  color: #616161;
  font-size: 1.125rem;
  line-height: 1.25rem;
  font-weight: 500;
  margin: 0.625rem 0;
  padding-left: 1.25rem;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.25rem;
  height: 1.5rem;
  & h3 {
    width: 25%;
    font-size: 0.5rem;
    font-weight: 500;
    line-height: 0.625rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #616161;
  }
  & h3:last-child {
    visibility: hidden;
  }
`;
export const TableContent = styled.div`
  &.nodispatches {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8.5rem;
    background: #f4f8f9;
    & p {
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
`;

export const DispatchDetail = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 0 0.5rem 0 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.875rem;
  background: #f4f8f9;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  }
  &.row:nth-child(2n) {
    background: white;
  }
  & span.quantity {
    font-weight: 500;
    font-size: 0.775rem;
    line-height: 0.95rem;
  }
  & span.block {
    width: 25%;
  }
  & span:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    & span {
      font-size: 0.625rem;
      text-align: left;
      line-height: 0.75rem;
      font-weight: 500;
      width: 100%;
    }
    & span:first-child {
      text-transform: capitalize;
      font-size: 0.75rem;
      font-weight: bold;
      line-height: 0.875rem;
    }
  }
  & span:last-child {
    text-align: right;
  }
`;
