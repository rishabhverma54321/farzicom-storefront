import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductDetails_product_images } from "./gqlTypes/ProductDetails";
import Carousel from "@temp/components/ProductCarousel";
import Image from "next/image";
import { imageURLReplaceWithCDN } from "@utils/misc";
import Media from "react-media";
import { largeScreen } from "@styles/constants";
import { useWindowWidth } from "@hooks";

const NewGalleryCarousel: React.FC<{
  images: ProductDetails_product_images[];
  videos?: any;
}> = ({ images, videos }) => {
  const [width] = useWindowWidth();
  return (
    <>
      <Carousel
        slidesOnDesktop={1}
        slidesOnMobile={1}
        slidesOnTab={1}
        dots={true}
        arrows={false}
        swipeToSlide={true}
        customPaging={i => {
          if (images[i]?.url) {
            if (width > 720) {
              return (
                <Image
                  src={imageURLReplaceWithCDN(images[i]?.url)}
                  alt={images[i]?.alt || "Product Image"}
                  width={60}
                  height={60}
                  className="product-gallery-dots-image"
                />
              );
            }
            return <div className="product-gallery-dots" />;
          }

          return <> </>;
        }}
      >
        {images.map((image, index) => {
          const imageUrlImgixScr = imageURLReplaceWithCDN(image.url);

          return (
            <Image
              src={imageUrlImgixScr}
              alt={image?.alt || "Product Image"}
              width={450}
              height={450}
              priority={index === 0}
              className="product-gallery-image"
            />
          );
        })}
      </Carousel>
    </>
  );
};

export default NewGalleryCarousel;
