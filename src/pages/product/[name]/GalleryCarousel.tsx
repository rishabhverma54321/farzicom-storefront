import * as React from "react";
import Media from "react-media";
import { CachedImage } from "@components/molecules/CachedImage";

// import { Carousel } from "@temp/components";
import { Carousel } from "react-responsive-carousel";
import { mediumScreen } from "@styles/constants";

import noPhotoImg from "images/no-photo.svg";
import { ProductDetails_product_images } from "./gqlTypes/ProductDetails";
import { HomePageEntireQuery_section_edges_node_children_edges_node_images_edges_node } from "../../themes/plixlife/views/Home/gqlTypes/HomePageEntireQuery";

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
}> = ({ images, desktopCarouselProps, mobileCarouselProps }) => {
  const moreThanOne = images.length > 1;

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
        >
          {images.map(image => (
            <CachedImage url={image.url || noPhotoImg} key={image.id}>
              <img src={image.url || noPhotoImg} alt={image.alt} />
            </CachedImage>
          ))}
        </Carousel>
      </div>
    </>
  );
  return (
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
