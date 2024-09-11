import React from "react";
// import Media from "react-media";
import { NavLink } from "@temp/components/NavLink";
import { Footer_menu_items_children } from "@temp/components/Footer/gqlTypes/Footer";

export interface IconPosition {
  icon: React.ReactNode;
  position: "left" | "right";
}
const List: React.FC<{
  heading: string;
  Lists: Array<Footer_menu_items_children>;
  item?:any
  listClass?: string;
  headerIcon?: IconPosition;
  listIcon?: IconPosition;
  onListItemClick?: (cta_name: string) => void;
}> = ({ Lists, heading, headerIcon, listClass, listIcon, onListItemClick, item }) => {
  return (
    <>
      <div className={listClass}>
        <div className={`${listClass}__heading heading`}>
          {headerIcon && headerIcon?.position === "left" && <> {headerIcon} </>}
           {item ? <NavLink item={item} /> :heading}
          {headerIcon && headerIcon?.position === "right" && (
            <> {headerIcon.icon} </>
          )}
        </div>
        <ul className={`${listClass}__ul`}>
          {Lists.map(item => (
            <li key={item.id} className={`${listClass}__ul__li list-item`} onClick={()=> {
              onListItemClick(item.name)
            }}>
              {listIcon && listIcon?.position === "left" ? (
                <> {listIcon} </>
              ) : (
                <> </>
              )}
              {item.name === "Chat with us" ? (
                <>
                  <span
                    className="limechat_widget_toggle"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Chat with us{" "}
                  </span>
                </>
              ) : (
                <>
                  {item.name === "Consultation Form" ? (
                    <NavLink item={item} target="_blank" />
                  ) : (
                    <NavLink item={item} />
                  )}
                </>
              )}
              {listIcon && listIcon?.position === "right" ? (
                <> {listIcon.icon} </>
              ) : (
                <> </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default List;
