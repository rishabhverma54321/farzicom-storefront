import {
  useAuthState,
  useCartState,
  useCheckout,
  useCheckoutState,
} from "@saleor/sdk";
import React, { useEffect, useState } from "react";
import {
  BANNER_JOURNEY_INFO,
  createTaxedPriceFromAmount,
  getItemCategoriesFromAttribute,
  getItemJourneyInfo,
  getItemListName,
  getMetadataValue,
  getOrderCountByPhone,
  getPrices,
  getVariantAttributes,
  isMember,
  parseJson,
  serverSideLog,
} from "@utils/misc";
import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";
import Layout from "@temp/components/Layout";
import {
  CheckoutBottomSection,
  OrderSummary,
  PaymentSummary,
} from "@temp/pages/checkout/CustomCheckouts/CheckoutVariants/CheckoutV3/CheckoutV3";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { CLIENT_INITIALS, ENABLE_GA4, META_DEFAULTS } from "Themes/config";
import makeClevertap from "Themes/lib/makeClevertap.js";
import clevertapEvents from "Themes/lib/clevertapEvents.js";
import { getUtmData } from "@temp/core/utils";
import { useRouter } from "next/router";
import Head from "next/head";
import { ProductHeader } from "@components/molecules/ProductHeader";
import MemoKnefPlix from "@components/atoms/SvgIcons/knefSvgIcon";
import { ShopMetaContext } from "@temp/pages/_app.page";
import { CachedImage } from "@components/molecules/CachedImage";
import Link from "next/link";
import Image from "next/image";
import FaqAccordian from "@components/organisms/NewFaqAccordian";
import {
  OrderByToken,
  OrderDetailsByTokenQuery,
  TypedSurveyCreate,
  TypedSurveyFill,
} from "@temp/pages/order-placed/queries";
import MemoChevronDownNew from "@components/atoms/SvgIcons/ChevronDownNew";
import { TypedSectionWithoutChildrenQuery } from "@temp/themes/plixlifefc/views/Home/queries";
import Card from "@components/molecules/Card";
import { useWindowWidth } from "@hooks/useWindowWidth";
import styles from "./index.module.scss";
import * as S from "./styles";
import { purchaseTrack } from "farzicom-ui/lib/Track/purchaseTrack";
import { getDBIdFromGraphqlId } from "@utils/core";
import { client } from "@temp/client";
import Script from "next/script";
import { addTags } from "@components/organisms/ProductSubscriptionPopup/queries";
import { CircularProgress } from "@mui/material";

const defaultPrice = {
  __typename: "TaxedMoney",
  gross: {
    __typename: "Money",
    amount: 0,
    currency: "INR",
  },
  net: {
    __typename: "Money",
    amount: 0,
    currency: "INR",
  },
};

// Upsell and Blog section

const BlogAndUpsellsection = () => {
  const handleDots = (dots: any) => {
    dots = dots.slice(0, 3);
    return <ul>{dots}</ul>;
  };
  return (
    <>
      <TypedSectionWithoutChildrenQuery
        variables={{
          firstPage: 1,
          name: "Thank you upsell",
        }}
      >
        {({ data, loading }) => {
          const collection2Section =
            data?.section?.edges.length && data?.section?.edges[0];
          const collection2SectionButton =
            collection2Section &&
            getMetadataValue(collection2Section.node?.metadata, "blogdata") &&
            parseJson(
              getMetadataValue(collection2Section.node?.metadata, "blogdata")
            );
          if (collection2Section && collection2SectionButton) {
            return (
              <>
                <div className=" ">
                  <div className="">
                    <div className="related_product">
                      <div className="left_top">
                        <CachedImage
                          className="wb_sideicon"
                          url="https://plixlifefc-media.farziengineer.co/hosted/Vector_21_1-bdba0e23aa68.png"
                          isNextImage
                          nextImageLayout="fill"
                          nextImageObjectFit="contain"
                        />
                      </div>
                      <div className="bottom_right">
                        <CachedImage
                          className="wb_sideicon"
                          url="https://plixlifefc-media.farziengineer.co/hosted/papaya-0d2dd5758c22.png"
                          isNextImage
                          nextImageLayout="fill"
                          nextImageObjectFit="contain"
                        />
                      </div>
                      <div className="inner_product">
                        <p className="heading">Customers also purchased...</p>
                        {collection2Section.node.collections.edges[0] && (
                          <MemoizedProductList
                            products={collection2Section.node.collections.edges[0].node.products.edges.map(
                              product => product.node
                            )}
                            isCarousel
                            carouselProps={{
                              arrows: false,
                              dots: false,
                              infinite: true,
                            }}
                            mobileCarouselProps={{
                              arrows: false,
                              dots: true,
                            }}
                            slidesOnDesktop={4}
                            slidesOnTab={2}
                            slidesOnMobile={2}
                            productCardClassname="cart-others-add-btn"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Blog Section start */}
                {collection2SectionButton &&
                  collection2SectionButton.length > 0 && (
                    <div className="helpful_blog">
                      <div className="right_top">
                        <CachedImage
                          className="wb_sideicon"
                          url="https://plixlifefc-media.farziengineer.co/hosted/banana-a7a7c7fe8d7c.png"
                          isNextImage
                          nextImageLayout="fill"
                          nextImageObjectFit="contain"
                        />
                      </div>
                      <div className="inner_blog">
                        <h3>Helpful Blogs</h3>
                        <div className="blog_wrapper">
                          {collection2SectionButton.length > 0 &&
                            collection2SectionButton.map(post => (
                              <a href={post.url}>
                                <div className="blog">
                                  <div className="blog_feature_image">
                                    <img src={post?.imgurl} />
                                  </div>
                                  <div className="tags">{post?.tags}</div>
                                  <div className="title">{post?.title}</div>
                                  <div className="date">
                                    {post?.publish_date}
                                  </div>
                                </div>
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                {/* Blog Section end */}
              </>
            );
          }
          return <> </>;
        }}
      </TypedSectionWithoutChildrenQuery>
    </>
  );
};
const getPaymentMethodText = gateway => {
  switch (gateway) {
    case "mirumee.payments.juspay":
      return "Juspay (Cards, UPI, NetBanking, Wallets)";
    case "mirumee.payments.razorpay":
      return "Razorpay (Cards, UPI, NetBanking, Wallets)";
    case "mirumee.payments.dummy":
      return "Cash on Delivery";
    default:
      return "";
  }
};

const ThankYouPageV2 = ({ headerAndFooterData, shopMeta }) => {
  const checkoutState = useCheckoutState();
  const { getWalletAmount } = useCheckout();
  const { user } = useAuthState();
  const { items } = useCartState();

  const [recentOrder, setRecentOrder] = useState({
    ...checkoutState?.recentOrder,
    lines: processDiscountedItems(checkoutState?.recentOrder),
  });
  const [orderDetailsLoading, setOrderDetailsLoading] = useState(true);

  const googleMerchantReview =
    getMetadataValue(
      shopMeta?.data?.shopmeta?.edges[0]?.node?.metadata,
      "google_merchant_review"
    ) &&
    parseJson(
      getMetadataValue(
        shopMeta?.data?.shopmeta?.edges[0]?.node?.metadata,
        "google_merchant_review"
      )
    );

  const couponDiscountString = getMetadataValue(
    recentOrder?.metadata,
    "coupon_discount",
    0
  );


  // ht shopmeta
  const ShopMetaContextValue = React.useContext(ShopMetaContext);
  const orderfaq =
    getMetadataValue(ShopMetaContextValue, "orderfaq") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "orderfaq"));

  const swopStoreConfig =
    getMetadataValue(ShopMetaContextValue, "swop_store_config") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "swop_store_config"));

  const [faqExpanded, setFaqExpanded] = useState(false);
  const [activestep, setactivestep] = useState(1);
  const [showCustomerInfo, setshowCustomerInfo] = useState(true);
  const [showfaq, setshowfaq] = useState(true);
  const [instagrampost, setinstagrampost] = useState([]);
  const [rating, setRating] = useState("1");
  const [feedback, setfeedback] = useState("");
  const [updatedOrderNumber, setUpdatedOrderNumber] = useState("");
  const [orderExtraData, setOrderExtraData] = useState(null);
  const [userOrderCount, setuserOrderCount] = useState(null);

  const metaDataArranged =
    recentOrder?.lines?.["0"]?.variant?.product?.metadata?.length > 0
      ? recentOrder?.lines?.["0"]?.variant?.product?.metadata
      : [];

  const relatedProducts =
    metaDataArranged &&
    getMetadataValue(metaDataArranged, "related_products") &&
    parseJson(getMetadataValue(metaDataArranged, "related_products"));

  const mrp =
    recentOrder?.lines?.reduce((total, curr) => {
      const variantMetadata = curr?.variant.metadata;

      const listPrice = getMetadataValue(variantMetadata, "listPrice");

      if (curr?.quantity) {
        if (listPrice && typeof listPrice === "number") {
          total += listPrice * curr.quantity;
        } else if (listPrice && typeof listPrice === "string") {
          total += parseFloat(listPrice) * curr.quantity;
        } else {
          total +=
            (curr?.variant.pricing?.priceUndiscounted?.gross.amount ||
              curr?.variant.pricing?.price?.gross.amount ||
              0) * curr.quantity;
        }
      } else {
        total += 0;
      }

      return total;
    }, 0) || 0;

  const netPrice =
    recentOrder?.lines?.reduce((total, curr) => {
      if (curr?.quantity) {
        const netPriceAmount =
          (curr?.variant.pricing?.priceUndiscounted?.gross.amount ||
            curr?.variant.pricing?.price?.gross.amount ||
            0) * curr.quantity;
        total += netPriceAmount;
      } else {
        total += 0;
      }
      return total;
    }, 0) || 0;

  const itemDiscount = mrp - netPrice;

  const prepaidDiscountString = getMetadataValue(
    recentOrder?.metadata,
    "prepaid_discount",
    0
  );

  const discountString = getMetadataValue(recentOrder?.metadata, "discount", 0);

  const codChargeString = getMetadataValue(
    recentOrder?.metadata,
    "cod_charges",
    0
  );

  const cashbackDiscountString = getMetadataValue(
    recentOrder?.metadata,
    "cashback_discount",
    0
  );

  const shopifyOrderNumber = getMetadataValue(
    recentOrder?.metadata,
    "shopify_order_name",
    recentOrder?.number
  );

  const cashbackRecieveString = getMetadataValue(
    recentOrder?.metadata,
    "cashback_amount",
    0
  );

  const otherDiscount =
    Number(discountString) -
    Number(codChargeString) -
    Number(cashbackDiscountString) -
    Number(prepaidDiscountString);

  const cashbackRecieve = {
    amount: parseFloat(cashbackRecieveString),
  };

  const paymentSummary = {
    mrp: createTaxedPriceFromAmount(mrp || 0) || defaultPrice,
    netPrice: createTaxedPriceFromAmount(netPrice || 0) || defaultPrice,
    itemDiscount: createTaxedPriceFromAmount(itemDiscount || 0) || defaultPrice,
    couponDiscount:
      createTaxedPriceFromAmount(parseFloat(couponDiscountString) || 0) ||
      defaultPrice,
    prepaidDiscount:
      createTaxedPriceFromAmount(
        parseFloat(`-${codChargeString}`) ||
        parseFloat(prepaidDiscountString) ||
        0
      ) || defaultPrice,
    cashbackDiscount:
      createTaxedPriceFromAmount(parseFloat(cashbackDiscountString) || 0) ||
      defaultPrice,
    subtotalPrice: recentOrder?.subtotal,
    totalPrice: recentOrder?.total,
    cashbackRecieve,
  };

  const router = useRouter();

  function processDiscountedItems(order) {
    // Creating free products from line for BXGY part
    const updatedItems = Array.isArray(order?.lines) ? [...order?.lines] : [];
    const orderMeta = order?.metadata || [];
    const discountedItemsBXGY =
      orderMeta &&
        getMetadataValue(orderMeta, "discounted_items") &&
        typeof parseJson(getMetadataValue(orderMeta, "discounted_items")) ===
        "string"
        ? parseJson(
          getMetadataValue(orderMeta, "discounted_items")?.replace(/'/g, '"')
        )
        : parseJson(getMetadataValue(orderMeta, "discounted_items"));
    if (discountedItemsBXGY?.length) {
      discountedItemsBXGY.forEach(item => {
        const itemIndex = updatedItems.findIndex(
          line => line?.variant?.sku === item?.sku
        );
        if (itemIndex !== -1) {
          const currentItem = updatedItems[itemIndex];
          if (currentItem?.quantity - item?.quantity > 0) {
            updatedItems[itemIndex] = {
              ...currentItem,
              newQuantity: currentItem?.quantity - item?.quantity,
            };
            updatedItems.push({
              ...currentItem,
              quantity: item?.quantity,
              productType: "free",
            });
          } else {
            // First, remove the current item and then push it again to the list because free items need to be at the end
            updatedItems.splice(itemIndex, 1);
            updatedItems.push({
              ...currentItem,
              productType: "free",
            });
          }
        }
      });
    }

    return updatedItems;
  };
  const getUserOrderCount = async phone => {
    if (phone) {
      const orderCount = await getOrderCountByPhone(phone);
      setuserOrderCount(orderCount);
    }
  };

  // For weight loss quiz tag type
  const handleProductTag = async (recentOrder) => {
    const weightLossDataList = recentOrder?.lines
    const recentOrderID = recentOrder?.id

    const filterData = Array.isArray(weightLossDataList) && weightLossDataList.reduce((acc, item) => {
      const variantMetaData = item?.variant?.metadata || [];
      const variantConfigJson = getMetadataValue(variantMetaData, "variant_config") &&
          parseJson(getMetadataValue(variantMetaData, "variant_config"));
      
      if (variantConfigJson) {
        if (variantConfigJson.is_weight_bundle_quiz === true) {
          acc.push('bundle');
        }
        if (variantConfigJson.is_weight_quiz === true) {
          acc.push('single');
        }
      }
    
      return acc;
    }, []);

    const productTag = Array.isArray(filterData) ? [...new Set(filterData)] : []
    
    if(recentOrderID && productTag.length > 0){
       await client.query({
        query: addTags,
        variables: {
          id: recentOrderID,
          input: productTag,
        },
        fetchPolicy: "no-cache",
      });
    }
  }
  useEffect(() => {
    if (recentOrder && recentOrder?.id) {
      if (recentOrder?.shippingAddress?.phone) {
        getUserOrderCount(recentOrder?.shippingAddress?.phone);
      }
      // (window.dataLayer || []).push({ ecommerce: null });
      (window.dataLayer || []).push({
        event: "Purchase",
        ecommerce: {
          purchase: {
            actionField: {
              id: shopifyOrderNumber,
              affliation: "Website",
              revenue: recentOrder.total?.gross?.amount,
              couponAmount: couponDiscountString,
              totalTax: recentOrder?.total?.tax?.amount,
              cartSubtotal: recentOrder?.subtotal?.gross?.amount,
            },
            userDetails: {
              firstName: recentOrder.shippingAddress?.firstName,
              lastName: recentOrder.shippingAddress?.lastName,
              email: recentOrder?.userEmail,
              phone: recentOrder.shippingAddress?.phone,
              address: {
                city: recentOrder.shippingAddress?.city,
                postalCode: recentOrder.shippingAddress?.postalCode,
              },
            },
            products: recentOrder?.lines
              ?.filter((item: any) => {
                if (
                  item?.variant?.product?.category?.slug !==
                  "free-gift-products" &&
                  item?.variant?.product?.category?.slug !==
                  "freebies-with-product"
                ) {
                  return true;
                }
                return false;
              })
              .map((item: any) => {
                return {
                  name: item?.variant?.product?.name,
                  price: item?.variant?.pricing?.price?.net?.amount,
                  quantity: item?.quantity,
                  id: item?.variant?.sku,
                };
              }),
          },
        },
      });
      const bannerJourneyInfo =
      (localStorage.getItem(BANNER_JOURNEY_INFO) &&
        JSON.parse(localStorage.getItem(BANNER_JOURNEY_INFO))) ||
      [];
      const purchaseDataLayerItems = recentOrder?.lines
        ?.filter((item: any) => {
          if (item?.variant?.product?.category?.slug !== "free-gift-products") {
            return true;
          }
          return false;
        })
        .map((item: any) => {
          const itemJourneyInfo = getItemJourneyInfo(item?.variant?.id);
          const { discountAmount } = getPrices(
            item?.variant?.product,
            false,
            item?.variant
          );
          const productVariantName = getVariantAttributes(
            "Flavors",
            item?.variant
          );
          const categories = getItemCategoriesFromAttribute(item?.variant);
          const isMonthIncluded = categories?.sizeCategory2
            ?.toLowerCase()
            ?.includes("month");
          let parentProductsAndAddedFrom;
          const productAddedFromHomeBanner = bannerJourneyInfo?.find(list=> list?.variantId === item?.variant?.id)
          try {
            const parentProductVariantId = itemJourneyInfo?.parentProducts[0]
              ? getDBIdFromGraphqlId(
                itemJourneyInfo?.parentProducts[0],
                "Product"
              )
              : "";
            parentProductsAndAddedFrom =
              parentProductVariantId && itemJourneyInfo?.addedFrom
                ? `${parentProductVariantId},${itemJourneyInfo?.addedFrom}`
                : "NA";
          } catch (error) {
            console.log(
              "Error in purchase event item journey evaluation",
              error
            );
          }
          return {
            item_name: item?.variant?.product?.name,
            item_id: item.variant?.product?.id
              ? getDBIdFromGraphqlId(item.variant?.product?.id, "Product")
              : null,
            price: item?.variant?.pricing?.price?.net?.amount,
            item_brand:
              META_DEFAULTS.name === "plixlifefc"
                ? "plixlife"
                : META_DEFAULTS.name,
            quantity: item?.quantity,
            discount: discountAmount || "NA",
            item_variant: productVariantName,
            currency: "INR",
            item_category: item?.variant?.product?.category?.name,
            coupon: recentOrder?.voucher?.code || "NA",
            item_category2: isMonthIncluded
              ? categories?.sizeCategory2 || "NA"
              : "NA",
            item_category3: categories?.sizeCategory1 || "NA",
            item_category4: isMonthIncluded
              ? "NA"
              : categories?.sizeCategory2 || "NA",
            item_category5: parentProductsAndAddedFrom || "NA",
            item_from_banner:
              (productAddedFromHomeBanner &&
                productAddedFromHomeBanner?.bannerName) ||
              "NA",
            item_list_name: itemJourneyInfo?.addedFrom || "NA",
            item_list_id: itemJourneyInfo?.productListId || "NA",
          };
        });

      window.dataLayer = window.dataLayer || [];
      if (window.dataLayer) {
        window.dataLayer.push({ ecommerce: null });
      }
      if (shopifyOrderNumber) {
        window.dataLayer.push({
          event: "purchase",
          user_ID: user?.id
            ? getDBIdFromGraphqlId(user?.id, "User")
            : undefined,
          user_type: user ? "logged_in" : "logged_out", // Guest user or Loggedin user
          membership_status: isMember(user)
            ? "plix_club_member"
            : "not_a_plix_club_member",
          ecommerce: {
            currency: recentOrder?.subtotal?.gross?.currency,
            value: recentOrder?.total?.gross?.amount,
            tax: recentOrder?.total?.tax?.amount,
            coupon: recentOrder?.voucher?.code || "NA",
            shipping: recentOrder?.shippingPrice?.gross.amount,
            // affiliation: "Website",
            transaction_id: shopifyOrderNumber,
            items: purchaseDataLayerItems,
          },
          // order_value: recentOrder.total?.gross?.amount,
          // order_id: shopifyOrderNumber,
          enhanced_conversion_data: {
            email: recentOrder?.userEmail,
          },
        });
      }

      window.dataLayer.push({
        event: "purchase_ec",
        order_value: recentOrder.total?.gross?.amount,
        order_id: shopifyOrderNumber,
        enhanced_conversion_data: {
          email: recentOrder?.userEmail,
        },
      });

      // if (localStorage.getItem("purchaseEventpassed") != "true" && ENABLE_GA4) {
      //   ReactGA.event("purchase", {
      //     currency: recentOrder?.subtotal?.gross?.currency,
      //     value: recentOrder?.total?.gross?.amount,
      //     tax: recentOrder?.total?.tax?.amount,
      //     shipping: recentOrder?.shippingPrice?.gross.amount,
      //     affiliation: "Website",
      //     transaction_id: shopifyOrderNumber,
      //     items: purchaseDataLayerItems,
      //   });
      //   localStorage.setItem("purchaseEventPassed", "true");
      // }

      // Remove product skus from user property after checkout complete
      const clevertap = makeClevertap();
      if (clevertap && typeof clevertap.removeValueForKey === "function") {
        clevertap?.removeValueForKey("variant_sku");
      }

      if (clevertapEvents.walletBalanceApplied.enable) {
        const clevertap = makeClevertap();

        clevertap.event.push(clevertapEvents.walletBalanceApplied.value, {
          platform: window.screen.width < 520 ? "msite" : "website",
          customerEmail: user ? user.email : "",
          paymentMethod:
            recentOrder?.paymentStatus === "NOT_CHARGED" ? "COD" : "Online",
        });
      }

      // if (clevertapEvents.charged.enable) {
      //   console.log(
      //     "clevertapEvents.charged.enable 2",
      //     clevertapEvents.charged.enable
      //   );
      //   chargedClevertap();
      // }

      if (googleMerchantReview?.enable) {
        const getDeliveryDate = () => {
          // 4 days after order date
          const days = 4;
          const date = new Date();
          const updatedDate = new Date(
            date.getTime() + days * 24 * 60 * 60 * 1000
          );

          return updatedDate.toISOString()?.split("T")[0]; // YYYY-MM-DD
        };

        try {
          window.renderOptIn = function () {
            window.gapi.load("surveyoptin", function () {
              window.gapi.surveyoptin.render({
                // REQUIRED FIELDS
                merchant_id: 631989338,
                order_id: recentOrder?.id,
                email: recentOrder?.userEmail,
                delivery_country: "IN",
                estimated_delivery_date: getDeliveryDate(),

                // OPTIONAL FIELDS
                // products: [{ gtin: "GTIN1" }, { gtin: "GTIN2" }],
              });
            });
          };
        } catch (e) {
          console.error("Google merchant custome review error:", e);
        }
      }
      if (recentOrder?.lines) {
        try {
          localStorage.removeItem("lines_journey_info");
          localStorage.removeItem(BANNER_JOURNEY_INFO);
        } catch (err) {
          console.log("Error in removing lines_journey_info");
        }
      }
      try {
        const cartItems = recentOrder?.lines?.map((item: any) => {
          return {
            item_name: item?.variant?.product?.name,
            item_id: item?.variant?.product?.id,
            variant: item?.variant?.name,
            price: item?.variant?.pricing?.price?.net?.amount,
            currency: item?.variant?.pricing?.price?.net?.currency,
            quantity: item?.quantity,
          };
        });

        purchaseTrack(ShopMetaContextValue, {
          transaction_id: recentOrder.number,
          order_amount: recentOrder.total?.gross?.amount,
          tax: recentOrder?.total?.tax?.amount,
          shipping_charge: recentOrder?.shippingPrice?.gross.amount,
          currency: recentOrder?.subtotal?.gross?.currency,
          items: cartItems,
        });
      } catch (err) {
        console.log("fc-collect error", err);
      }
      handleProductTag(recentOrder)
    }
  }, [JSON.stringify(recentOrder)]);

  const getRecentOrderWithToken = async (token: string | string[]) => {
    try {
      const res = await client.query({
        query: OrderByToken,
        variables: {
          token,
        },
        fetchPolicy: "no-cache",
      });
      // if (res?.data?.orderByToken?.user?.orders?.totalCount) {
      //   setuserOrderCount(res?.data?.orderByToken?.user?.orders?.totalCount);
      // }
      if (res?.data?.orderByToken) {
        const recentOrder = res?.data?.orderByToken;
        setRecentOrder({
          ...recentOrder,
          lines: processDiscountedItems(recentOrder),
        });
        return res?.data?.orderByToken;
      }
    } catch (err) {
      console.log("error >>>", err);
    } finally {
      setOrderDetailsLoading(false);
    }
  };

  const fetchOrderDetails = (recentOrder: any) => {
    if (recentOrder?.token) {
      const OrderDetailsCallInterval = setInterval(() => {
        OrderDetailsQuery();
      }, 1000);

      const timeoutId = setTimeout(() => {
        setUpdatedOrderNumber(recentOrder?.number);
        clearInterval(OrderDetailsCallInterval);
      }, 10000);

      const OrderDetailsQuery = async () => {
        try {
          const { data } = await client.query({
            query: OrderDetailsByTokenQuery,
            variables: {
              token: recentOrder?.token,
            },
            fetchPolicy: "no-cache",
          });
          if (data) {
            const metadata = data?.orderByToken?.metadata;
            const extradata = data?.orderByToken?.extraData;
            const isOrderOnRisk =
              Array.isArray(data?.orderByToken?.tags) &&
              data?.orderByToken?.tags?.some(
                item =>
                  item?.name === "high_risk" ||
                  item?.name === "med_risk" ||
                  item?.name === "RTO_risk"
              );

            const gokwikOrderId =
              getMetadataValue(extradata, "gokwik_oid") &&
              parseJson(getMetadataValue(extradata, "gokwik_oid"));
            if (gokwikOrderId) {
              setOrderExtraData(extradata);
            }
            if (isOrderOnRisk) {
              setUpdatedOrderNumber(data?.orderByToken?.number);
              if (gokwikOrderId) {
                clearInterval(OrderDetailsCallInterval);
                clearTimeout(timeoutId);
              }
            } else {
              const shopifyOrderNumber =
                getMetadataValue(metadata, "shopify_order_name") &&
                parseJson(getMetadataValue(metadata, "shopify_order_name"));

              if (shopifyOrderNumber) {
                setUpdatedOrderNumber(shopifyOrderNumber);
                clearInterval(OrderDetailsCallInterval);
                clearTimeout(timeoutId);
              }
            }
          }
        } catch (err) {
          console.log("error while fetching order details", err);
        }
      };

      return () => {
        clearInterval(OrderDetailsCallInterval);
        clearTimeout(timeoutId);
      };
    }
  };

  // useEffect(() => {
  //   fetchOrderDetails(recentOrder);
  // }, []);

  useEffect(() => {
    if (!recentOrder?.number && router?.query?.token) {
      getRecentOrderWithToken(router?.query?.token).then(order => {
        fetchOrderDetails(order);
      });
    } else if (router.isReady && !router?.query?.token) {
      setOrderDetailsLoading(false);
      fetchOrderDetails(recentOrder);
    }
  }, [router?.query?.token]);

  useEffect(() => {
    try {
      if (userOrderCount !== null && recentOrder) {
        if (window.dataLayer) {
          window.dataLayer.push({ ecommerce: null });
        }
        const ecommerceData = {
          purchase: {
            actionField: {
              id: shopifyOrderNumber,
              affliation: "Website",
              revenue: recentOrder.total?.gross?.amount,
              couponAmount: couponDiscountString,
              totalTax: recentOrder?.total?.tax?.amount,
              cartSubtotal: recentOrder?.subtotal?.gross?.amount,
            },
            userDetails: {
              firstName: recentOrder.shippingAddress?.firstName,
              lastName: recentOrder.shippingAddress?.lastName,
              email: recentOrder?.userEmail,
              phone: recentOrder.shippingAddress?.phone,
              address: {
                city: recentOrder.shippingAddress?.city,
                postalCode: recentOrder.shippingAddress?.postalCode,
              },
            },
            products: recentOrder?.lines
              ?.filter((item: any) => {
                if (
                  item?.variant?.product?.category?.slug !==
                  "free-gift-products" &&
                  item?.variant?.product?.category?.slug !==
                  "freebies-with-product"
                ) {
                  return true;
                }
                return false;
              })
              .map((item: any) => {
                return {
                  name: item?.variant?.product?.name,
                  price: item?.variant?.pricing?.price?.net?.amount,
                  quantity: item?.quantity,
                  id: item?.variant?.sku,
                };
              }),
          },
        };
        if (userOrderCount === 1) {
          (window.dataLayer || []).push({
            event: "first_time_purchase",
            ecommerce: ecommerceData,
          });
        } else if (userOrderCount > 1) {
          (window.dataLayer || []).push({
            event: "repeat_purchase",
            ecommerce: ecommerceData,
          });
        }
      }
    } catch (error) {
      console.log("Error in orderCount event ---> ", error);
    }
  }, [userOrderCount]);

  // useEffect(() => {
  //   if (orderExtraData && recentOrder?.paymentStatus === "NOT_CHARGED") {
  //     const goKwikOrderId =
  //       getMetadataValue(orderExtraData, "gokwik_oid") &&
  //       parseJson(getMetadataValue(orderExtraData, "gokwik_oid"));
  //     const goKwikmoid =
  //       getMetadataValue(orderExtraData, "moid") &&
  //       parseJson(getMetadataValue(orderExtraData, "moid"));
  //     const goKwikmid =
  //       getMetadataValue(orderExtraData, "mid") &&
  //       parseJson(getMetadataValue(orderExtraData, "mid"));
  //     const goKwikRequestId =
  //       getMetadataValue(orderExtraData, "gokwik_request_id") &&
  //       parseJson(getMetadataValue(orderExtraData, "gokwik_request_id"));
  //     let merchantInfo = {
  //       order_type: "cod",
  //       mid: goKwikmid,
  //       moid: goKwikmoid,
  //       environment: "production",
  //       request_id: goKwikRequestId,
  //       gokwik_oid: goKwikOrderId,
  //       css: {
  //         primaryColor: "#f08080",
  //         secondaryColor: "#ffa07a",
  //       },
  //       showModal: false,
  //     };
  //     console.log("gokwiksdk", gokwikSdk);
  //     if (typeof gokwikSdk !== "undefined") {
  //       gokwikSdk.initPayment(merchantInfo);
  //     }
  //   }
  // }, [orderExtraData]);

  // Get instagram post
  const getInstagramPost = () => {
    fetch(`/api/instagram_post`, {
      method: "POST",
    })
      .then(res => res.json())
      .then(result => {
        setinstagrampost(result?.post?.data);
      })
      .catch(err => {
        console.log("error", err);
        serverSideLog(err);
      });
  };

  useEffect(() => {
    try {
      getInstagramPost();
    } catch (e) {
      serverSideLog(e);
    }
  }, []);

  const chargedClevertap = async () => {
    const clevertap = makeClevertap();

    const order = recentOrder;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const todayDate = `${mm} + / + ${dd} + / + ${yyyy}`;
    const utm_data = getUtmData(router?.pathname);

    const clevertapItems =
      items && items.length
        ? items.map(item => ({
          Title: item?.variant?.product.name,
          Quantity: item?.quantity,
          Vendor: META_DEFAULTS.name,
          Price: item?.variant?.pricing?.price?.gross.amount,
          Sku: item?.variant?.sku,
        }))
        : [];

    const ctp = {
      platform: window.screen.width < 520 ? "msite" : "website",
      timeStamp: Date.now(),
      clickTarget: document.location.href,
      customerEmail: order?.userEmail || user?.email || "",
      EmailAddress: order?.userEmail || user?.email || "",
      clickSource: utm_data,
      customerPhone:
        order?.shippingAddress?.phone || user?.defaultBillingAddress?.phone,
      phone_no:
        order?.shippingAddress?.phone || user?.defaultBillingAddress?.phone,
      items: clevertapItems,
      orderAddressPin: order?.shippingAddress?.postalCode,
      orderAddressCity: order?.shippingAddress?.city,
      "Order ID": CLIENT_INITIALS
        ? `${CLIENT_INITIALS}-${shopifyOrderNumber || order?.number}`
        : shopifyOrderNumber || order?.number,

      cartAmount: order.total.gross.amount,
      shippingAmount: order?.shippingPrice?.net?.amount,
      purchaseDate: todayDate,
      paymentMethod: order?.paymentStatus === "NOT_CHARGED" ? "COD" : "Online",
      purchaseAmount: order?.total?.net?.amount,
      couponCodeAppliedName: "couponName",
      couponCodeAppliedAmount: parseFloat(couponDiscountString) || 0,
      couponCodeApplied: !!(parseFloat(couponDiscountString) || 0),
      walletBalance: 0,
      "Cashback Used": parseFloat(cashbackDiscountString) || 0,
      "Cashback Recieved": cashbackRecieve.amount,
    };

    clevertap.event.push(clevertapEvents.charged.value, ctp);
  };

  if (recentOrder && recentOrder.id) {
    const shippingAddress = (
      <>
        {`${recentOrder?.shippingAddress?.firstName} ${recentOrder?.shippingAddress?.lastName}`}
        <br />
        <br />
        {`${recentOrder?.shippingAddress?.streetAddress1}`}
        <br />
        {recentOrder?.shippingAddress?.streetAddress2 && (
          <>
            {`${recentOrder?.shippingAddress.streetAddress2}`},
            <br />
          </>
        )}
        {`${recentOrder?.shippingAddress?.city}, ${recentOrder?.shippingAddress?.countryArea} - ${recentOrder?.shippingAddress?.postalCode}`}
        <br />
        <br />
        {`${recentOrder?.shippingAddress?.phone}`}
      </>
    );

    const paymentMethodBasedOnGateway =
      recentOrder?.payments &&
      Array.isArray(recentOrder.payments) &&
      recentOrder?.payments[0]?.gateway &&
      getPaymentMethodText(recentOrder?.payments.at(-1).gateway);

    const paymentMethod =
      paymentMethodBasedOnGateway ||
      (recentOrder?.paymentStatus === "NOT_CHARGED" ? (
        <>Cash on Delivery</>
      ) : (
        <>Razorpay (Cards, UPI, NetBanking, Wallets)</>
      ));

    const emojisdata = [
      "https://plixlifefc-media.farziengineer.co/hosted/exerience_emoji1-0c11ca607d79-7b73c2746407.png",
      "https://plixlifefc-media.farziengineer.co/hosted/exerience_emoji2-28a1c82f7e1d-414e549b6d6c.png",
      "https://plixlifefc-media.farziengineer.co/hosted/exerience_emoji3-77d5211724de-ad4523ec5030.png",
      "https://plixlifefc-media.farziengineer.co/hosted/exerience_emoji4-8fc2bca7db2d-ac43db7c125d.png",
      "https://plixlifefc-media.farziengineer.co/hosted/exerience_emoji5-e82653fddbbc-b8d03a26ea0f.png",
    ];

    const swopStore = `
    var _iPromoBannerObj = function(params) {
    this.htmlElementId = 'promocode-element-container';
    this.params = params;
      
    this.lS=function(s){ var head=document.head || document.getElementsByTagName("head" )[0] || document.documentElement; var 	script=document.createElement("script");script.async="async";script.src=s;head.insertBefore(script,head.firstChild);},
    this.gc=function(){return document.getElementById(this.htmlElementId);};
    this.start=function() { var r=[];for(e in this.params){if(typeof(e)==='string'){r.push(e+'='+encodeURIComponent(this.params[e]));}}r.push('method=main');r.push('jsc=iPromoCpnObj');this.lS(('https:'==document.location.protocol ? 'https://':'http://')+'swopstore.com/wrapper.php?'+r.join('&'));}
    };
    var iPromoCpnObj = null;

    var params = {
      '_shopId': '${swopStoreConfig?.shopId}',
      '_bannerId': '${swopStoreConfig?.bannerId}',
      '_customerFirstName': '${recentOrder?.shippingAddress?.firstName}',
      '_customerLastName': '${recentOrder?.shippingAddress?.lastName}',
      '_customerEmail': '${recentOrder?.userEmail}',
      '_customerPhone': '${recentOrder?.shippingAddress?.phone}',
      '_orderId': '${recentOrder?.id}', 
      '_orderValue': '${recentOrder?.total?.gross?.amount}',
      '_orderCurrency': '${recentOrder?.total?.gross?.currency}',
      '_usedPromoCode': '${recentOrder?.voucher?.code || ""}'
      };
      iPromoCpnObj = new _iPromoBannerObj(params); iPromoCpnObj.start();
    `;
    return (
      <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
        {swopStoreConfig?.enable ? (
          <Script
            id="swopstore"
            dangerouslySetInnerHTML={{
              __html: swopStore,
            }}
          />
        ) : (
          <></>
        )}
        {googleMerchantReview?.enable ? (
          <Head>
            <script
              src="https://apis.google.com/js/platform.js?onload=renderOptIn"
              async
              defer
            />
          </Head>
        ) : (
          <></>
        )}
        <>
          <S.TopContainer>
            <div className="ThankYouDesign">
              <CachedImage
                className=""
                url="https://plixlifefc-media.farziengineer.co/hosted/thankyou_banner-9fe76c199cc2.png"
                isNextImage
                nextImageLayout="fill"
                nextImageObjectFit="contain"
              />
            </div>

            <div className="ThankYouDesign2">
              <CachedImage
                className=""
                url="https://plixlifefc-media.farziengineer.co/hosted/thankyou_left_image-7d6720b94e33-5d6d284a4e5a.png"
                isNextImage
                nextImageLayout="fill"
                nextImageObjectFit="contain"
              />
            </div>

            <div className="ThankYouDesign3">
              <CachedImage
                className=""
                url="https://plixlifefc-media.farziengineer.co/hosted/thankyou_right_image-228a177a2bd7-bf33cd66c50b.png"
                isNextImage
                nextImageLayout="fill"
                nextImageObjectFit="contain"
              />
            </div>

            <S.ThankYouHeadText>
              Your order is placed successfully!
            </S.ThankYouHeadText>
            <div className="thank_you_subheader">
              We're currently fulfilling your order and it will be shipped
              within 24 hours.
            </div>
            <S.OrderNumberContainer>
              <S.OrderNumber>
                <span
                  className="order-number__label"
                  style={{ fontWeight: "bold" }}
                >
                  Order Number :{" "}
                </span>
                <span
                  className={`${!updatedOrderNumber ? styles.order_number_skeleton : ""
                    } order-number`}
                  style={{ fontWeight: "bold" }}
                >
                  {updatedOrderNumber}
                </span>
                <img
                  src="/plixlifefc/assets/PlixThankYou4.svg"
                  className="ThankYouDesign4"
                  alt=""
                />
              </S.OrderNumber>
            </S.OrderNumberContainer>
            {activestep == 1 && (
              <div className="customer_rating_experience">
                <div className="rating_subtitle">
                  Rate your shopping experience
                </div>
                <div className="rating_emojis">
                  {emojisdata &&
                    emojisdata.map((emoji, i: any) => (
                      <div
                        onClick={() => {
                          setRating(`${i + 1}`);
                          setactivestep(2);
                        }}
                      >
                        <CachedImage
                          className=""
                          url={emoji}
                          isNextImage={true}
                          nextImageLayout="fill"
                          nextImageObjectFit="contain"
                          key={i}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
            {activestep == 2 && recentOrder && (
              <div className="customer_rating_experience">
                <div className="rating_subtitle">
                  How can we improve your experience further?
                </div>
                <form>
                  <textarea
                    placeholder="Write your feedback"
                    onChange={e => setfeedback(e.target.value)}
                  />
                  <TypedSurveyCreate onCompleted={a => JSON.stringify(a)}>
                    {mutation => {
                      return (
                        <TypedSurveyFill>
                          {suveyfillmutation => {
                            return (
                              <>
                                <div className="submit">
                                  <a
                                    onClick={() =>
                                      mutation({
                                        variables: {
                                          input: {
                                            name: "Buying Experience",
                                          },
                                          questions: [
                                            {
                                              text: "Rate your experience",
                                              order: 1,
                                              required: true,
                                            },
                                            {
                                              text: "give your feedback",
                                              order: 2,
                                              required: true,
                                            },
                                          ],
                                          orderIds: [recentOrder.id],
                                        },
                                      })
                                        .then(res => {
                                          const surveyCreatedata =
                                            res?.data?.surveyCreate;
                                          const surveyfilleddata = {
                                            answers: [
                                              {
                                                question:
                                                  surveyCreatedata?.surveys[0]
                                                    ?.questions?.edges[0]?.node
                                                    ?.id,
                                                answer: rating,
                                              },
                                              {
                                                question:
                                                  surveyCreatedata?.surveys[0]
                                                    ?.questions?.edges[1]?.node
                                                    ?.id,
                                                answer: feedback,
                                              },
                                            ],
                                            surveyHash:
                                              surveyCreatedata?.surveys[0]
                                                ?.surveyHash,
                                            surveyId:
                                              surveyCreatedata?.surveys[0]?.id,
                                            orderId: recentOrder.id,
                                          };
                                          suveyfillmutation({
                                            variables: surveyfilleddata,
                                          })
                                            .then(res => setactivestep(3))
                                            .catch(err =>
                                              console.log(
                                                "survey fill error",
                                                err
                                              )
                                            );
                                        })
                                        .catch(err =>
                                          console.log(
                                            "survey create error",
                                            err
                                          )
                                        )
                                    }
                                  >
                                    submit
                                  </a>
                                </div>
                              </>
                            );
                          }}
                        </TypedSurveyFill>
                      );
                    }}
                  </TypedSurveyCreate>
                </form>
              </div>
            )}
            {activestep == 3 && (
              <div className="customer_rating_experience">
                <div className="step3">
                  <CachedImage
                    className=""
                    url="https://plixlifefc-media.farziengineer.co/hosted/step3_icon-028cc5ea7fd0-d197415a4fa6.png"
                    isNextImage
                    nextImageLayout="fill"
                    nextImageObjectFit="contain"
                  />
                  <p>Thank you for your feedback!</p>
                </div>
              </div>
            )}
            <div className="continue_shoping">
              <a href="/">Continue Shopping</a>
            </div>
          </S.TopContainer>

          <div className={styles.mainContainer}>
            <div className={styles.secondContainer}>
              <div className={styles.secondContainer_new}>
                {swopStoreConfig?.enable ? (
                  <div
                    className={styles.swop_store}
                    id="promocode-element-container"
                  />
                ) : (
                  <></>
                )}
                <div className={styles.orderSummaryContainer}>
                  <div className={styles.orderSummary}>
                    <OrderSummary externalItems={recentOrder.lines} />
                  </div>
                  <div className={styles.paymentSummaryContainerWrapper}>
                    <PaymentSummary
                      paymentSummary={paymentSummary}
                      toggle
                      defaultShowPaceOrderButton={false}
                      otherDiscount={otherDiscount}
                      isThankyoupage
                    />
                  </div>
                </div>
              </div>
              <div className={styles.customerInfoContainerWrapper}>
                <div className={styles.customerInfoContainer}>
                  <div className={styles.customerInfoContainerHeader}>
                    <p>Customer Information</p>
                    <div className="chevron_down">
                      <div
                        className={styles.chevron_down_arrow}
                        onClick={() => setshowCustomerInfo(!showCustomerInfo)}
                      >
                        <MemoChevronDownNew />
                      </div>
                      {/* <img src="/plixlifefc/assets/chevron-down.png" onClick={()=>setshowCustomerInfo(!showCustomerInfo)}/> */}
                    </div>
                  </div>
                  <hr className={styles.hr} />
                  {showCustomerInfo && (
                    <>
                      <div className={styles.customerInfoInnerContainer}>
                        <div className={styles.detailBlock}>
                          <div className={styles.lightText}>
                            Contact Information
                          </div>
                          <div className={styles.boldText}>
                            {recentOrder?.userEmail}
                          </div>
                          <hr className={styles.hr} />
                        </div>
                      </div>

                      <div className={styles.customerInfoInnerContainer}>
                        <div className={styles.detailBlock}>
                          <div className={styles.lightText}>
                            Shipping Address
                          </div>
                          <div className={styles.boldText}>
                            {shippingAddress}
                          </div>
                          <hr className={styles.hr} />
                        </div>
                      </div>

                      <div className={styles.customerInfoInnerContainer}>
                        <div className={styles.detailBlock}>
                          <div className={styles.lightText}>
                            Billing Address
                          </div>
                          <div className={styles.boldText}>
                            {shippingAddress}
                          </div>
                          <hr className={styles.hr} />
                        </div>
                      </div>

                      <div className={styles.customerInfoInnerContainer}>
                        <div>
                          <div className={styles.lightText}>Payment Method</div>
                          <div className={styles.boldText}>{paymentMethod}</div>
                        </div>
                      </div>
                      <div className={styles.customerInfoInnerContainer}>
                          <div className={styles.qrCode}>
                            <div className={styles.qrImage}>
                              <CachedImage
                                className=""
                                url="https://plixlifefc-media.farziengineer.co/hosted/App_QR_1-634ff14a2440.png"
                                isNextImage
                                nextImageLayout="fixed" 
                                nextImageObjectFit="contain"
                                width={233} 
                                height={233}
                              />
                              </div>
                              <div className={styles.scan}>Scan this QR to download the App now</div>
                            </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
        <CheckoutBottomSection />
        {/* FAQ Section start */}
        <>
          {orderfaq && (
            <div className="faq-section container">
              <div className="flex items-center">
                <h3>FAQs</h3>
                {/* <MemoKnefPlix fontSize="100px" /> */}
                <div className="chevron_down faq_accordian">
                  <div className="" onClick={() => setshowfaq(!showfaq)}>
                    <MemoChevronDownNew />
                  </div>
                </div>
              </div>
              {showfaq && (
                <FaqAccordian data={orderfaq} accordianClass="accordian" />
              )}
            </div>
          )}
        </>
        {/* FAQ Section start */}
        {/* section break */}
        <div className="section_break" />
        {/* blog and upsell section */}
        <BlogAndUpsellsection />
        {/* pledge tree section */}
        <div className={styles.pledge_tree}>
          <div className={styles.inner_pledge_tree}>
            <div className={styles.pledge_icon}>
              <CachedImage
                url="https://plixlifefc-media.farziengineer.co/hosted/pledgeTree-400bf537cfea-d10e12b32a06.png"
                isNextImage
                nextImageLayout="fill"
                nextImageObjectFit="contain"
              />
            </div>
            <div className={styles.content}>
              <h3>Pledge A Tree!</h3>
              <p>
                For every order placed, we plant more trees! With your help, we
                can now achieve our goal of planting millions of trees in the
                next couple of years.{" "}
              </p>
              <a href="/page/pledge-a-tree">Learn More</a>
            </div>
          </div>
        </div>
        {/* instagram post */}
        {instagrampost?.length > 0 && (
          <div className="instagram_post">
            <div className="inner_instagram">
              <h2>Follow Us!</h2>
              <div className="image_wrapper">
                {instagrampost.length > 0 &&
                  Array.isArray(instagrampost) &&
                  instagrampost.map(i =>
                    i?.media_type == "IMAGE" ? (
                      <div className="instapost">
                        <CachedImage
                          url={i?.media_url}
                          isNextImage
                          nextImageLayout="fill"
                          nextImageObjectFit="contain"
                        />
                      </div>
                    ) : (
                      <div className="instapost">
                        <video src={i?.media_url} />
                      </div>
                    )
                  )}
              </div>
              <div className="social_link">
                <div className="instagram_link">
                  <Image
                    className="social_media_icon"
                    src="https://plixlifefc-media.farziengineer.co/hosted/original_insta_icon-2dd8fa98f9ce.png"
                    width={30}
                    height={30}
                  />
                  <Link legacyBehavior href="https://www.instagram.com/myplixlife/">
                    <a>
                      <p>Follow on Instagram</p>
                    </a>
                  </Link>
                </div>
                <div className="YouTube_link">
                  <Image
                    className="social_media_icon"
                    src="https://plixlifefc-media.farziengineer.co/hosted/original_youtube_icon-105ba7b204a4.png"
                    width={30}
                    height={30}
                  />
                  <Link legacyBehavior href="https://www.youtube.com/channel/UCxjpQEVVTxs1P8i9x4KVoKQ">
                    <a>
                      <p>Subscribe on Youtube</p>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="contact">
                <span>Need Help?</span>
                <Link legacyBehavior href="/page/contact-us">
                  <a>Contact Us</a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Layout>
    );
  }

  return (
    <Layout headerAndFooterData={headerAndFooterData} shopMeta={shopMeta}>
      {orderDetailsLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress
            color="inherit"
            style={{
              margin: "auto",
              marginTop: "8px",
              width: "44px",
            }}
          />
        </div>
      ) : (
        <ContinueShoppingNext />
      )}
    </Layout>
  );
};

export default React.memo(ThankYouPageV2);
