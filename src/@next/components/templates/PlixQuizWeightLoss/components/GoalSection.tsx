import React from "react";
import style from "../scss/index.module.scss";
import { CachedImage } from "@components/molecules/CachedImage";
import parse from "html-react-parser";
import MyCustomLink from "@components/next-react/MyCustomLink";

export interface IGoalSectionInfo {
    enable: boolean;
    heading_desk: string;
    heading_mob: string;
    pageConfig?: any;
    steps: Array<{
        img: string;
        time: string;
        heading: string;
        step: string;
        text: string;
        background: string;
        clock: string;
        url: string;
    }>;
}

const GoalSection = ({ data, pageConfig }: { data: IGoalSectionInfo; pageConfig:any }) => {
    return (
        <div className={`${style.newContainer} ${style.goalsection}`}>
            <h2 style={{color: `${pageConfig?.headingColor}`}} className={style.goalsection_heading_mob}>
                {parse(`${data?.heading_mob}`)}
            </h2>
            <h2 style={{color: `${pageConfig?.headingColor}`}} className={style.goalsection_heading_desk}>{data?.heading_desk}</h2>
            <div className={style.goalsection_box}>
                {Array.isArray(data?.steps) && data?.steps?.length ? (
                    data?.steps?.slice(0, 3)?.map((item, index) => (
                        <MyCustomLink href={item?.url || "/"}>
                            <div
                                style={{ background: `${item?.background}` }}
                                className={style.goalsection_container}
                            >
                                <div className={style.goalsection_container_box1}>
                                    {item?.img ? (
                                        <div className={style.goalsection_container_img}>
                                            <CachedImage
                                                isNextImage
                                                url={item?.img}
                                                nextImageLayout="fill"
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    <p className={style.goalsection_container_timer_mob}>
                                        {parse(`${item?.time}`)}{" "}
                                        {item?.clock ? <CachedImage url={item?.clock} /> : <></>}
                                    </p>
                                </div>
                                <div className={style.goalsection_container_box2}>
                                    <p className={style.goalsection_container_timer_desk}>
                                        {parse(`${item?.time}`)}{" "}
                                        {item?.clock ? <CachedImage url={item?.clock} /> : <></>}
                                    </p>
                                    <h3 style={{color: `${pageConfig?.primaryColor || ""}`}} className={style.goalsection_container_step}>
                                        {item?.step}
                                    </h3>
                                    <h3 className={style.goalsection_container_heading}>
                                        {item?.heading}
                                    </h3>
                                    <p className={style.goalsection_container_text}>
                                        {item?.text}
                                    </p>
                                </div>
                            </div>
                        </MyCustomLink>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default GoalSection;
