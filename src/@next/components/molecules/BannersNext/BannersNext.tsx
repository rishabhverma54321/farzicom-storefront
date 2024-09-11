import React, { useCallback } from "react";
import Image from "next/image";
import { CustomizeButton } from "@components/atoms/CustomizeButton";
import { IMAGE_CDN, IMAGE_CDN_PROVIDERS } from "Themes/config";
import MyCustomLink from "@components/next-react/MyCustomLink";
import Imgix, { SharedImigixAndSourceProps } from "react-imgix";
import styles from "./index.module.scss";
import { getMetadataValue, useImageURLReplaceWithCDN } from "@utils/misc";
import * as S from "./styles";

export interface ImageDimensions {
  width?: number;
  height?: number;
}
export interface Data {
  image?: string;
  imgixProps?: SharedImigixAndSourceProps;
  imageDimensions?: ImageDimensions;
  topText?: string;
  middleText?: string;
  bottomText?: string;
  navigation?: string;
  description?: string | React.ReactNode;
  backgroundColor?: string;
  button?: {
    text: string;
    link: string;
    handleClick?: () => void;
  };
}
export interface IBannersNextProps {
  content: Data;
  priority: boolean;
}

export const BannersNext: React.FC<IBannersNextProps> = ({
  content,
  priority,
}) => {
  let imageUrl =
    content &&
    content.image &&
    typeof content.image === "string" &&
    useImageURLReplaceWithCDN(content?.image);

  if (typeof imageUrl !== "boolean" && imageUrl?.includes(".gif")) {
    imageUrl = imageUrl?.split("?")[0];
  }

  return (
    <>
      <S.BannerNextMain
        color={content.backgroundColor}
        className={styles.BannersNext}
      >
        {content && content.image && (
          <div className={styles.BannersNextImage}>
            {content.navigation !== undefined ? (
              <MyCustomLink href={content.navigation || "/"}>
                {typeof content.image === "string" &&
                imageUrl &&
                IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN &&
                !imageUrl.includes(".gif") ? (
                  <Image
                    src={imageUrl}
                    priority={priority}
                    width={640}
                    height={600}
                  />
                ) : (
                  <>
                    {typeof content.image === "string" && imageUrl ? (
                      <Image
                        src={imageUrl}
                        priority={priority}
                        width={640}
                        height={600}
                      />
                    ) : (
                      <>{content.image}</>
                    )}
                  </>
                )}
              </MyCustomLink>
            ) : (
              <>
                {typeof content.image === "string" &&
                IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN &&
                imageUrl &&
                !imageUrl.includes(".gif") ? (
                  <Image
                    src={imageUrl}
                    priority={priority}
                    width={640}
                    height={600}
                  />
                ) : (
                  <>
                    {typeof content.image === "string" && imageUrl ? (
                      <Image
                        src={imageUrl}
                        priority={priority}
                        width={640}
                        height={600}
                      />
                    ) : (
                      <>{content.image}</>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
        <div className={styles.BannersNextContent}>
          {content && content.topText && (
            <div>
              {content.navigation !== undefined ? (
                <MyCustomLink href={content.navigation || "/"}>
                  {typeof content.topText === "string" ? (
                    <div className={styles.BannersNextTitleA}>
                      {content.topText}
                    </div>
                  ) : (
                    content.topText
                  )}
                </MyCustomLink>
              ) : (
                <>
                  {typeof content.topText === "string" ? (
                    <div className={styles.BannersNextTitleA}>
                      {content.topText}
                    </div>
                  ) : (
                    content.topText
                  )}
                </>
              )}
            </div>
          )}
          {content && content.middleText && (
            <div>
              {content.navigation !== undefined ? (
                <MyCustomLink href={content.navigation || "/"}>
                  {typeof content.middleText === "string" ? (
                    <div className={styles.BannersNextTitleB}>
                      {content.middleText}
                    </div>
                  ) : (
                    content.middleText
                  )}
                </MyCustomLink>
              ) : (
                <>
                  {typeof content.middleText === "string" ? (
                    <div className={styles.BannersNextTitleB}>
                      {content.middleText}
                    </div>
                  ) : (
                    content.middleText
                  )}
                </>
              )}
            </div>
          )}
          {content && content.bottomText && (
            <div>
              {content.navigation !== undefined ? (
                <MyCustomLink href={content.navigation || "/"}>
                  {typeof content.bottomText === "string" ? (
                    <div className={styles.BannersNextTitleC}>
                      {content.bottomText}
                    </div>
                  ) : (
                    content.bottomText
                  )}
                </MyCustomLink>
              ) : (
                <>
                  {typeof content.bottomText === "string" ? (
                    <div className={styles.BannersNextTitleC}>
                      {content.bottomText}
                    </div>
                  ) : (
                    content.bottomText
                  )}
                </>
              )}
            </div>
          )}
          {content && content.description && (
            <div>
              {typeof content.description === "string" ? (
                <div className={styles.BannersNextDescription}>
                  {content.description}
                </div>
              ) : (
                content.description
              )}
            </div>
          )}

          {content && content.button && content.button.text && (
            <div className={styles.BannersNextButton}>
              <CustomizeButton
                text={content.button.text}
                link={content.button?.link || content.navigation}
                handleClick={content.button.handleClick}
                buttonClass={styles.BannersNextButtonInner}
              />
            </div>
          )}
        </div>
      </S.BannerNextMain>
    </>
  );
};
BannersNext.displayName = "BannersNext";
export default React.memo(BannersNext);
