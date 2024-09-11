import React from "react";
import styles from "../scss/index.module.scss";
import Image from "next/image";
import { imageLoader } from "@utils/misc";

const GiftBoxCardDesktop = ({ item, defaultBox, setDefaultBox, collectionData, setUpdatedCollectionData }) => {
    const { img_desk, img_mob } = item;
    return (
        <div className={styles.giftBoxHeader_cardBox}>
            <div
                className={`${styles.giftBoxHeader_card} ${item?.box === defaultBox ? styles.giftBoxHeader_card_active : ""}`}
                onClick={() => {
                    setDefaultBox(item?.box);
                    setUpdatedCollectionData(collectionData[item?.box]);
                }}>
                <div className={styles.giftBoxHeader_card_header}>
                    <div className={styles.giftBoxHeader_card_header_boxDetails}>Build Your Own Box</div>
                    <div className={styles.giftBoxHeader_card_header_boxDetails}>
                        <span className={styles.giftBoxHeader_card_header_boxName}>{item?.type}</span>
                        <span className={styles.giftBoxHeader_card_header_price}>{item?.price}</span>
                    </div>
                </div>
                <div className={styles.giftBoxHeader_card_content}>
                    <div className={styles.giftBoxHeader_card_image_desk}>
                        {
                            img_desk ?
                                <Image
                                    loader={imageLoader}
                                    data-gumlet="false"
                                    src={img_desk}
                                    alt={"image"}
                                    priority={true}
                                    width="100%"
                                    height="100%"
                                    //  layout="fill"
                                    className={styles.cardImage}
                                />
                                : <div className={styles.cardImage}></div>
                        }
                    </div>
                    <div className={styles.giftBoxHeader_card_image_mob}>
                        {
                            img_mob ?
                                <Image
                                    loader={imageLoader}
                                    data-gumlet="false"
                                    src={img_mob}
                                    alt={"image"}
                                    priority={true}
                                    width="100%"
                                    height="100%"
                                    //  layout="fill"
                                    className={styles.cardImage}
                                />
                                : <div className={styles.cardImage}></div>
                        }
                    </div>
                    {/* <button className={styles.giftBoxHeader_card_content_shopBtn}>SHOP NOW</button> */}
                </div>
            </div>
        </div>
    );
};

export default GiftBoxCardDesktop;
