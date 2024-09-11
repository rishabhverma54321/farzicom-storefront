import React from "react";
import Logo from "images/logo.png";
import Fb from "images/fb.png";
import Insta from "images/insta.png";
import Yt from "images/yt.png";
import FooterImage from "images/footer.png";
// FIXME: NextJS Make it a css module
// import "./index.scss";

import { CONTACT_INFO } from "Themes/config";
import { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";
import { ICheckoutModelPriceValue } from "@saleor/sdk/lib/helpers";
import { useLocalStorage } from "@hooks/useLocalStorage";

export interface IPdfInvoiceTemplateProps {
  lines: IItems;
  user: User;
  order: any;
  mrp: ICheckoutModelPriceValue;
  itemDiscount: ICheckoutModelPriceValue;
  offerDiscount: ICheckoutModelPriceValue;
}

export const mailUrl = CONTACT_INFO[0].url;
export const phoneUrl = CONTACT_INFO[1].url;

export const PdfInvoiceTemplate: React.FC<IPdfInvoiceTemplateProps> = ({
  lines,
  user,
  order,
  mrp,
  itemDiscount,
  offerDiscount,
}) => {
  const { storedValue } = useLocalStorage("checkoutDiscounts");

  return (
    <>
      <table className="containerTable">
        <tbody>
          <tr>
            <td>
              <table className="mainTable">
                <tbody>
                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      <img src={Logo} alt="logo" className="logo" />{" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      <p>
                        Hi {user?.firstName} {user?.lastName}{" "}
                      </p>
                      <p>Thank you for shopping with us! </p>
                      <p style={{ lineHeight: "20px" }}>
                        This is to inform you that the following item/s of your
                        Order no. I- {order.number} are being processed.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      <b>Item/s details are as follows:</b>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        paddingTop: "10px",
                      }}
                    >
                      <table
                        cellPadding="0"
                        cellSpacing="0"
                        style={{
                          border: "1px solid #dfdcdc",
                        }}
                      >
                        <tbody>
                          <tr
                            style={{
                              width: "100%",
                              float: "left",
                              alignItems: "top",
                              verticalAlign: "left",
                              borderBottom: "1px solid #dfdcdc",
                            }}
                          >
                            <td className="td1" style={{ width: "20%" }}>
                              PRODUCT
                            </td>
                            <td className="td1" style={{ width: "30%" }}>
                              NAME
                            </td>
                            <td className="td1" style={{ width: "20%" }}>
                              UNIT PRICE
                            </td>
                            <td className="td1" style={{ width: "10%" }}>
                              QTY
                            </td>
                            <td className="td1" style={{ width: "20%" }}>
                              TOTAL PRICE
                            </td>
                          </tr>

                          {lines &&
                            lines.map(item => {
                              return (
                                <tr className="tr">
                                  <td style={{ width: "20%", float: "left" }}>
                                    <img
                                      width="100%"
                                      className="productImage"
                                      src={item.variant.product?.thumbnail?.url}
                                      alt="product"
                                      crossOrigin="anonymous"
                                    />
                                  </td>
                                  <td style={{ width: "30%" }} className="td2">
                                    {item.variant.name} <br />
                                    <span>Gift Wrap : yes</span>
                                  </td>
                                  <td style={{ width: "20%" }} className="td2">
                                    Rs.{" "}
                                    {item.variant.pricing?.price?.gross.amount}
                                  </td>
                                  <td style={{ width: "10%" }} className="td2">
                                    {item.quantity}
                                  </td>
                                  <td style={{ width: "20%" }} className="td2">
                                    Rs. {item.totalPrice?.gross.amount}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      <table
                        cellPadding="0"
                        cellSpacing="0"
                        style={{
                          border: "none",
                          paddingTop: "20px",
                          width: "608px",
                        }}
                      >
                        <tbody>
                          <tr className="tr2">
                            <td className="td31">Cart Total</td>
                            <td className="td32">&nbsp;</td>
                            <td className="td33">Rs. {mrp.amount} </td>
                          </tr>

                          <tr className="tr2">
                            <td className="td31">Promo Discount</td>
                            <td className="td32">&nbsp;</td>
                            <td className="td33">Rs. 500</td>
                          </tr>

                          <tr className="tr2">
                            <td className="td31">Coupon Discount</td>
                            <td className="td32">&nbsp;</td>
                            <td className="td33">
                              Rs. {JSON.parse(storedValue).couponAmount}
                            </td>
                          </tr>

                          <tr className="tr2">
                            <td className="td31">Offer Discount</td>
                            <td className="td32">&nbsp;</td>
                            <td className="td33">
                              Rs.{" "}
                              {offerDiscount.amount -
                                JSON.parse(storedValue).couponAmount}
                            </td>
                          </tr>

                          <tr className="tr2">
                            <td className="td31">Additional Discount</td>
                            <td className="td32">&nbsp;</td>
                            <td className="td33">
                              Rs. {JSON.parse(storedValue).prepaidAmount}
                            </td>
                          </tr>

                          <tr className="tr2">
                            <td className="td31">Free Product</td>
                            <td className="td32">&nbsp;</td>
                            <td className="td33">Rs. 500</td>
                          </tr>

                          <tr className="tr2">
                            <td className="td31">Order Total</td>
                            <td className="td32">&nbsp;</td>
                            <td className="td33">
                              Rs. {order.total.gross.amount}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: "40px" }}>
                      <table
                        cellPadding="0"
                        cellSpacing="0"
                        style={{ border: "0", width: "608px" }}
                      >
                        <tbody>
                          <tr>
                            <td colSpan={2} style={{ height: "20px" }} />
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderRight: " 1px solid #dfdcdc",
                                textAlign: "left",
                                width: "50%",
                              }}
                              valign="top"
                            >
                              <table
                                cellPadding="0"
                                cellSpacing="0"
                                style={{ border: "none", width: "100%" }}
                              >
                                <tbody>
                                  <tr>
                                    <td>
                                      <b style={{ color: "#282c3f" }}>
                                        Shipping Details
                                      </b>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>My order</td>
                                  </tr>
                                  <tr>
                                    <td>Mobile No.: 7976866184</td>
                                  </tr>
                                  <tr>
                                    <td>my address</td>
                                  </tr>
                                  <tr>
                                    <td>Jaipur, Rajasthan, 302001</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td
                              style={{
                                paddingLeft: "15px",
                                textAlign: "left",
                                width: "50%",
                              }}
                              valign="top"
                            >
                              <table
                                cellPadding="0"
                                cellSpacing="0"
                                style={{ border: "0", width: "100%" }}
                              >
                                <tbody>
                                  <tr>
                                    <td>
                                      {" "}
                                      <b style={{ color: "#282c3f" }}>
                                        Billing Details
                                      </b>{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      6:20 6:21
                                      <table
                                        cellPadding="0"
                                        cellSpacing="0"
                                        style={{
                                          width: "100%",
                                          color: "#7e818b",
                                        }}
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style={{
                                                padding: "3px 0",
                                                textAlign: "left",
                                              }}
                                            >
                                              Order Total
                                            </td>
                                            <td style={{ textAlign: "right" }}>
                                              Rs. 4520
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                padding: "3px 0",
                                                textAlign: "left",
                                              }}
                                            >
                                              Delivery Charge
                                            </td>
                                            <td style={{ textAlign: "right" }}>
                                              Rs. 48
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="td5">Grand Total</td>
                                            <td className="td6">Rs. 4000</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{ textAlign: "center", padding: "40px 0 10px 0" }}
                    >
                      <img
                        src={FooterImage}
                        style={{ border: "0px", width: "100%" }}
                        alt=""
                      />
                    </td>
                  </tr>

                  <tr>
                    <td style={{ paddingTop: "5px", textAlign: "left" }}>
                      <p style={{ lineHeight: "22px" }}>
                        In case you have any questions, feel free to reach us at
                        <a href={mailUrl}>+91-8810685354</a>, Or write to us at
                        <a href={phoneUrl}>care@lotus-organics.com</a>
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ paddingTop: "10px", textAlign: "left" }}>
                      <p style={{ lineHeight: "1.5" }}>
                        Cheers
                        <br />
                        Team Lotus Organics
                      </p>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#cde0b2" }}>
                    <td style={{ padding: "8px 0px", textAlign: "center" }}>
                      <a
                        href="https://www.facebook.com/lotusorganicsplus/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={Fb} alt="facebook icon" />
                      </a>
                      <a
                        href="https://www.instagram.com/lotus_organicsplus/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={Insta} alt="instagram icon" />
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UCHmKYRBBBwIeVc-Vm4iazog/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={Yt} alt="youtube icon" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
PdfInvoiceTemplate.displayName = "PdfInvoiceTemplate";
export default PdfInvoiceTemplate;
