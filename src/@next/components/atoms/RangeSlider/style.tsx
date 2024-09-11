import { styled } from "@styles/themes";

export const Container = styled.div<{ tag?: boolean }>`
  width: 100%;
  padding: 0.2em 0;
  height: ${props => !props.tag && "3.125rem"};
  margin-top: ${props => props.tag && "0.375rem"};
  position: relative;
`;

export const TotalRange = styled.div<{ tag?: boolean }>`
  background: rgba(151, 151, 151, 0.25);
  border-radius: 6px;
  width: 100%;
  height: 4px;
  position: ${props => !props.tag && "absolute"};
  top: ${props => !props.tag && "50%"};
  transform: ${props => !props.tag && "transformY(-50%)"};
`;

export const Progress = styled.div<{
  rangeSetter?: number;
  bgColor?: string;
  state?: string;
  tag?: boolean;
}>`
  border-radius: 6px;
  width: ${({ tag, state, rangeSetter }) => {
    if (tag) {
      if (state === "planned") {
        return 0;
      }
      if (state === "confirmed") {
        return 7.5;
      }
      if (state === "loading") {
        return 35;
      }
      if (state === "transit") {
        return 65;
      }
      if (state === "received") {
        return 100;
      }
    } else {
      return rangeSetter;
    }
  }}%;
  height: 100%;
  background: ${props => props.bgColor};
  background: ${props => props.state === "received" && props.bgColor};
  position: relative;
  z-index: 1;
`;

export const ProgressTag = styled.div<{
  bgColor?: string;
  tag?: boolean;
  state?: string;
  rangeSetter?: number;
}>`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: ${props =>
    props.state === "planned" ? "#CCCCCC" : props.bgColor};
  z-index: 2;
  color: white;
  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.125rem;
  }
  height: ${props => props.tag && "1rem"};
  width: ${props => props.tag && "1rem"};
  border-radius: ${props => props.tag && "50%"};
  font-size: ${props => props.tag && "0.7rem"};
  background: ${props => props.state === "received" && props.bgColor};
  transform: ${props => props.state === "planned" && "translate(100%,-50%)"};

  height: ${props => !props.tag && "1.25rem"};
  width: ${props => !props.tag && "2.438rem"};
  border-radius: ${props => !props.tag && "0.875rem"};
  font-size: ${props => !props.tag && "0.7rem"};
  padding: ${props => !props.tag && "0.1rem"};
  transform: ${props =>
    props.rangeSetter === 0 && !props.tag && "translate(100%,-50%)"};
`;

export const DispatchStage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.625rem;
  font-weight: 500;
  margin: 0.5rem 0 1px;
  padding: 0 0.5rem;
`;
export const Stage = styled.p`
  line-height: 12px;
  color: #616161;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* height: 3rem; */
  & span:last-child {
    color: #33a532;
    margin: 1px 0;
    height: 0.75rem;
    font-weight: 500;
  }
`;
