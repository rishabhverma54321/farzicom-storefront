import React from "react";
import chemicalFree from "images/product-promises/M-chemical_free.png";
import crueltyFree from "images/product-promises/M-cruelty_free.png";
import organicFormulation from "images/product-promises/M-organic_formulation.png";
import preservativeFree from "images/product-promises/M-presevative_free.png";

import { CachedImage } from "@components/molecules/CachedImage";
import cx from "classnames";
import * as S from "./styled";

const images = [
  organicFormulation,
  preservativeFree,
  chemicalFree,
  crueltyFree,
];

const BrandPromises: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <S.BrandPromisesWrapper className={cx("", className)}>
      {images.map(image => (
        <div key={image}>
          <CachedImage url={image} isStaticImage />
        </div>
      ))}
    </S.BrandPromisesWrapper>
  );
};

export default BrandPromises;
