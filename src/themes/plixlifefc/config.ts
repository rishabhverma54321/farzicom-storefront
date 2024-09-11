/* eslint-disable global-require */

import { BannerType } from "@globalTypes";
import { generatePageUrl } from "@temp/core/utils";
import { ProductsList_banners_edges } from "./views/Home/gqlTypes/ProductsList";

export const showCashback =
  process.env.REACT_APP_SHOW_CASHBACK === "true" ||
  process.env.NEXT_PUBLIC_SHOW_CASHBACK === "true";
export const isSubscriptionEnable = false;

export const MAIN_LOGO =
  process.env.REACT_APP_LOGO ||
  process.env.NEXT_PUBLIC_LOGO ||
  "https://plixlifefc-media.farziengineer.co/hosted/logo-mobile-25d5565988d9.png";
export const MOBILE_SLIDER_LOGO =
  "https://plixlifefc-media.farziengineer.co/hosted/Group_34963-4a95edc52d2f.svg";
export const orderHistoryListUrl = "/order-history/";
export const blogUrl = "/blog/";
export const trackOrderUrl = "/page/track-your-order/";
export const ourStoryUrl = "/page/our-story";
export const walletUrl = "/wallet/";
export const termsConditions = "/page/terms-conditions";
export const privacyPolicy = "/page/privacy-policy";
export const contactUsUrl = "/page/contact-us";

export const CLIENT =
  process.env.REACT_APP_CLIENT || process.env.NEXT_PUBLIC_CLIENT;
export const { API_URI } = process.env;
export const CLIENT_INITIALS = "";

export const NO_PHOTO_PLACEHOLDER =
  "https://plixlifefc-media.farziengineer.co/hosted/no-photo-b9149c792286.png";

export const tvcBuild = (image, icon, ByobPopUp) => {
  const script = `  if (!sessionStorage.getItem("tvc_build_popup")) {
      sessionStorage.setItem("tvc_build_popup", "true");
    }; window.onload = setTimeout(function () {  if (sessionStorage.getItem("tvc_build_popup") == "true") {    if (!document.querySelector("#tvc_membership_popup")) {      if (       document.location.href === "https://www.plixlife.com/" ||        document.location.href ===          "https://plixlifefcstage-nh.farziengineer.co/" ||        document.location.href ===          "https://plixlifeprestage-nh.farziengineer.co/" || document.location.href ===          "http://localhost:3000/"      ) {        var div = document.createElement("div");        document.body.style.overflowY = "hidden";        div.style.cssText = 'position: absolute;  bottom: 0px;  width:100vw;  z-index: 3;  height: 100Vh;  ';        div.setAttribute("id", "tvc_membership_popup");        div.innerHTML = '<style> @media screen and (max-width:420px){.main-image{width:90vw}} @media screen and (min-width:420px) and (max-width: 920px){.main-image{width:50vw; min-width: 380px;}} @media screen and (min-width: 920px ){.main-image{width:30vw}} .container-popup {  position: relative;  position: fixed;  top: 0;  right: 0;  bottom: 0;  left: 0;  background-color: rgba(0,0,0,0.5)}.close{  top: 12px;  position: absolute; padding:0.5rem;  right: 13px;  display: flex;  justify-content: center;  align-items: center;}.tvc_member_buttons button{  border-radius: 5px;  font-weight: bold;  padding: 14px;}.main-popup{  position: fixed;  width: 100vw;  height: 100vh;  display: flex;  align-items: center;  justify-content: center;}.tvc_member_buttons{  position: absolute;  bottom: 0px;  display: flex;  gap: 5px;  width: 94%;  margin: 10px 12px;  flex-direction: column;}</style>  <div class="container-popup">  <div class="main-popup">    <div style="position:relative">  <div class="close"> <img              src=${
      icon ||
      "https://firebasestorage.googleapis.com/v0/b/tatvic-plixlife.appspot.com/o/Group%20218.png?alt=media&token=9ad66858-5e12-47da-8724-4ddbb96e14d6"
    } width=17px/>             </div>      <div class="main-img">          <img class="main-image"   src=${
    image ||
    "https://plixlifefc-media.farziengineer.co/hosted/BYOB_Creative-df9b93418768.jpg"
  }>                                    </div>   <a href=${
    ByobPopUp?.popup_url || "https://www.plixlife.com/page/build-your-box"
  } style="position: absolute;  bottom: 19px;  padding: 24px 50%;  opacity: 0;"><button class="tvc_benefits" style="position: absolute;  bottom: 0px;  left: 0;  padding: 11px 42%;  opacity: 0;">Shop Now</button></a>  </div>   </div></div>  ';        document          .querySelector(".brandLogosSection-container")          .insertAdjacentElement("afterend", div);        document          .querySelector(".tvc_benefits")          .addEventListener("click", function () {            sessionStorage.setItem("tvc_build_popup", "false");            document.querySelector("#tvc_membership_popup").remove();            document.body.style.cssText = 'opacity:1; background:transparent';          });        document          .querySelector(".container-popup a")          .addEventListener("click", function () {            dataLayer.push({              event: "shop_now_popup_cta_click_ab",              eventCategory: "byob_cta_ab",              eventAction: "shop_now_popup_cta_click_ab",            });          });        document.querySelector(".close").addEventListener("click", function () {          document.querySelector("#tvc_membership_popup").remove();          sessionStorage.setItem("tvc_build_popup", "false");          document.body.style.cssText = 'opacity:1; background:transparent';          document.body.style.overflowY = "auto";        });      }    }  }}, 15000);if (  document.querySelector(".overlayFarzicom--plixlifefcCart") ||  document.querySelector(".side-nav-plix")) {  document.querySelector(".tvc_build").style.display = "none";  if (document.querySelector("#tvc_membership_popup")) {    document.querySelector("#tvc_membership_popup").style.display = "none";  }} else {  document.querySelector(".tvc_build").style.display = "flex";  if (document.querySelector("#tvc_membership_popup")) {    document.querySelector("#tvc_membership_popup").style.display = "block";  }}`;
  return script;
};

export const primaryBanner: ProductsList_banners_edges[] = [
  {
    node: {
      id: "Q3VzdG9tQmFubmVyVHlwZToy",
      text: "test",
      type: BannerType.BANNERTYPES_HOME_PAGE,
      relatedId: null,
      link: "/",
      name: "test",
      created: "2021-11-02T07:01:41.577014+00:00",
      imageUrl:
        "https://plixlifefc.imgix.net/banners/e9b5ce8979c74381a18a8d06301cb3e0.png?auto=format&sharp=20&ixlib=react-9.3.0&w=3038",
      imageMobileUrl:
        "https://plixlifefc.imgix.net/banners/b24c699230274b5ebcfd93f3d5873d2f.png?auto=format&sharp=20&ixlib=react-9.3.0&w=180&dpr=3",
      position: 1,
      isEnabled: true,
      __typename: "CustomBannerType",
    },
    __typename: "CustomBannerTypeEdge",
  },
];

export const IMAGE_CDN = "imgix";
export const IMAGE_CDN_PROVIDERS = {
  imgix: {
    useCDN: true,
    mediaBucketURL: "plixlifefc-media.farziengineer.co",
    cdnSourceURL: "images.plixlife.com",
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

export const CLICKPOST_TRACKING_PAGE_URL = "/page/track-your-order";

export enum Social_Media {
  instagram = "instagram",
  facebook = "facebook",
  whatsapp = "whatsapp",
  twitter = "twitter",
}

export const SOCIAL_MEDIA = [
  {
    ariaLabel: Social_Media.instagram,
    href: "https://www.instagram.com/swa.artisanalsyrups/",
    path: require("images/instagram-icon.svg"),
  },
];

export const SHARE_INFO = [
  {
    ariaLabel: Social_Media.twitter,
    href: "https://www.facebook.com/swaartisanalsyrups",
    path: require("images/instagram-icon.svg"),
  },
  {
    ariaLabel: Social_Media.facebook,
    href: "https://www.instagram.com/swa.artisanalsyrups/",
    path: require("images/instagram-icon.svg"),
  },
  {
    ariaLabel: Social_Media.whatsapp,
    href: "https://www.facebook.com/swaartisanalsyrups",
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
    text: "hello@plixlife.com",
    path: require("images/mail_24px.png"),
    url: "mailto:hello@plixlife.com",
    title: "hello@plixlife.com",
  },
  {
    text: "",
    path: require("images/call_24px.png"),
    url: "tel:+91-8810685354",
    title: "+91-8810685354",
  },
];

export const CLIENT_ADDRESS = {
  addressLine1: "Satiya Nutraceuticals Pvt. Ltd",
  addressLine2: " Building No. B3 G2, Asmeeta Textile Park,",
  addressLine3: "Kalyan-Bhiwandi Road Kon, Bhiwandi,",
  city: "Thane",
  state: "Maharashtra,",
  pincode: "421311",
};

export const META_DEFAULTS = {
  custom: [],
  description:
    "Looking for plant-based products? Buy Plant Protein Powder, Tablets & Capsules Online for Men & Women in India at PlixLife. We have a wide range of plant based vegan products for weight, skin, hair & wellness.",
  image: process.env.REACT_APP_LOGO || process.env.NEXT_PUBLIC_LOGO,
  title: process.env.NEXT_PUBLIC_META_TITLE || process.env.REACT_APP_META_TITLE,
  type: "website",
  // url: window.location.origin,
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

export const PRODUCT_URL_VARAINT: any = 5;

export const ENABLE_GA4 = true;

export const SEARCHTAP_CONFIG = {
  name: "Plixlife",
  URL: "https://www.plixlife.com/",
  appID: "SWAYIF5CZ6X1B7XJ1Z235CX2",
  readToken: "CH6NYTF6S12X18G762DZ5LZA",
  collectionID: "LEXGI93DKVXXIVEA124U97FM",
  trendingSearchID: "8UCVDZCCN822K7ZR9GIPIACY",
  fields: [
    "average_rating",
    "thumbnail",
    "category",
    "currency",
    "default_variant",
    "price",
    "discounted_price",
    "in-stock",
    "is_published",
    "id",
    "is_available",
    "is_available_for_purchase",
    "metadata",
    "minimal_variant_price",
    "minimal_variant_price_amount",
    "name",
    "price_amount",
    "slug",
    "tags",
    "variants",
    "visible_in_listings",
    "weight",
  ],
  searchFields: ["*"],
  currencySymbol: "₹",
  textFacets: ["collections", "type", "solution", "ingredient"],
  numericFacets: {
    discounted_price: [
      {
        min: 100,
        max: 500,
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 500,
        max: 1000,
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 1000,
        max: 5000,
        minInclusive: true,
        maxInclusive: true,
      },
    ],
    reviews_average: [
      {
        min: 4,
        max: 5,
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 3,
        max: 5,
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 2,
        max: 5,
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 1,
        max: 5,
        minInclusive: true,
        maxInclusive: true,
      },
    ],
  },
  resultCount: 24,
  facetCount: 500,
};

// Juspay Configs
export const JUSPAY_MERCHANT_ID = "plixlife";
export const JUSPAY_CARD_ENCODING_KEY = "0B712F96279413C9167B36D9627403";
export const JUSPAY_CARD_ENCODING_VERSION = "2017-04-26";
export const PREV_CHECKOUT_TOTAL = "prev_checkout_total";

// Otpless Configs
export const OTPLESS_WHATSAPP_ID_KEY = "otpless_waId";

//Truecaller default Config
export const TRUECALLER_APP_ID = "0N2g848538c53e7a34bb194cc92717d93edb7";
export const TRUECALLER_APP_NAME = "PlixlifeTestNew";

export const CUSTOM_PRODUCT_METADATA_FIELDS = [
  "product_card_attributes",
  "average_rating",
  "product_config"
];
export const CUSTOM_SHOPMETA_FIELDS = [
  "available_offers",
  "available_offers_new",
  "baseUrl",
  "bookmark",
  "byob_popup_script",
  "card_header_text",
  "cart_config",
  "cart_config_v2",
  "checkout_exit_popup",
  "checkout_testimonial_section",
  "cod_charge_product",
  "cross_sell_config",
  "default_checkout_variant",
  "discount_banner",
  "external_sitemap_url",
  "farzicom_api_url",
  "fc_session_tracking",
  "fctrack_info",
  "firework_config",
  "footertextstripdata",
  "google_merchant_review",
  "hideNavItem",
  "image_sitemap_url",
  "login_autofill",
  "logo",
  "manifestData",
  "membership_v3",
  "meta__product__related_products",
  "money_back",
  "navbar_couponlist",
  "offer_policies",
  "offer_progress_bar",
  "bx_gy_offer_progress_bar",
  "offer_progress_bar_new",
  "orderfaq",
  "personalised_box_config",
  "personalised_box_config_new",
  "pledge_a_tree",
  "pwa_meta",
  "recalculation_toggle",
  "robotData",
  "scripts_meta",
  "searchtap_config",
  "searchtap_filters",
  "show_cashback_text",
  "show_cashback_text_new",
  "siteDescription",
  "siteTitle",
  "sw_version",
  "truecaller_config",
  "upsellSection",
  "variantPickerById",
  "gift_box_config",
  "wallet_disabled",
  "atc_recalculation",
  "gokwik_config",
  "cart_banner",
  "announcement_bar",
  "country_list",
  "proceed_pay_logo"
];

export const CUSTOM_PDP_METADATA_FIELDS = [
  "flavour_icon",
  "listPrice",
  "variant_box_bottom_text",
  "variant_box_text",
  "per_unit_text",
  "imageOfVarinat",
  "variant_page_data",
  "customLabel",
  "whenTouse_new",
  "upsell_product",
  "upsell_headerText",
  "product_name",
  "product_combos",
  "product_testimonial",
  "pdp_product_combos",
  "variant_meta_image",
  "freebie_includes",
  "variant_redirection",
  "concern_ui",
  "sachet_price",
  "variant_config"
];

export const CUSTUM_REVIEW_PDP_METADATA_FIELDS = ["html_content_head_review"];

export const MEMBERSHIP_TAGS = ["CLASSIC", "ELITE", "ULTIMATE"];

//Wizzy Config

export const WIZZY_SEARCH_FACETS = [
  {
    key: "categories",
  },
  {
    key: "finalPrice",
  },
  {
    key: "discount",
  },
  {
    key: "sellingPrice",
  },
  {
    key: "price",
  },
  {
    key: "avgRatings",
  },
  {
    key: "solution",
  },
  {
    key: "ingredient",
  },
  {
    key: "product_type",
  },
];

export const WIZZY_SEARCH_FILTERS = [
  "sellingPrice",
  "solution",
  "ingredient",
  "product_type",
];

export const WIZZY_SEARCH_CONFIGS = {
  minQueryLength: 1,
  productsCount: 50,
};

export const FILTERS_ORDER = ["product_type", "ingredient", "solution"];
