import gql from "graphql-tag";
export const trackTreeFromOrderQuery = gql`
  query TrackTreeFromOrderQuery($shopifyID: String, $orderID: ID) {
    treeAttributesForOrder(shopifyOrderId: $shopifyID, orderId:$orderID) {
      id
      latitude
      longitude
      species
      plantedDate
      plantedBy
      plantedLocation
      farmerBeneficiaryName
      treeImage
    }
  }
`;

export const orderWithTreeQuery = gql`
  query OrderWithTreeQuery($id: ID!) {
    ordersWithTreeForUser(userId: $id)
  }
`;
