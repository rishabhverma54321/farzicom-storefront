import React from "react";
import style from "../scss/index.module.scss";
import MemoKnefPlix from "@components/atoms/SvgIcons/knefSvgIcon";
import FaqAccordian from "@components/organisms/FaqAccordian";

export interface faqDataInfo {
    id: number;
    q: string;
    a: string;
}

const FaqSection = ({ data, pageConfig }: { data: faqDataInfo[]; pageConfig?:any }) => {
    return (
        <>
            {data && (
                <div className={`${style.newContainer} ${style.faqSection}`}>
                    <div className="flex items-center">
                        <h2 style={{color: `${pageConfig?.headingColor || ""}`}} className={style.faqSection_heading}>FAQs</h2>
                        <MemoKnefPlix fontSize="100px" />
                    </div>
                    <FaqAccordian
                        eventHeaderName="Faq section - pdp"
                        data={data}
                        accordianClass="accordian"
                    />
                </div>
            )}
        </>
    );
};


export default FaqSection;
