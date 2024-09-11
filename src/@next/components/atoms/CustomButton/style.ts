import { styled } from "@styles/themes";

export const ButtonContainer = styled.button<{
  width?: number;
  height?: number;
  bgColor?: any;
}>`
  width: ${props => (props.width ? `${props.width}px` : `168px`)};
  text-align: center;
  background-color: ${props => (props.bgColor ? `${props.bgColor}` : `white`)};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(49, 61, 138, 0.29);
  padding: z 10px;
  position: relative;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.024);
  border-radius: 4px;
  height: ${props => (props.height ? `${props.height}px` : `30px`)};

  & > .right > svg {
    position: absolute;
    width: 18px;
    height: 18px;
    left: 12px;
    top: 5px;
    font-size: 16px;
    font-weight: 500;
  }
  & > .left > svg {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    top: 5px;
    font-size: 16px;
  }
`;

export const Button = styled.button<{ color: any; fontWeight?: number }>`
  font-size: 14px;
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 600)};
  color: ${props => props.color};
  line-height: 28px;
`;
