import { getDate } from "@app/pages/YarzbazarPage/utils/misc";

export function getStageDetail(history: any, status: any) {
  //
  if (history?.length) {
    for (let i = 0; i < history.length; i++) {
      if (history[i].dispatchStatus === status) {
        const stateNumber = getStageNumber(status);
        return {
          stateNumber,
          stateName: status,
          date: getDate(history[i].dispatchStatusDate),
        };
      }
    }
  }
  return {
    stateNumber: 0,
    stateName: "planned",
    date: "",
  };
}

const getStageNumber = (status: any) => {
  if (status === "planned") {
    return 0;
  }
  if (status === "confirmed") {
    return 1;
  }
  if (status === "loading") {
    return 2;
  }
  if (status === "transit") {
    return 3;
  }
  if (status === "received") {
    return 4;
  }
};
