// import "./scss/index.scss";

import * as React from "react";

import { META_DEFAULTS } from "Themes/config";
import { MetaWrapper } from "@temp/components";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";

const View: React.FC = () => {
  return (
    <div className="home-page">
      <TypedHomePageQuery
        variables={{ firstPage: 1, name: "Homepage" }}
        alwaysRender
        displayLoader={false}
        errorPolicy="all"
      >
        {({ data, loading, refetch }) => {
          return (
            <MetaWrapper
              meta={{
                description: data.shop ? data.shop.description : "",
                title: META_DEFAULTS.title,
              }}
            >
              <Page
                loading={loading}
                backgroundImage={
                  data.shop &&
                  data.shop.homepageCollection &&
                  data.shop.homepageCollection.backgroundImage
                }
                // categories={data.categories}
                shop={data.shop}
                // collections={data?.section?.edges[0].node.collections}
                banners={data.banners}
                refetch={refetch}
                section={data?.section?.edges[0]?.node.metadata}
              />
            </MetaWrapper>
          );
        }}
      </TypedHomePageQuery>
    </div>
  );
};

export default View;
