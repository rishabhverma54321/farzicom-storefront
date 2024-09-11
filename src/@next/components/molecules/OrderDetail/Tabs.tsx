import React from "react";
import { Route } from "./style";

export interface TabType {
  tablist: Array<string>;
  tab: string;
  color?: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}
const Tabs: React.FC<TabType> = ({ tablist, tab, setTab, color }) => {
  return (
    <>
      {tablist.map((item, index) => (
        <Route
          key={index}
          onClick={() => setTab(item)}
          style={{
            borderBottom:
              tab === `${item}` ? `2px solid ${color}` : "transparent",
          }}
        >
          {item}
        </Route>
      ))}
    </>
  );
};

export default Tabs;
