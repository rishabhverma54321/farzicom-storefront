import MemoLearnMoreIcon from "@components/atoms/SvgIcons/MemoLearnMoreIcon";
import ProductDetailPopup from "@components/farzicom-ui-kit/ProductDetailPopup";
import { CachedImage } from "@components/molecules/CachedImage";
import { TypedProductDetailShortQuery } from "@temp/themes/plixlifefc/views/Product/queries";
import { getMetadataValue, parseJson } from "@utils/misc";
import React, { useState } from "react";

const FreebieContainer = ({
  selectedVariant,
  metaData,
}: {
  selectedVariant: any;
  metaData: any;
}) => {
  const [popupstate, setpopupstate] = useState(false);
  const FreebieProductData =
    getMetadataValue(metaData, "freebie_data") &&
    parseJson(getMetadataValue(metaData, "freebie_data"));

  if (FreebieProductData?.enable && FreebieProductData?.product_id) {
    return (
      <div>
        <TypedProductDetailShortQuery
          variables={{
            id: FreebieProductData?.product_id,
          }}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return (
                <div className="productpage_freebie_loader skeleton-text"></div>
              );
            }
            if (data) {
              const variants = data?.product?.variants || [];
              const freebieVaraint =
                (variants &&
                  Array.isArray(variants) &&
                  variants?.filter(
                    item => item?.id === FreebieProductData?.variant_id
                  )) ||
                [];

              const productImage =
                data?.product?.thumbnail?.url ||
                data?.product?.thumbnail2x?.url;

              const undiscountedPrice =
                (freebieVaraint?.length &&
                  getMetadataValue(freebieVaraint[0]?.metadata, "listPrice") &&
                  parseJson(
                    getMetadataValue(freebieVaraint[0]?.metadata, "listPrice")
                  )) ||
                "";
              const discountedPrice =
                (freebieVaraint?.length &&
                  freebieVaraint[0]?.pricing?.price?.gross?.amount) ||
                "0";

              return (
                <>
                  <div className="productpage_freebie">
                    {popupstate && (
                      <div className="productDetailPopup-pdp">
                        <ProductDetailPopup
                          productdata={data?.product}
                          setpopupstate={setpopupstate}
                          disableAtc
                          // popupFor="plixlife-faster-results"
                        />
                      </div>
                    )}
                    <div className="productpage_freebie_header">
                      {FreebieProductData?.heading || " "}
                    </div>
                    <div className="productpage_freebie_container">
                      <div className="productpage_freebie_product">
                        <div className="productpage_freebie_image">
                          <CachedImage
                            url={productImage}
                            alt={data?.product?.thumbnail?.alt || ""}
                            isNextImage
                            imageDimensions={{ width: 100, height: 100 }}
                          />
                        </div>
                        <div className="productpage_freebie_name">
                          <h2>{data?.product?.name || ""}</h2>
                          <p>
                            {(freebieVaraint?.length &&
                              freebieVaraint[0]?.name) ||
                              ""}
                          </p>
                        </div>
                      </div>
                      <div className="productpage_freebie_details">
                        <div className="productpage_freebie_details_price">
                          <div className="productpage_freebie_details_undiscountedPrice">
                            MRP:<span>₹{undiscountedPrice}</span>
                          </div>
                          <div className="productpage_freebie_details_discountedPrice">
                            ₹{discountedPrice}
                          </div>
                          <p>Incl. of all taxes</p>
                        </div>
                        <div
                          className="productpage_freebie_details_learn"
                          onClick={() => {
                            setpopupstate(true);
                          }}
                        >
                          <MemoLearnMoreIcon /> Learn
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          }}
        </TypedProductDetailShortQuery>
      </div>
    );
  }
  return <></>;
};

export default FreebieContainer;
