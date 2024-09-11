import gql from "graphql-tag";
import { TypedQuery } from "@temp/core/queries";
import { HorecaQuery } from "./gqlTypes/HorecaQuery";

export const HorecaPageQuery = gql`
  query HorecaQuery {
    sections(first: 100) {
      edges {
        node {
          id
          name
          images(first: 100) {
            edges {
              node {
                url
                alt
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
  }
`;

export const TypedHorecaPageQuery = TypedQuery<HorecaQuery, {}>(
  HorecaPageQuery
);
