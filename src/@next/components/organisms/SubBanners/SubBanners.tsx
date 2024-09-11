import React from "react";

import { HomeBanner } from "@components/molecules";

import image1m from "images/sub-banners/sub-banner-m-1.png";
import image1d from "images/sub-banners/sub-banner-d-1.png";
import image2m from "images/sub-banners/sub-banner-m-2.png";
import image2d from "images/sub-banners/sub-banner-d-2.png";
import image3m from "images/sub-banners/sub-banner-m-3.jpg";
import image3d from "images/sub-banners/sub-banner-d-3.jpg";

import { ProductsList_banners_edges } from "@temp/themes/ikkai/views/Home/gqlTypes/ProductsList";
import { BannerType } from "@globalTypes";

const subbanners: Array<ProductsList_banners_edges> = [
  {
    __typename: "CustomBannerTypeEdge",
    node: {
      id: "Q3VzdG9tQmFubmVyVHlwZToxNg==",
      text: "Vitamin C Product Range",
      type: BannerType.BANNERTYPES_HOME_PAGE,
      relatedId: null,
      link: "collection/vitamin-c/17/",
      name: "Vitamic C Product Range",
      created: "2021-05-26T12:14:46.642283+00:00",
      imageUrl: image3d,
      imageMobileUrl: image3m,
      position: 0,
      isEnabled: true,
      __typename: "CustomBannerType",
    },
  },
  {
    __typename: "CustomBannerTypeEdge",
    node: {
      id: "Q3VzdG9tQmFubmVyVHlwZToxNg==",
      text: "pink me again",
      type: BannerType.BANNERTYPES_HOME_PAGE,
      relatedId: null,
      link: "product/pink-me-again-lip-sleeping-mask/88/",
      name: "Pink me again",
      created: "2021-05-26T12:14:46.642283+00:00",
      imageUrl: image1d,
      imageMobileUrl: image1m,
      position: 1,
      isEnabled: true,
      __typename: "CustomBannerType",
    },
  },
  {
    __typename: "CustomBannerTypeEdge",
    node: {
      id: "Q3VzdG9tQmFubmVyVHlwZToxNg==",
      text: "Tomatina",
      type: BannerType.BANNERTYPES_HOME_PAGE,
      relatedId: null,
      link: "product/tomatina-de-tan-face-pack/85/",
      name: "Tomatina",
      created: "2021-05-26T12:14:46.642283+00:00",
      imageUrl: image2d,
      imageMobileUrl: image2m,
      position: 2,
      isEnabled: true,
      __typename: "CustomBannerType",
    },
  },
];

export interface ISubBannersProps {}

export const SubBanners: React.FC<ISubBannersProps> = () => {
  return (
    <>
      <HomeBanner banners={subbanners} />
    </>
  );
};

SubBanners.displayName = "SubBanners";
export default SubBanners;
