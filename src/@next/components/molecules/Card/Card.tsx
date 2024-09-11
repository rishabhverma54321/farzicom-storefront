import { CustomizeButton } from "@components/atoms/CustomizeButton";
import { CustomLink } from "@components/atoms/CustomLink";
import { IMAGE_CDN, IMAGE_CDN_PROVIDERS } from "Themes/config";
import { useImageURLReplaceWithCDN } from "@utils/misc";
import React, { useState } from "react";
import MyCustomLink from "@components/next-react/MyCustomLink";

import Imgix, { SharedImigixAndSourceProps } from "react-imgix";
import LazyLoad from "react-lazyload";
import { Markup } from "interweave";
import * as S from "./style";
import MemoNewTransformationTick from "@components/atoms/SvgIcons/NewTranfomationTick";

export interface ImageDimensions {
  width?: number;
  height?: number;
}
export interface Data {
  image?: string | React.ReactNode;
  imgixProps?: SharedImigixAndSourceProps;
  imageDimensions?: ImageDimensions;
  title?: string | React.ReactNode;
  navigation?: string;
  description?: string | React.ReactNode;
  textHtml?: string;
  button?: {
    text: string;
    link: string;
    leftIcon?: string;
    rightIcon?: string;
    handleClick?: () => void;
  };
}
export interface ICardProps {
  content: Data;
  cardClass: string;
  disableLazyload?:boolean;
  showMoreToggle?:boolean;
  isContentArray?:boolean;
  onImageClick?:() => void;
  onShowMoreToggleClick?:(isReadMore:boolean)=> void;
}

export const Card: React.FC<ICardProps> = ({ content, cardClass, disableLazyload, showMoreToggle, isContentArray, onImageClick, onShowMoreToggleClick}) => {
  let imageUrl =
    content &&
    content.image &&
    typeof content.image === "string" &&
    useImageURLReplaceWithCDN(content?.image);

  if (typeof imageUrl !== "boolean" && imageUrl?.includes(".gif")) {
    imageUrl = imageUrl?.split("?")[0];
  }
  const [showalltext, setshowalltext] = useState(false);

  return (
    <>
      <S.Card className={cardClass}>
        {content && content.image && (
          <S.ImgContainer className={`${cardClass}__image`} onClick={onImageClick}>
            {content.navigation !== undefined ? (
              <LazyLoad offset={100}>
                <CustomLink to={content.navigation || "/"}>
                  {typeof content.image === "string" &&
                  imageUrl &&
                  IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN &&
                  !imageUrl.includes(".gif") ? (
                    <Imgix
                      src={imageUrl}
                      imgixParams={{ sharp: 20 }}
                      width={content?.imageDimensions?.width}
                      height={content?.imageDimensions?.height}
                      {...content.imgixProps}
                    />
                  ) : (
                    <>
                      {typeof content.image === "string" && imageUrl ? (
                        <S.Img src={imageUrl} />
                      ) : (
                        <>{content.image}</>
                      )}
                    </>
                  )}
                </CustomLink>
              </LazyLoad>
            ) : (
              <>
                {disableLazyload ?
                 <>
                {typeof content.image === "string" &&
                  IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN &&
                  imageUrl &&
                  !imageUrl.includes(".gif") ? (
                    <Imgix
                      src={imageUrl}
                      imgixParams={{ sharp: 20 }}
                      width={content?.imageDimensions?.width}
                      height={content?.imageDimensions?.height}
                      {...content.imgixProps}
                    />
                  ) : (
                    <>
                      {typeof content.image === "string" && imageUrl ? (
                        <S.Img src={imageUrl} />
                      ) : (
                        <>{content.image}</>
                      )}
                    </>
                  )}
                 </> 
                 :
                  <>
                  <LazyLoad offset={100} height={50}>
                    {typeof content.image === "string" &&
                    IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN &&
                    imageUrl &&
                    !imageUrl.includes(".gif") ? (
                      <Imgix
                        src={imageUrl}
                        imgixParams={{ sharp: 20 }}
                        width={content?.imageDimensions?.width}
                        height={content?.imageDimensions?.height}
                        {...content.imgixProps}
                      />
                    ) : (
                      <>
                        {typeof content.image === "string" && imageUrl ? (
                          <S.Img src={imageUrl} />
                        ) : (
                          <>{content.image}</>
                        )}
                      </>
                    )}
                  </LazyLoad>
                  </>

                  }
              </>
            )}
          </S.ImgContainer>
        )}

        {content && content.title && (
          <S.CardInfo className={`${cardClass}__title`}>
            {content.navigation !== undefined ? (
              <MyCustomLink href={content.navigation || "/"}>
                {typeof content.title === "string" ? (
                  <S.Title>{content.title}</S.Title>
                ) : (
                  content.title
                )}
              </MyCustomLink>
            ) : (
              <>
                {typeof content.title === "string" ? (
                  <S.Title>{content.title}</S.Title>
                ) : (
                  content.title
                )}
              </>
            )}
          </S.CardInfo>
        )}
        {content && content.description && (
          <S.DescriptionContainer className={`${cardClass}__description`}>
            { showMoreToggle ?
            typeof content.description === "string" ? (
              <S.Description>{(content.description.length>170 && !showalltext) ? <>{content.description.slice(0,170)}<span onClick={()=> {
                setshowalltext(!showalltext)
                onShowMoreToggleClick(!showalltext);
              }}>{showalltext ? "Read Less" : "Read More"}</span></> : 
              <>
              {content.description}
              {content.description.length>170 && 
              <span onClick={()=>setshowalltext(!showalltext)}>{showalltext ? "Read Less" : "Read More"}</span>
              }
              </>
              }</S.Description>
            ) : (
              content.description
            )
            
            :
            Array.isArray(content.description) && isContentArray ? 
            content.description.map((item,index)=>(
              <S.DescriptionList key={index}>
                <span><MemoNewTransformationTick /></span>
                <S.Dcontent>{item}</S.Dcontent>
              </S.DescriptionList>

            ))
              :
            
              <S.Description>{content.description}</S.Description>
            
            }
          </S.DescriptionContainer>
        )}
        {content && content.textHtml && (
          <S.DescriptionContainer className={`${cardClass}__textHtml`}>
            {typeof content.textHtml === "string" ? (
              <S.Description>
                <Markup content={content.textHtml} />
              </S.Description>
            ) : (
              content.textHtml
            )}
          </S.DescriptionContainer>
        )}

        {content && content.button && content.button.text && (
          <CustomizeButton
            text={content.button.text}
            leftIcon={content.button.leftIcon}
            rightIcon={content.button.rightIcon}
            link={content.button?.link || content.navigation}
            buttonClass={`${cardClass}__button`}
            handleClick={content.button.handleClick}
          />
        )}
      </S.Card>
    </>
  );
};
Card.displayName = "Card";
export default React.memo(Card);