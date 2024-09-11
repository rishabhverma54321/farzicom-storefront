import { styled } from "@styles/themes";

export const Container = styled.div<{ bgColor: string }>`
  &.yarn-address:nth-child(1) {
    background: #f4f8f9;
  }
  &.yarn-address:nth-child(2) {
    background: white;
  }
  &.yarn-address:nth-child(3) {
    background: white;
  }
  &.yarn-address:nth-child(4) {
    background: #f4f8f9;
  }
  padding: 1.25rem;
  width: 100%;
  min-height: 12rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${props => props.bgColor};
  & .yarn-address__body {
    max-width: 19.88rem;
  }
`;
export const Heading = styled.h3`
  color: #005bc2;
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0.3rem 0;
  font-weight: 500;
`;
export const Title = styled.p`
  font-weight: 500;
  font-size: 0.8rem;
  margin: 0.3rem 0;
  line-height: 0.95rem;
  color: #212223;
`;

export const Name = styled.p`
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 0.95rem;
  color: #212223;
  margin: 0.3rem 0;
`;
