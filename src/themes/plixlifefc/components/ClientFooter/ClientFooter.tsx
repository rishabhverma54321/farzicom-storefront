import React, { useState } from "react";
import { useCustomLocation } from "@hooks/useCustomLocation";
import LazyLoad from "react-lazyload";

import Media from "react-media";
import ReactSVG from "react-svg";
// FIXME:NextJs Make it a CSS module
// import "./index.scss";
import { Gap } from "@components/atoms/Gap";
import { useAuth, useAuthState } from "@saleor/sdk";
import { Footer_menu } from "@temp/components/Footer/gqlTypes/Footer";
import { largeScreen, smallScreen } from "@styles/constants";
import MemoArrowRightPlix from "@components/atoms/SvgIcons/ArrowRightPlix";
import Image from "next/image";
import parse from "html-react-parser";
import MemoinstaSVGNew from "@components/atoms/SvgIcons/InstaColoredSVGNew";
// import Newplixlogo from '../../../../../public/plixlifefc/assets/newplixlogo.svg';
// console.log(Newplixlogo);
// import MemofacebookWhiteSVG from "./assets/facebookWhiteSVG";
// import Facebook from "./assets/facebookWhite.svg";
// import Twitter from "./assets/twitterWhite.svg";
import MemoNewplixlogo from "@components/atoms/SvgIcons/NewPlixLogoSVG";
import MemoLockSVGNew from "@components/atoms/SvgIcons/NewLockSVG";
import MemoyoutubeSVGNew from "@components/atoms/SvgIcons/youtubeSVGNew";

import Marquee from "react-fast-marquee";
import GreenStarNew from "@components/atoms/SvgIcons/Green_star";
import { customEventTrigger, getMetadataValue, parseJson } from "@utils/misc";
import { getGraphqlIdFromDBId } from "@temp/core/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { ShopMetaContext } from "@temp/pages/_app.page";
import MemoHaveFunSvg1 from "@components/atoms/SvgIcons/HavefunSvg1";
import MemoHaveFunSvg2 from "@components/atoms/SvgIcons/HavefunSvg2";
import MemoHaveFunSvg3 from "@components/atoms/SvgIcons/HavefunSvg3";
import MemoHaveFunSvg4 from "@components/atoms/SvgIcons/HavefunSvg4";
import MemoFooterCertificateIcons from "@components/atoms/SvgIcons/FooterCertificateIcons";
import { TypedProductDetailQuery } from "../../views/Product/queries";
import { MAIN_LOGO } from "../../config";
import List from "./List";
import MemoFooterRightIconGroupSVG from "./assets/FooterRightIconGroupSVG";
import Memop9SVG from "./assets/PaymentIcons/p9SVG";
import Memop8SVG from "./assets/PaymentIcons/p8SVG";
import Memop7SVG from "./assets/PaymentIcons/p7SVG";
import Memop6SVG from "./assets/PaymentIcons/p6SVG";
import Memop5SVG from "./assets/PaymentIcons/p5SVG";
import Memop4SVG from "./assets/PaymentIcons/p4SVG";
import Memop3SVG from "./assets/PaymentIcons/p3SVG";
import Memop2SVG from "./assets/PaymentIcons/p2SVG";
import Memop1SVG from "./assets/PaymentIcons/p1SVG";
import gtmConfig from "../../lib/gtmConfig";
import { CachedImage } from "@components/molecules/CachedImage";
import { pages } from "gqlTypes/customGlobalTypes";
import MyCustomLink from "@components/next-react/MyCustomLink";

export interface IClientFooterProps {
  menu: Footer_menu;
  sectionData?: any;
  extraFooterData?: any;
}

const HaveFun = () => {
  const router = useRouter();
  const ShowNewfooterSubTitle =
    router.pathname == "/page/shop" ||
    router.pathname == "/" ||
    (router.pathname == "/page/[slug]" &&
      (router?.query?.slug == pages.QUIZ_SKIN_LANDING_PAGE ||
        router?.query?.slug == pages.GIFT_BOX_GALLERY))
      ? true
      : false;
  return (
    <>
      <div className="have_fun_container">
        <div className="inner_have_fun">
          {ShowNewfooterSubTitle ? (
            <>
              <p>Hey, you made it to the end of the page!</p>
              <h3>
                Don't forget to <br />
                take care, have fun!
              </h3>
            </>
          ) : (
            <>
              <p>Hey, you made it to the end of the page!</p>
              <h3>Take care, have fun!</h3>
            </>
          )}
        </div>
        <div className="have_fun_svg1">
          <MemoHaveFunSvg1 />
        </div>
        <div className="have_fun_svg2">
          <MemoHaveFunSvg2 />
        </div>
        <div className="have_fun_svg2 mobileOnly">
          <img src="/plixlifefc/assets/havefunSvg2.png" alt="svg1" />
        </div>
        <div className="have_fun_svg3">
          <MemoHaveFunSvg3 />
        </div>
        <div className="have_fun_svg4">
          <MemoHaveFunSvg4 />
        </div>
      </div>
    </>
  );
};

export const ClientFooter: React.FC<IClientFooterProps> = ({
  menu,
  sectionData,
  extraFooterData,
}) => {
  const sectionNewData = sectionData && sectionData?.edges[0]?.node;
  const [readmore, setReadMore] = useState(false);
  const extraFooterSection: any =
    extraFooterData &&
    getMetadataValue(extraFooterData, "seo_footer_data") &&
    parseJson(getMetadataValue(extraFooterData, "seo_footer_data"));
  const section1 =
    extraFooterSection && extraFooterSection?.section_1
      ? extraFooterSection?.section_1
      : sectionNewData &&
        getMetadataValue(sectionNewData?.metadata, "section_1") &&
        parseJson(getMetadataValue(sectionNewData?.metadata, "section_1"));

  const section2 =
    extraFooterSection && extraFooterSection?.section_2
      ? extraFooterSection?.section_2
      : sectionNewData &&
        getMetadataValue(sectionNewData?.metadata, "section_2") &&
        parseJson(getMetadataValue(sectionNewData?.metadata, "section_2"));

  const section3 =
    extraFooterSection && extraFooterSection?.section_3
      ? extraFooterSection?.section_3
      : sectionNewData &&
        getMetadataValue(sectionNewData?.metadata, "section_3") &&
        parseJson(getMetadataValue(sectionNewData?.metadata, "section_3"));

  const section4 =
    extraFooterSection && extraFooterSection?.section_4
      ? extraFooterSection?.section_4
      : sectionNewData &&
        getMetadataValue(sectionNewData?.metadata, "section_4") &&
        parseJson(getMetadataValue(sectionNewData?.metadata, "section_4"));

  const section5 =
    extraFooterSection && extraFooterSection?.section_5
      ? extraFooterSection?.section_5
      : sectionNewData &&
        getMetadataValue(sectionNewData?.metadata, "section_5") &&
        parseJson(getMetadataValue(sectionNewData?.metadata, "section_5"));
  const { user } = useAuthState();
  const location = useCustomLocation();
  const RegExp = /\/product\//;
  const productPage = RegExp.test(location.pathname);
  const collectionRegExp = /\/collection\//;
  const categoryRegExp = /\/category\//;
  const staticRegExp = /\/page\//;
  const checkoutPage = /\/checkout\//;
  const searchPage = /\/search/;
  const walletPage = /\/wallet/;
  const orderHistory = /\/order-history/;
  const accountPage = /\/account/;
  const addressPage = /\/address-book/;
  const orderPage = /\/order-placed/;

  const staticPage = staticRegExp.test(location?.pathname);
  const PLP =
    collectionRegExp.test(location.pathname) ||
    categoryRegExp.test(location.pathname);

  const isHomePage =
    !staticPage &&
    !PLP &&
    !productPage &&
    !searchPage.test(location.pathname) &&
    !walletPage.test(location.pathname) &&
    !orderHistory.test(location.pathname) &&
    !orderPage.test(location.pathname) &&
    !accountPage.test(location.pathname) &&
    !addressPage.test(location.pathname) &&
    !checkoutPage.test(location.pathname);

  // const paymentIcons = [P1, P2, P3, P4, P5, P6, P7, P8, P9];
  if (location.pathname === "/checkout/address") {
    return <></>;
  }
  const LoginItems = [{ name: "Login", url: "/page/login" }];
  const MyAccountItems = [{ name: "My Account", url: "/account" }];

  const LoginComponent = (
    <List
      heading="My Account"
      Lists={LoginItems}
      onListItemClick={cta_name => {
        if (gtmConfig.bottomNavigationClick.enable) {
          customEventTrigger(gtmConfig.bottomNavigationClick.value, user, {
            cta_name,
          });
        }
      }}
      listClass="footerIcon"
      listIcon={{
        icon: (
          <>
            <MemoArrowRightPlix />
          </>
        ),
        position: "right",
      }}
    />
  );
  const MyAccountComponent = (
    <List
      heading="My Account"
      Lists={MyAccountItems}
      onListItemClick={cta_name => {
        if (gtmConfig.bottomNavigationClick.enable) {
          customEventTrigger(gtmConfig.bottomNavigationClick.value, user, {
            cta_name,
          });
        }
      }}
      listClass="footerIcon"
      listIcon={{
        icon: (
          <>
            <MemoArrowRightPlix />
          </>
        ),
        position: "right",
      }}
    />
  );
  if (!menu) {
    return <> </>;
  }
  const router = useRouter();
  const checkroute =
    router?.pathname == "/page/login" || router?.pathname == "/order-placed";
  // const textStripSectionData =
  // getMetadataValue(metaDataArranged, "testData") &&
  // JSON.parse(getMetadataValue(metaDataArranged, "testData"));

  const ShopMetaContextValue = React.useContext(ShopMetaContext);

  const textStripSectionData =
    getMetadataValue(ShopMetaContextValue, "footertextstripdata") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "footertextstripdata"));

  const announcementData =
    ShopMetaContextValue &&
    getMetadataValue(ShopMetaContextValue, "announcement_bar") &&
    parseJson(getMetadataValue(ShopMetaContextValue, "announcement_bar"));

  return (
    <>
      {!checkroute && (
        <LazyLoad height={200} offset={100}>
          <HaveFun />
        </LazyLoad>
      )}
      <div
        className={`${
          router?.pathname == "/order-placed" ||
          router?.pathname == "/page/login"
            ? "remove_footer-wrapper"
            : ""
        } footer-container`}
      >
        {extraFooterSection && section1 && extraFooterSection?.section_1 ? (
          section1?.heading || section1?.text ? (
            <div className="footerNew__container footerNew__background__section1">
              <h2 className="footerNew__container__heading">
                {parse(`${section1?.heading || ""}`)}
              </h2>
              <div className="footerNew__container__text">
                {parse(`${section1?.text || ""}`)}
                <span
                  onClick={() => {
                    setReadMore(!readmore);
                  }}
                  className="footerNew__container__readmore"
                >
                  {!readmore ? " Read More" : "Read Less"}
                </span>
              </div>
            </div>
          ) : (
            <></>
          )
        ) : section1 && Array.isArray(section1) ? (
          section1.map((items, index) => (
            <React.Fragment key={index}>
              {location.asPath?.includes(items?.page) ? (
                <div className="footerNew__container footerNew__background__section1">
                  <h2 className="footerNew__container__heading">
                    {parse(`${items?.data?.heading || ""}`)}
                  </h2>
                  <div className="footerNew__container__text">
                    {parse(`${items?.data?.text || ""}`)}
                    <span
                      onClick={() => {
                        setReadMore(!readmore);
                      }}
                      className="footerNew__container__readmore"
                    >
                      {!readmore ? " Read More" : "Read Less"}
                    </span>
                  </div>
                </div>
              ) : isHomePage && items?.page === "home" ? (
                <div className="footerNew__container footerNew__background__section1">
                  <h2 className="footerNew__container__heading">
                    {parse(`${items?.data?.heading || ""}`)}
                  </h2>
                  <div className="footerNew__container__text">
                    {parse(`${items?.data?.text || ""}`)}
                    <span
                      onClick={() => {
                        setReadMore(!readmore);
                      }}
                      className="footerNew__container__readmore"
                    >
                      {!readmore ? " Read More" : "Read Less"}
                    </span>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </React.Fragment>
          ))
        ) : (
          <></>
        )}
        {readmore ? (
          <>
            {extraFooterSection && section2 && extraFooterSection?.section_2 ? (
              section2?.heading ||
              section2?.firstPara ||
              section2?.list.length ||
              section2?.secondPara ? (
                <div className="footerNew__container footerNew__background__section2">
                  <h2 className="footerNew__container__heading">
                    {parse(`${section2?.heading || ""}`)}
                  </h2>
                  <div className="footerNew__container__text">
                    {parse(`${section2?.firstPara || ""}`)}
                  </div>
                  {section2?.list && Array.isArray(section2?.list) ? (
                    <div className="footerNew__container__list">
                      <ol>
                        {section2?.list?.map((list, index) => (
                          <React.Fragment key={index}>
                            <li>{parse(`${list || ""}`)}</li>
                          </React.Fragment>
                        ))}
                      </ol>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="footerNew__container__text">
                    {parse(`${section2?.secondPara || ""}`)}
                  </div>
                </div>
              ) : (
                <></>
              )
            ) : section2 && Array.isArray(section2) ? (
              section2.map((items, index) => (
                <React.Fragment key={index}>
                  {location.asPath?.includes(items?.page) ? (
                    <div className="footerNew__container footerNew__background__section2">
                      <h2 className="footerNew__container__heading">
                        {parse(`${items?.data?.heading || ""}`)}
                      </h2>
                      <div className="footerNew__container__text">
                        {parse(`${items?.data?.firstPara || ""}`)}
                      </div>
                      {items?.data?.list && Array.isArray(items?.data?.list) ? (
                        <div className="footerNew__container__list">
                          <ol>
                            {items?.data?.list?.map((list, index) => (
                              <React.Fragment key={index}>
                                <li>{parse(`${list || ""}`)}</li>
                              </React.Fragment>
                            ))}
                          </ol>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="footerNew__container__text">
                        {parse(`${items?.data?.secondPara || ""}`)}
                      </div>
                    </div>
                  ) : isHomePage && items?.page === "home" ? (
                    <div className="footerNew__container footerNew__background__section2">
                      <h2 className="footerNew__container__heading">
                        {parse(`${items?.data?.heading || ""}`)}
                      </h2>
                      <div className="footerNew__container__text">
                        {parse(`${items?.data?.firstPara || ""}`)}
                      </div>
                      {items?.data?.list && Array.isArray(items?.data?.list) ? (
                        <div className="footerNew__container__list">
                          <ol>
                            {items?.data?.list?.map((list, index) => (
                              <React.Fragment key={index}>
                                <li>{parse(`${list || ""}`)}</li>
                              </React.Fragment>
                            ))}
                          </ol>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="footerNew__container__text">
                        {parse(`${items?.data?.secondPara || ""}`)}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              ))
            ) : (
              <></>
            )}
            {extraFooterSection && section3 && extraFooterSection?.section_3 ? (
              section3?.heading || section3?.list.length ? (
                <div className="footerNew__container footerNew__background__section3">
                  <h2 className="footerNew__container__heading">
                    {parse(`${section3?.heading || ""}`)}
                  </h2>
                  {section3?.list && Array.isArray(section3?.list) ? (
                    <div className="footerNew__container__list">
                      <ul>
                        {section3?.list?.map((list, index) => (
                          <React.Fragment key={index}>
                            <li>{parse(`${list || ""}`)}</li>
                          </React.Fragment>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )
            ) : section3 && Array.isArray(section3) ? (
              section3.map((items, index) => (
                <React.Fragment key={index}>
                  {location.asPath?.includes(items?.page) ? (
                    <div className="footerNew__container footerNew__background__section3">
                      <h2 className="footerNew__container__heading">
                        {parse(`${items?.data?.heading || ""}`)}
                      </h2>
                      {items?.data?.list && Array.isArray(items?.data?.list) ? (
                        <div className="footerNew__container__list">
                          <ul>
                            {items?.data?.list?.map((list, index) => (
                              <React.Fragment key={index}>
                                <li>{parse(`${list || ""}`)}</li>
                              </React.Fragment>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : isHomePage && items?.page === "home" ? (
                    <div className="footerNew__container footerNew__background__section3">
                      <h2 className="footerNew__container__heading">
                        {parse(`${items?.data?.heading || ""}`)}
                      </h2>
                      {items?.data?.list && Array.isArray(items?.data?.list) ? (
                        <div className="footerNew__container__list">
                          <ul>
                            {items?.data?.list?.map((list, index) => (
                              <React.Fragment key={index}>
                                <li>{parse(`${list || ""}`)}</li>
                              </React.Fragment>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              ))
            ) : (
              <></>
            )}
            {extraFooterSection && section4 && extraFooterSection?.section_4 ? (
              section4?.heading || section4?.text ? (
                <div className="footerNew__container footerNew__background__section4">
                  <h2 className="footerNew__container__heading">
                    {parse(`${section4?.heading || ""}`)}
                  </h2>
                  <div className="footerNew__container__text">
                    {parse(`${section4?.text || ""}`)}
                  </div>
                </div>
              ) : (
                <></>
              )
            ) : section4 && Array.isArray(section4) ? (
              section4.map((items, index) => (
                <React.Fragment key={index}>
                  {location.asPath?.includes(items?.page) ? (
                    <div className="footerNew__container footerNew__background__section4">
                      <h2 className="footerNew__container__heading">
                        {parse(`${items?.data?.heading || ""}`)}
                      </h2>
                      <div className="footerNew__container__text">
                        {parse(`${items?.data?.text || ""}`)}
                      </div>
                    </div>
                  ) : isHomePage && items?.page === "home" ? (
                    <div className="footerNew__container footerNew__background__section4">
                      <h2 className="footerNew__container__heading">
                        {parse(`${items?.data?.heading || ""}`)}
                      </h2>
                      <div className="footerNew__container__text">
                        {parse(`${items?.data?.text || ""}`)}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              ))
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {extraFooterSection && section5 && extraFooterSection?.section_5 ? (
          section5?.heading || section5?.table.length || section5?.text ? (
            <div className="footerNew__container footerNew__background__section5">
              <h2 className="footerNew__container__heading">
                {parse(`${section5?.heading || ""}`)}
              </h2>
              <div className="footerNew__container__table">
                {section5?.table && Array.isArray(section5?.table) ? (
                  <table className="footerNew__container__table__element">
                    {section5?.table?.map((list, index) => (
                      <tr key={index}>
                        <td className="footerNew__container__table__product">
                          {parse(`${list?.products || ""}`)}
                        </td>
                        <td className="footerNew__container__table__price">
                          {parse(`${list?.price || ""}`)}
                        </td>
                      </tr>
                    ))}
                  </table>
                ) : (
                  <></>
                )}
              </div>
              <div className="footerNew__container__text">
                {parse(`${section5?.text || ""}`)}
              </div>
            </div>
          ) : (
            <></>
          )
        ) : section5 && Array.isArray(section5) ? (
          section5.map((items, index) => (
            <React.Fragment key={index}>
              {location.asPath?.includes(items?.page) ? (
                <div className="footerNew__container footerNew__background__section5">
                  <h2 className="footerNew__container__heading">
                    {parse(`${items?.data?.heading || ""}`)}
                  </h2>
                  <div className="footerNew__container__table">
                    {items?.data?.table && Array.isArray(items?.data?.table) ? (
                      <table className="footerNew__container__table__element">
                        {items?.data?.table?.map((list, index) => (
                          <tr key={index}>
                            <td className="footerNew__container__table__product">
                              {parse(`${list?.products || ""}`)}
                            </td>
                            <td className="footerNew__container__table__price">
                              {parse(`${list?.price || ""}`)}
                            </td>
                          </tr>
                        ))}
                      </table>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="footerNew__container__text">
                    {parse(`${items?.data?.text || ""}`)}
                  </div>
                </div>
              ) : isHomePage && items?.page === "home" ? (
                <div className="footerNew__container footerNew__background__section5">
                  <h2 className="footerNew__container__heading">
                    {parse(`${items?.data?.heading || ""}`)}
                  </h2>
                  <div className="footerNew__container__table">
                    {items?.data?.table && Array.isArray(items?.data?.table) ? (
                      <table className="footerNew__container__table__element">
                        {items?.data?.table?.map((list, index) => (
                          <tr key={index}>
                            <td className="footerNew__container__table__product">
                              {parse(`${list?.products || ""}`)}
                            </td>
                            <td className="footerNew__container__table__price">
                              {parse(`${list?.price || ""}`)}
                            </td>
                          </tr>
                        ))}
                      </table>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="footerNew__container__text">
                    {parse(`${items?.data?.text || ""}`)}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </React.Fragment>
          ))
        ) : (
          <></>
        )}
        <div
          className={`ClientFooterContainer ${
            router?.pathname == "/order-placed" ? "remove_footer-wrapper" : ""
          }`}
        >
          {menu.items.length ? (
            <div className={`container lower ${user ? "lower_logged" : ""}`}>
              <div className="footer_wrapper__desktop">
                <>
                  {/* <SignupSection /> */}
                  <div className="list">
                    <List
                      key={menu.items[0].id}
                      heading={menu.items[0].name}
                      Lists={menu.items[0].children}
                      onListItemClick={cta_name => {
                        if (gtmConfig.bottomNavigationClick.enable) {
                          customEventTrigger(
                            gtmConfig.bottomNavigationClick.value,
                            user,
                            {
                              cta_name,
                            }
                          );
                        }
                      }}
                    />
                  </div>
                  <div className="list">
                    {menu.items.slice(1, 3).map(item => (
                      <List
                        key={item.id}
                        heading={item.name}
                        Lists={item.children}
                        onListItemClick={cta_name => {
                          if (gtmConfig.bottomNavigationClick.enable) {
                            customEventTrigger(
                              gtmConfig.bottomNavigationClick.value,
                              user,
                              {
                                cta_name,
                              }
                            );
                          }
                        }}
                      />
                    ))}
                  </div>
                  <div className="list">
                    {menu.items.slice(3).map(item => (
                      <List
                        key={item.id}
                        heading={item.name}
                        Lists={item.children}
                        onListItemClick={cta_name => {
                          if (gtmConfig.bottomNavigationClick.enable) {
                            customEventTrigger(
                              gtmConfig.bottomNavigationClick.value,
                              user,
                              {
                                cta_name,
                              }
                            );
                          }
                        }}
                      />
                    ))}
                    {user ? MyAccountComponent : LoginComponent}
                  </div>
                </>
              </div>
              <div className="footer_wrapper__tablet">
                <div style={{ width: "100%" }}>
                  {/* <SignupSection /> */}
                  <div className="listing-tab">
                    <div className="list">
                      <List
                        key={menu.items[0].id}
                        heading={menu.items[0].name}
                        Lists={menu.items[0].children}
                        onListItemClick={cta_name => {
                          if (gtmConfig.bottomNavigationClick.enable) {
                            customEventTrigger(
                              gtmConfig.bottomNavigationClick.value,
                              user,
                              {
                                cta_name,
                              }
                            );
                          }
                        }}
                      />
                    </div>
                    <div className="list">
                      {menu.items.slice(1).map(item => (
                        <List
                          key={item.id}
                          heading={item.name}
                          Lists={item.children}
                          onListItemClick={cta_name => {
                            if (gtmConfig.bottomNavigationClick.enable) {
                              customEventTrigger(
                                gtmConfig.bottomNavigationClick.value,
                                user,
                                {
                                  cta_name,
                                }
                              );
                            }
                          }}
                        />
                      ))}
                    </div>
                    <div>{user ? MyAccountComponent : LoginComponent}</div>
                  </div>
                </div>
              </div>
              <div className="footer_wrapper__mobile">
                <div style={{ width: "100%" }}>
                  {/* <SignupSection /> */}
                  <div className="footer-listing-mobile">
                    <div>
                      {menu.items.slice(0, 2).map(item => (
                        <List
                          key={item.id}
                          heading={item.name}
                          Lists={item.children}
                          onListItemClick={cta_name => {
                            if (gtmConfig.bottomNavigationClick.enable) {
                              customEventTrigger(
                                gtmConfig.bottomNavigationClick.value,
                                user,
                                {
                                  cta_name,
                                }
                              );
                            }
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      {menu.items.slice(2).map(item => (
                        <List
                          key={item.id}
                          heading={item.name}
                          Lists={item.children}
                          onListItemClick={cta_name => {
                            if (gtmConfig.bottomNavigationClick.enable) {
                              customEventTrigger(
                                gtmConfig.bottomNavigationClick.value,
                                user,
                                {
                                  cta_name,
                                }
                              );
                            }
                          }}
                        />
                      ))}
                      {user ? MyAccountComponent : LoginComponent}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <> </>
          )}

          <div className="container contactUsIcons">
            <div className="logo_social_block">
              <LazyLoad height={50} offset={500}>
                <div className="contactUsIcons_section">
                  <a
                    target="_blank"
                    href="/"
                    onClick={() => {
                      if (gtmConfig.bottomNavigationClick.enable) {
                        customEventTrigger(
                          gtmConfig.bottomNavigationClick.value,
                          user,
                          {
                            cta_name: "brand_logo",
                          }
                        );
                      }
                    }}
                  >
                    {/* <MemoplixLogoSVG /> */}
                    <MemoNewplixlogo />
                    {/* <Image src={MAIN_LOGO} width="160" height="50" /> */}
                    {/* <ReactSVG path={PlixLogo} style={{ marginRight: "10px" }} /> */}
                  </a>
                </div>
              </LazyLoad>
              <div className="social_link_section">
                <span>Stalk our socials</span>
                <LazyLoad height={50} offset={500}>
                  <div>
                    <a
                      className="social-icons"
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.instagram.com/myplixlife/"
                      onClick={() => {
                        if (gtmConfig.bottomNavigationClick.enable) {
                          customEventTrigger(
                            gtmConfig.bottomNavigationClick.value,
                            user,
                            {
                              cta_name: "Instagram Icon",
                            }
                          );
                        }
                      }}
                    >
                      <CachedImage
                        className="social_media_icon"
                        isNextImage
                        alt="Insta"
                        url="https://plixlifefc-media.farziengineer.co/hosted/original_insta_icon-2dd8fa98f9ce.png"
                        imageDimensions={{ width: 30, height: 100 }}
                      />
                    </a>
                    {/* <a
                    className="social-icons"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.youtube.com/channel/UCxjpQEVVTxs1P8i9x4KVoKQ"
                  >
                    <Image
                      className="social_media_icon"
                      src="https://plixlifefc-media.farziengineer.co/hosted/original_youtube_icon-105ba7b204a4.png"
                      width={30}
                      height={30}
                    />
                  </a> */}
                  </div>
                </LazyLoad>
              </div>
            </div>
            {/* Announcement banners for downloading the app on iOS and Android */}
            {isHomePage ? (
              <div className="footerNew_announcement">
                {announcementData?.image_android ? (
                  <div className="footerNew_announcement_image">
                    <MyCustomLink href={announcementData?.button?.url_android}>
                      <CachedImage
                        isNextImage
                        nextImageLayout="fill"
                        url={announcementData?.image_android}
                      />
                    </MyCustomLink>
                  </div>
                ) : (
                  <></>
                )}
                {announcementData?.image_ios ? (
                  <div className="footerNew_announcement_image">
                    <MyCustomLink href={announcementData?.button?.url_ios}>
                      <CachedImage
                        isNextImage
                        nextImageLayout="fill"
                        url={announcementData?.image_ios}
                      />
                    </MyCustomLink>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            {/* Announcement banners for downloading the app on iOS and Android */}
            {!user ? (
              <>
                <div className="signup_instant">
                  <p>Sign up for exclusive deals and offers</p>
                </div>

                <div
                  className="signup_button"
                  onClick={() => {
                    if (gtmConfig.bottomNavigationClick.enable) {
                      customEventTrigger(
                        gtmConfig.bottomNavigationClick.value,
                        user,
                        {
                          cta_name: "Sign Up",
                        }
                      );
                    }
                  }}
                >
                  <Link href="/page/login">
                    <a>Sign up</a>
                  </Link>
                </div>
                <div className="signup_titletext">
                  <p>By signing up, you agree to our Privacy Policy</p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <>
          <LazyLoad height={50} offset={500}>
            <div className="textstrip">
              {textStripSectionData && (
                <div className="textStripSection">
                  <Marquee speed={40}>
                    {textStripSectionData.map((text, index) => (
                      <div className="textItem" key={index}>
                        <GreenStarNew />
                        <span>{text}</span>
                      </div>
                    ))}
                    {textStripSectionData.map((text, index) => (
                      <div className="textItem" key={index}>
                        <GreenStarNew />
                        <span>{text}</span>
                      </div>
                    ))}
                  </Marquee>
                </div>
              )}
            </div>
          </LazyLoad>
        </>

        <div className="container paymentContainer">
          <div className="rightIconGroupWrapper">
            <p>© Plix The Plant Fix</p>
            <div>
              <p>Affiliated Certificates</p>
              <LazyLoad offset={100} height={50}>
                <MemoFooterCertificateIcons />
              </LazyLoad>
            </div>
          </div>

          <LazyLoad height={50} offset={500}>
            <div className="paymentIconGroup">
              <Media
                query={{ maxWidth: largeScreen }}
                render={() => (
                  <>
                    <div className="paymentGroup_title">
                      <MemoLockSVGNew />
                      <p>Safe & Secure Payment Processing</p>
                    </div>
                    <div className="payment_icons">
                      <Memop1SVG />
                      <Memop2SVG />
                      <Memop3SVG />
                      <Memop4SVG />
                      <Memop5SVG />
                      <Memop6SVG />
                      <Memop7SVG />
                      <Memop8SVG />
                      <Memop9SVG />
                    </div>
                  </>
                )}
              />
              <Media
                query={{ minWidth: largeScreen }}
                render={() => (
                  <>
                    <div className="paymentGroup_title">
                      <MemoLockSVGNew />
                      <p>Safe & Secure Payment Processing</p>
                    </div>
                    <div>
                      <Memop1SVG />
                      <Memop2SVG />
                      <Memop3SVG />
                      <Memop4SVG />
                      <Memop5SVG />
                      <Memop6SVG />
                      <Memop7SVG />
                      <Memop8SVG />
                      <Memop9SVG />
                    </div>
                  </>
                )}
              />
            </div>
          </LazyLoad>
        </div>
        {productPage && (
          <Gap
            size="6.5rem"
            customSize={{ breakpoint: "720px", size: "0px" }}
          />
        )}
        {PLP && (
          <Gap
            size="2.5rem"
            customSize={{ breakpoint: "540px", size: "0px" }}
          />
        )}
      </div>
    </>
  );
};
ClientFooter.displayName = "ClientFooter";
export default ClientFooter;
