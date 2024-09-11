import * as React from "react";

import NetworkStatus from "@components/molecules/NetworkStatus";

const Offline: React.FC = ({ children }: { children: React.ReactNode }) => (
  <NetworkStatus>{(online) => (online ? <></> : children)}</NetworkStatus>
);

export default Offline;
