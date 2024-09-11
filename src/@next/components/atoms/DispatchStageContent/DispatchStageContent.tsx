import React, { ReactNode } from "react";
import InfoRow from "../PaymentCard/UserInfoRow";
import * as SC from "./styles";

export interface TopRow {
  leftField: string;
  rightField: Array<ReactNode | string>;
}
export interface BottomRow {
  leftField: string;
  rightField: Array<ReactNode | string>;
  link: string;
}
export interface IDispatchStageContentProps {
  dataUp: Array<TopRow>;
  dataDown: Array<BottomRow>;
}

export const DispatchStageContent: React.FC<IDispatchStageContentProps> = ({
  dataUp,
  dataDown,
}) => {
  const redirectToNewTab = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <SC.StageContent>
      {dataUp.map((item, index) => {
        if (item.rightField) {
          return (
            <InfoRow
              key={index}
              fieldName={item.leftField}
              value={[`${item.rightField}`]}
            />
          );
        }
      })}
      {checkDoc(dataDown) === true && (
        <SC.StageHorizontalLine style={{ margin: "0.625rem 0" }} />
      )}
      {dataDown.map((item, index) => {
        if (item.link) {
          return (
            <section
              className="stage-doc"
              key={index}
              onClick={() => redirectToNewTab(item.link)}
            >
              <InfoRow fieldName={item.leftField} value={item.rightField} />
            </section>
          );
        }
      })}
    </SC.StageContent>
  );
};
DispatchStageContent.displayName = "DispatchStageContent";
export default DispatchStageContent;

export const checkDoc = (dataDown: any) => {
  for (let i = 0; i < dataDown.length; i++) {
    if (dataDown[i].link) {
      return true;
    }
  }
  return false;
};
