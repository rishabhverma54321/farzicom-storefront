import gql from "graphql-tag";

export const GET_POSTAL_PIN = gql`
  query PincodeDetails($pin: String) {
    pincode(pin: $pin) {
      pin
      city
      state
      serviceable
      created
      updated
      cityType
      id
    }
  }
`;

const queries = () => {}

export default queries
