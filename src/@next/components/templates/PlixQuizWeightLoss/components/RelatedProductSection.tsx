import React from "react";
import style from "../scss/index.module.scss";
import LazyLoad from "react-lazyload";
import RelatedProducts from "Themes/views/Product/pdpComponents/RelatedProducts";
import QuizButton from "./QuizButton";

export interface IRelatedProductsInfo {
    enable: boolean;
    heading: string;
    products: Array<{
        id: string;
        name: string;
    }>;
    bottom: {
        text: string;
        url: string;
    };
}

const RelatedProductSection = ({ data, fastResultProducts, popupstateHandler, isSkin = false, pageConfig = null }: { data: IRelatedProductsInfo, fastResultProducts: any, popupstateHandler: any, isSkin: boolean ; pageConfig?:any}) => {
    return (
        <div className={`${style.relatedProducts} quizpage_relatedProducts`}>
            {data &&
                Array.isArray(data?.products) &&
                data?.products?.length > 0 ? (
                <LazyLoad height={400} offset={200}>
                    <RelatedProducts
                        heading={data?.heading || "Faster Results With"}
                        fastResultProducts={fastResultProducts}
                        product={null}
                        relatedProducts={data?.products}
                        popupstateHandler={popupstateHandler}
                    />
                </LazyLoad>
            ) : (
                <></>
            )}
            <QuizButton pageConfig={pageConfig} url={data?.bottom?.url} text={data?.bottom?.text} isSkin={isSkin} />
        </div>
    );
};

export default RelatedProductSection;
