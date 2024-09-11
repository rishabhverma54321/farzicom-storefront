import React from "react";

import NoPhoto from "images/no-photo.svg";
import { NO_PHOTO_PLACEHOLDER } from "@temp/themes/plixlifefc/config";
import { IProps } from "./types";

export const PlaceholderImage: React.FC<IProps> = ({
  alt = "placeholder",
  className = "",
}: IProps) => {
  return (
    <img
      className={`img-placeholder ${className || ""}`}
      src={NO_PHOTO_PLACEHOLDER}
      alt={alt}
    />
  );
};
