import productImage from "./productImage.png";

export const DEFAULT_PROPS = {
  name: "The Great Square Table",
  price: {
    gross: {
      amount: 123,
      currency: "PLN",
    },
    net: {
      amount: 100,
      currency: "PLN",
    },
  },
  quantity: 2,
  sku: "TGS-122A",
  thumbnail: {
    alt: "Product image",
    url: productImage,
  },
  weight: 50,
  metadata: [],
  product: {
    id: "adfadsfadsfasdf",
    name: "The Great Square Table",
    quantity: 2,
    sku: "TGS-122A",
    price: {
      gross: {
        amount: 123,
        currency: "PLN",
      },
      net: {
        amount: 100,
        currency: "PLN",
      },
    },
    thumbnail: {
      alt: "Product image",
      url: productImage,
    },
    categorySlug: "the-great-square-table",
    variant: null,
    weight: null,
    metadata: undefined,
  },
};
