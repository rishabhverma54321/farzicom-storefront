import gql from "graphql-tag";

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
    section(first: 1, name: "Header") {
      edges {
        node {
          id
          name
          isPublished
          metadata {
            key
            value
          }
        }
      }
    }
  }
`;

export const headerAndFooterQuery = gql`
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
      products {
        totalCount
      }
      metadata {
        key
        value
      }
    }
    page {
      id
      slug
    }
    parent {
      id
    }
  }

  query MainMenuUpdatedPlix {
    navbar: menu(name: "Navbar") {
      id
      items {
        ...MainMenuSubItem
        children {
          ...MainMenuSubItem
          children {
            ...MainMenuSubItem
            children {
              ...MainMenuSubItem
            }
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

    headerSection: section(first: 1, name: "Header") {
      edges {
        node {
          id
          name
          isPublished
          metadata {
            key
            value
          }
        }
      }
    }

    footerSection: section(first: 1, name: "seoFooter") {
      edges {
        node {
          isPublished
          metadata {
            key
            value
          }
        }
      }
    }

    footer: menu(slug: "footer") {
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
  }
`;

export const ShopMetaQuery = gql`
  query ShopMetadataQuery {
    shopmeta(first: 100) {
      edges {
        node {
          name
          metadata {
            key
            value
          }
        }
      }
    }
  }
`;

export const CustomShopMetaQuery = gql`
  query ShopMetadataQuery($customMetaFields: [String]) {
    shopmeta(first: 100, metaFields: $customMetaFields) {
      edges {
        node {
          name
          metadata: customMetaData {
            key
            value
          }
        }
      }
    }
  }
`;

export const addressFragment = gql`
  fragment AddressFragment on Address {
    id
    firstName
    lastName
    companyName
    streetAddress1
    streetAddress2
    city
    cityArea
    postalCode
    country {
      code
      country
    }
    countryArea
    phone
    isDefaultBillingAddress
    isDefaultShippingAddress
  }
`;

export const userDetailsQuery = gql`
  ${addressFragment}
  query UserDetails {
    user: me {
      id
      email
      firstName
      lastName
      phone
      tags {
        name
      }
      isStaff
      metadata {
        key
        value
      }
      defaultShippingAddress {
        ...AddressFragment
      }
    }
  }
`;


export default headerAndFooterQuery
