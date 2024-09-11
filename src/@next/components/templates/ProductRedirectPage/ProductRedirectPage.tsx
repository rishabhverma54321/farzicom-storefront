import { TypedSectionWithoutChildrenQuery } from "@temp/themes/plixlifefc/views/Home/queries";
import { getMetadataValue } from "@utils/misc";
import React from "react";
// import { Redirect, RouteComponentProps } from "react-router-dom";

export interface IProductRedirectPageProps{}

export const ProductRedirectPage: React.FC<IProductRedirectPageProps> = ({
  location,
}) => {
  const { search, pathname } = location;
  const productPathname = pathname as string;
  return (
    <>
      <TypedSectionWithoutChildrenQuery
        variables={{
          firstPage: 1,
          name: "Redirect Product URL",
        }}
      >
        {({ data }) => {
          const metadata =
            data?.section?.edges.length &&
            data.section.edges[0]?.node?.metadata;
          const redirectUrls =
            metadata &&
            getMetadataValue(metadata, "redirect_urls") &&
            JSON.parse(getMetadataValue(metadata, "redirect_urls"));
          const redirectUrlPresent = redirectUrls.find(
            item =>
              item.key === productPathname ||
              `${item.key}/` === productPathname ||
              productPathname.includes(item.key)
          );
          const redirectUrl = redirectUrlPresent && redirectUrlPresent.value;
          if (redirectUrl) return <></>;

          return <> </>;
        }}
      </TypedSectionWithoutChildrenQuery>
    </>
  );
};
ProductRedirectPage.displayName = "ProductRedirectPage";
export default ProductRedirectPage;
