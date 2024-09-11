import * as React from "react";
import Media from "react-media";
import { CachedImage } from "@components/molecules/CachedImage";
import Image from "next/image";

// import { Carousel } from "@temp/components";
import { Carousel } from "react-responsive-carousel";
import { mediumScreen } from "@styles/constants";

import noPhotoImg from "images/no-photo.svg";
import { ProductDetails_product_images } from "./gqlTypes/ProductDetails";
import VideoCard from "@components/molecules/VideoCard";
import { useImageURLReplaceWithCDN } from "@utils/misc";

const GalleryCarousel: React.FC<{
  images: ProductDetails_product_images[];
  videos?: any;
}> = ({ images, videos }) => {
  const moreThanOne = images.length > 1;

  const getVideoThumb = videoId =>
    `https://img.youtube.com/vi/${videoId}/default.jpg`;

  const getVideoId = url => {
    const videoId = url?.substring(
      "https://www.youtube.com/embed/".length,
      url?.indexOf("/?") || url?.indexOf("?") || url?.length
    );

    return videoId;
  };

  const customRenderThumb = children => {
    const flattenedChildren = children?.flat();
    return flattenedChildren.map((item, index) => {
      if (item?.props?.url) {
        return <img key={index} src={item?.props?.url} />;
      }
      const videoId = getVideoId(item?.props?.children?.props?.content?.video);
      return (
        <div className="video-thumbnail-container">
          <img
            key={index}
            src={
              item?.props?.children?.props?.content?.thumbnail ||
              getVideoThumb(videoId)
            }
            className="video-thumbnail-image"
          />
          <div>
            <svg
              className="video-thumbnail-svg"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 142.448 142.448"
            >
              <g>
                <path
                  d="M142.411,68.9C141.216,31.48,110.968,1.233,73.549,0.038c-20.361-0.646-39.41,7.104-53.488,21.639
		C6.527,35.65-0.584,54.071,0.038,73.549c1.194,37.419,31.442,67.667,68.861,68.861c0.779,0.025,1.551,0.037,2.325,0.037
		c19.454,0,37.624-7.698,51.163-21.676C135.921,106.799,143.033,88.377,142.411,68.9z M111.613,110.336
		c-10.688,11.035-25.032,17.112-40.389,17.112c-0.614,0-1.228-0.01-1.847-0.029c-29.532-0.943-53.404-24.815-54.348-54.348
		c-0.491-15.382,5.122-29.928,15.806-40.958c10.688-11.035,25.032-17.112,40.389-17.112c0.614,0,1.228,0.01,1.847,0.029
		c29.532,0.943,53.404,24.815,54.348,54.348C127.91,84.76,122.296,99.306,111.613,110.336z"
                />
                <path
                  d="M94.585,67.086L63.001,44.44c-3.369-2.416-8.059-0.008-8.059,4.138v45.293
		c0,4.146,4.69,6.554,8.059,4.138l31.583-22.647C97.418,73.331,97.418,69.118,94.585,67.086z"
                />
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </div>
        </div>
      );
    });
  };

  const carousel = (showThumbs: boolean) => {
    if (videos) {
      return (
        <>
          <div className="product-page__product__gallery">
            <Carousel
              infiniteLoop={moreThanOne}
              autoPlay={false}
              showThumbs={showThumbs}
              showIndicators={moreThanOne}
              showStatus={false}
              showArrows={false}
              renderThumbs={customRenderThumb}
            >
              {images.map(image => {
                const imageUrlImgixScr = useImageURLReplaceWithCDN(image.url);
                return (
                  <CachedImage
                    url={imageUrlImgixScr || noPhotoImg}
                    key={image.id}
                    imageDimensions={{
                      height: 450,
                      width: 450,
                    }}
                  >
                    <img src={imageUrlImgixScr || noPhotoImg} alt={image.alt} />
                  </CachedImage>
                );
              })}

              {videos?.map((video, index) => {
                return (
                  <>
                    <VideoCard
                      cardClass="productGalleryVideo"
                      content={{
                        video: video?.url,
                        thumbnail: video?.thumbnail,
                      }}
                      key={index}
                    />
                  </>
                );
              })}
            </Carousel>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="product-page__product__gallery">
          <Carousel
            infiniteLoop={moreThanOne}
            autoPlay={false}
            showThumbs={showThumbs}
            showIndicators={moreThanOne}
            showStatus={false}
            showArrows={false}
          >
            {images.map((image, index) => {
              const imageUrlImgixScr = useImageURLReplaceWithCDN(image.url);
              return (
                <Image
                  src={imageUrlImgixScr || noPhotoImg}
                  alt={image?.alt || "Product Image"}
                  width={450}
                  height={450}
                  priority={index === 0}
                />
              );
              // return (
              //   <CachedImage
              //     url={imageUrlImgixScr || noPhotoImg}
              //     key={image.id}
              //     imageDimensions={{
              //       height: 450,
              //       width: 450,
              //     }}
              //   >
              //     <img src={imageUrlImgixScr || noPhotoImg} alt={image.alt} />
              //   </CachedImage>
              // );
            })}
          </Carousel>
        </div>
      </>
    );
  };

  return (
    <Media query={{ maxWidth: mediumScreen }}>
      {matches =>
        matches ? (
          carousel(false)
        ) : (
          <Media query={{ minWidth: mediumScreen }}>
            {matches => matches && carousel(true)}
          </Media>
        )
      }
    </Media>

    // <div className="product-page__product__gallery">
    //   <Carousel
    //     infiniteLoop={moreThanOne}
    //     autoPlay={false}
    //     // showThumbs={false}
    //     showIndicators={moreThanOne}
    //     showStatus={false}
    //     showArrows={false}
    //   >
    //     {images.map(image => (
    //       <CachedImage url={image.url || noPhotoImg} key={image.id}>
    //         <img src={image.url || noPhotoImg} alt={image.alt} />
    //       </CachedImage>
    //     ))}
    //   </Carousel>
    // </div>
  );
};

export default GalleryCarousel;
