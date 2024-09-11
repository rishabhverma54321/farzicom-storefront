import React from "react";
// import Media from "react-media";
import { NavLink } from "src/components/NavLink";
import { Footer_menu_items_children } from "@temp/components/Footer/gqlTypes/Footer";

const List: React.FC<{
  heading: string;
  Lists: Array<Footer_menu_items_children>;
}> = props => {
  return (
    <>
      <div>
        <div className="heading">{props.heading}</div>
        <ul>
          {props.Lists.map(item => (
            <li key={item.id}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default List;
