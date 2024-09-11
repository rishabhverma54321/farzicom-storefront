import gql from "graphql-tag";

export const ShopMetaQuery = `
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

export const updateMetadata = (id: any, input: any) => `
    mutation updateMetadata  {
      updateMetadata(id: "${id}", input: ${input}) {
        item{
          metadata{
            key
            value
          }
        }
      }
    }`;

export const checkoutDetails = gql`
  query CheckoutDetails($token: UUID) {
    checkout(token: $token) {
      token
      id
      metadata {
        key
        value
      }
      totalPrice {
        gross {
          amount
          currency
        }
        net {
          amount
          currency
        }
      }
      subtotalPrice {
        gross {
          amount
          currency
        }
        net {
          amount
          currency
        }
      }
      billingAddress {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
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
      shippingAddress {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
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
      email
      availableShippingMethods {
        id
        name
        price {
          currency
          amount
        }
      }
      shippingMethod {
        id
        name
        price {
          currency
          amount
        }
      }
      shippingPrice {
        gross {
          amount
          currency
        }
        net {
          amount
          currency
        }
      }
      lines {
        id
        quantity

        totalPrice {
          gross {
            amount
            currency
          }
          net {
            amount
            currency
          }
        }
        variant {
          id
          name
          sku
          quantityAvailable

          images {
            id
            sortOrder
            alt
            url
          }
          metadata {
            key
            value
          }
          pricing {
            onSale
            priceUndiscounted {
              gross {
                amount
                currency
              }
              net {
                amount
                currency
              }
            }
            price {
              gross {
                amount
                currency
              }
              net {
                amount
                currency
              }
            }
          }
          attributes {
            attribute {
              id
              name
            }
            values {
              id
              name
              value: name
            }
          }
          product {
            id
            name
            slug
            isAvailableForPurchase
            weight {
              unit
              value
            }
            category {
              id
              name
              slug
            }
            thumbnail {
              url
              alt
            }

            productType {
              id
              isShippingRequired
            }
            metadata {
              key
              value
            }
          }
        }
      }
      isShippingRequired
      discount {
        currency
        amount
      }
      discountName
      translatedDiscountName
      voucherCode
      availablePaymentGateways {
        id
        name
        config {
          field
          value
        }
        currencies
      }
    }
  }
`;
