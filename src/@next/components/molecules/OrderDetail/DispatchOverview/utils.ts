export const getCurrentStageInfo = (status: any, stageData: any) => {
  //
  if (status?.toLowerCase() === "confirmed") {
    return [stageData[1].stageName, stageData[1].stageMessage];
  }
  if (status?.toLowerCase() === "loading") {
    return [stageData[2].stageName, stageData[2].stageMessage];
  }
  if (status?.toLowerCase() === "transit") {
    return [stageData[3].stageName, stageData[3].stageMessage];
  }
  if (status?.toLowerCase() === "received") {
    return [stageData[4].stageName, stageData[4].stageMessage];
  }
  if (
    status?.toLowerCase() !== "transit" &&
    status?.toLowerCase() !== "loading" &&
    status?.toLowerCase() !== "received" &&
    status?.toLowerCase() !== "confirmed"
  ) {
    return [stageData[0].stageName, stageData[0].stageMessage];
  }
};

export const addTransporterDetails = (arr: any, obj: any) => {
  if (obj?.transporter_name) {
    arr[0].rightField = obj.transporter_name;
  }
  if (obj?.driver_number) {
    arr[1].rightField = obj.driver_number;
  }
  if (obj?.lorry_number) {
    arr[2].rightField = obj.lorry_number;
  }
  if (obj?.lr_number) {
    arr[3].rightField = obj.lr_number;
  }
  if (obj?.invoice_number) {
    arr[5].rightField = obj.invoice_number;
  }
  if (obj?.invoice_date) {
    arr[6].rightField = obj.invoice_date;
  }
  if (obj?.invoice_amount) {
    arr[7].rightField = `₹ ${obj.invoice_amount}`;
  }
  return arr;
};
