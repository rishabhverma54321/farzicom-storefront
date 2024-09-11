import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useCheckout, useAuth, useCart } from "@saleor/sdk";
import { CLIENT } from "Themes/config";
import {
  TypedCreateSurveyMutation,
  TypedFillSurveyMutation,
} from "@app/pages/ThankYouPage/queries";
import { CartSummary } from "@components/organisms/CartSummary";
import { ImageCard } from "@components/atoms/ImageCard";
import { Button } from "@components/atoms/Button";
import { InstagramPost } from "@components/atoms/InstagramPost";
import OrderConfirmed from "@components/atoms/SvgIcons/OrderConfirmed";

import { BuyingExperience } from "@components/molecules/BuyingExperience";
import { checkoutMessages } from "@temp/intl";
import Media from "react-media";
import { mediumScreen } from "@styles/constants";
import { getMetadataValue } from "@utils/misc";
import { clients } from "../../../../../gqlTypes/customGlobalTypes";
import BackButton from "./assets/BackButton.svg";
import ThankYouTick from "./assets/ThankYouTick.svg";
import FreeShipping from "./assets/FreeShipping.svg";
import CODAvailable from "./assets/CODAvailable.svg";
import PlixCheckout1 from "./assets/PlixCheckout1.svg";
import PlixCheckout2 from "./assets/PlixCheckout2.svg";
import PlixCheckout3 from "./assets/PlixCheckout3.svg";
import PlixThankYou1 from "./assets/PlixThankYou1.svg";
import PlixThankYou2 from "./assets/PlixThankYou2.svg";
import PlixThankYou3 from "./assets/PlixThankYou3.svg";
import PlixThankYou4 from "./assets/PlixThankYou4.svg";
import PlixThankYou5 from "./assets/PlixThankYou5.svg";
import PlixThankYou6 from "./assets/PlixThankYou6.svg";

import * as S from "./styles";
import { IProps } from "./types";

const ThankYouIkkai: React.FC<IProps> = ({
  orderNumber,
  continueShopping,
  mutation,
  lines,
  user,
  order,
  itemDiscount,
  mrp,
  offerDiscount,
  viewOrder,
}: IProps) => {
  // const { getUser } = useAuth();
  const { cashbackRecieve } = useCart();
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  // useEffect(() => {
  //   getUser();
  // }, []);
  const { createCheckout } = useCheckout();

  useEffect(() => {
    createCheckout().then(res => {
      if (res.dataError) {
        createCheckout();
      }
    });
  }, []);

  if (CLIENT === clients.PLIXLIFEFC || CLIENT === clients.BODY_FIRST) {
    const products = lines?.map(({ id, variant, totalPrice, quantity }) => ({
      id: variant?.product?.id || "",
      name: variant.product?.name || "",
      price: {
        gross: {
          amount: totalPrice?.gross.amount || 0,
          currency: totalPrice?.gross.currency || "",
        },
        net: {
          amount: totalPrice?.net.amount || 0,
          currency: totalPrice?.net.currency || "",
        },
      },
      quantity,
      sku: variant.sku || "",
      thumbnail: {
        alt: variant.product?.thumbnail?.alt || undefined,
        url: variant.product?.thumbnail?.url,
        url2x: variant.product?.thumbnail2x?.url,
      },
      categorySlug: variant.product?.category?.slug,
      weight: variant.product?.weight,
      metadata: variant.product?.metadata,
      variant,
    }));
    const shippingAddress = (
      <>
        {`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}
        <br />
        <br />
        {`${order.shippingAddress.streetAddress1}`}
        <br />
        {order.shippingAddress.streetAddress2 && (
          <>
            {`${order.shippingAddress.streetAddress2}`},
            <br />
          </>
        )}
        {`${order.shippingAddress.city}, ${order.shippingAddress.countryArea} - ${order.shippingAddress.postalCode}`}
        <br />
        <br />
        {`${order.shippingAddress.phone}`}
      </>
    );
    const email = order.userEmail;
    const paymentMethod =
      order.paymentStatus === "NOT_CHARGED" ? (
        <>Cash on Delivery</>
      ) : (
        <>Razorpay (Cards, UPI, NetBanking, Wallets)</>
      );

    const { metadata } = order;
    const shopifyOrderNumber =
      metadata && getMetadataValue(metadata, "shopify_order_name");

    const totalPrice = order.total;
    const subtotalPriceAmount = order.metadata.filter(
      node => node.key === "subtotal"
    )[0]?.value;
    const shippingPrice = order.shippingPrice.gross.amount;
    const subtotalPrice = {
      gross: { amount: parseFloat(subtotalPriceAmount), currency: "INR" },
      net: { amount: parseFloat(subtotalPriceAmount), currency: "INR" },
    };
    const shippingTaxedPrice = {
      gross: { amount: parseFloat(shippingPrice), currency: "INR" },
      net: { amount: parseFloat(shippingPrice), currency: "INR" },
    };
    const couponDiscountAmount = order.metadata.filter(
      node => node.key === "coupon_discount"
    )[0]?.value;
    const couponDiscount = {
      gross: { amount: parseFloat(couponDiscountAmount), currency: "INR" },
      net: { amount: parseFloat(couponDiscountAmount), currency: "INR" },
    };
    const prepaidDiscountAmount = order.metadata.filter(
      node => node.key === "prepaid_discount"
    )[0]?.value;
    const prepaidDiscount = {
      gross: { amount: parseFloat(prepaidDiscountAmount), currency: "INR" },
      net: { amount: parseFloat(prepaidDiscountAmount), currency: "INR" },
    };
    const cashbackDiscountAmount = order.metadata.filter(
      node => node.key === "cashback_discount"
    )[0]?.value;
    const cashbackDiscount = {
      gross: { amount: parseFloat(cashbackDiscountAmount), currency: "INR" },
      net: { amount: parseFloat(cashbackDiscountAmount), currency: "INR" },
    };
    const offerDiscountToPass = {
      gross: { amount: offerDiscount?.amount || 0, currency: "INR" },
      net: { amount: offerDiscount?.amount || 0, currency: "INR" },
    };
    const itemDiscountToPass = {
      gross: { amount: itemDiscount?.amount || 0, currency: "INR" },
      net: { amount: itemDiscount?.amount || 0, currency: "INR" },
    };
    const mrpToPass = {
      gross: { amount: mrp?.amount || 0, currency: "INR" },
      net: { amount: mrp?.amount || 0, currency: "INR" },
    };
    return (
      <>
        <Media
          query={{ maxWidth: mediumScreen }}
          render={() => (
            <>
              <S.Container>
                <S.TopContainer>
                  <img
                    src={ThankYouTick}
                    style={{ marginBottom: "30px" }}
                    alt=""
                  />
                  <img src={PlixThankYou2} className="ThankYouDesign2" alt="" />
                  <img src={PlixThankYou3} className="ThankYouDesign3" alt="" />
                  <img src={PlixThankYou5} className="ThankYouDesign5" alt="" />

                  <S.ThankYouHeadText>
                    Your order placed Successfully.
                  </S.ThankYouHeadText>
                  <S.ThankYouHeadSubtext>
                    <img src={PlixThankYou1} className="ThankYouDesign1" />
                    <img src={PlixThankYou6} className="ThankYouDesign6" />
                    {order.paymentStatus === "NOT_CHARGED" &&
                      "You will receive a Whatsapp message with a prepaid payment link to avail 5% off your order"}
                  </S.ThankYouHeadSubtext>
                  <S.OrderNumberContainer
                    style={{ backgroundColor: "#eefdeb" }}
                  >
                    <S.OrderNumber
                      style={{ backgroundColor: "#eefdeb", fontWeight: "500" }}
                    >
                      <span
                        className="order-number__label"
                        style={{ fontWeight: "500" }}
                      >
                        Order Number{" "}
                      </span>
                      <span
                        className="order-number"
                        style={{ fontWeight: "500" }}
                      >
                        {shopifyOrderNumber || orderNumber}
                      </span>
                      <img
                        src={PlixThankYou4}
                        className="ThankYouDesign4"
                        alt=""
                      />
                    </S.OrderNumber>
                  </S.OrderNumberContainer>
                </S.TopContainer>

                <S.MainContainerHeader>
                  <button onClick={viewOrder}>
                    <img src={BackButton} />
                  </button>
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                    Order Summary
                  </h3>
                </S.MainContainerHeader>
                <div className="container">
                  <CartSummary
                    totalPrice={totalPrice}
                    shippingTaxedPrice={shippingTaxedPrice}
                    couponDiscount={couponDiscount}
                    subtotalPrice={subtotalPrice}
                    mrp={mrpToPass}
                    itemDiscount={itemDiscountToPass}
                    offerDiscount={offerDiscountToPass}
                    prepaidDiscount={prepaidDiscount}
                    cashbackDiscount={cashbackDiscount}
                    products={products}
                  />
                  <S.LeftSection>
                    <S.LeftSectionHeading>
                      Customer Information
                    </S.LeftSectionHeading>
                    <S.HR />
                    <S.LeftSubsection>
                      <S.LeftSectionSubheading>
                        Contact Information
                      </S.LeftSectionSubheading>
                      <S.LeftSectionText>{email}</S.LeftSectionText>
                      <S.HR />
                    </S.LeftSubsection>
                    <S.LeftSubsection>
                      <S.LeftSectionSubheading>
                        Shipping Address
                      </S.LeftSectionSubheading>
                      <S.LeftSectionText>{shippingAddress}</S.LeftSectionText>
                      <S.HR />
                    </S.LeftSubsection>
                    <S.LeftSubsection>
                      <S.LeftSectionSubheading>
                        Billing Address
                      </S.LeftSectionSubheading>
                      <S.LeftSectionText>{shippingAddress}</S.LeftSectionText>
                      <S.HR />
                    </S.LeftSubsection>
                    <S.LeftSubsection>
                      <S.LeftSectionSubheading>
                        Payment Method
                      </S.LeftSectionSubheading>
                      <S.LeftSectionText>{paymentMethod}</S.LeftSectionText>
                    </S.LeftSubsection>
                  </S.LeftSection>
                  <S.Buttons>
                    <Button
                      className="continue-shopping-btn"
                      testingContext="continueShoppingButton"
                      onClick={continueShopping}
                      color="primary"
                      size="sm"
                      toCapitalize={false}
                    >
                      <FormattedMessage
                        {...checkoutMessages.continueShoppingCapitalize}
                      />
                    </Button>
                  </S.Buttons>
                </div>
                <S.BottomSection>
                  <img src={PlixCheckout1} className="CheckoutBottomDesign1" />
                  <S.BottomCardSection>
                    <ImageCard
                      src={FreeShipping}
                      title="Free Shipping"
                      description="On orders above Rs.450"
                      className="checkoutBottomCard"
                    />
                    <ImageCard
                      src={CODAvailable}
                      title="COD Available"
                      description="No Minimum Order Value"
                      className="checkoutBottomCard"
                    />
                  </S.BottomCardSection>
                  <S.BottomContactSection>
                    <S.BottomContactTitle>
                      <img
                        src={PlixCheckout2}
                        className="CheckoutBottomDesign2"
                        alt=""
                      />
                    </S.BottomContactTitle>
                  </S.BottomContactSection>
                </S.BottomSection>
              </S.Container>
            </>
          )}
        />
        <Media
          query={{ minWidth: mediumScreen }}
          render={() => (
            <>
              <S.Container>
                <S.TopContainer>
                  <img
                    src={ThankYouTick}
                    style={{ marginBottom: "30px" }}
                    alt=""
                  />
                  <img src={PlixThankYou2} className="ThankYouDesign2" alt="" />
                  <img src={PlixThankYou3} className="ThankYouDesign3" alt="" />
                  <S.ThankYouHeadText>
                    Your order placed Successfully.
                  </S.ThankYouHeadText>
                  <S.ThankYouHeadSubtext>
                    <img src={PlixThankYou1} className="ThankYouDesign1" />
                    {order.paymentStatus === "NOT_CHARGED" &&
                      "You will receive a Whatsapp message with a prepaid payment link to avail 5% off your order"}
                  </S.ThankYouHeadSubtext>
                  <S.OrderNumberContainer
                    style={{ backgroundColor: "#eefdeb" }}
                  >
                    <S.OrderNumber
                      style={{ backgroundColor: "#eefdeb", fontWeight: "500" }}
                    >
                      <span
                        className="order-number__label"
                        style={{ fontWeight: "500" }}
                      >
                        Order Number{" "}
                      </span>
                      <span
                        className="order-number"
                        style={{ fontWeight: "500", marginLeft: "12px" }}
                      >
                        {shopifyOrderNumber || orderNumber}
                      </span>
                      <img
                        src={PlixThankYou4}
                        className="ThankYouDesign4"
                        alt=""
                      />
                    </S.OrderNumber>
                  </S.OrderNumberContainer>
                </S.TopContainer>
                <S.MainSection className="container">
                  <S.LeftSection>
                    <S.LeftSectionHeading>
                      Customer Information
                    </S.LeftSectionHeading>
                    <S.HR />
                    <S.LeftSubsection>
                      <S.LeftSectionSubheading>
                        Contact Information
                      </S.LeftSectionSubheading>
                      <S.LeftSectionText>{email}</S.LeftSectionText>
                      <S.HR />
                    </S.LeftSubsection>
                    <S.LeftSubsection>
                      <S.LeftSectionSubheading>
                        Shipping Address
                      </S.LeftSectionSubheading>
                      <S.LeftSectionText>{shippingAddress}</S.LeftSectionText>
                      <S.HR />
                    </S.LeftSubsection>
                    <S.LeftSubsection>
                      <S.LeftSectionSubheading>
                        Billing Address
                      </S.LeftSectionSubheading>
                      <S.LeftSectionText>{shippingAddress}</S.LeftSectionText>
                      <S.HR />
                    </S.LeftSubsection>
                    <S.LeftSubsection>
                      <S.LeftSectionSubheading>
                        Payment Method
                      </S.LeftSectionSubheading>
                      <S.LeftSectionText>{paymentMethod}</S.LeftSectionText>
                    </S.LeftSubsection>
                  </S.LeftSection>
                  <CartSummary
                    totalPrice={totalPrice}
                    shippingTaxedPrice={shippingTaxedPrice}
                    couponDiscount={couponDiscount}
                    subtotalPrice={subtotalPrice}
                    mrp={mrpToPass}
                    itemDiscount={itemDiscountToPass}
                    offerDiscount={offerDiscountToPass}
                    prepaidDiscount={prepaidDiscount}
                    cashbackDiscount={cashbackDiscount}
                    products={products}
                  />
                  <S.Buttons>
                    <Button
                      className="continue-shopping-btn"
                      testingContext="continueShoppingButton"
                      onClick={continueShopping}
                      color="primary"
                      size="sm"
                      toCapitalize={false}
                    >
                      <FormattedMessage
                        {...checkoutMessages.continueShoppingCapitalize}
                      />
                    </Button>
                  </S.Buttons>
                </S.MainSection>
                <S.BottomSection>
                  <img
                    src={PlixCheckout1}
                    className="CheckoutBottomDesign1"
                    alt=""
                  />
                  <S.BottomCardSection>
                    <ImageCard
                      src={FreeShipping}
                      title="Free Shipping"
                      description="On orders above Rs.450"
                      className="checkoutBottomCard"
                    />
                    <ImageCard
                      src={CODAvailable}
                      title="COD Available"
                      description="No Minimum Order Value"
                      className="checkoutBottomCard"
                    />
                    <img
                      src={PlixCheckout3}
                      className="CheckoutBottomDesign3"
                    />
                  </S.BottomCardSection>
                </S.BottomSection>
              </S.Container>
            </>
          )}
        />
      </>
    );
  }
  return (
    <>
      <S.Wrapper>
        <S.Confirmed>
          <OrderConfirmed />
          <S.ConfirmedText>Order confirmed.</S.ConfirmedText>
        </S.Confirmed>

        <S.ThanksText>THANK YOU FOR YOUR ORDER </S.ThanksText>

        <S.ConfirmationText>
          You will receive email/sms confirmation along with the expected date
          of delivery.
        </S.ConfirmationText>
        {CLIENT === clients.LOTUS_STAGE && cashbackRecieve?.amount ? (
          <S.CashbackText>
            You will get Rs {cashbackRecieve?.amount} after delivery.
          </S.CashbackText>
        ) : (
          <></>
        )}

        <S.OrderNumberContainer>
          <S.OrderNumber>
            <span className="order-number__label">Order no: </span>
            <span className="order-number">{`${orderNumber}`}</span>
          </S.OrderNumber>
        </S.OrderNumberContainer>

        <S.Buttons>
          <Button
            className="continue-shopping-btn"
            testingContext="continueShoppingButton"
            onClick={continueShopping}
            color="secondary"
            size="sm"
          >
            <FormattedMessage {...checkoutMessages.continueShopping} />
          </Button>

          {/* <Button
            className="view-order-btn"
            testingContext="viewOrderButtton"
            onClick={viewOrder}
            color="primary"
            size="sm"
          >
            <FormattedMessage {...checkoutMessages.viewOrder} />
          </Button> */}
        </S.Buttons>

        <TypedCreateSurveyMutation>
          {createSurvey => {
            return (
              <TypedFillSurveyMutation>
                {fillSurvey => {
                  const updateRating = (rating: number) => {
                    const orderId = order.id;
                    setCurrentRating(rating);
                    createSurvey({
                      variables: {
                        input: { name: "Buying Experience" },
                        questions: [
                          {
                            text: "How was your buying experience?",
                            required: true,
                            order: 1,
                          },
                        ],
                        orderIds: [orderId],
                      },
                    }).then(response => {
                      if (
                        !response ||
                        !response.data ||
                        !response.data.surveyCreate ||
                        !response.data.surveyCreate.surveys
                      ) {
                        return null;
                      }
                      const survey = response.data.surveyCreate.surveys[0];
                      const surveyHash = survey?.linkData?.surveyHash || "";
                      const surveyId = survey?.id || "";
                      const question =
                        survey?.questions?.edges[0]?.node?.id || "";
                      if (surveyId && surveyHash) {
                        fillSurvey({
                          variables: {
                            answers: [
                              {
                                question,
                                answer: String(rating),
                              },
                            ],
                            surveyId,
                            orderId,
                            surveyHash,
                          },
                        });
                      }
                    });
                  };
                  return (
                    <S.BuyingExperienceWrapper>
                      <BuyingExperience
                        rating={currentRating}
                        clickHandler={(rating: number) => updateRating(rating)}
                      />
                    </S.BuyingExperienceWrapper>
                  );
                }}
              </TypedFillSurveyMutation>
            );
          }}
        </TypedCreateSurveyMutation>

        {CLIENT === "ikkai" && (
          <S.InstagramPostWrapper>
            <InstagramPost
              postId="CQDOTHXhv7h"
              title="Ikkai's Instagram Post"
            />
          </S.InstagramPostWrapper>
        )}
      </S.Wrapper>
    </>
  );
};

export { ThankYouIkkai };
