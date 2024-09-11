/* eslint-disable global-require */

import { generatePageUrl } from "@temp/core/utils";

export const showCashback = process.env.REACT_APP_SHOW_CASHBACK === "true";
export const isSubscriptionEnable = false;

export const MAIN_LOGO =
  process.env.REACT_APP_LOGO || process.env.NEXT_PUBLIC_LOGO;
export const MOBILE_SLIDER_LOGO = MAIN_LOGO;

export const CLIENT =
  process.env.REACT_APP_CLIENT || process.env.NEXT_PUBLIC_CLIENT;

export const orderHistoryListUrl = "/order-history";
export const { API_URI } = process.env;

export const CLIENT_INITIALS = "";

export const apiURl = process.env.NEXT_PUBLIC_API_URI;

const mediaBucketURL =
  apiURl && apiURl.includes("stage")
    ? "wowhealthstage-media.farziengineer.co"
    : "wowhealth-media.farziengineer.co";

const cdnSourceURL =
  apiURl && apiURl.includes("stage")
    ? "wowhealth-stage.imgix.net"
    : "wowhealth.imgix.net";

export const IMAGE_CDN = "imgix";
export const IMAGE_CDN_PROVIDERS = {
  imgix: {
    useCDN: true,
    mediaBucketURL,
    cdnSourceURL,
  },
};

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 100;
export const SUPPORT_EMAIL = "support@example.com";
export const PROVIDERS = {
  RAZORPAY: {
    label: "Razorpay",
    script: {
      src: "https://checkout.razorpay.com/v1/checkout.js",
    },
  },

  BRAINTREE: {
    label: "Braintree",
  },
  DUMMY: {
    label: "Dummy",
  },
  STRIPE: {
    label: "Stripe",
  },
  ADYEN: {
    label: "Adyen",
    script: {
      src:
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.js",
      integrity:
        "sha384-wG2z9zSQo61EIvyXmiFCo+zB3y0ZB4hsrXVcANmpP8HLthjoQJQPBh7tZKJSV8jA",
      crossOrigin: "anonymous",
    },
    style: {
      src:
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.css",
      integrity:
        "sha384-8ofgICZZ/k5cC5N7xegqFZOA73H9RQ7H13439JfAZW8Gj3qjuKL2isaTD3GMIhDE",
      crossOrigin: "anonymous",
    },
  },
};
export const STATIC_PAGES = [
  {
    label: "About",
    url: generatePageUrl("about"),
  },
];
export const TRACKING_PAGE_URL = "https://www.bluedart.com/tracking";

export enum Social_Media {
  instagram = "instagram",
  facebook = "facebook",
  whatsapp = "whatsapp",
  twitter = "twitter",
}

export const SOCIAL_MEDIA = [
  {
    ariaLabel: Social_Media.instagram,
    href: "https://www.instagram.com/lotus_organicsplus/",
    path: require("images/instagram-icon.svg"),
  },
];

export const SHARE_INFO = [
  {
    ariaLabel: Social_Media.twitter,
    href: "https://www.instagram.com/lotus_organicsplus/",
    path: require("images/instagram-icon.svg"),
  },
  {
    ariaLabel: Social_Media.facebook,
    href: "https://www.instagram.com/lotus_organicsplus/",
    path: require("images/instagram-icon.svg"),
  },
  {
    ariaLabel: Social_Media.whatsapp,
    href: "https://www.instagram.com/lotus_organicsplus/",
    path: require("images/instagram-icon.svg"),
  },
];

export const CONTACT_US_OPTIONS = [
  { value: "Order Related", label: "Order Related" },
  { value: "Payment/Refund Related", label: "Payment/Refund Related" },
  {
    value: "Product Information Related",
    label: "Product Information Related",
  },
  { value: "Other", label: "Other" },
];

export const CONTACT_INFO = [
  {
    text: "care@lotus-organics.com",
    path: require("images/mail_24px.png"),
    url: "mailto:care@lotus-organics.com",
    title: "care@lotus-organics.com",
  },
  {
    text: "+91-8810685354",
    path: require("images/call_24px.png"),
    url: "tel:+91-8810685354",
    title: "+91-8810685354",
  },
];

export const CLIENT_ADDRESS = {
  addressLine1: "Satiya Nutraceuticals Pvt. Ltd",
  addressLine2: "Building No B3 G2, ASMEETA TEXTILE PARK",
  addressLine3: "KALYAN-BHIWANDI RD KON, BHIWANDI",
  city: "Thane",
  state: "Maharashtra",
  pincode: "421311",
};

export const META_DEFAULTS = {
  custom: [],
  description:
    "WOW Life Science Products do not contain any synthetic fillers, binders, flavours, or additives.",
  image: process.env.REACT_APP_LOGO || process.env.NEXT_PUBLIC_LOGO,
  title: process.env.REACT_APP_META_TITLE || process.env.NEXT_PUBLIC_META_TITLE,
  type: "website",
  url: "wow.health",
  name:
    process.env.REACT_APP_CLIENT_NAME || process.env.NEXT_PUBLIC_CLIENT_NAME,
};

export enum CheckoutStep {
  Address = 1,
  Payment,
  PaymentConfirm,
}
export const CHECKOUT_STEPS = [
  {
    index: 0,
    link: "/checkout/address",
    name: "Address",
    nextActionName: "Continue to Shipping",
    step: CheckoutStep.Address,
  },
  {
    index: 1,
    link: "/checkout/payment",
    name: "Payment",
    nextActionName: "Continue to Review",
    step: CheckoutStep.Payment,
  },
  {
    index: 1,
    link: "/order-placed",
    name: "Payment Confirm",
    nextActionName: "Continue to Review",
    step: CheckoutStep.PaymentConfirm,
  },
];

export const PRODUCT_URL_VARAINT: any = 1;

export const ENABLE_GA4 = false;

export const PAYMENT_GATEWAY = "mirumee.payments.razorpay"; //mirumee.payments.cashfree
/*

export async function getStaticPaths() {
  // const { data } = await client.query<
  //   ProductNameAndIdForPaths,
  //   ProductNameAndIdForPathsVariables
  // >({
  //   query: productNameAndIdForPaths,
  //   variables: { first: 100 },
  // });
  // console.log("data getStaticPaths", data);

  try {
    let pageInfo: ProductNameAndIdForPaths_products_pageInfo;
    let currentPaths = [];
    let paths = [];

    do {
      const { data, errors } = await client.query<
        ProductNameAndIdForPaths,
        ProductNameAndIdForPathsVariables
      >({
        query: productNameAndIdForPaths,
        variables: {
          first: 100,
          after: pageInfo?.endCursor || "",
          filter: {
            isPublished: true,
          },
        },
      });
      console.log("errors", errors);
      pageInfo = data.products.pageInfo;
      currentPaths = data.products.edges.map(product => ({
        params: {
          name: slugify(product.node.name),
          slug: `${getDBIdFromGraphqlId(product.node.id, "Product")}`,
        },
      }));
      console.count("currentPaths getStaticPaths");

      paths = [...paths, ...currentPaths];
    } while (pageInfo.hasNextPage);

    console.log("paths getStaticPaths", paths);
    return {
      paths,
      fallback: false,
    };
  } catch (e) {
    console.log("----------------------------------------error", e);
    return {
      paths: [],
      fallback: false,
    };
  }
}
*/
