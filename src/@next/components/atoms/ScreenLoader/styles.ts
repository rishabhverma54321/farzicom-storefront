import { styled } from "@styles/themes";

export const Article = styled.article`
  position: fixed;
  background: #f4f8f9;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & .logo-container {
    width: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
      font-size: 8rem;
    }
  }
`;
export const Loader = styled.div`
  height: 0.3rem;
  background: #f9d63c;
  margin-top: 5rem;
  min-width: 20rem;
`;
export const Bar = styled.div<{ rangeVal?: any }>`
  &.bar {
    height: 0.3rem;
    width: ${props => (props.rangeVal ? props.rangeVal : 0)}%;
    background: #f99f23;
    transition: width 0.3s linear 0.3s;
  }
`;
