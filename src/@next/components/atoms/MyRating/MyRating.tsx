import React, { useEffect, useState } from "react";

import Rating from '@mui/material/Rating';
import { withStyles } from '@mui/styles';
import { ratingDefault } from "Themes/globalStyles/constants";
import { defaultTheme } from "Themes/globalStyles/themes";

export interface IMyRatingProps {
  isReadOnly: boolean;
  rating?: number;
  name?: string;
  handleChange?: (name: string, value: number) => any;
  color?: string;
  size?: "small" | "medium" | "large" | undefined;
  precision?: number;
  fontSizeMd?: any;
  fontSizeSm?: any;
  showEmptyIconOutlined?: boolean;
}

export const MyRating: React.FC<IMyRatingProps> = ({
  rating,
  isReadOnly,
  name,
  handleChange,
  color = ratingDefault,
  size = "small",
  precision,
  fontSizeMd,
  fontSizeSm,
  showEmptyIconOutlined,
}) => {
  const [value, setvalue] = useState(rating || 5);
  useEffect(() => {
    if (rating) {
      setvalue(rating);
    }
  }, [rating]);
  let iconEmptyStyle;
  if (showEmptyIconOutlined) {
    iconEmptyStyle = {
      color: "white",
      "& svg": {
        stroke: "#EEC200",
      },
    };
  } else {
    iconEmptyStyle = {
      transform: "translateZ(0px)",
    };
  }
  // const StyledRating = withStyles(theme => ({
  //   iconFilled: {
  //     color,
  //   },
  // }))(Rating);
  const StyledRating = withStyles(theme => ({
    [theme?.breakpoints?.down("md")]: {
      iconFilled: {
        fontSize: fontSizeMd || defaultTheme.rating.typography.mediumFontSize,
      },
      iconEmpty: {
        fontSize: fontSizeMd || defaultTheme.rating.typography.mediumFontSize,
      },
    },
    [theme?.breakpoints?.down("sm")]: {
      iconFilled: {
        fontSize: fontSizeSm || defaultTheme.rating.typography.smallFontSize,
      },
      iconEmpty: {
        fontSize: fontSizeSm || defaultTheme.rating.typography.smallFontSize,
      },
    },
    iconFilled: {
      color,
    },
    iconEmpty: iconEmptyStyle,
  }))(Rating);

  return (
    <>
      <StyledRating
        value={value}
        readOnly={isReadOnly}
        precision={0.5}
        size={size}
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
MyRating.displayName = "MyRating";
export default MyRating;
