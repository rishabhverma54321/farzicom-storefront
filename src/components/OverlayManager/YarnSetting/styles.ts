import { styled } from "@styles/themes";

export const Setting = styled.article`
  background: #f7f8f9;
  padding: 1.125rem;
  & .setting__icon {
    font-size: 1.25rem;
  }
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .setting__header--heading {
    display: flex;
    justify-content: center;
    align-items: center;
    & h1 {
      color: #616161;
      text-transform: capitalize;
      font: 500;
      font-size: 1.25rem;
      line-height: 1.25rem;
      margin: 0 0.625rem;
    }
  }
`;
export const PartOne = styled.div`
  box-shadow: 0 0 8px 0px #dadada;
  & .setting-row {
    padding-left: 1.25rem;
    padding-right: 0.75rem;
    & span:first-child {
      line-height: 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #212223;
    }
    & span:last-child {
      font-size: 1.25rem;
      color: #212223;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  & .setting-row:nth-child(2n + 1) {
    background: white;
  }
  & .setting-row:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  & .setting-row:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
  margin: 1.25rem 0;
  border-radius: 0.5rem;
`;
export const Logout = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 8px 0px #dadada;
  width: 70%;
  & .setting-row {
    padding-left: 1.25rem;
    padding-right: 0.75rem;
    & span:first-child {
      font-size: 0.875rem;
      line-height: 1rem;
      font-weight: 500;
      color: #e31d38;
    }
  }
`;
// =============ROW=============
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 2.938rem;
  /* border: 1px solid orange; */
`;
