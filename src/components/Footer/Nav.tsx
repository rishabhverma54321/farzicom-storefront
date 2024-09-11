import * as React from "react";

import { NavLink } from "..";
import { TypedFooterQuery } from "./queries";

//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

class Nav extends React.PureComponent {
  render() {
    return (
      <footer className="footer-nav">
        <div className="footer-nav__container">
          <TypedFooterQuery>
            {({ data, error }) => {
              if (data.menu.items)
                return data.menu.items.map(item => (
                  <div className="footer-nav__section" key={item.id}>
                    <p className="footer-nav__section-header">
                      <NavLink item={item} />
                    </p>
                    {/* <div className="footer-nav__section-content">
                    {item.children.map(subItem => (
                      <p key={subItem.id}>
                        <NavLink item={subItem} />
                      </p>
                    ))}
                  </div> */}
                  </div>
                ));
              return <> </>;
            }}
          </TypedFooterQuery>
          <hr className="footer-hr" />
        </div>
      </footer>
    );
  }
}

export default Nav;
