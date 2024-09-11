import React from "react";

import { IFilterAttributes, IFilters } from "@types";
import { ApolloQueryResult } from "@apollo/client";

import { ShopPage } from "@temp/pages/page/gqlTypes/ShopPage";
import ShopNext from "@components/farzicom-ui-kit/ShopNext";
import {
  CollectionProducts,
  CollectionProductsVariables,
  CollectionProducts_collection_products,
} from "./gqlTypes/CollectionProducts";
import {
  Collection_collection,
  Collection_collection_metadata,
} from "./gqlTypes/Collection";
import { CollectionNext_collection } from "./gqlTypes/CollectionNext";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  collection: CollectionNext_collection;
  description: string;
  metadata: Collection_collection_metadata[];
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  products: CollectionProducts_collection_products;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
  refetch: (
    variables?: CollectionProductsVariables
  ) => Promise<ApolloQueryResult<CollectionProducts>>;
  shopPageData?: ApolloQueryResult<ShopPage>;
  collectionQuery: any;
  shopMeta?: any;
}

const Page: React.FC<PageProps> = ({
  shopPageData,
  collection,
  collectionQuery,
  shopMeta,
}) => {
  const collectionDataArray: any = [
    {
      id: collection.id,
      data: { products: collection.products },
      name: collection.name,
    },
  ];
  return (
    <>
      <ShopNext
        type="collection"
        data={{
          shopPageData,
          collectionDataArray,
          collectionQuery,
          shopMeta,
        }}
      />
    </>
  );
};

export default Page;
