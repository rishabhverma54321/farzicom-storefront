import React, { useState, useRef } from "react";

export interface ITabs {
  activeTab: number;
  children: React.ReactElement[];
  className?: string;
  ulClassName?: string;
  onClick?: Function;
}

const Tabs: React.FC<ITabs> = ({
  activeTab,
  children,
  className,
  ulClassName,
  onClick,
}) => {
  const [activeItem, setActiveItem] = useState(
    activeTab ? Number(activeTab) : 1
  );
  const tabItemRefs = useRef(
    Array.from({ length: React.Children.count(children) }, index =>
      React.createRef()
    )
  );

  const handleClickOnTab = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
    tab: any,
  ) => {
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
    setActiveItem(index + 1);
    if (typeof onClick !== "undefined") {
      onClick(event, index + 1, tab, activeItem);
    }
  };

  const handleTabItems = (children: any[]) => {
    return children.map((tab, key) => {
      if (tab.props.isHidden) {
        return null;
      }
      return (
        <li
          ref={tabItemRefs[key]}
          key={key}
          onClick={e => handleClickOnTab(e, key, tab)}
          className={`rb-tabs-item ${
            tab.props.className ? tab.props.className : ""
          }${activeItem === key + 1 ? " active-tab--title" : ""}`}
        >
          <div className="text-wrapper">{tab.props.title}</div>
        </li>
      );
    });
  };

  return (
    <div className={`rb-tabs ${className || ""}`}>
      <div className={`rb-tabs-header ${className || ""}__tabsHeader `}>
        <ul className={`rb-tabs-items ${ulClassName || ""}`}>
          {handleTabItems(children)}
        </ul>
      </div>

      <div className={`rb-tabs-content ${className || ""}__tabsContent `}>
        {children.map((item, key) => {
          if (item.props.isHidden) {
            return null;
          }
          return (
            <div
              className={`rb-tabs-content-item ${
                activeItem === key + 1 ? "active-tab--content" : ""
              }`}
              key={key}
            >
              {item.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Tab: React.FC<{
  title: string;
  isHidden?: boolean;
  className?: string;
}> = ({ title }) => <li>{title}</li>;

Tabs.displayName = "Tabs";
export default Tabs;
