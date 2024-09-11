import * as React from "react";
import { RouteComponentProps } from "react-router";

import { PlixShop } from "@components/organisms/PlixShop";
import { TypedArticleQuery } from "../Article/query";

type ViewProps = RouteComponentProps<{
  id: string;
}>;

export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach(value => {
      str.push(`${value}_${valueObj[value].join("_")}`);
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj = {};
    const propsWithValues = strValue.split(".").filter(n => n);
    propsWithValues.map(value => {
      const propWithValues = value.split("_").filter(n => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

export const View: React.FC<ViewProps> = () => {
  return (
    <>
      <TypedArticleQuery
        loaderFull
        variables={{ slug: "shop" }}
        errorPolicy="all"
      >
        {({ data }) => {
          return <PlixShop content={data.page} />;
        }}
      </TypedArticleQuery>
    </>
  );
};

export default View;
