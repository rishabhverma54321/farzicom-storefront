import React from "react";
import { OverlayContextInterface } from "../../Overlay/context";
import Overlay from "../../Overlay/Overlay";
import {
  IngredientDetails,
  IngredientData,
  IngreImage,
  IngredientContent,
  WebHeading,
  IngrePara,
  DetailFirstRow,
  CloseDetail,
} from "./styled";

export interface IProps {
  overlay: OverlayContextInterface;
}

const IngredientOverlay: React.FC<IProps> = ({ overlay }) => {
  const {
    hide,
    context: { data },
  } = overlay;

  return (
    <Overlay context={overlay} testingContext="Ingredient Overlay">
      <IngredientDetails>
        <CloseDetail onClick={hide}>X</CloseDetail>
        <IngredientData>
          <DetailFirstRow>
            <IngreImage>
              <img
                style={{ maxWidth: "100%" }}
                src={data.src}
                alt={data.name}
              />
            </IngreImage>
            <IngredientContent>
              <WebHeading>{data.name}</WebHeading>
              <IngrePara>
                <p>{data.desc}</p>
                <p>
                  <strong>Benefit</strong>:
                </p>
                <ul>
                  {data.benefits.map(benefit => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </IngrePara>
            </IngredientContent>
          </DetailFirstRow>
          {/* <IngreFoundIn>
            <WebHeading>Found In</WebHeading>
          </IngreFoundIn> */}
        </IngredientData>
      </IngredientDetails>
    </Overlay>
  );
};
export default IngredientOverlay;
