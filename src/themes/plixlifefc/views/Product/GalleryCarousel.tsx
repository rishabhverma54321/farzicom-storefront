import * as React from "react";
import Media from "react-media";
import { CachedImage } from "@components/molecules/CachedImage";
// import Carousel from "@temp/components/ProductCarousel";
// import { Carousel } from "@temp/components";
import { Carousel } from "react-responsive-carousel";
import { mediumScreen } from "@styles/constants";
import * as S from "./style";

import { imageURLReplaceWithCDN } from "@utils/misc";
import { HomePageEntireQuery_section_edges_node_children_edges_node_images_edges_node } from "../Home/gqlTypes/HomePageEntireQuery";
import { ProductDetails_product_images } from "./gqlTypes/ProductDetails";
import { NO_PHOTO_PLACEHOLDER } from "../../config";

const GalleryCarousel: React.FC<{
  images: (
    | ProductDetails_product_images
    | HomePageEntireQuery_section_edges_node_children_edges_node_images_edges_node
  )[];
  mobileCarouselProps?: {
    infiniteLoop?: boolean;
    autoPlay?: boolean;
    showThumbs?: boolean;
    showIndicators?: boolean;
    showStatus?: boolean;
    showArrows?: boolean;
  };
  desktopCarouselProps?: {
    infiniteLoop?: boolean;
    autoPlay?: boolean;
    showThumbs?: boolean;
    showIndicators?: boolean;
    showStatus?: boolean;
    showArrows?: boolean;
  };
  variantId: string;
  discountBanner: any;
  onChange?:()=> void;
}> = ({
  images,
  desktopCarouselProps,
  mobileCarouselProps,
  variantId,
  discountBanner,
  onChange
}) => {
  const [selectedProductImage, setSelectedProductImage] = React.useState(0);
  // const [showCarousel, setShowCarousel] = React.useState(false);
  React.useEffect(() => {
    setSelectedProductImage(0);
    // setShowCarousel(true);
  }, [variantId]);
  const moreThanOne = images.length > 1;
  const discountImageUrlImgixScr =
    discountBanner && discountBanner?.image
      ? imageURLReplaceWithCDN(discountBanner?.image) ||
        discountBanner?.image
      : "";

  const carousel = (carouselProps: any) => (
    <>
      <div className="product-page__product__gallery">
        <Carousel
          infiniteLoop={
            carouselProps && carouselProps.infiniteLoop
              ? carouselProps.infiniteLoop
              : moreThanOne
          }
          autoPlay={
            carouselProps && carouselProps.autoPlay
              ? carouselProps.autoPlay
              : false
          }
          showThumbs={
            carouselProps && carouselProps.showThumbs
              ? carouselProps.showThumbs
              : false
          }
          showIndicators={
            carouselProps && carouselProps.showIndicators
              ? carouselProps.showIndicators
              : false
          }
          showStatus={
            carouselProps && carouselProps.showStatus
              ? carouselProps.showStatus
              : false
          }
          showArrows={
            carouselProps && carouselProps.showArrows
              ? carouselProps.showArrows
              : false
          }
          selectedItem={selectedProductImage}
          onChange={e => {
            setSelectedProductImage(e);
            onChange();
          }}
        >
          {images.map((image, index) => {
            const imageUrlImgixScr = imageURLReplaceWithCDN(image.url);
            return (
              <CachedImage
                url={imageUrlImgixScr || NO_PHOTO_PLACEHOLDER}
                key={image.id}
                imageDimensions={{
                  height: 380,
                  width: 380,
                }}
                NextImagePriority={index == 0}
                imgixSizes="(min-width: 992px) 30vw,(min-width: 720px) 80vw, (min-width: 540px) 50vw, 50vw"
                isNextImage
                alt={image.alt}
              >
                <img
                  src={imageUrlImgixScr || NO_PHOTO_PLACEHOLDER}
                  alt={image.alt}
                />
              </CachedImage>
            );
          })}
        </Carousel>
      </div>
    </>
  );
  return (
    <>
      <S.GalleryCarousel backgroundImage={discountImageUrlImgixScr}>
        <Media query={{ maxWidth: mediumScreen }}>
          {matches =>
            matches ? (
              carousel(mobileCarouselProps)
            ) : (
              <Media query={{ minWidth: mediumScreen }}>
                {matches => matches && carousel(desktopCarouselProps)}
              </Media>
            )
          }
        </Media>
      </S.GalleryCarousel>
    </>
  );
};

export default React.memo(GalleryCarousel);
