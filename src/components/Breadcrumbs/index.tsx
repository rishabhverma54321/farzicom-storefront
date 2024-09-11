import classNames from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import MyCustomLink from "@components/next-react/MyCustomLink";

import { commonMessages } from "@temp/intl";

import { baseUrl } from "../../app/routes";
import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { Category_category } from "../../themes/lotus/views/Category/gqlTypes/Category";
import Router from "next/router";

import { smallScreen } from "../../globalStyles/scss/variables.module.scss";
//FIXME:NextJs Make it a CSS module
//import "./scss/index.scss";

export interface Breadcrumb {
  value: string;
  link: string;
}

export const extractBreadcrumbs = (category: Category_category) => {
  const constructLink = item => ({
    link: [
      `/category`,
      `/${slugify(item.name)}`,
      `/${getDBIdFromGraphqlId(item.id, "Category")}/`,
    ].join(""),
    value: item.name,
  });
  let breadcrumbs = [constructLink(category)];

  if (category.ancestors.edges.length) {
    const ancestorsList = category.ancestors.edges.map(edge =>
      constructLink(edge.node)
    );
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

const getBackLink = (breadcrumbs: Breadcrumb[]) => {
  breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].link : "/";
};

const Breadcrumbs: React.FC<{
  breadcrumbs: Breadcrumb[];
}> = ({ breadcrumbs }) => (
  <Media
    query={{
      minWidth: smallScreen,
    }}
  >
    {matches =>
      matches ? (
        <ul className="breadcrumbs">
          <li>
            <MyCustomLink href={baseUrl}>
              <FormattedMessage {...commonMessages.home} />
            </MyCustomLink>
          </li>
          {breadcrumbs?.map((breadcrumb, index) => (
            <li
              key={breadcrumb.value}
              className={classNames({
                breadcrumbs__active: index === breadcrumbs.length - 1,
              })}
            >
              <MyCustomLink href={breadcrumb.link}>
                {breadcrumb.value}
              </MyCustomLink>
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="breadcrumbs"
          onClick={() => {
            Router.back();
          }}
        >
          {/* <MyCustomLink href={getBackLink(breadcrumbs)}> */}
          <FormattedMessage defaultMessage="Back" />
          {/* </MyCustomLink> */}
        </div>
      )
    }
  </Media>
);

export default Breadcrumbs;
