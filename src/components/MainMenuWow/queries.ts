import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { MainMenu } from "./gqlTypes/MainMenu";
import {
  SectionDetailsWithoutChildren,
  SectionDetailsWithoutChildrenVariables,
} from "./gqlTypes/SectionDetailsWithoutChildren";

export const mainMenu = gql`
  fragment MainMenuSubItem on MenuItem {
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
    parent {
      id
    }
  }

  query MainMenu {
    menu(name: "Main Menu") {
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

export const sectionWithoutChildren = gql`
  query SectionDetailsWithoutChildren(
    $firstPage: Int!
    $id: ID
    $name: String
  ) {
    section(first: $firstPage, id: $id, name: $name) {
      edges {
        node {
          id
          name
          isPublished
          backgroundImage {
            url
            alt
          }
          images(first: 10) {
            edges {
              node {
                url
                alt
                id
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

export const TypedSectionWithoutChildrenQuery = TypedQuery<
  SectionDetailsWithoutChildren,
  SectionDetailsWithoutChildrenVariables
>(sectionWithoutChildren);
