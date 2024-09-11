import React from "react";
import CustomLink from "@components/atoms/CustomLink";
import {
  getMenuUrl,
  getMetadataValue,
  useImageURLReplaceWithCDN,
} from "@utils/misc";
import Image from "next/image";
import { IMAGE_CDN_PROVIDERS, IMAGE_CDN } from "Themes/config";
import ReactSVG from "react-svg";
import Arrow from "images/arrow-next.svg";
import MemoNavArrow from "@components/atoms/SvgIcons/MemoNavArrow";
import { useWindowWidth } from "@hooks";

export default function ProductTile({ child, index, hideOverlayHandler }) {
  const url = getMenuUrl(child);
  const childMetadata = child.collection.metadata;
  const backgroundImage =
    childMetadata &&
    getMetadataValue(childMetadata, "subNavbarCard") &&
    JSON.parse(getMetadataValue(childMetadata, "subNavbarCard"));
  const numberOfProducts = child.collection.products.totalCount;
  if (!(backgroundImage && backgroundImage.image)) {
    return <></>;
  }
  const imageUrlImgixScr = useImageURLReplaceWithCDN(backgroundImage?.image);

  const [width] = useWindowWidth();

  return (
    <div
      className="productTile"
      onClick={() => hideOverlayHandler()}
      key={index}
    >
      {width > 992 ? (
        <>
          {" "}
          {backgroundImage && backgroundImage.image && (
            <div className="plixlife-main-menu__nav-dropdown__body__withImagesContainer__imageDiv">
              <CustomLink to={url}>
                {imageUrlImgixScr &&
                imageUrlImgixScr !== "" &&
                IMAGE_CDN_PROVIDERS[IMAGE_CDN].useCDN ? (
                  <Image
                    src={useImageURLReplaceWithCDN(backgroundImage.image)}
                    alt={backgroundImage.title}
                    width="280px"
                    height="240px"
                  />
                ) : (
                  <Image
                    src={backgroundImage.image}
                    alt={backgroundImage.title}
                    width="280px"
                    height="240px"
                  />
                )}
              </CustomLink>
              <div className="plixlife-main-menu__nav-dropdown__body__withImagesContainer__textContainer">
                <div className="plixlife-main-menu__nav-dropdown__body__withImagesContainer__textContainer__title">
                  {backgroundImage.title}
                </div>
                <div>
                  <CustomLink to={url}>
                    <MemoNavArrow />
                  </CustomLink>
                </div>
                {/* <div className="plixlife-main-menu__nav-dropdown__body__withImagesContainer__textContainer__subTitle">
                    {numberOfProducts > 100 ? "100+" : numberOfProducts}{" "}
                    Products
                  </div> */}
              </div>
              {/* <ReactSVG className="cta" path={Arrow} /> */}
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
