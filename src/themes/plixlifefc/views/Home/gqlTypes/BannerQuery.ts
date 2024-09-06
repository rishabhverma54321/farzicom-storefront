/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BannerType } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: BannerQuery
// ====================================================

export interface BannerQuery_banners_edges_node {
  __typename: "CustomBannerType";
  /**
   * The ID of the object.
   */
  id: string;
  text: string;
  type: BannerType;
  relatedId: string | null;
  link: string;
  name: string;
  created: any;
  /**
   * The URL of the image.
   */
  imageUrl: string | null;
  /**
   * The URL of the image for mobile screens.
   */
  imageMobileUrl: string | null;
  position: number;
  isEnabled: boolean;
}

export interface BannerQuery_banners_edges {
  __typename: "CustomBannerTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: BannerQuery_banners_edges_node | null;
}

export interface BannerQuery_banners {
  __typename: "CustomBannerTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (BannerQuery_banners_edges | null)[];
}

export interface BannerQuery {
  banners: BannerQuery_banners | null;
}
