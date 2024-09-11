import React from "react";
import * as S from "./styles";
import Date from "../../../../../images/yarn-filter/Date";
import Alphabetically from "../../../../../images/yarn-filter/Alphabetically";
import CategoryTab from "./CategoryTab";

function SortByContent() {
  return (
    <S.SortBy>
      <div className="sortby__tab">
        <CategoryTab
          text="Alphabetically"
          icon={<Alphabetically />}
          styleClass="content"
        />
        <input type="radio" id="alphabet" name="sortby" value="" />
      </div>
      <div className="sortby__tab">
        <CategoryTab text="Date" icon={<Date />} styleClass="content" />
        <input type="radio" id="date" name="sortby" value="" />
      </div>
    </S.SortBy>
  );
}

export default SortByContent;
