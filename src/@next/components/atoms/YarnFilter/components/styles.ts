import { styled } from "@styles/themes";

export const Tab = styled.article`
  &.tab.category {
    height: 2.8rem;
  }
  &.tab.content {
    min-height: 2.125rem;
  }
  &.background-affect {
    background: white;
  }
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  & span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & span.tab__icon {
    margin-left: 0.75rem;
    & svg {
      font-size: 0.9rem;
    }
  }
  & span.tab__text {
    color: #616161;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin: 0 0.625rem;
  }
`;
export const ActiveBar = styled.div<{ color?: string }>`
  position: absolute;
  height: 80%;
  width: 0.25rem;
  background: ${props => props.color};
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

//  --------------------SORT BY -----------------

export const SortBy = styled.div`
  & .sortby__tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.75rem 0 0.25rem;
  }
`;

// ---------------------CATEGORY LIST ----------------

export const QualityListContent = styled.div`
  & .quality__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.75rem 0 0.25rem;
    border-top: 2px solid #f4f8f9;
    text-transform: capitalize;
  }
`;

//  ==================== STATUS LIST =================

export const StatusContent = styled.div`
  & .status__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.75rem 0 0.25rem;
    border-bottom: 2px solid #f4f8f9;
    text-transform: capitalize;
  }
`;
