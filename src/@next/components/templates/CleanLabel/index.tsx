import MemoKnefPlix from "@components/atoms/SvgIcons/knefSvgIcon";
import ProductHeader from "@components/molecules/ProductHeader";
import { getMetadataValue } from "@utils/misc";
import FaqAccordian from "../../organisms/NewFaqAccordian";
import styles from './index.module.scss';
export interface ICleanCertificate {
    // image: string,
    content:any,
    breadcrumbs:any
}

export const CleanCertificate:React.FC<ICleanCertificate> = ({
    content,
    breadcrumbs,
}) =>{
    const QASection =
    content?.metadata &&
    getMetadataValue(content?.metadata, "QASection") &&
    JSON.parse(getMetadataValue(content?.metadata, "QASection"));
  const videoSectionData =
    content?.metadata &&
    getMetadataValue(content?.metadata, "videoSection") &&
    JSON.parse(getMetadataValue(content?.metadata, "videoSection"));

    const section1 =
    content?.metadata &&
    getMetadataValue(content?.metadata, "section1") &&
    JSON.parse(getMetadataValue(content?.metadata, "section1"));
    
    const section2 =
    content?.metadata &&
    getMetadataValue(content?.metadata, "section2") &&
    JSON.parse(getMetadataValue(content?.metadata, "section2"));

    const section3 =
    content?.metadata &&
    getMetadataValue(content?.metadata, "section3") &&
    JSON.parse(getMetadataValue(content?.metadata, "section3"));
    return(
        <>
        <div className={styles.cleancertificate}>
            <section className={styles.clean_label_banner_section}>
                <div className={styles.cleanLabel_container}>
                    <div className={styles.clean_label_banner_row}>
                        <div className={styles.left_col}>
                            <img src="/plixlifefc/assets/image-287-1.png" alt="" />
                        </div>
                        <div className={styles.right_col}>
                            <h1>
                            Our Products are certified by
                            <span> The Clean Label Project</span>, USA for purity
                            </h1>
                            <ul>
                            <li>100% Clean</li>
                            <li>Zero Contatmination</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </section>

                {videoSectionData && 
    
                    <section className={styles.clean_label_section_1}>
                        <div className={styles.cleanLabel_container}>
                            <div className={styles.clean_label_section_1_row}>
                            <div className={styles.text_col}>
                                <h2>{videoSectionData?.heading}</h2>
                            </div>
                            <div className={styles.image_col}>
                                <div className={styles.video_play}>
                                    <iframe
                                        src={videoSectionData?.youtubeUrl}>
                                    </iframe>
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>
                }

                {section1 && 
                
                    <section className={styles.clean_label_section_2}>
                        <div className={styles.cleanLabel_container}>
                            <div className={styles.clean_label_section_2_row}>
                            <div className={styles.image_col}>
                                <img src={section1?.imgUrl} alt="" />
                            </div>
                            <div className={styles.text_col}>
                                <h3>{section1?.title}</h3>
                                <p>
                                {section1.description}
                                </p>
                                <a className={styles.text_link} href={section1?.more_button_url} target="_blank">Learn More</a>
                            </div>
                            </div>
                            <div className={styles.clean_label_section_2_row}>
                            <div className={styles.image_col}>
                                <img src={section2?.imgUrl} alt="" />
                            </div>
                            <div className={styles.text_col}>
                                <h3>{section2?.title}</h3>
                                <p>
                                {section2?.description}
                                </p>
                                <a className={styles.text_link} href={section2?.more_button_url} target="_blank">Learn More</a>
                            </div>
                        </div>
                    </div>
                    </section>
                }

                {QASection && (
                    <div className={`${styles.faq_section} ${styles.container}`} style={{border:"none",gap: "0rem"}}>
                        <div className={`${styles.flex} ${styles.items_center}`}>
                            <ProductHeader headerClass="df" heading="FAQs" />
                            <MemoKnefPlix fontSize="100px" />
                        </div>
                        <FaqAccordian
                            data={QASection?.qa_content}
                            accordianClass="accordian"
                        />
                    </div>
                )}
                
        </div>
        </>
    );
}