import gql from "graphql-tag";

export const addTags = gql`
  mutation AddTags($id: ID!, $input: [String]) {
    addTags(id: $id, tags: $input) {
      tagErrors {
        code
        field
        message
      }
    }
  }
`;

export const removeTags = gql`
  mutation RemoveTags($id: ID!, $input: [String]) {
    removeTags(id: $id, tags: $input) {
      tagErrors {
        code
        field
        message
      }
    }
  }
`;

export const deleteMetadata = gql`
  mutation DeleteMetadata($id: ID!, $keys: [String!]!) {
    deleteMetadata(id: $id, keys: $keys) {
      item {
        metadata {
          key
          value
        }
      }
    }
  }
`;
