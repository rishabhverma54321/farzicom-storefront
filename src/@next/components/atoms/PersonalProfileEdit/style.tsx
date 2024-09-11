import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  width: 100%;
  border-radius: 0.5rem;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 0.5rem;
  background-color: white;
  border-radius: 0.5rem;
  ${media.smallScreen`
    flex-direction: column;
    padding: 0;
  `}
`;

export const TopContainerLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  ${media.smallScreen`
    width: 100%;
    justify-content: flex-start;
    padding: 0.68rem 1.375rem;
  `}
`;
export const TopContainerRight = styled.div`
  padding: 0.3rem 0.5rem;
  background-color: #f4f8f9;
  ${media.smallScreen`
  border-radius: 0 0 0.5rem 0.5rem;
  `}
`;

export const LowerContainer = styled.div`
  margin: 1rem 0 6rem;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
  overflow-y: scroll;
  border-radius: 0.5rem;
  /* height: 400px; */
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const Bottom = styled.div`
  height: 6rem;
  border-radius: 0.5rem;
  background: #f4f8f9;
  box-shadow: 0px 0px 10px rgba(33, 34, 35, 0.1);
  margin-bottom: 5rem;
`;

export const SaveButton = styled.article`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4.375rem;
  border-radius: 0 0 0.5rem 0.5rem;
  background: white;
  ${media.smallScreen`
  border-radius: 0;
  `}
  &.save__btn,
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & span:first-child {
    margin: 0 0.5rem;
    font-size: 1.125rem;
  }
  & span:last-child {
    font-size: 1rem;
    line-height: 150%;
    font-weight: bold;
    color: #33a532;
    letter-spacing: 0.005em;
    font-family: Manrope;
  }
`;
