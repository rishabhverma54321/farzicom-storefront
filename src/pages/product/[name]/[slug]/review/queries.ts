import gql from "graphql-tag";

export const productReviewQuery = gql`
  query ReviewDetails($id: ID,  $product_id: ID!, $metaFields: [String]) {
    product(id: $product_id, metaFields:$metaFields)  {
    id
     metadata: customMetaData {
          key
          value
    }}
    productReview(id: $id) {
      id
      rating
      created
      review
      title
      userName
      verified
      adminReply
      isPublished
      phone
      userName
      userEmail
      user {
        id
        email
      }
      product {
        id
        name
        thumbnail {
          url
        }
      }
      images(first: 100) {
        edges {
          node {
            id
            image
            url
          }
        }
      }
    }
  }
`;
