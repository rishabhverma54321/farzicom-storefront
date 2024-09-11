import { styled } from "@styles/themes";

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  position: relative;
`;
export const Svg = styled.svg`
  width: 7rem;
  height: 7rem;
  transform: rotate(-90deg);
`;
export const Circle = styled.circle<{
  total: any;
  left: any;
  color?: string;
}>`
  fill: transparent;
  stroke-width: 8.64;
  stroke: ${props => props.color};
  transform: translate(5px, 5px);
  stroke-linecap: round;
  stroke-dasharray: 320;
  transition: all 0.3s linear;
  stroke-dashoffset: ${({ total, left }) => {
    const singlePercent = 320 / 100;
    const daysInPercent = 100 - (left / total) * 100;
    return 320 - singlePercent * daysInPercent;
  }}};
  &:nth-child(1) {
    stroke-dashoffset: 0;
    stroke: rgba(151, 151, 151, 0.25);
  }
`;
export const Content = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Text = styled.p`
  color: #212223;
  &:nth-child(1) {
    line-height: 1.063rem;
    font-size: 0.882rem;
  }
  &:nth-child(2) {
    line-height: 1rem;
    font-size: 0.875rem;
  }
`;
