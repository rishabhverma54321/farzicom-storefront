import { styled } from "@styles/themes";

export const Container = styled.div`
  font-size: 1.25rem;
  & * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  & ul {
    list-style: none;
    padding-left: 0;
  }
`;
export const List = styled.li<{
  stageChecked: boolean;
  stageNo: number;
  stageData: any;
  color?: string;
}>`
  padding-bottom: 2.688rem;
  position: relative;
  & article div {
    background: ${props => props.color};
    border-radius: 5rem;
    width: 0.25rem;
    ${({ stageChecked, stageNo }) =>
      stageChecked &&
      stageNo !== 0 &&
      `
          height: calc(${100}% - ${2.688}rem);
      `}
    ${({ stageChecked, stageNo }) =>
      stageChecked &&
      stageNo === 0 &&
      `
          height: 50%;
      `}
    ${({ stageData, stageNo }) =>
      stageData[stageNo].stageChecked &&
      stageData[stageNo + 1]?.stageChecked &&
      `
    height: 100%;
    `}
  }
`;
export const StageName = styled.p`
  margin-left: 0.885rem;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.188rem;
  color: #616161;
  text-transform: capitalize;
  & span:first-child {
    margin: 0 0.625rem;
  }
  & span:last-child {
    color: #33a532;
    font-weight: bold;
    font-size: 0.875rem;
  }
`;

export const Stage = styled.div<{ color?: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  & svg {
    z-index: 2;
    & path {
      fill: ${props => props.color};
    }
  }
`;
export const Horizontal = styled.article`
  &.horizontal {
    position: absolute;
    height: 100%;
    width: 0.25rem;
    background: rgba(151, 151, 151, 0.25);
    left: 0.5rem;
    z-index: 1;
    border-top: 0.3rem solid white;
    border-bottom: 0.3rem solid white;
    top: 0.6rem;
  }
  &.bottom-bar {
    display: none;
  }
`;
export const Content = styled.main`
  margin-left: 2.135rem;
  margin-top: 1.375rem;
`;

export const StageNumber = styled.div`
  height: 1.25rem;
  width: 1.25rem;
  z-index: 2;
  border-radius: 50%;
  border: 2px solid rgba(151, 151, 151, 0.5);
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: #979797;
  & p {
    line-height: 1rem;
  }
`;
