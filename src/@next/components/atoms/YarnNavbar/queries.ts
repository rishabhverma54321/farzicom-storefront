import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import { NavBarInformation } from "./gqlTypes/NavBarInformation";

export const navBarInformation = gql`
  query NavBarInformation {
    section(first: 1) {
      edges {
        node {
          metadata {
            key
            value
          }
        }
      }
    }
  }
`;

export const TypedNavBarInformation = TypedQuery<NavBarInformation, {}>(
  navBarInformation
);
