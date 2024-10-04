import MemoRightChevronPlix from "@components/atoms/SvgIcons/RightChevronPlix";
import NewMemoLeftArrowPlix from "@components/atoms/SvgIcons/NewMemoLeftArrowPlix";

import { TaxedMoney } from "@components/containers/TaxedMoney";
import Card from "@components/molecules/Card";
import { mediumScreen } from "@styles/constants";
import React, { useEffect, useContext, useState } from "react";
import Media from "react-media";
import MemoOrderFullfilled from "@components/atoms/SvgIcons/OrderFullfilled";
import { useWindowWidth } from "@hooks/useWindowWidth";
import {
  createTaxedPriceFromAmount,
  getformatteddate,
  getMetadataValue,
  isBoxProduct,
  parseJson,
} from "@utils/misc";
import { CLIENT } from "Themes/config";
import { clients } from "gqlTypes/customGlobalTypes";
import { getDateInHumanFormat } from "@temp/core/utils";
import { useAuthState } from "@saleor/sdk";
import { useCustomHistory } from "@hooks/useCustomHistory";
import ContinueShoppingNext from "@components/farzicom-ui-kit/ContinueShoppingNext";
import * as S from "./stylesDetails";
import { TypedUsersOrderByToken } from "./queries";
import { UserOrderByToken_orderByToken } from "./gqlTypes/UserOrderByToken";
import MyCustomLink from "@components/next-react/MyCustomLink";
import { useRouter } from "next/router";
import {
  LeftContainerDesktop,
  OrderDetailswrapper,
  ReviewFormWrapper,
} from "./styles";
import Link from "next/link";
import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
  InnerOverlayContextInterface,
} from "@temp/components/Overlay";
import ReviewForm from "@temp/themes/plixlifefc/views/Product/ReviewForm";
import { styled } from "@material-ui/styles";
import NewMemoCircleTick from "@components/atoms/SvgIcons/NewCircleTick";
import NewMemoOrderFullfilled from "@components/atoms/SvgIcons/NewMemoOrderFullfilled";
import { OrdersByUser_me_orders_edges_node } from "./gqlTypes/OrdersByUser";
import { ShopMetaContext } from "@temp/pages/_app.page";

const a = [
  {
    key: "cashback_discount",
    value: "160.85",
    __typename: "MetadataItem",
  },
  {
    key: "coupon_discount",
    value: "59.85",
    __typename: "MetadataItem",
  },
  {
    key: "discount",
    value: "220.70",
    __typename: "MetadataItem",
  },
  {
    key: "prepaid_discount",
    value: "0.00",
    __typename: "MetadataItem",
  },
  {
    key: "sendInvoiceToWhatsApp",
    value: "true",
    __typename: "MetadataItem",
  },
  {
    key: "subtotal",
    value: "399.00",
    __typename: "MetadataItem",
  },
];

const OrderDetailsComponent = ({ res, clickHandler }) => {
  const order: UserOrderByToken_orderByToken = res?.data?.orderByToken;
  const shippingAddress = order?.shippingAddress;
  const billingAddress = order?.billingAddress;
  const [width] = useWindowWidth();
  const orderMeta = order?.metadata;
  // const updatedItems = typeof window !== "undefined" && orderLines;
  // const bybItemsTotal = updatedItems?.length
  // ? updatedItems?.reduce((total, curr) => {
  //     if (isBoxProduct(curr)) {
  //       total += curr?.totalPrice?.gross?.amount;
  //     }
  //     return total;
  //   }, 0)
  //   : 0;
  const history = useCustomHistory();
  const discount = getMetadataValue(orderMeta, "discount") || "0";
  const cashbackDiscount =
    getMetadataValue(orderMeta, "cashback_discount") || "0";
  const couponDiscount = getMetadataValue(orderMeta, "coupon_discount") || "0";
  const prepaidDiscount =
    getMetadataValue(orderMeta, "prepaid_discount") || "0";

  const codCharges = getMetadataValue(orderMeta, "cod_charges") || "0";
  const subtotal = getMetadataValue(orderMeta, "subtotal") || "0";

  const discountedItemsBXGY =
    orderMeta &&
    getMetadataValue(orderMeta, "discounted_items") &&
    typeof parseJson(getMetadataValue(orderMeta, "discounted_items")) ===
      "string"
      ? parseJson(
          getMetadataValue(orderMeta, "discounted_items")?.replace(/'/g, '"')
        )
      : parseJson(getMetadataValue(orderMeta, "discounted_items"));

  const processDiscountedItems = () => {
    // Creating free products from line for BXGY part
    const updatedItems = Array.isArray(order?.lines) ? [...order?.lines] : [];

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
  const orderLines = processDiscountedItems();
  const router = useRouter();
  const overlay = useContext(OverlayContext);
  const ShopMetaContextValue = useContext(ShopMetaContext);
  // const personalisedBoxConfig =
  // ShopMetaContextValue &&
  // getMetadataValue(ShopMetaContextValue, "personalised_box_config") &&
  // parseJson(
  //   getMetadataValue(ShopMetaContextValue, "personalised_box_config")
  //   );

  // let bybDiscount;
  // if (bybItemsTotal && typeof personalisedBoxConfig?.price === "number") {
  //   bybDiscount = bybItemsTotal - personalisedBoxConfig?.price;
  // }

  // const updatedCouponDiscount =
  // bybDiscount && typeof bybDiscount === "number"
  // ? Number(couponDiscount) + bybDiscount
  // : couponDiscount;

  const otherDiscount =
    Number(discount) -
    Number(codCharges) -
    Number(cashbackDiscount) -
    Number(couponDiscount) -
    Number(prepaidDiscount);
  enum ButtonClick {
    writeAReview,
    viewMore,
  }
  // const { show } = overlay;
  // const WriteAReviewContext: InnerOverlayContextInterface = {
  //   data: {
  //     id: productID
  //   },
  // };

  // const handleClick = (clickType: number) => {
  //   switch (clickType) {
  //     case ButtonClick.writeAReview:
  //       show(OverlayType.writeAReview, OverlayTheme.modal, WriteAReviewContext);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const SwitchRender = (
    order: UserOrderByToken_orderByToken | null,
    type: "paid" | "status"
  ) => {
    const metadata = order?.metadata;
    const paymentStatus = order?.paymentStatus;

    if (order && metadata) {
      switch (type) {
        case "paid": {
          if (paymentStatus === "FULLY_CHARGED") return <> paid</>;
          return <> unpaid</>;
        }
        case "status":
          if (order?.status)
            return (
              <S.Orderstatus>
                <MemoOrderFullfilled /> {order?.status}
              </S.Orderstatus>
            );
          break;

        default:
          return <> </>;
      }
    }

    return <> </>;
  };

  const SwitchRenderNew = (
    order: OrdersByUser_me_orders_edges_node | null,
    type: "paid" | "status"
  ) => {
    const metadata = order?.metadata;
    const paymentStatus = order?.paymentStatus;
    if (order && metadata) {
      switch (type) {
        case "paid": {
          if (paymentStatus === "FULLY_CHARGED")
            return (
              <S.Paidtext>
                <NewMemoCircleTick /> paid
              </S.Paidtext>
            );
          return <S.Paidtext>unpaid</S.Paidtext>;
        }
        case "status":
          if (order?.statusDisplay)
            return (
              <>
                {order?.statusDisplay === "Canceled" ||
                order?.statusDisplay === "Unfulfilled" ? (
                  <S.Paidtext>{order.statusDisplay}</S.Paidtext>
                ) : (
                  <S.Paidtext>
                    <NewMemoOrderFullfilled /> {order.statusDisplay}
                  </S.Paidtext>
                )}
              </>
            );
          break;

        default:
          return <> </>;
      }
    }

    return <> </>;
  };

  let actualOrderId = order?.number;

  if (CLIENT === clients.PLIXLIFEFC) {
    actualOrderId =
      (order?.metadata &&
        order?.metadata &&
        getMetadataValue(order?.metadata, "shopify_order_name")) ||
      order?.number;
  }
  const shopmetadata = useContext(ShopMetaContext);

  const orderDate =
    (order?.created && getDateInHumanFormat(order?.created)) ||
    (order?.invoices?.length &&
      order?.invoices[0].createdAt &&
      getDateInHumanFormat(order?.invoices[0]?.createdAt));

  const boxItems: any =
    (order?.metadata &&
      getMetadataValue(order?.metadata, "byobItems") &&
      parseJson(getMetadataValue(order?.metadata, "byobItems"))) ||
    [];

  const personalisedBoxConfigNew =
    getMetadataValue(shopmetadata, "personalised_box_config_new") &&
    parseJson(getMetadataValue(shopmetadata, "personalised_box_config_new"));

  // const ReviewHandler = (id) =>{
  //   setproductID(id);
  //   handleClick(ButtonClick.writeAReview);
  // }
  return (
    <S.MainContainer>
      <S.OrderContainer>
        <S.Title>
          {/* <S.Header color="#808080"> My Orders </S.Header>
          <MemoRightChevronPlix /> */}
          <div className="back_icon" onClick={() => router.back()}>
            <NewMemoLeftArrowPlix />
          </div>
          <S.Header> Order Details </S.Header>
        </S.Title>
        <S.OrderListWrapper>
          <>
            <S.Wrapper>
              <S.RowTextImageContainer>
                <S.RowTextContainer
                  background={width > 720 ? "#f5f5f5" : "#ffffff"}
                  borderBottom={width > 720 ? "none" : "1px solid #DDDDDD"}
                >
                  <S.RowText
                    fontSize={{
                      desktop: "18px",
                      mobile: "16px",
                    }}
                  >
                    <S.OrderNumber>#{actualOrderId}</S.OrderNumber>
                    {/* <div>#0324657 </div> */}
                    <span> {order?.lines?.length} items </span>
                  </S.RowText>
                  <S.RowDateText
                    color="#808080"
                    fontSize={{
                      desktop: "12px",
                      mobile: "12px",
                    }}
                  >
                    <S.OrderandDeliveryStatusWrapper>
                      <S.PaymentStatusTag
                        updatepaymentStatus={
                          order?.paymentStatus !== "FULLY_CHARGED"
                            ? true
                            : false
                        }
                      >
                        {SwitchRenderNew(order, "paid")}{" "}
                      </S.PaymentStatusTag>
                      <S.StatusTag
                        updateColour={
                          order?.statusDisplay === "Canceled" ? true : false
                        }
                        updateOrderstatus={
                          order?.statusDisplay === "Unfulfilled" ? true : false
                        }
                      >
                        {SwitchRenderNew(order, "status")}{" "}
                      </S.StatusTag>
                    </S.OrderandDeliveryStatusWrapper>

                    {getformatteddate(orderDate) ? (
                      <div>Placed On {getformatteddate(orderDate) || "-"}</div>
                    ) : (
                      <></>
                    )}
                  </S.RowDateText>
                </S.RowTextContainer>
                <S.OrderItemsDetailsDesktop>
                  <S.Table>
                    <S.Thead>
                      <S.Th textAlign="left">Item</S.Th>
                      <S.Th>SKU</S.Th>
                      <S.Th>Price</S.Th>
                      <S.Th>Quantity</S.Th>
                      <S.Th>Total</S.Th>
                    </S.Thead>
                    <S.Tbody>
                      {orderLines?.map(line => {
                        const sortImages =
                          line?.variant?.images &&
                          !!line?.variant?.images.length
                            ? line?.variant.images.sort((prev, next) =>
                                prev.sortOrder > next.sortOrder ? 1 : -1
                              )
                            : line?.variant?.product?.thumbnail?.url ||
                              line?.variant?.product?.thumbnail2x?.url;

                        // const personalisedBoxConfigKey = Object.keys(personalisedBoxConfigNew)?.filter(
                        // item => personalisedBoxConfigNew[item]?.variant_id === line?.variant?.id)

                        const specificItem =
                          (boxItems &&
                            boxItems?.length &&
                            boxItems?.filter(
                              item => item?.boxItemSKU === line?.variant?.sku
                            )) ||
                          [];

                        const specificboxItem =
                          !!specificItem.length && specificItem[0];

                        const canShowPersonalisedBox =
                          boxItems &&
                          Array.isArray(boxItems) &&
                          Array.isArray(specificboxItem?.items);

                        return (
                          <S.Tr>
                            <S.Td textAlign="left">
                              <S.ImageAndName>
                                <Card
                                  content={{
                                    image:
                                      sortImages?.length &&
                                      Array.isArray(sortImages)
                                        ? sortImages[0]?.url
                                        : sortImages || "",
                                  }}
                                  cardClass="orderDetailsPlix__card"
                                />
                                <S.TitleReviewWrapper>
                                  <div> {line?.productName} </div>
                                  {canShowPersonalisedBox ? (
                                    <S.BoxItemList>
                                      {specificboxItem?.items &&
                                        Array.isArray(
                                          specificboxItem?.items
                                        ) && (
                                          <>
                                            {specificboxItem?.items?.map(
                                              box => {
                                                return (
                                                  <S.BoxItem>
                                                    <span>
                                                      Item {box.stepNumber}
                                                    </span>
                                                    <S.BoxItemName>
                                                      {box?.name?.slice(0, 20)}
                                                      ...
                                                    </S.BoxItemName>
                                                  </S.BoxItem>
                                                );
                                              }
                                            )}
                                          </>
                                        )}
                                    </S.BoxItemList>
                                  ) : (
                                    <></>
                                  )}
                                </S.TitleReviewWrapper>
                              </S.ImageAndName>
                            </S.Td>
                            <S.Td>{line?.variant?.sku}</S.Td>
                            <S.Td>
                              <TaxedMoney taxedMoney={line?.unitPrice} />
                            </S.Td>
                            <S.Td>{line?.newQuantity || line?.quantity}</S.Td>
                            <S.Td>
                              {line?.productType === "free" ?(
                                <S.FreePrice>FREE</S.FreePrice>
                              ) : (
                                <TaxedMoney taxedMoney={line?.totalPrice} />
                              )}
                              <S.AddReview
                                onClick={() => clickHandler(line.id)}
                              >
                                Add Review
                              </S.AddReview>
                            </S.Td>
                          </S.Tr>
                        );
                      })}
                    </S.Tbody>
                  </S.Table>
                </S.OrderItemsDetailsDesktop>
                <S.OrderItemsDetailsMob>
                  {orderLines?.map(line => {
                    const sortImages =
                      line?.variant?.images && !!line?.variant?.images.length
                        ? line?.variant.images.sort((prev, next) =>
                            prev.sortOrder > next.sortOrder ? 1 : -1
                          )
                        : line?.variant?.product?.thumbnail?.url ||
                          line?.variant?.product?.thumbnail2x?.url;

                    // const personalisedBoxConfigKey = Object.keys(personalisedBoxConfigNew)?.filter(
                    //   item => personalisedBoxConfigNew[item]?.variant_id === line?.variant?.id)

                    const specificItem =
                      (boxItems &&
                        boxItems?.length &&
                        boxItems?.filter(
                          item => item?.boxItemSKU === line?.variant?.sku
                        )) ||
                      [];
                    const specificboxItem =
                      !!specificItem.length && specificItem[0];

                    const canShowPersonalisedBox =
                      personalisedBoxConfigNew &&
                      boxItems &&
                      Array.isArray(boxItems) &&
                      Array.isArray(specificboxItem?.items);
                    return (
                      <>
                        <S.RowTextContainer
                          background="#ffffff"
                          borderBottom="1px solid #DDDDDD"
                        >
                          <S.RowText
                            fontSize={{
                              desktop: "18px",
                              mobile: "18px",
                            }}
                            padding="0 1rem 1rem 1rem"
                          >
                            <S.ImageAndName>
                              <Card
                                content={{
                                  image:
                                    sortImages?.length &&
                                    Array.isArray(sortImages)
                                      ? sortImages[0]?.url
                                      : sortImages || "",
                                }}
                                cardClass="orderDetailsPlix__card"
                              />
                              <S.TitleReviewWrapper>
                                <S.ProductTitle>
                                  {" "}
                                  {line?.productName}{" "}
                                </S.ProductTitle>
                                {canShowPersonalisedBox ? (
                                  <S.BoxItemList>
                                    {specificboxItem?.items &&
                                      Array.isArray(specificboxItem?.items) && (
                                        <>
                                          {specificboxItem?.items?.map(box => {
                                            return (
                                              <S.BoxItem>
                                                <span>
                                                  Item {box.stepNumber}
                                                </span>
                                                <S.BoxItemName>
                                                  {box?.name?.slice(0, 20)}
                                                  ...
                                                </S.BoxItemName>
                                              </S.BoxItem>
                                            );
                                          })}
                                        </>
                                      )}
                                  </S.BoxItemList>
                                ) : (
                                  <></>
                                )}
                                <S.AddReview
                                  onClick={() => clickHandler(line.id)}
                                >
                                  Add Review
                                </S.AddReview>
                              </S.TitleReviewWrapper>
                            </S.ImageAndName>
                          </S.RowText>
                          <S.RowText
                            fontSize={{
                              desktop: "14px",
                              mobile: "14px",
                            }}
                            padding="0 1rem 1rem 1rem"
                          >
                            <S.Text color="#6A6A6A">SKU</S.Text>
                            <S.Text>{line?.variant?.sku}</S.Text>
                          </S.RowText>
                          <S.RowText
                            fontSize={{
                              desktop: "14px",
                              mobile: "14px",
                            }}
                            padding="0 1rem 1rem 1rem"
                          >
                            <S.Text color="#6A6A6A">Price</S.Text>
                            <S.Text>
                              <TaxedMoney taxedMoney={line?.unitPrice} />
                            </S.Text>
                          </S.RowText>
                          <S.RowText
                            fontSize={{
                              desktop: "14px",
                              mobile: "14px",
                            }}
                            padding="0 1rem 1rem 1rem"
                          >
                            <S.Text color="#6A6A6A">Quantity</S.Text>
                            <S.Text>
                              {line?.newQuantity || line?.quantity}
                            </S.Text>
                          </S.RowText>
                          <S.RowText
                            fontSize={{
                              desktop: "14px",
                              mobile: "14px",
                            }}
                            padding="0 1rem 1rem 1rem"
                          >
                            <S.Text color="#6A6A6A" hideText={true}>
                              Total
                            </S.Text>
                            {line?.productType === "free" ?(
                              <S.FreePrice>FREE</S.FreePrice>
                            ) : (
                              <S.Text makeBold={true}>
                                <TaxedMoney taxedMoney={line?.totalPrice} />
                              </S.Text>
                            )}
                          </S.RowText>
                        </S.RowTextContainer>
                      </>
                    );
                  })}
                </S.OrderItemsDetailsMob>
                <S.NewRowTextContainer gap="0">
                  <S.NewRowText
                    padding="8px 2rem"
                    fontSize={{
                      desktop: "18px",
                      mobile: "16px",
                    }}
                  >
                    <div>Payment Summary </div>
                  </S.NewRowText>
                  <S.NewRowText
                    padding="18px 2rem"
                    borderBottom="1px solid #E7E7E7"
                    color="#808080"
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                  >
                    <div>Subtotal</div>
                    <S.Text>
                      <TaxedMoney
                        taxedMoney={createTaxedPriceFromAmount(subtotal)}
                      />
                    </S.Text>
                  </S.NewRowText>
                  <S.NewRowText
                    padding="18px 2rem"
                    borderBottom="1px solid #E7E7E7"
                    color="#808080"
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                  >
                    <div>Shipping</div>
                    <S.Text>
                      <TaxedMoney taxedMoney={order?.shippingPrice} />
                    </S.Text>
                  </S.NewRowText>
                  <S.NewRowText
                    padding="18px 2rem"
                    borderBottom="1px solid #E7E7E7"
                    color="#808080"
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                  >
                    <div>Coupon Discount</div>
                    <S.Text>
                      <TaxedMoney
                        taxedMoney={createTaxedPriceFromAmount(couponDiscount)}
                      />
                    </S.Text>
                  </S.NewRowText>
                  <S.NewRowText
                    padding="18px 2rem"
                    borderBottom="1px solid #E7E7E7"
                    color="#808080"
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                  >
                    <div>Other Discount</div>
                    <S.Text>
                      <TaxedMoney
                        taxedMoney={createTaxedPriceFromAmount(otherDiscount)}
                      />
                    </S.Text>
                  </S.NewRowText>
                  <S.NewRowText
                    padding="18px 2rem"
                    borderBottom="1px solid #E7E7E7"
                    color="#808080"
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                  >
                    <div>Wallet Credit </div>
                    <S.Text>
                      <TaxedMoney
                        taxedMoney={createTaxedPriceFromAmount(
                          cashbackDiscount
                        )}
                      />
                    </S.Text>
                  </S.NewRowText>

                  <S.NewRowText
                    padding="18px 2rem"
                    borderBottom="1px solid #E7E7E7"
                    color="#808080"
                    fontSize={{
                      desktop: "14px",
                      mobile: "14px",
                    }}
                  >
                    <div>
                      {parseFloat(codCharges) > 0
                        ? "COD Charges"
                        : parseFloat(prepaidDiscount) >= 0
                        ? "Prepaid Discount"
                        : "COD Charges"}
                    </div>
                    <S.Text>
                      <TaxedMoney
                        taxedMoney={createTaxedPriceFromAmount(
                          Math.abs(parseFloat(codCharges)) ||
                            Math.abs(parseFloat(prepaidDiscount))
                        )}
                      />
                    </S.Text>
                  </S.NewRowText>

                  <S.NewRowText
                    padding="18px 2rem"
                    color="#000000"
                    fontSize={{
                      desktop: "20px",
                      mobile: "18px",
                    }}
                  >
                    <div>Total</div>
                    <S.Text>
                      <TaxedMoney
                        taxedMoney={{
                          gross: order?.total?.net,
                          net: order?.total?.net,
                        }}
                      />
                    </S.Text>
                  </S.NewRowText>
                </S.NewRowTextContainer>
              </S.RowTextImageContainer>
            </S.Wrapper>
          </>
        </S.OrderListWrapper>
      </S.OrderContainer>

      <S.AddressContainer>
        <S.AddressTile>
          <S.PaymentHeaderWrapper>
            <S.AddressRowText
              fontSize={{
                desktop: "24px",
                mobile: "24px",
              }}
              padding="0 2rem 4px 2rem"
            >
              Shipping Address
            </S.AddressRowText>
            <S.AddressRowText
              fontSize={{
                desktop: "16px",
                mobile: "18px",
              }}
              padding="0 2rem 18px 2rem"
            >
              <S.Text switchdirection={true}>
                <S.Text color="#808080" marginRight="10px">
                  {" "}
                  {`Payment Status: `}{" "}
                </S.Text>

                <S.Text color="#69de7a"> {SwitchRender(order, "paid")} </S.Text>
              </S.Text>
            </S.AddressRowText>
          </S.PaymentHeaderWrapper>
          <S.AddressRowText
            fontSize={{
              desktop: "16px",
              mobile: "18px",
            }}
            padding="0 2rem 18px 2rem"
          >
            {shippingAddress?.firstName}
            {shippingAddress?.lastName}
          </S.AddressRowText>
          <S.AddressRowText
            fontSize={{
              desktop: "14px",
              mobile: "14px",
            }}
            color="#808080"
          >
            {shippingAddress?.streetAddress1}
          </S.AddressRowText>
          {/* <S.AddressRowText
              fontSize={{
                desktop: "14px",
                mobile: "14px",
              }}
              color="#808080"
            >
              {shippingAddress?.streetAddress2}
            </S.AddressRowText> */}
          <S.AddressContentWrapper>
            <S.AddressRowText
              fontSize={{
                desktop: "14px",
                mobile: "14px",
              }}
              color="#808080"
            >
              {shippingAddress?.city}
            </S.AddressRowText>
            <S.AddressRowText
              fontSize={{
                desktop: "14px",
                mobile: "14px",
              }}
              color="#808080"
            >
              {" , " + shippingAddress?.countryArea}{" "}
              {" , " + shippingAddress?.postalCode}
            </S.AddressRowText>

            <S.AddressRowText
              fontSize={{
                desktop: "14px",
                mobile: "14px",
              }}
              color="#808080"
            >
              {" , " + shippingAddress?.country.country + ", "}
            </S.AddressRowText>
            <S.AddressRowText
              fontSize={{
                desktop: "14px",
                mobile: "14px",
              }}
              color="#808080"
            >
              {shippingAddress?.phone}
            </S.AddressRowText>
          </S.AddressContentWrapper>
        </S.AddressTile>
        <S.AddressTile>
          <S.PaymentHeaderWrapper>
            <S.AddressRowText
              fontSize={{
                desktop: "24px",
                mobile: "24px",
              }}
              padding="0 2rem 4px 2rem"
            >
              Billing Address
            </S.AddressRowText>
            <S.AddressRowText
              fontSize={{
                desktop: "16px",
                mobile: "16px",
              }}
              padding="0 2rem 18px 2rem"
            >
              <S.Text switchdirection={true}>
                <S.Text color="#808080" marginRight="10px">
                  {" "}
                  Payment Status:{" "}
                </S.Text>

                <S.Text color="#69de7a"> {SwitchRender(order, "paid")} </S.Text>
              </S.Text>
            </S.AddressRowText>
          </S.PaymentHeaderWrapper>

          <S.AddressRowText
            fontSize={{
              desktop: "16px",
              mobile: "16px",
            }}
            padding="0 2rem 18px 2rem"
          >
            {billingAddress?.firstName}
            {billingAddress?.lastName}
          </S.AddressRowText>
          <S.AddressRowText
            fontSize={{
              desktop: "14px",
              mobile: "14px",
            }}
            color="#808080"
          >
            {billingAddress?.streetAddress1}
          </S.AddressRowText>
          {/* <S.AddressRowText
            fontSize={{
              desktop: "14px",
              mobile: "14px",
            }}
            color="#808080"
          >
            {billingAddress?.streetAddress2}
          </S.AddressRowText> */}
          <S.AddressContentWrapper>
            <S.AddressRowText
              fontSize={{
                desktop: "14px",
                mobile: "14px",
              }}
              color="#808080"
            >
              {billingAddress?.city}
            </S.AddressRowText>
            <S.AddressRowText
              fontSize={{
                desktop: "14px",
                mobile: "14px",
              }}
              color="#808080"
            >
              {" , " + billingAddress?.countryArea}{" "}
              {" , " + billingAddress?.postalCode}
            </S.AddressRowText>

            <S.AddressRowText
              fontSize={{
                desktop: "14px",
                mobile: "14px",
              }}
              color="#808080"
            >
              {" , " + billingAddress?.country.country + ", "}
            </S.AddressRowText>
            <S.AddressRowText
              fontSize={{
                desktop: "14px",
                mobile: "14px",
              }}
              color="#808080"
            >
              {billingAddress?.phone}
            </S.AddressRowText>
          </S.AddressContentWrapper>
        </S.AddressTile>
      </S.AddressContainer>
      <S.Contactwrapper>
        <span>Need Help?</span>
        <button>
          <Link legacyBehavior href="/page/contact-us">
            <a>Contact Us</a>
          </Link>
        </button>
      </S.Contactwrapper>
    </S.MainContainer>
  );
};
export default function OrderDetail({ order_token }) {
  const { authenticated, authenticating } = useAuthState();
  const history = useCustomHistory();
  const { pathname } = useRouter();
  const [productID, setproductID] = useState(null);
  const shopmetadata = React.useContext(ShopMetaContext);
  const kwikpass_config = shopmetadata && getMetadataValue(shopmetadata, "kwikpass_config") && parseJson(getMetadataValue(shopmetadata, "kwikpass_config"))

  useEffect(() => {
    if (!authenticated && !authenticating) {
      if(kwikpass_config?.enable){
        if (typeof handleCustomLogin === "function") {
          handleCustomLogin(true);
        }
      }else{
        history.push("/page/login");
      }
    }
  }, []);

  const clickHandler = id => {
    setproductID(id);
  };
  const clickCloseHandler = () => {
    setproductID(null);
  };

  if (order_token) {
    return (
      <div className="container">
        <TypedUsersOrderByToken
          variables={{
            token: order_token,
            source: "order_history",
          }}
          fetchPolicy="network-only"
        >
          {res => {
            if (res?.data?.orderByToken?.id) {
              return (
                <>
                  {productID && (
                    <S.Account_review>
                      <ReviewFormWrapper>
                        <ReviewForm
                          productId={productID}
                          modalClose={clickCloseHandler}
                          showcloseButton={true}
                        />
                      </ReviewFormWrapper>
                    </S.Account_review>
                  )}
                  <OrderDetailswrapper>
                    <LeftContainerDesktop>
                      {/* <div className={styles.heading}>My Account</div> */}
                      <ul className="list">
                        <li className="listItem">
                          <div
                            className={
                              pathname === "/account"
                                ? "activeselectedlist"
                                : ""
                            }
                          ></div>
                          <MyCustomLink
                            href="/account"
                            className={
                              pathname === "/account" ? "activeselectedTab" : ""
                            }
                          >
                            <div
                              className={
                                pathname === "/account" ? "activeTab" : ""
                              }
                            >
                              Account
                            </div>
                          </MyCustomLink>
                        </li>
                        <li className="listItem">
                          <div
                            className={
                              pathname === "/order-history"
                                ? "activeselectedlist"
                                : ""
                            }
                          ></div>
                          <MyCustomLink
                            href="/order-history"
                            className={
                              pathname === "/order-history"
                                ? "activeselectedTab"
                                : ""
                            }
                          >
                            <div
                              className={
                                pathname === "/order-history" ? "activeTab" : ""
                              }
                            >
                              Order History
                            </div>
                          </MyCustomLink>
                        </li>
                        <li className="listItem">
                          <div
                            className={
                              pathname === "/address-book"
                                ? "activeselectedlist"
                                : ""
                            }
                          ></div>
                          <MyCustomLink
                            href="/address-book"
                            className={
                              pathname === "/address-book"
                                ? "activeselectedTab"
                                : ""
                            }
                          >
                            <div
                              className={
                                pathname === "/address-book" ? "activeTab" : ""
                              }
                            >
                              Address Book
                            </div>
                          </MyCustomLink>
                        </li>
                        <li className="listItem">
                          <div
                            className={
                              pathname === "/wallet" ? "activeselectedlist" : ""
                            }
                          ></div>
                          <MyCustomLink
                            href="/wallet"
                            className={
                              pathname === "/wallet" ? "activeselectedTab" : ""
                            }
                          >
                            <div
                              className={
                                pathname === "/wallet" ? "activeTab" : ""
                              }
                            >
                              Wallet
                            </div>
                          </MyCustomLink>
                        </li>
                      </ul>
                    </LeftContainerDesktop>
                    <OrderDetailsComponent
                      res={res}
                      clickHandler={id => clickHandler(id)}
                    />
                  </OrderDetailswrapper>
                </>
              );
            }
          }}
        </TypedUsersOrderByToken>
      </div>
    );
  }
  return (
    <>
      <ContinueShoppingNext />
    </>
  );
}
