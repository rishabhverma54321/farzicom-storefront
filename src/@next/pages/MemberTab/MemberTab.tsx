import { CachedImage } from "@components/molecules/CachedImage";
import MyCustomLink from "@components/next-react/MyCustomLink";
import { useAuthState } from "@saleor/sdk";
import { getMembershipTag, getMetadataValue, parseJson } from "@utils/misc";
import style from "./index.module.scss";
import React from "react";
import parse from "html-react-parser";

const MemberTab: React.FC<{ membershipData: any }> = ({ membershipData }) => {
  const { user } = useAuthState();
  const membershipTap = getMembershipTag(user);
  const memberSection =
    membershipData &&
    Array.isArray(membershipData?.membership?.edges) &&
    !!membershipData?.membership?.edges
      ? membershipData?.membership?.edges[0]?.node
      : null;
  const metadata = (memberSection && memberSection?.metadata) || [];

  const levelUpData =
    metadata &&
    getMetadataValue(metadata, "levelUpSection") &&
    parseJson(getMetadataValue(metadata, "levelUpSection"));

  const membershipCards =
    metadata &&
    getMetadataValue(metadata, "membershipLevels") &&
    parseJson(getMetadataValue(metadata, "membershipLevels"));

  const classic = levelUpData?.levels?.classic;
  const elite = levelUpData?.levels?.elite;
  const ultimate = levelUpData?.levels?.ultimate;

  const membershipLevel =
    membershipCards &&
    Array.isArray(membershipCards) &&
    membershipCards?.find(
      item =>
        item?.membership_level?.level.toLowerCase() ===
        membershipTap?.toLowerCase()
    );

  const RewardBox: React.FC<any> = ({ moneyIcon, levelIcon, title, track }) => {
    return (
      <>
        <div
          className={`${style.levelUpContainer__bar_box} ${
            title === "Ultimate" ? style.levelUpContainer__bar_box_ultimate : ""
          }`}
        >
          {moneyIcon ? (
            <div className={style.levelUpContainer__bar_box_coin}>
              <CachedImage
                isNextImage
                url={moneyIcon}
                imageDimensions={{ height: 100, width: 100 }}
              />
            </div>
          ) : (
            <></>
          )}
          <div className={style.levelUpContainer__bar_box_about}>
            <div className={style.levelUpContainer__bar_box_about_title}>
              {title || ""}
            </div>
          </div>
          {levelIcon ? (
            <div className={style.levelUpContainer__bar_box_level}>
              <CachedImage
                isNextImage
                url={levelIcon}
                imageDimensions={{ height: 100, width: 100 }}
              />
            </div>
          ) : (
            <></>
          )}
          {track ? (
            <div className={style.levelUpContainer__bar_box_about_text}>
              You’re Here!
            </div>
          ) : (
            <div
              className={style.levelUpContainer__bar_box_about_text_height}
            ></div>
          )}
        </div>
      </>
    );
  };

  const MembershipCard: React.FC<any> = ({ data }) => {
    const shopMore = data?.shop_more?.benefits?.data;
    return (
      <>
        <div className={style.levelUpContainer__cards_container}>
          <div className={style.levelUpContainer__cards_header}>
            {data?.level_background ? (
              <div className={style.levelUpContainer__cards_header_background}>
                <CachedImage
                  url={data?.level_background}
                  isNextImage
                  imageDimensions={{ width: 100, height: 100 }}
                />
              </div>
            ) : (
              <></>
            )}
            {data?.level_lmage ? (
              <>
                <div className={style.levelUpContainer__cards_header_levelImg}>
                  <CachedImage
                    url={data?.level_lmage}
                    isNextImage
                    imageDimensions={{ width: 100, height: 100 }}
                    imgixSizes="(min-width: 992px) 30vw,(min-width: 720px) 80vw, (min-width: 540px) 50vw, 50vw"
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            <div className={style.levelUpContainer__cards_header_title}>
              {data?.level || ""}
            </div>
          </div>
          <div className={style.levelUpContainer__cards_body}>
            {data?.member_card ? (
              <div
                className={
                  style.levelUpContainer__cards_body_membership_container
                }
              >
                <>
                  <div
                    className={style.levelUpContainer__cards_body_membership}
                  >
                    <CachedImage
                      isNextImage
                      imageDimensions={{ width: 100, height: 100 }}
                      url={data?.member_card}
                    />
                  </div>
                  <div
                    className={
                      style.levelUpContainer__cards_body_membership_name
                    }
                  >
                    {user?.firstName?.slice(0, 13) || ""}
                  </div>
                  <div
                    className={style.levelUpContainer__cards_body_membership_id}
                  >
                    {(user?.phone && user?.phone?.replace("+91", "")) || ""}
                  </div>
                  <div
                    className={
                      style.levelUpContainer__cards_body_membership_gap
                    }
                  ></div>
                  <div
                    className={
                      style.levelUpContainer__cards_body_membership_title
                    }
                  >
                    <h3 className={style.levelUpContainer__heading}>
                      {parse(`${data?.level_title || ""}`)}
                    </h3>
                    <div className={style.levelUpContainer__text}>
                      {data?.level_text || ""}
                    </div>
                  </div>
                </>
              </div>
            ) : (
              <></>
            )}
            <div className={style.levelUpContainer_upper}>
              <div className={style.levelUpContainer_upper_heading}>
                <h3 className={style.levelUpContainer__heading}>
                  {parse(`${data?.level_title || ""}`)}
                </h3>
                <div className={style.levelUpContainer__text}>
                  {data?.level_text || ""}
                </div>
              </div>
              <div className={style.levelUpContainer__bar}>
                <div className={style.levelUpContainer__bar_strip}></div>
                <RewardBox
                  moneyIcon={classic?.money_icon}
                  levelIcon={classic?.level_icon}
                  title="Classic"
                  track={membershipTap.toLocaleLowerCase() === "classic"}
                />
                <RewardBox
                  moneyIcon={elite?.money_icon}
                  levelIcon={elite?.level_icon}
                  title="Elite"
                  track={membershipTap.toLocaleLowerCase() === "elite"}
                />
                <RewardBox
                  moneyIcon={ultimate?.money_icon}
                  levelIcon={ultimate?.level_icon}
                  title="Ultimate"
                  track={membershipTap.toLocaleLowerCase() === "ultimate"}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={style.levelUpContainer__cards_body_benefits_heading}>
            Your current benefits
          </div>
          {data?.benefit_icons &&
          Array.isArray(data?.benefit_icons) &&
          !!data?.benefit_icons ? (
            <div className={style.levelUpContainer__cards_body_benefits}>
              {data?.benefit_icons?.map((item: any, index: number) => (
                <div
                  className={style.levelUpContainer__cards_body_benefits_data}
                  key={item?.text + index}
                >
                  <CachedImage
                    isNextImage
                    imageDimensions={{ width: 100, height: 100 }}
                    url={item?.icon}
                    imgixSizes="(min-width: 992px) 30vw,(min-width: 720px) 80vw, (min-width: 540px) 50vw, 50vw"
                  />
                  <div
                    className={style.levelUpContainer__cards_body_benefits_text}
                  >
                    {item?.text || ""}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}

          {data?.shop_more?.enable_shop_more ? (
            <div className={style.levelUpContainer__cards_footer}>
              <div className={style.levelUpContainer__cards_footer_title}>
                {data?.shop_more?.benefits?.title || ""}
              </div>
              {shopMore && Array.isArray(shopMore) && !!shopMore.length ? (
                <div className={style.levelUpContainer__cards_footer_list}>
                  {shopMore?.map((list, index) => (
                    <li key={list + index}>{list}</li>
                  ))}
                </div>
              ) : (
                <></>
              )}
              <div className={style.levelUpContainer__cards_footer_button}>
                <MyCustomLink href={data?.shop_more?.button_url || "/"}>
                  <button>SHOP NOW</button>
                </MyCustomLink>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };

  return (
    <div className={style.levelUpContainer}>
      <MembershipCard data={membershipLevel?.membership_level} />
    </div>
  );
};

export default MemberTab;
