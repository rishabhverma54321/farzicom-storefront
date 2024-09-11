import React from "react";
import * as CP from "./style";

export interface ICircularProgressBarProps {
  title?: string;
  total: number;
  left: number;
  color?: string;
}

export const CircularProgressBar: React.FC<ICircularProgressBarProps> = ({
  title,
  total,
  left,
  color,
}) => {
  return (
    <CP.Box>
      <CP.Svg>
        <CP.Circle
          color={color}
          cx="50"
          cy="50"
          r="50"
          total={total}
          left={left < 0 ? 0 : left}
        />
        <CP.Circle
          color={color}
          cx="50"
          cy="50"
          r="50"
          total={total}
          left={left < 0 ? 0 : left}
        />
      </CP.Svg>
      <CP.Content>
        {title && <CP.Text>{title}</CP.Text>}
        {left < 0 ? <CP.Text>--</CP.Text> : <CP.Text>{`${left} days`}</CP.Text>}
      </CP.Content>
    </CP.Box>
  );
};
CircularProgressBar.displayName = "CircularProgressBar";
export default CircularProgressBar;
