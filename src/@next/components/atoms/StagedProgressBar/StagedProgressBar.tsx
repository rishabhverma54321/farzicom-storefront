import React from "react";
import { DispatchStageContent } from "../DispatchStageContent";
import * as SP from "./styles";
import { getStageInfo } from "./utils";
import CheckedIcon from "../../../../images/order-dispatch/CheckedIcon";
import { addDocuments } from "../DocumentsSection/util";

// export interface Content {
//   dataUp: Array<{
//     leftField: string;
//     rightField: Array<string | ReactNode>;
//   }>;
//   dataDown: Array<{
//     leftField: string;
//     rightField: Array<string | ReactNode>;
//     link: string;
//   }>;
// }
export interface DispatchData {
  stageName: string;
  stageContent: any;
  stageChecked: boolean;
  date: string;
}
export interface IStagedProgressBarProps {
  stageData: any;
  history: any;
  status: any;
  transporterDetail?: any;
  documentField?: any;
  document?: any;
  color?: string;
}

export const StagedProgressBar: React.FC<IStagedProgressBarProps> = ({
  stageData,
  history,
  status,
  transporterDetail,
  documentField,
  document,
  color,
}) => {
  let finalDoc;
  if (document) {
    finalDoc = addDocuments(documentField, document[document.length - 1]);
  }
  const currentStage = getStageInfo(
    stageData,
    history,
    status,
    transporterDetail,
    finalDoc
  );
  return (
    <SP.Container>
      <ul>
        {currentStage.map((item: any, index: any) => {
          return (
            <SP.List
              key={index}
              stageChecked={item.stageChecked}
              stageNo={index}
              stageData={currentStage}
              color={color}
            >
              <SP.Stage color={color}>
                {item.stageChecked ? (
                  <CheckedIcon className="stage__checkedIcon" />
                ) : (
                  <NumberedIcon stage={index + 1} />
                )}
                <SP.StageName>
                  {item.stageName}
                  {item.date && (
                    <>
                      <span>-</span>
                      <span>{item.date}</span>
                    </>
                  )}{" "}
                </SP.StageName>
              </SP.Stage>
              <SP.Horizontal
                className={`horizontal ${
                  stageData.length - 1 === index ? "bottom-bar" : ""
                }`}
              >
                <div />
              </SP.Horizontal>
              <SP.Content>
                {item.stageContent.length !== 0 &&
                  currentStage[index].stageChecked &&
                  !currentStage[index + 1]?.stageChecked && (
                    <DispatchStageContent
                      dataDown={item.stageContent[0].dataDown}
                      dataUp={item.stageContent[0].dataUp}
                    />
                  )}
              </SP.Content>
            </SP.List>
          );
        })}
      </ul>
    </SP.Container>
  );
};
StagedProgressBar.displayName = "StagedProgressBar";
export function NumberedIcon({ stage }: { stage: number }) {
  return (
    <SP.StageNumber>
      <p>{stage}</p>
    </SP.StageNumber>
  );
}
export default StagedProgressBar;
