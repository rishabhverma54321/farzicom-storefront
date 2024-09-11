import React from "react";
import { ConstructImageSchema } from "@temp/core/SEO/Image/imageSchema";

import { PlaceholderImage } from "@components/atoms/PlaceholderImage";
// import { useNetworkStatus } from "@hooks/useNetworkStatus";
import NoPhoto from "images/no-photo.svg";

import { IImage } from "@types";
import Imgix from "react-imgix";
import { IMAGE_CDN_PROVIDERS, IMAGE_CDN } from "Themes/config";
import { useImageURLReplaceWithCDN } from "@utils/misc";
import Image from "next/image";

export const CachedImage: React.FC<IImage> = ({
  url,
  url2x,
  alt,
  children,
  defaultImage = NoPhoto,
  className,
  isStaticImage,
  imgixSizes,
  imgixProps,
  imageDimensions,
  isNextImage,
  nextImageLayout,
  NextImagePriority = false,
  nextImageObjectFit,
  disablePlaceholder,
  ...props
}: IImage) => {
  const [isUnavailable, setUnavailable] = React.useState(false);
  // const { online } = useNetworkStatus();

  // React.useEffect(() => {
  //   updateAvailability();
  // }, [online]);

  const schemaObj = {
    url: url || url2x,
    name: alt,
    author: "plixlife",
  };

  async function updateAvailability() {
    const _isUnavailable = false;
    if ("caches" in window) {
      // if (!online) {
      //   const match = await window.caches.match(url!);
      //   let match2x;
      //   if (url2x) {
      //     match2x = await window.caches.match(url2x);
      //   }
      //   if (!match && !match2x) {
      //     _isUnavailable = true;
      //   }
      // }
    }

    if (isUnavailable !== _isUnavailable) {
      setUnavailable(_isUnavailable);
    }
  }

  if (!url || isUnavailable) {
    return (
      disablePlaceholder ? children || <></>  :
      children || <PlaceholderImage className={className || ""} alt={alt} />
    );
  }

  // if (!url || isUnavailable) {
  //   return (
  //     children || <PlaceholderImage className={className || ""} alt={alt} />
  //   );
  // }

  if (isStaticImage || !IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN)
    return (
      <>
        <ConstructImageSchema data={schemaObj} />
        <img
          src={url}
          alt={alt}
          {...props}
          width={imageDimensions?.width}
          height={imageDimensions?.height}
        />
      </>
    );

  if (isNextImage && IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN) {
    const replacedUrl = decodeURIComponent(useImageURLReplaceWithCDN(url));
    return (
      <>
        <ConstructImageSchema data={schemaObj} />
        <Image
          src={replacedUrl}
          alt={alt}
          width={imageDimensions?.width}
          sizes={
            imgixSizes ||
            "(min-width: 992px) 30vw,(min-width: 720px) 80vw, (min-width: 540px) 50vw, 50vw"
          }
          priority={NextImagePriority}
          height={imageDimensions?.height}
          className={className}
          layout={nextImageLayout}
          objectFit={nextImageObjectFit}
          {...props}
        />
      </>
    );
  }

  if (IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN) {
    const replacedUrl = decodeURIComponent(useImageURLReplaceWithCDN(url));
    return (
      <>
        <ConstructImageSchema data={schemaObj} />
        <Imgix
          src={replacedUrl}
          sizes={
            imgixSizes ||
            "(min-width: 992px) 30vw,(min-width: 720px) 80vw, (min-width: 540px) 50vw, 50vw"
          }
          imgixParams={{ sharp: 20 }}
          width={imageDimensions?.width}
          height={imageDimensions?.height}
          {...imgixProps}
          className={className}
          htmlAttributes={{ alt }}
          {...props}
        />
      </>
    );
  }

  return (
    <>
      <ConstructImageSchema data={schemaObj} />
      <img src={url} alt={alt} {...props} />
    </>
  );
};
