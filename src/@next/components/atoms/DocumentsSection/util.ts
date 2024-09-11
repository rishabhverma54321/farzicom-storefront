export const addDocuments = (arr: any, obj: any) => {
  const newArr = arr.map((item: any) => ({
    ...item,
  }));
  if (obj?.pi) {
    newArr[0].link = obj.pi;
  }
  if (obj?.taxInvoice) {
    newArr[1].link = obj.taxInvoice;
  }
  if (obj?.eway) {
    newArr[2].link = obj.eway;
  }
  if (obj?.packingList) {
    newArr[3].link = obj.packingList;
  }
  if (obj?.insurance) {
    newArr[4].link = obj.insurance;
  }
  if (obj?.testReport) {
    newArr[5].link = obj.testReport;
  }
  return newArr;
};
