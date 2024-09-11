// import { ImageDimensions } from "@components/molecules/Ima";
import { ImageDimensions } from "@components/molecules/Card";
import React from "react";
import { SharedImigixAndSourceProps } from "react-imgix";

export interface IImage {
  url?: string;
  url2x?: string;
  alt?: string;
  children?: React.ReactElement;
  defaultImage?: string;
  className?: string;
  onClick?: (evt: any) => void;
  isStaticImage?: boolean;
  imgixSizes?: string;
  imageDimensions?: ImageDimensions;
  imgixProps?: SharedImigixAndSourceProps;
  isNextImage?: boolean;
  NextImagePriority?: boolean;
  nextImageLayout?: "fixed" | "fill" | "intrinsic" | "responsive" | "raw";
  nextImageObjectFit?: string;
  disablePlaceholder?:boolean;
}
