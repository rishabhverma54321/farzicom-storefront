/* eslint-disable react/react-in-jsx-scope */
// import { QueryParamProvider } from "use-query-params";
// eslint-disable-next-line import/no-extraneous-dependencies

import React from "react";
import Layout from "@temp/components/Layout";
import { clientSSR, client } from "@temp/client";
import { PlixReviewCard } from "@components/organisms/ReviewContainer/PlixReviewCard";
import { productReviewQuery } from "./queries";
import {
  getDBIdFromGraphqlId,
  getGraphqlIdFromDBId,
  slugify,
} from "@temp/core/utils";
import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";
import MyCustomLink from "@components/next-react/MyCustomLink";
import { CUSTUM_REVIEW_PDP_METADATA_FIELDS } from "@temp/themes/plixlifefc/config";
import Head from "next/head";
import { getMetadataValue, parseJson } from "@utils/misc";
import parse from "html-react-parser"
import headerAndFooterQuery, { ShopMetaQuery } from "@temp/gloablQueries/queries";

export default function Product({ headerAndFooterData, shopMeta, response }) {
  const review = { node: response?.data?.productReview };
  const productMetaData = response?.data?.product?.metadata;
  const htmlContentHeadReviews =
    getMetadataValue(productMetaData, "html_content_head_review") &&
    parseJson(getMetadataValue(productMetaData, "html_content_head_review"));

  return (
    <>
      <Head>
        <title>
          Review{" "}
          {review?.node?.product?.name
            ? `- ${review?.node?.product?.name}`
            : ""}
        </title>
        {htmlContentHeadReviews &&
          Array.isArray(htmlContentHeadReviews) &&
          htmlContentHeadReviews?.map((content: any) =>
            parse(`${content?.tag}`)
          )}
      </Head>
      <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
        <div className="ReviewPageCard">
          {review?.node ? (
            <>
              <div className="container review_page_container">
                <h2>{review?.node?.product?.name}</h2>
                <img src={review?.node?.product?.thumbnail?.url} />
                <div className="GoToBtn">
                  <MyCustomLink
                    href={`/product/${slugify(
                      review?.node?.product?.name
                    )}/${getDBIdFromGraphqlId(
                      review?.node?.product?.id,
                      "Product"
                    )}/`}
                  >
                    <div className="shopAllButton">
                      Learn more about Product
                    </div>
                  </MyCustomLink>
                </div>
              </div>

              <PlixReviewCard
                review={review}
                isReviewPage= {true}
                reviewFilterbyRating={review?.node?.rating}
              />
            </>
          ) : (
            <>
              <ContinueShoppingNext />
            </>
          )}
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const headerAndFooterData = await clientSSR.query({
      query: headerAndFooterQuery,
      fetchPolicy: "no-cache",
    });
    const shopMeta = await clientSSR.query({
      query: ShopMetaQuery,
      fetchPolicy: "no-cache",
    });
    const reviewID = getGraphqlIdFromDBId(
      context?.params?.reviewId,
      "ProductReviewType"
    );
    const encodedProductId = getGraphqlIdFromDBId(
      context?.params?.slug,
      "Product"
    );

    const response = await clientSSR.query({
      query: productReviewQuery,
      variables: {
        id: reviewID,
        product_id: encodedProductId,
        metaFields: CUSTUM_REVIEW_PDP_METADATA_FIELDS,
      },
      fetchPolicy: "no-cache",
    });

    return {
      props: {
        headerAndFooterData,
        shopMeta,
        response,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.log("error ----------", e);
    console.log("error>>>>>>>>>>>>>>>>", e?.networkError?.result?.errors[0]);
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
