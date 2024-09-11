// import { TypedQuery } from "@temp/core/queries";
// import gql from "graphql-tag";
// import { deliveryDate, deliveryDateVariables } from "./gqlTypes/deliveryDate";
// import { wareIqStatus, wareIqStatusVariables } from "./gqlTypes/wareIqStatus";

// const WareIqStatus = gql`
//   query wareIqStatus($token: UUID) {
//     orderStatus(token: $token) {
//       status
//     }
//   }
// `;

// const DeliveryDate = gql`
//   query deliveryDate($pincode: String, $input: [SkuInput]) {
//     deliveryDate(pincode: $pincode, input: $input)
//   }
// `;

// export const TypedDeliveryDate = TypedQuery<
//   deliveryDate,
//   deliveryDateVariables
// >(DeliveryDate);

// export const TypedWareIqStatus = TypedQuery<
//   wareIqStatus,
//   wareIqStatusVariables
// >(WareIqStatus);
