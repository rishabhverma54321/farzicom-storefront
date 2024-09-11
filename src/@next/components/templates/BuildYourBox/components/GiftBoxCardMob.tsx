import React from "react";
import styles from "../scss/index.module.scss";
import Image from "next/image";
import { imageLoader } from "@utils/misc";

const GiftBoxCardMob = ({ item, defaultBox, setDefaultBox, collectionData, setUpdatedCollectionData, giftBoxes }) => {
    const { img_desk, img_mob } = item;
    return (
        <div
            className={`${styles.box} ${item?.box === defaultBox ? styles.box_active : ""
                } ${giftBoxes?.length > 2 ? styles.box3 : ""}`}
            onClick={() => {
                setDefaultBox(item?.box);
                setUpdatedCollectionData(collectionData[item?.box]);
            }}
            style={{width: "100%", marginRight: "8px"}}
        >
            <div className={styles.box_carousel_image_desk}>
                {img_desk ? <Image
                    loader={imageLoader}
                    data-gumlet="false"
                    src={img_desk}
                    alt={"image"}
                    priority={true}
                    width="100%"
                    height="100%"
                    //  layout="fill"
                    className={styles.cardImage}
                /> : <div className={styles.cardImage}></div>}
            </div>
            <div className={styles.box_carousel_image_mob}>
                {img_mob ? <Image
                    loader={imageLoader}
                    data-gumlet="false"
                    src={img_mob}
                    alt={"image"}
                    priority={true}
                    width="100%"
                    height="100%"
                    //  layout="fill"
                    className={styles.cardImage}
                /> : <div className={styles.cardImage}></div>}
            </div>
            <div className={styles.box_type}>
                <p>{item?.type || ""}</p>
                <p>{item?.price || ""}</p>
            </div>
        </div>
    );
};

export default GiftBoxCardMob;
