import React from "react";
import LoginV1 from "./LoginVariants/LoginV1";
import LoginV2 from "./LoginVariants/LoginV2";
const MainLogin = () => {
  const loginVariant: any = "v2";
  switch (loginVariant) {
    case "v1":
      return <LoginV1 />;
    case "v2":
      return <LoginV2 />;
  }
};
MainLogin.displayName = "MainLogin";
export default React.memo(MainLogin);
