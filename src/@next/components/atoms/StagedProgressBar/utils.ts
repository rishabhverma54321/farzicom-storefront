import { getDate } from "@app/pages/YarzbazarPage/utils/misc";
import { addTransporterDetails } from "@components/molecules/OrderDetail/DispatchOverview/utils";

export const getStageInfo = (
  stageData: any,
  history: any,
  status: any,
  transportDetails: any,
  finalDoc: any
) => {
  const content = addTransporterDetails(transportField, transportDetails);
  const updatedStageData = stageData.map((item: any, index: number) => {
    if (index !== 0) {
      item.stageContent[0].dataUp = content;
      item.stageContent[0].dataDown = finalDoc;
    }
    return {
      ...item,
      date: "",
    };
  });
  let phase = 0;
  for (let i = 0; i < history.length; i++) {
    if (history[i]?.dispatchStatus?.toLowerCase() === "planned") {
      const date = getDate(history[i].dispatchStatusDate);
      phase = 0;
      updatedStageData[0].date = date;
    }
    if (history[i]?.dispatchStatus?.toLowerCase() === "confirmed") {
      const date = getDate(history[i].dispatchStatusDate);
      phase = 1;
      updatedStageData[1].date = date;
    }
    if (history[i]?.dispatchStatus?.toLowerCase() === "loading") {
      const date = getDate(history[i].dispatchStatusDate);
      phase = 2;
      updatedStageData[2].date = date;
    }
    if (history[i]?.dispatchStatus?.toLowerCase() === "transit") {
      const date = getDate(history[i].dispatchStatusDate);
      phase = 3;
      updatedStageData[3].date = date;
    }
    if (history[i]?.dispatchStatus?.toLowerCase() === "received") {
      const date = getDate(history[i].dispatchStatusDate);
      phase = 4;

      updatedStageData[4].date = date;
    }
  }
  for (let i = 0; i <= 4; i++) {
    if (i <= phase) {
      updatedStageData[i].stageChecked = true;
    } else {
      updatedStageData[i].date = "";
    }
  }
  return updatedStageData;
};

const transportField = [
  {
    leftField: "Transporter Name",
    rightField: "",
  },
  {
    leftField: "Driver Number",
    rightField: "",
  },
  {
    leftField: "Lorry Number",
    rightField: "",
  },
  {
    leftField: "L/R Number",
    rightField: "",
  },
  {
    leftField: "Dispatch Date",
    rightField: "",
  },
  {
    leftField: "Invoice Number",
    rightField: "",
  },
  {
    leftField: "Invoice Date",
    rightField: "",
  },
  {
    leftField: "Invoice Amount",
    rightField: "",
  },
];
