import VideoCard from "@components/molecules/VideoCard";
import { getMetadataValue, parseJson } from "@utils/misc";
import { Card } from "@components/molecules/Card";
import styles from "./index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import { useAuthState } from "@saleor/sdk";
import Carousel from "@temp/components/ProductCarousel";
import { client } from "@temp/client";
import { trackTreeFromOrderQuery } from "./queries";
import { useEffect, useState } from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";
import MemoVectorRight from "@components/atoms/SvgIcons/MemoVectorRight";
import MemoDropDownSvg from "@components/atoms/SvgIcons/MemoDropDownSvg";
import { orderWithTreeQuery } from "./queries";
import ContainerSkeleton from "@components/molecules/ContainerSkeleton";
import { CircularProgress } from "@mui/material";

import React from "react";
export interface IPledgeProps {
  // image: string,
  content: any;
}

const VideoPlaySection = ({ bannerData }: any) => {
  return (
    <>
      <div className={styles.video_play}>
        {bannerData?.videoUrl && typeof bannerData?.videoUrl === "string" ? (
          <div className={styles.video_container}>
            <iframe
              width="420"
              height="315"
              src={bannerData?.videoUrl}
            ></iframe>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

const YourSupportSection = ({ section, treesOrderId }: any) => {
  if (section) {
    return (
      <>
        <section className={styles.pledge_tree_section_1}>
          <div className={styles.pledgecontainer}>
            <div className={styles.pledge_tree_section_1_row}>
              {Array.isArray(treesOrderId) && !! treesOrderId.length? (
                  <div className={`${styles.text_col} ${styles.text_col_mob}`}>
                  <h2>{section?.title}</h2>
                  <h3>{section?.subtitle}</h3>
                  <p>{section?.description}</p>
                </div>
              ) : (
                <div className={styles.text_col}>
                  <h2>{section?.title}</h2>
                  <h3>{section?.subtitle}</h3>
                  <p>{section?.description}</p>
                </div>
              )}
              <div className={styles.image_col}>
                <img src={section?.imgUrl} alt="" />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  return <></>;
};

const CreatingAPlantSection = ({ section, conatinerClass = "" }: any) => {
  if (section) {
    return (
      <>
        <section
          className={`${styles.pledge_tree_section_2} ${conatinerClass}`}
        >
          <div className={styles.pledgecontainer}>
            <div className={styles.pledge_tree_section_2_row}>
              <div className={styles.text_col}>
                <h2>{section?.title}</h2>
                <p>{section?.description}</p>
              </div>
              <div
                className={`${styles.image_col} ${styles.image_col_section2}`}
              >
                <img src={section?.imgUrl} alt="" />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  return <></>;
};

export const PledgeATree: React.FC<IPledgeProps> = ({ content }) => {
  const { user } = useAuthState();
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState({
    specificOrderId: false,
    orderIds: false,
  });
  const [enableShopNow, setEnableShopNow] = useState(false);
  const [plantDetails, setPlantDetails] = useState(null);
  const [treesOrderId, setTreesOrderId] = useState([]);
  const [showlist, setShowList] = useState(false);
  const userIdInNumber =
    typeof window !== "undefined" && user?.id && atob(user?.id)?.split(":")
      ? atob(user?.id).split(":").length > 1 && atob(user?.id)?.split(":")[1]
      : "";
  const isLoggedIn = user?.id && user?.phone;
  const videoSectionData =
    content?.metadata &&
    getMetadataValue(content?.metadata, "videoSection") &&
    parseJson(getMetadataValue(content?.metadata, "videoSection"));

  const bannerData =
    content?.metadata &&
    getMetadataValue(content?.metadata, "bannerData_new") &&
    parseJson(getMetadataValue(content?.metadata, "bannerData_new"));

  const section1 =
    content?.metadata &&
    getMetadataValue(content?.metadata, "section1_new") &&
    parseJson(getMetadataValue(content?.metadata, "section1_new"));

  const section2 =
    content?.metadata &&
    getMetadataValue(content?.metadata, "section2_new") &&
    parseJson(getMetadataValue(content?.metadata, "section2_new"));

  const section3 =
    content?.metadata &&
    getMetadataValue(content?.metadata, "section3") &&
    parseJson(getMetadataValue(content?.metadata, "section3"));

  const sowSeedSection =
    content?.metadata &&
    getMetadataValue(content?.metadata, "sow_seed") &&
    parseJson(getMetadataValue(content?.metadata, "sow_seed"));

  const reviewSection =
    content?.metadata &&
    getMetadataValue(content?.metadata, "section_buyers") &&
    parseJson(getMetadataValue(content?.metadata, "section_buyers"));

  const TrackYourPlant =
    content?.metadata &&
    getMetadataValue(content?.metadata, "track_section") &&
    parseJson(getMetadataValue(content?.metadata, "track_section"));

  const mapAPi =
    content?.metadata &&
    getMetadataValue(content?.metadata, "map_api") &&
    parseJson(getMetadataValue(content?.metadata, "map_api"));
  
  function containsCharacter(inputString:string) {
    return /\D/.test(inputString);
  }

  useEffect(() => {
    if (typeof window !== "undefined" && userIdInNumber) {
      ordersWithTree();
    }
  }, [user]);

  const ordersWithTree = async () => {
    setLoader({ ...loader, orderIds: true });
    try {
      const { data, errors } = await client.query({
        query: orderWithTreeQuery,
        variables: {
          id: userIdInNumber,
        },
      });
      if (
        Array.isArray(data?.ordersWithTreeForUser) &&
        !!data?.ordersWithTreeForUser?.length
      ) {
        containsCharacter(data?.ordersWithTreeForUser[0])
          ? trackTree(data?.ordersWithTreeForUser[0])
          : trackTree("", data?.ordersWithTreeForUser[0]);
        setOrderId(data?.ordersWithTreeForUser[0]);
        setTreesOrderId(data?.ordersWithTreeForUser);
      } else {
        setPlantDetails(null);
      }
    } catch (err) {
      console.log("orderWithTree Error", err);
    } finally {
      setLoader({ ...loader, orderIds: false });
    }
  };

  const trackTree = async (shopifyID: string = "", orderID: any = "") => {
    setLoader({ ...loader, specificOrderId: true });
    try {
      const { data, errors } = await client.query({
        query: trackTreeFromOrderQuery,
        variables: {
          shopifyID: shopifyID,
          orderID: orderID,
        },
      });
      if (!data?.treeAttributesForOrder) {
        setError("*Enter the correct order ID or place a new order");
        setEnableShopNow(true);
      }
      setPlantDetails(data?.treeAttributesForOrder);
    } catch (err) {
      console.log("trackTreeQuery", err);
    } finally {
      setLoader({ ...loader, specificOrderId: false });
    }
  };
  return (
    <React.Fragment>
      <div className="pledge_a_tree">
        <div className={styles.inner_pledge_a_tree}>
          {bannerData && (
            <section className={styles.pledge_tree_banner_section}>
              <div
                className={`${styles.pledgecontainer} ${styles.pledgecontainer__banner}`}
              >
                <div className={styles.pledge_tree_banner_row}>
                  {Array.isArray(treesOrderId) && !!treesOrderId?.length ? (
                    <div
                      className={`${styles.left_col} ${styles.left_col_desk}`}
                    >
                      <VideoPlaySection bannerData={bannerData} />
                    </div>
                  ) : (
                    <>
                      <div className={styles.left_col}>
                        <VideoPlaySection bannerData={bannerData} />
                      </div>
                    </>
                  )}
                  <div className={styles.right_col}>
                    <h1>
                      {bannerData?.heading}{" "}
                      <span className={styles.tree_icon}>
                        <CachedImage
                          url={bannerData?.icon}
                          isNextImage
                          imageDimensions={{ width: 100, height: 100 }}
                        />
                      </span>
                    </h1>

                    <div className={styles.stats_list}>
                      {bannerData?.stats?.length > 0
                        ? bannerData.stats.map((item: any, index: any) => (
                            <div className={styles.stats_card} key={index}>
                              <div className={styles.stats_no}>
                                {item?.statNum} <span>{item?.unit}</span>
                              </div>
                              <div className={styles.stats_desc}>
                                {item?.text}
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {Array.isArray(treesOrderId) && treesOrderId?.length === 0 ? (
            <div className={styles.pledge_tree_section_1__desk}>
              <YourSupportSection
                section={section1}
                treesOrderId={treesOrderId}
              />
            </div>
          ) : (
            <></>
          )}
          {Array.isArray(treesOrderId) && !!treesOrderId?.length ? (
            <div className={styles.pledge_tree_track_top}>
              <div className={styles.pledge_tree_track_top_heading}>
                Hi {user?.firstName || ""},
              </div>
              <div className={styles.pledge_tree_track_top_text1}>
                Your contribution has given life to a
              </div>
              <div className={styles.pledge_tree_track_top_text2}>
                {plantDetails?.species || ""} Tree
              </div>
            </div>
          ) : (
            <></>
          )}
          {loader?.orderIds ? (
            <ContainerSkeleton
              render={{ title: true, description: true, image: true }}
              cardCount={2}
            />
          ) : (
            <div className={styles.pledge_tree_track_container}>
              {!plantDetails ? (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setError("");
                      if (containsCharacter(orderId)) {
                        trackTree(orderId);
                      } else {
                        trackTree("", orderId);
                      }
                  }}
                >
                  <div className={styles.pledge_tree_track}>
                    <div className={styles.pledge_tree_track__heading}>
                      {TrackYourPlant?.title || "To track your plant- babies"}
                    </div>
                    <div className={styles.pledge_tree_track_bgIcon}>
                      {TrackYourPlant?.bg_icon ? (
                        <CachedImage
                          url={TrackYourPlant?.bg_icon}
                          imageDimensions={{ height: 100, width: 100 }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your order ID"
                      value={orderId}
                      onChange={e => setOrderId(e.target.value)}
                      className={styles.pledge_tree_track__id}
                      required
                    ></input>
                    {error ? (
                      <div className={styles.pledge_tree_track_error}>
                        {error}
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className={styles.pledge_tree_track_buttons}>
                      <button
                        type="submit"
                        className={styles.pledge_tree_track_buttons_track}
                      >
                        {loader.specificOrderId ? (
                          <CircularProgress
                            style={{ color: "#FFF" }}
                            size="18px"
                          />
                        ) : (
                          <>TRACK</>
                        )}
                      </button>
                      {enableShopNow ? (
                        <MyCustomLink
                          className={styles.pledge_tree_track_buttons_shop}
                          href={TrackYourPlant?.shop || "/page/shop"}
                        >
                          SHOP
                        </MyCustomLink>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className={styles.pledge_tree_track_plant}>
                    <div className={styles.pledge_tree_track_plant_heading}>
                      Meet your tree
                    </div>
                    {Array.isArray(treesOrderId) && !!treesOrderId?.length ? (
                      <ul
                        className={`${
                          showlist ? styles.pledge__body__reasons__list : ""
                        } ${styles.pledge__body__reasons__ul}`}
                      >
                        <li
                          className={styles.pledge__body__reasons__li}
                          onClick={() => {
                            setShowList(!showlist);
                          }}
                        >
                          <div
                            className={styles.pledge__body__reasons__li__text}
                          >
                            Order No: <span>{orderId}</span>
                          </div>
                          <div>
                            <MemoDropDownSvg />
                          </div>
                        </li>
                        <ul id="ordercancel-reasonlist">
                          {showlist &&
                            treesOrderId
                              ?.filter((value: string) => value !== orderId)
                              ?.map((item: string) => (
                                <li
                                  onClick={() => {
                                    setOrderId(item);
                                    if (containsCharacter(item)) {
                                       trackTree(item);
                                    } else {
                                      trackTree("",item)
                                    }
                                    setShowList(false);
                                  }}
                                >
                                  {item}
                                </li>
                              ))}
                        </ul>
                      </ul>
                    ) : (
                      <div className={styles.pledge_tree_track_plant_id}>
                        Order No: <span>{orderId}</span>
                      </div>
                    )}
                    <div className={styles.pledge_tree_track_plant_data}>
                      <div>
                        <div className={styles.pledge_tree_track_plant_date}>
                          Date: <span>{plantDetails?.plantedDate}</span>
                        </div>
                        <div className={styles.pledge_tree_track_plant_text}>
                          <div>Hey there!</div>
                          <p>
                            It’s a pleasure to introduce myself - I am a{" "}
                            {plantDetails?.species} Tree that you brought to
                            this planet through your Plix order, and I am
                            grateful to be here.
                          </p>
                        </div>
                        <a
                          href={`https://maps.google.com/?q=${plantDetails?.latitude},${plantDetails?.longitude}`}
                          target="_blank"
                          className={`${styles.pledge_tree_track_plant_map} ${styles.pledge_tree_track_plant_map_desk}`}
                        >
                          VIEW ON GOOGLE MAP
                          <MemoVectorRight />
                        </a>
                      </div>
                      <div className={styles.pledge_tree_track_plant_location}>
                        {loader?.specificOrderId ? (
                          <>
                            <div className={styles.image_skeleton} />
                            <div className={styles.image_skeleton} />
                          </>
                        ) : (
                          <>
                            {plantDetails?.treeImage ? (
                              <div
                                className={
                                  styles.pledge_tree_track_plant_location_img
                                }
                              >
                                <CachedImage
                                  url={plantDetails?.treeImage}
                                  imageDimensions={{ width: 100, height: 100 }}
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                            <div
                              className={
                                styles.pledge_tree_track_plant_location_coordinates
                              }
                            >
                              <iframe
                                frameBorder="0"
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps/embed/v1/place?key=${mapAPi}&q=${plantDetails?.latitude},${plantDetails?.longitude}`}
                                allowFullScreen
                              ></iframe>
                            </div>
                          </>
                        )}
                      </div>
                      <a
                        href={`https://maps.google.com/?q=${plantDetails?.latitude},${plantDetails?.longitude}`}
                        target="_blank"
                        className={styles.pledge_tree_track_plant_map}
                      >
                        VIEW ON GOOGLE MAP
                        <MemoVectorRight />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {Array.isArray(treesOrderId) && !!treesOrderId.length ? (
            <div className={styles.pledge_tree_section_1__mob}>
              <CreatingAPlantSection
                section={section2}
                conatinerClass={styles.pledge_tree_section_2_new}
              />
            </div>
          ) : (
            <></>
          )}
          <div className={Array.isArray(treesOrderId) && !!treesOrderId.length ? "" : styles.pledge_tree_section_1__mob}>
            <YourSupportSection
              section={section1}
              treesOrderId={treesOrderId}
            />
          </div>
          {Array.isArray(treesOrderId) && !!treesOrderId?.length ? (
            <div className={styles.pledge_tree_section_2_desk}>
              <CreatingAPlantSection section={section2} />
            </div>
          ) : (
            <CreatingAPlantSection section={section2} />
          )}

          {Array.isArray(treesOrderId) && !!treesOrderId.length ? (
            <div className={styles.pledge_tree_section_video}>
              <VideoPlaySection bannerData={bannerData} />
            </div>
          ) : (
            <></>
          )}

          {reviewSection &&
          Array.isArray(reviewSection) &&
          !!reviewSection?.length ? (
            <div className={`${styles.pledge_tree_review} pledge_tree_review`}>
              <div className={styles.pledge_tree_review_child}>
                <Carousel
                  slidesOnMobile={1.15}
                  slidesOnDesktop={3}
                  slidesOnTab={2}
                  slidesToScroll={1}
                  mobileCarouselProps={{
                    arrows: false,
                    dots: true,
                    infinite: false,
                  }}
                  tabCarouselProps={{
                    arrows: false,
                    dots: true,
                    infinite: false,
                  }}
                >
                  {reviewSection?.map((item: any) => (
                    <div className={styles.pledge_tree_review_container}>
                      <div className={styles.pledge_tree_review_card}>
                        <div className={styles.pledge_tree_review_card_review}>
                          {item?.review}
                        </div>
                        <div className={styles.pledge_tree_review_card_bottom}>
                          <div className={styles.pledge_tree_review_card_img}>
                            <CachedImage
                              isNextImage
                              url={item?.image}
                              imageDimensions={{ width: 100, height: 100 }}
                            />
                          </div>
                          <div className={styles.pledge_tree_review_card_info}>
                            {item?.is_verified ? (
                              <div
                                className={
                                  styles.pledge_tree_review_card_info_verified
                                }
                              >
                                Verfied Buyer
                              </div>
                            ) : (
                              <></>
                            )}
                            <div
                              className={
                                styles.pledge_tree_review_card_info_name
                              }
                            >
                              {item?.name || ""}
                            </div>
                            <div
                              className={
                                styles.pledge_tree_review_card_info_text
                              }
                            >
                              {item?.about_buyer || ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          ) : (
            <></>
          )}

          {Array.isArray(treesOrderId) &&
          !!treesOrderId?.length &&
          sowSeedSection ? (
            <section
              className={`${styles.pledge_tree_section_2} ${styles.pledge_tree_section_sowSeed}`}
            >
              <div className={styles.pledgecontainer}>
                <div className={styles.pledge_tree_section_2_row}>
                  <div className={styles.text_col}>
                    <h2>{sowSeedSection?.title}</h2>
                    <p>{sowSeedSection?.description}</p>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <></>
          )}

          {section3 && (
            <section
              className={`${styles.pledge_tree_section_3} ${styles.pledge_tree_section_2}`}
            >
              <div className={styles.pledgecontainer}>
                <div
                  className={`${styles.pledge_tree_section_3_row} ${styles.pledge_tree_section_2_row}`}
                >
                  <div className={styles.text_col}>
                    <h2>{section3?.title}</h2>
                    <p>{section3?.description}</p>
                  </div>
                  <div
                    className={`${styles.image_col} ${styles.image_col__section3}`}
                  >
                    <img src={section3?.imgUrl} alt="" />
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
