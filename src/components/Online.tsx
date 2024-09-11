import * as React from "react";

import NetworkStatus from "@components/molecules/NetworkStatus";

const Online: React.FC = ({ children }: { children: React.ReactNode }) => (
  <NetworkStatus>{(online) => (online ? children : <></>)}</NetworkStatus>
);

export default Online;
