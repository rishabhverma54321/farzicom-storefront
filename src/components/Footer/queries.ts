import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { SecondaryMenu } from "./gqlTypes/SecondaryMenu";
import { Footer } from "./gqlTypes/Footer";

const secondaryMenu = gql`
  fragment SecondaryMenuSubItem on MenuItem {
    id
    name
    category {
      id
      name
      slug
    }
    url
    collection {
      id
      name
    }
    page {
      slug
    }
  }

  query SecondaryMenu {
    shop {
      navigation {
        secondary {
          items {
            ...SecondaryMenuSubItem
            children {
              ...SecondaryMenuSubItem
            }
          }
        }
      }
    }
  }
`;

export const TypedSecondaryMenuQuery = TypedQuery<SecondaryMenu, {}>(
  secondaryMenu
);

export const footer = gql`
  query Footer {
    menu(slug: "footer") {
      id
      name
      items {
        id
        name

        children {
          id
          name
          category {
            id
            name
            slug
          }
          url
          collection {
            id
            name
          }
          page {
            slug
          }
        }
        category {
          id
          name
          slug
        }
        url
        collection {
          id
          name
        }
        page {
          slug
        }
      }
    }
    section(first: 1, name: "Footer") {
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
export const TypedFooterQuery = TypedQuery<Footer, {}>(footer);
