import React, {useEffect} from "react";
import { getMetadataValue, getMobileOs, parseJson } from "@utils/misc";
import { CircularProgress } from '@mui/material';


export interface IDietPlanRedirectionProps {
  content: {
    metadata: Array<any>;
  };
}

export const DietPlanRedirection: React.FC<IDietPlanRedirectionProps> = ({ content }) => {
  console.log('contentdietPlanpage', content);
  const storeConfigData = content?.metadata && getMetadataValue(content?.metadata, "storeConfig")
    && parseJson(getMetadataValue(content?.metadata, "storeConfig"));

  console.log('storeConfigData', storeConfigData);
  const handleRedirectionToStore = () => {
    if(typeof window !== "undefined") {
      const deviceType = getMobileOs();
      console.log('deviceType',deviceType)
      if(deviceType === "iOS") {
        window.location.replace(storeConfigData?.ios?.storeUrl);
      } else if(deviceType === "Android") {
        window.location.replace(storeConfigData?.android?.storeUrl);
      } else {
        window.location.replace(`${window.location.origin}/404`);
      }
    }
    
    
  }
  useEffect(()=> {
    handleRedirectionToStore();
  },[])
  return <div className="container" style={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding: "15%"
  }}>
    <CircularProgress color="inherit" />
  </div>
};
DietPlanRedirection.displayName = "Bxgy";
export default DietPlanRedirection;
