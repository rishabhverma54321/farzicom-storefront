import { ShipmentDisputeStatus } from "../../../../../gqlTypes/globalTypes";

export const getUpdatedDisputeData = (queryData: any, disputedObj: any) => {
  if (queryData?.length) {
    disputedObj.disputed =
      queryData[0]?.node?.status !== ShipmentDisputeStatus.DISPUTESTATUS_RESOLVED;
    disputedObj.message = queryData[0]?.node?.description
      ? queryData[0]?.node?.description
      : "";
  } else {
    disputedObj.disputed = false;
  }
  return disputedObj;
};
