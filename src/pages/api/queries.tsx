export const createTokenWithTruecallerMutation = (accessToken, endpoint,requestID) => `
mutation createTokenTrueCaller {
  createTokenTrueCaller(
    accessToken: "${accessToken}"
    endpoint: "${endpoint}"
    requestId: "${requestID}"
  ) {
    token
    refreshToken
    csrfToken
    user {
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
      defaultBillingAddress {
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
      addresses {
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
    }
    otpErrors {
      code
      field
      message
    }
  }
}`;