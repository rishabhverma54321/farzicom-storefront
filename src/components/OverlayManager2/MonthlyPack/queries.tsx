import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";


export const productQuery = gql`
query productdetail($id: ID,  $metaFields: [String]) {
    product(id: $id, metaFields: $metaFields) {
      id
      name
      defaultVariant{
        id
        sku
      }
      metadata:customMetaData{
        key
        value
      }
      variants {
        id
        name
        images{
           id
           alt
           id
           sortOrder
           url
        }
        sku
        attributes{
          attribute{
            id
            name
          }
          values{
            id
            name
          }
        }
        product {
          id
          name
          category{
            id
            name
          }
        }
        pricing{
          price{
            currency
            gross{
              amount
              currency
            }
            net{
              amount
              currency
            }
          }
        }
        metadata {
          key
          value
        }
      }
    }
  }
`;

export const TypedProductQuery = TypedQuery<
any,
any
>(productQuery);