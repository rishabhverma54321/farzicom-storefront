import React from "react";
import CategoryTab from "./CategoryTab";
import GlobIcon from "../../../../../images/yarn-filter/Globe";

function TypesOfProduct() {
  return (
    <div className="product__type">
      <CategoryTab
        text="Category"
        icon={<GlobIcon />}
        styleClass="category"
        activebar
      />
    </div>
  );
}

export default TypesOfProduct;
