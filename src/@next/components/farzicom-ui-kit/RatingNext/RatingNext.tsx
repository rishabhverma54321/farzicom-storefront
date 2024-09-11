import Rating, { RatingProps } from "@material-ui/lab/Rating";
import { withStyles } from '@mui/styles';;
import React, { useState } from "react";
import { defaultTheme } from "Themes/globalStyles/themes";

export interface IRatingNextProps extends RatingProps {
  name?: string;
  handleChange?: (name: string, value: number) => any;
}

export const RatingNext: React.FC<IRatingNextProps> = props => {
  const { value: rating, name, handleChange, color, ...ratingProps } = props;
  const [value, setvalue] = useState(rating || 5);

  const StyledRating = withStyles(theme => ({
    iconFilled: {
      color,
    },
  }))(Rating);

  return (
    <>
      <StyledRating
        {...ratingProps}
        value={value}
        onChange={(e, newValue) => {
          if (handleChange && name && newValue) {
            handleChange(name, newValue);
            setvalue(newValue);
          }
        }}
      />
    </>
  );
};
RatingNext.displayName = "RatingNext";
export default RatingNext;
