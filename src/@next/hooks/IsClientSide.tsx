import React, { useEffect, useState } from "react";

const IsClientSide = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default IsClientSide;
