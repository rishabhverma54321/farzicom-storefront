import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { MainMenu } from "./gqlTypes/MainMenu";

export const mainMenu = gql`
  fragment MainMenuSubItem on MenuItem {
    id
    name
    category {
      id
      name
      slug
      metadata {
        key
        value
      }
    }
    url
    collection {
      id
      name
      metadata {
        key
        value
      }
      products(first: 100) {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            id
          }
        }
      }
    }
    page {
      slug
      metadata {
        key
        value
      }
    }
    parent {
      id
    }
  }

  query MainMenu {
    menu(name: "Navbar") {
      id
      items {
        ...MainMenuSubItem
        children {
          ...MainMenuSubItem
          children {
            ...MainMenuSubItem
          }
        }
      }
    }

    headers(first: 1) {
      edges {
        node {
          id
          text
          name
          created
        }
      }
    }
  }
`;

export const TypedMainMenuQuery = TypedQuery<MainMenu, {}>(mainMenu);
