import React, { useState, useEffect, useContext } from "react";
import { Banner1, Banner2 } from "../SalesPage";
import { SectionDetailsWithoutChildrenPlix } from "@temp/themes/plixlifefc/views/Home/gqlTypes/SectionDetailsWithoutChildrenPlix";
import { getMetadataValue, parseJson } from "@utils/misc";
import styles from "./scss/index.module.scss";
import ProductDetailPopup from "@components/farzicom-ui-kit/ProductDetailPopup";
import MemoizedProductList from "@components/organisms/ProductList/ProductList";
import { useWindowWidth } from "@hooks/useWindowWidth";
import { RichTextContent } from "@components/atoms/RichTextContent";
import { FaqSection, TermsAndCondition } from "../BuildYourBoxGallery";
import { useCartState } from "@saleor/sdk";
import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import MemoProgressTick from "@components/atoms/SvgIcons/MemoProgressTick";
import { Items } from "@components/atoms/Loader/styles";
import { TypedSectionWithoutChildrenOptimized } from "@temp/themes/plixlifefc/views/Home/queries";
import LazyLoad from "react-lazyload";

export interface IBxgyProps {
  content: {
    metadata: Array<any>;
  };
  sectionData?: SectionDetailsWithoutChildrenPlix;
}

export const Bxgy: React.FC<IBxgyProps> = ({ content, sectionData }) => {
  const contentMeta = content?.metadata;
  const [width] = useWindowWidth();
  const { items, subtotalPrice } = useCartState();
  const { show } = useContext(OverlayContext);
  const defaultPopupDetails = {
    enable: false,
    price: 0,
    priceUndiscounted: 0,
  };

  const [popupstate, setpopupstate] = useState(false);
  const [productdata, setproductdata] = useState(null);
  const [popupDetails, setPopupDetails] = useState(defaultPopupDetails); //
  const [cartItemsQuantity, setCartItemsQuantity] = useState(0)
  useEffect(() => {
    let popupData = { ...defaultPopupDetails };
    if (items?.length) {
      items?.forEach(item => {
        const quantity = item?.quantity;
        const variantMetadata = item?.variant?.metadata || [];
        const metadata = item?.variant?.product?.metadata || [];
        const productConfig =
          metadata &&
          getMetadataValue(metadata, "product_config") &&
          parseJson(getMetadataValue(metadata, "product_config"));
        if (productConfig && productConfig?.is_bxgy_product) {
          const price = item?.variant?.pricing?.price?.net?.amount || 0;
          const listPrice =
            (variantMetadata &&
              getMetadataValue(variantMetadata, "listPrice") &&
              parseJson(getMetadataValue(variantMetadata, "listPrice"))) ||
            price;

          popupData = {
            enable: true,
            price: popupData?.price + Number(price) * quantity,
            priceUndiscounted:
              popupData?.priceUndiscounted + Number(listPrice) * quantity,
          };
        }
      });
      setPopupDetails(popupData);
    } else if (popupDetails?.enable) {
      setPopupDetails(defaultPopupDetails);
    }
  }, [items]);

  useEffect(()=>{
    const filterBxgyData = Array.isArray(items) && items.length > 0 ? (
      items.filter((item)=>{
        const isBxgyMetaData = item?.variant?.product?.metadata
        const product_config_data = getMetadataValue(isBxgyMetaData, "product_config") &&
                  parseJson(getMetadataValue(isBxgyMetaData, "product_config"));
        return product_config_data?.is_bxgy_product == true
      })
    ) : []
    const cartItemsQuantityData =
    (Array.isArray(filterBxgyData) && filterBxgyData.length > 0 &&
    filterBxgyData.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;
    setCartItemsQuantity(cartItemsQuantityData)
  },[subtotalPrice?.gross?.amount])

  const collections = sectionData?.section?.edges[0]?.node?.collections?.edges;
  const products = collections?.length ? collections[0]?.node?.products : null;

  const popupstateHandler = product => {
    setproductdata(product);
    setpopupstate(true);
  };

  const faqData =
    contentMeta &&
    getMetadataValue(contentMeta, "faqData") &&
    parseJson(getMetadataValue(contentMeta, "faqData"));

  const sections =
    contentMeta &&
    getMetadataValue(contentMeta, "sections") &&
    parseJson(getMetadataValue(contentMeta, "sections"));
  return (
    <>
      <Banner1 metadata={contentMeta} />
      <Banner2 metadata={contentMeta} />
      {popupstate && (
        <div className="productDetailPopup-pdp">
          <ProductDetailPopup
            productdata={productdata}
            setpopupstate={setpopupstate}
          />
        </div>
      )}
      <div className={`${styles.productList} container`}>
        {products && products?.edges?.length ? (
          <div className="byob-product-list disable_discount_percentage">
            <MemoizedProductList
              products={products?.edges.map(edge => edge.node)}
              isCarousel={false}
              showCart={false}
              slidesOnDesktop={4}
              carouselProps={{
                arrows: true,
                dots: true,
                infinite: true,
              }}
              productCardClassname="productCardByb"
              productCardContainerClass={styles.productCardContainerByb}
              from="Byob"
              productDetailPopup={
                width < 720 ? e => popupstateHandler(e) : null
              }
              showProductInfoPopup={width > 720 ? true : false}
            />
            <LazyLoad height={450} offset={50}>
              {products &&
              products?.pageInfo &&
              products?.pageInfo?.hasNextPage &&
              sections?.sectionName &&
              sections?.product_metadata ? (
                <TypedSectionWithoutChildrenOptimized
                  variables={{
                    firstPage: 1,
                    name: sections.sectionName,
                    productMetafields: sections?.product_metadata,
                    firstProducts: 100,
                    afterCursor: products?.pageInfo?.endCursor,
                  }}
                >
                  {({ data, loading }) => {
                    const sectionData =
                      (data &&
                        Array.isArray(data?.section?.edges) &&
                        data?.section?.edges[0]?.node) ||
                      null;

                    const collectionData =
                      (sectionData &&
                        Array.isArray(sectionData?.collections?.edges) &&
                        sectionData?.collections?.edges[0]?.node) ||
                      null;

                    const productsNew =
                      (collectionData &&
                        Array.isArray(collectionData?.products?.edges) &&
                        collectionData?.products?.edges) ||
                      [];
                    return (
                      <MemoizedProductList
                        products={productsNew?.map(edge => edge.node)}
                        isCarousel={false}
                        showCart={false}
                        slidesOnDesktop={4}
                        carouselProps={{
                          arrows: true,
                          dots: true,
                          infinite: true,
                        }}
                        productCardClassname="productCardByb"
                        productCardContainerClass={
                          styles.productCardContainerByb
                        }
                        from="Byob"
                        productDetailPopup={
                          width < 720 ? e => popupstateHandler(e) : null
                        }
                        showProductInfoPopup={width > 720 ? true : false}
                      />
                    );
                  }}
                </TypedSectionWithoutChildrenOptimized>
              ) : (
                <></>
              )}
            </LazyLoad>
          </div>
        ) : (
          <></>
        )}
        {faqData && <FaqSection faqData={faqData} />}
      </div>
      <TermsAndCondition content={content} />
      {popupDetails?.enable ? (
        <div className={styles.bxgy_sticky}>
          <div className={styles.bxgy_sticky_left}>
            <MemoProgressTick />
            <div className={styles.bxgy_sticky_left_box}>
              <h3>Products added to cart</h3>
              {/* <div className={styles.bxgy_sticky_price}>
                MRP:{" "}
                <span className={styles.bxgy_sticky_priceUndiscounted}>
                  {popupDetails?.priceUndiscounted}
                </span>{" "}
                <span className={styles.bxgy_sticky_priceDiscounted}>
                  {popupDetails?.price}
                </span>
              </div> */}
            </div>
          </div>
          <div className={styles.bxgy_sticky_right}>
            <button
              onClick={() => {
                show(OverlayType.plixlifefcCart, OverlayTheme.right);
              }}
            >
              {" "}
              View Cart
            </button>
            {cartItemsQuantity > 0 ? (
              <span className={styles.bxgy_quantity}>
                {cartItemsQuantity}
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
Bxgy.displayName = "Bxgy";
export default Bxgy;
