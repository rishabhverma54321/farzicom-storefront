import React from "react";
import NavDropdown from "./NavDropdown";

export default function NavigationItems({ items }) {
  return items.map(item => (
    <div className="nav-items-container" key={item.id}>
      <ul className="nav-items-wrapper">
        <li data-test="mainMenuItem" className="main-menu__item" key={item.id}>
          <NavDropdown {...item} />
        </li>
      </ul>
    </div>
  ));
}
