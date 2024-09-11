import * as React from "react";
import Select from "react-select";

//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

const Dropdown: React.FC<{ [x: string]: any }> = props => (
  <Select
    classNamePrefix="dropdown"
    className="dropdown-component"
    {...props}
  />
);

export default Dropdown;
