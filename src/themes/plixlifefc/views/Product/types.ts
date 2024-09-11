import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import { ApolloQueryResult } from "apollo-client";

import {
  ProductDetails,
  ProductDetailsVariables,
  ProductDetails_product,
  ProductDetails_section_edges_node,
} from "./gqlTypes/ProductDetails";
import { ProductDetailsPlix } from "./gqlTypes/ProductDetailsPlix";

export interface IProps {
  data: ProductDetailsPlix;
  product: ProductDetails_product;
  section: ProductDetails_section_edges_node;
  productOffers: (string | null)[] | null;
  add: (
    variantId: string,
    quantity: number
  ) => Promise<
    | {
        error: any;
        data?: undefined;
        pending?: undefined;
      }
    | {
        data: any;
        pending: boolean;
        error?: undefined;
      }
    | {
        pending: boolean;
        error?: undefined;
        data?: undefined;
      }
  >;
  items: ICheckoutModelLine[];
  refetch: (
    variables?: ProductDetailsVariables
  ) => Promise<ApolloQueryResult<ProductDetails>>;
  startPolling: (pollInterval: number) => void;
  stopPolling: () => void;
}
