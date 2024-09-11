import Star from "@components/atoms/SvgIcons/Star";
import { ShopMetaContext } from "@temp/pages/_app";
import { customEventTrigger, getMetadataValue, parseJson } from "@utils/misc";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import GreenStarNew from "@components/atoms/SvgIcons/Green_star";
import styles from './index.module.scss';
import { useAuthState } from "@saleor/sdk";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import Link from "next/link";

export interface IOurStoryProps {
    content: any;
    breadcrumbs: any;
}
    export const OurStory2 = ({content,breadcrumbs}) => {
    const [showAfterJS, setShowAfterJS] = useState(true);
    const metadata = content?.metadata;

    const {user}=  useAuthState();

    const bannerData =
    metadata &&
    getMetadataValue(metadata, "bannerData") &&
    parseJson(getMetadataValue(metadata, "bannerData"));

    const relentlesslyCleanData =
    metadata &&
    getMetadataValue(metadata, "relentlesslyClean") &&
    parseJson(getMetadataValue(metadata, "relentlesslyClean"));

    const commitedToInnovation =
    metadata &&
    getMetadataValue(metadata, "commitedToInnovation") &&
    parseJson(getMetadataValue(metadata, "commitedToInnovation"));

    const nutritionPurpose =
    metadata &&
    getMetadataValue(metadata, "nutritionPurpose") &&
    parseJson(getMetadataValue(metadata, "nutritionPurpose"));

    const beautifulData =
    metadata &&
    getMetadataValue(metadata, "beautifulData") &&
    parseJson(getMetadataValue(metadata, "beautifulData"));

    const featuredata =
    metadata &&
    getMetadataValue(metadata, "featuredata") &&
    parseJson(getMetadataValue(metadata, "featuredata"));

    const pledgedata =
    metadata &&
    getMetadataValue(metadata, "pledgedata") &&
    parseJson(getMetadataValue(metadata, "pledgedata"));

      const TextStripNew = () => {
        const textStripSection = true;
          const ShopMetaContextValue = React.useContext(ShopMetaContext);
    
          const textStripSectionData = 
          getMetadataValue(ShopMetaContextValue, "footertextstripdata") &&
          parseJson(getMetadataValue(ShopMetaContextValue, "footertextstripdata"));
    
        if (textStripSection && textStripSectionData)
          return (
            <>
            <div className={styles.homepage_textstripsection}>
              {textStripSection && (
                <div className={styles.textStripSection}>
                  {showAfterJS ? (
                    <Marquee speed={40}>
                      {textStripSectionData.map((text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
                        <div className={styles.textItem}>
                          <GreenStarNew />
                          <span>{text}</span>
                        </div>
                      ))}
                      {textStripSectionData.map((text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
                        <div className={styles.textItem}>
                          <GreenStarNew />
                          <span>{text}</span>
                        </div>
                      ))}
                    </Marquee>
                  ) : (
                    <>
                      {textStripSectionData.map((text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
                        <div className={styles.textItem}>
                          <Star />
                          <span>{text}</span>
                        </div>
                      ))}
                      {textStripSectionData.map((text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
                        <div className={styles.textItem}>
                          <Star />
                          <span>{text}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
    
            </div>
            </>
          );
    
        return <> </>;
      };

    return(
        <>
        {bannerData && 
           <section className={styles.our_story_banner_section}>
            <div className={styles.ourstory_container}>
                <div className={styles.our_story_banner_row}>
                <div className={styles.left_col}>
                    <h1>{bannerData?.cardData?.title}</h1>
                    <p>
                    {bannerData?.cardData?.description}
                    </p>
                    <span className={`${styles.ourstory_btn} ${styles.btn_neutral}`} onClick={() => {
                        customEventTrigger(gtmConfig.shopNowCta.value, user, {
                          heading_name: "Our Story - top",
                        });
                      }}>
                      <Link  
                      href={bannerData?.cardData?.button?.link}>{bannerData?.cardData?.button?.text}
                      </Link>
                    </span>
                    
                </div>
                <div className={styles.right_col}>
                    <div className={styles.video_play}>
                        <div className={styles.video_container}>
                        <iframe width="100%" height="100%"
                            src={bannerData?.cardData?.video}>
                        </iframe>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        }
            <TextStripNew />

            {relentlesslyCleanData && 
              <section className={styles.image_text_section}>
                <div className={styles.ourstory_container}>
                    <div className={styles.image_text_col}>
                    <div className={styles.image_col}>
                        <img src={relentlesslyCleanData?.image} alt="" />
                    </div>
                    <div className={styles.text_col}>
                        <h2>{relentlesslyCleanData?.title}</h2>
                        <p>
                        {relentlesslyCleanData?.description}
                        </p>
                        <p>
                        <strong>{relentlesslyCleanData?.subtext}
                            </strong>
                        </p>
                    </div>
                    </div>
                    <div className={styles.image_text_col}>
                    <div className={styles.image_col}>
                        <img src={commitedToInnovation?.image} alt="" />
                    </div>
                    <div className={styles.text_col}>
                        <h2>{commitedToInnovation?.title}</h2>
                        <p>
                        {commitedToInnovation?.description}
                        </p>
                    </div>
                    </div>
                </div>
              </section>
            
            }

            {featuredata && 
              <section className={styles.our_stoty_section_2}>
                <div className={styles.ourstory_container}>
                    <div className={styles.icon_with_text_des_grid}>
                        {featuredata && featuredata?.featureData?.length>0 && 
                        featuredata?.featureData.map(d=>(
                            <div className={styles.icon_with_text_des}>
                            <div className={styles.icon}>
                                <img src={d?.imgUrl} />
                            </div>
                            <div className={styles.icon_body}>
                            <h4 className={styles.icon_title}>
                                {d?.title}
                            </h4>
                            <p className={styles.icon_desc}>
                                {d?.description}
                            </p>
                            </div>
                        </div>
                        ))
                        }
                    </div>
                    <div className={`${styles.button_container} ${styles.text_center}`}>
                    <a onClick={()=> {
                       customEventTrigger(gtmConfig.shopNowCta.value, user, {
                        heading_name: "Our Story - bottom",
                      });
                    }} className={`${styles.ourstory_btn} ${styles.btn_lime_green} ${styles.btn_shop_now}`} href={featuredata?.button?.url} >{featuredata?.button?.text}</a>
                    </div>
                </div>
              </section>
            
            }

            {pledgedata && 
              <section className={styles.our_stoty_section_3}>
                <div className={styles.ourstory_container}>
                    <div className={styles.icon_with_text_des}>
                    <div className={styles.icon}>
                        <img src={pledgedata?.imgUrl} alt="" />
                    </div>
                    <div className={styles.icon_body}>
                        <h2 className={styles.icon_title}>{pledgedata?.title}</h2>
                        <p className={styles.icon_desc}>
                        {pledgedata?.description}
                        </p>
                        <a className={styles.text_link} href={pledgedata?.button?.url}>{pledgedata?.button?.text}</a>
                    </div>
                    </div>
                </div>
              </section>
            
            }
            
        </>
    );
}

OurStory2.displayName = "OurStory2";
export default OurStory2;