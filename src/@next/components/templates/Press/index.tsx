import styles from './index.module.scss';
import Carousel from "@temp/components/Carousel";
import { createRef, MouseEvent, useEffect, useRef, useState } from 'react';
import { getMetadataValue } from '@utils/misc';
import { CachedImage } from '@components/molecules/CachedImage';
import MemoLeftArrowPlix from '@components/atoms/SvgIcons/LeftArrowPlix';
import MemoRightArrowPlix from '@components/atoms/SvgIcons/RightArrowPlix';

export interface IPressProps {
    // image: string,
    content: any;
}

const Press:React.FC<IPressProps> = ({ content }) =>{
    const [showPressCount,setshowPressCount] = useState(6);
    let counter = 0,customSetTimeInterval: number;
    const [activeState,setactiveState] = useState(1);
    const [filteredYear,setfilteredYear] = useState(null);
    const [showdropdown,setshowdropdown] = useState(false);
    const [Year,setYear] = useState([]);
    const [filteredpressData,setfilteredpressData] = useState([]);
    const targetref = useRef(null)
    const TimeIntervalHandler = () =>{
        customSetTimeInterval = setInterval(()=>{
            if(counter==4){

                counter = 1;
            }
            else{

                counter = counter + 1;
            }
            setactiveState(counter);

        },3000);
    }
    // useEffect(()=>{
    //     TimeIntervalHandler();
    //     return () => clearInterval(customSetTimeInterval);
    // },[])

    let pressdata =
    content?.metadata &&
    getMetadataValue(content?.metadata, "pressdata") &&
    JSON.parse(getMetadataValue(content?.metadata, "pressdata"));
    pressdata = Array.isArray(pressdata) && pressdata.reverse();

    let feature_pressdata =
    content?.metadata &&
    getMetadataValue(content?.metadata, "feature_pressdata") &&
    JSON.parse(getMetadataValue(content?.metadata, "feature_pressdata"));
    feature_pressdata = Array.isArray(feature_pressdata) && feature_pressdata.reverse();

    const reviewdata =
    content?.metadata &&
    getMetadataValue(content?.metadata, "reviewdata") &&
    JSON.parse(getMetadataValue(content?.metadata, "reviewdata"));

    let options = { year: 'numeric' };
    const getDate = (date:any,month:string) =>{
        let day = parseInt(date.split("/")[1]) 
        let currentdate = day == 1 || day ==21 || day==31 ? day + "st" :
        day == 2 || day ==22 ? day + "nd" :
        day == 3 ? day + "rd" : day + "th";
        let year =  date.split("/")[2];

        return `${currentdate} ${month}, ${year}`;

    }

    const fiterpress = (year:Number) =>{
        let tempPressdata:any = [];
        pressdata.map((d:any)=>{
            if(d.Date.includes(year)){
                tempPressdata.push(d);
            }            
        })
        setfilteredpressData(tempPressdata);
        setfilteredYear(year);
        setshowdropdown(false);
    }

    useEffect(()=>{
        let yearArray:any = [];
        if(pressdata.length>0){
            setfilteredpressData(pressdata);
            pressdata.map((d:any)=>{
                if(!yearArray.includes(d.Date.split("/")[2])){
                    yearArray.unshift(d.Date.split("/")[2]);
                }
            })
            setfilteredYear(yearArray[yearArray.length-1]);
            setYear(yearArray);
        }
        
        
    },[])
    const closedropdown = (event:any) =>{
        if( targetref.current &&  !targetref.current.contains(event.target)){
            setshowdropdown(false);
            }
    }
    
    return(
        <div onClick={closedropdown}>
          <div className={styles.press_wrapper}>
            <div className={styles.inner_press}>
                <section className={styles.featured_news_section}>
                <div className={styles.press_container}>
                    <h2>Featured News</h2>
                    <div className={`${styles.featured_news_carousel} pressSlider1_wrapper`}>
                    <Carousel
                        // slidesOnDesktop={3}
                        // slidesOnMobile={1}
                        // slidesOnTab={2}
                        // dots={true}
                        // arrows={true}
                        // swipeToSlide={true}
                        // slidesToScroll={3}
                        // mobileCarouselProps={{
                        //     centerPadding:"0",
                        //     centerMode:false,
                        //     slidesToShow:1,
                        //     slidesToScroll:1
                        // }}
                        slidesOnDesktop={3}
                        slidesOnMobile={1}
                        slidesOnTab={2}
                        slidesToScroll={3}
                        leftArrow={<MemoLeftArrowPlix width="32px" height="32px" />}
                        rightArrow={<MemoRightArrowPlix width="32px" height="32px" />}
                        swiping={true}
                        slidesToShow={3}
                        mobileCarouselProps={{
                            slidesToScroll:1,
                            slidesToShow:1
                        }}
                        >
                        {feature_pressdata?.length>0 && feature_pressdata.map((d:any,index:any)=>(
                            <div className={styles.slick_item} key={index}>
                                <div className={styles.featured_news_card}>
                                <div className={styles.featured_news_card_img}>
                                    <CachedImage
                                      url={d?.imgUrl}
                                      isNextImage={true}
                                      nextImageLayout="fill"
                                      nextImageObjectFit="contain"
                                    />
                                </div>
                                <div className={styles.featured_news_card_body}>
                                    <div className={styles.featured_news_card_source}>
                                        <CachedImage
                                          url={d.logoimage}
                                          isNextImage={true}
                                          nextImageLayout="fill"
                                          nextImageObjectFit="contain"
                                        />
                                    </div>
                                    <h3 className={styles.featured_news_card_title}>
                                        {d.Headline}
                                    </h3>
                                </div>
                                <div className={styles.featured_news_card_footer}>
                                <div className={styles.date}>{getDate(d.Date,d.Month)}</div>
                                    <a className={styles.link} href={d?.Url} target="_blank">Read More</a>
                                </div>
                                </div>
                            </div>
                        ))}

                    </Carousel>
                    </div>
                </div>
                </section>

                <section className={styles.latest_news_section}>
                <div className={styles.press_container}>
                    <h2>Latest News</h2>

                    <div className={styles.sortby_dropdown}>
                    <div className={styles.sortby_toggle_text}>
                        Filter by: <a className={styles.sortby_toggle} onClick={()=>setshowdropdown(true)} role="button">{ filteredYear ? filteredYear : "" }</a>
                    </div>
                    {showdropdown && 
                        <ul className={styles.sortby_dropdown_menu} ref={targetref}>
                            {Year && Year.length>0 && 
                                Year.map((y:any,index:any)=>(
                                    <li key={index} onClick={()=>fiterpress(y)}>{y}</li>
                                ))
                            }
                        </ul>
                    }
                    </div>
                    <div className={styles.latest_news_row}>
                        {(filteredpressData.length>0) && filteredpressData.slice(0, showPressCount).map((data:any,index:any)=>(
                            <div className={styles.latest_news_card} key={index}>
                                <div className={styles.latest_news_card_source}>
                                    {data?.logo &&
                                        <CachedImage 
                                          url={data.logo}
                                          isNextImage={true}
                                          nextImageLayout="fill"
                                          nextImageObjectFit="contain"
                                        />
                                     }
                                    <div className={styles.date}>{getDate(data.Date,data.Month)}</div>
                                </div>
                                <h3 className={styles.latest_news_card_title}>
                                  {data.Headline}
                                </h3>
                                <a className={styles.link} href={data?.Url} target="_blank">Read More</a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.button_container}>
                    <a className={styles.button_viewmore} onClick={()=>setshowPressCount(showPressCount+4)}>View More</a>
                </div>
                </section>

                {/* { reviewdata && 

                <section className={styles.news_review_section}>
                    <div className={styles.press_container}>
                        <div className={styles.news_review_row}>
                            <div className={styles.left_col}>
                                <p className={styles.title}><span>300+</span> 5 star reviews</p>
                                <div className={styles.reivew_rating}>
                                <svg
                                    width="150"
                                    height="27"
                                    viewBox="0 0 150 27"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    d="M13.5502 1.22268L17.0462 8.28005L17.1727 8.53543L17.4547 8.57627L25.2678 9.70737L19.6156 15.1965L19.4103 15.3959L19.4588 15.6779L20.7936 23.4313L13.802 19.7692L13.5502 19.6373L13.2984 19.7692L6.30681 23.4313L7.64156 15.6779L7.69011 15.3959L7.48481 15.1965L1.83258 9.70737L9.64565 8.57627L9.92772 8.53543L10.0542 8.28005L13.5502 1.22268Z"
                                    fill="#FFA227"
                                    stroke="#FFA227"
                                    stroke-width="1.08547"
                                    />
                                    <path
                                    d="M44.0984 1.25445L47.467 8.27395L47.5915 8.53338L47.8761 8.57591L55.4392 9.70614L49.9563 15.2026L49.7594 15.4L49.8052 15.6751L51.0963 23.4166L44.3566 19.7726L44.0984 19.633L43.8403 19.7726L37.1006 23.4166L38.3916 15.6751L38.4375 15.4L38.2405 15.2026L32.7577 9.70614L40.3208 8.57591L40.6054 8.53338L40.7299 8.27395L44.0984 1.25445Z"
                                    fill="#FFA227"
                                    stroke="#FFA227"
                                    stroke-width="1.08547"
                                    />
                                    <path
                                    d="M74.6471 1.22268L78.1431 8.28005L78.2696 8.53543L78.5517 8.57627L86.3647 9.70737L80.7125 15.1965L80.5072 15.3959L80.5558 15.6779L81.8905 23.4313L74.8989 19.7692L74.6471 19.6373L74.3953 19.7692L67.4037 23.4313L68.7385 15.6779L68.787 15.3959L68.5817 15.1965L62.9295 9.70737L70.7426 8.57627L71.0246 8.53543L71.1512 8.28005L74.6471 1.22268Z"
                                    fill="#FFA227"
                                    stroke="#FFA227"
                                    stroke-width="1.08547"
                                    />
                                    <path
                                    d="M105.196 1.25445L108.564 8.27395L108.689 8.53338L108.973 8.57591L116.536 9.70614L111.053 15.2026L110.857 15.4L110.902 15.6751L112.193 23.4166L105.454 19.7726L105.196 19.633L104.937 19.7726L98.1977 23.4166L99.4888 15.6751L99.5347 15.4L99.3377 15.2026L93.8548 9.70614L101.418 8.57591L101.703 8.53338L101.827 8.27395L105.196 1.25445Z"
                                    fill="#FFA227"
                                    stroke="#FFA227"
                                    stroke-width="1.08547"
                                    />
                                    <path
                                    d="M135.744 1.12641L139.278 8.26108L139.395 8.49636L139.655 8.53398L147.554 9.67752L141.839 15.2272L141.65 15.4109L141.695 15.6707L143.044 23.5093L135.976 19.8071L135.744 19.6856L135.512 19.8071L128.444 23.5093L129.793 15.6707L129.838 15.4109L129.649 15.2272L123.934 9.67752L131.833 8.53398L132.093 8.49636L132.21 8.26108L135.744 1.12641Z"
                                    fill="#FFA227"
                                    stroke="#FFA227"
                                    />
                                </svg>
                                </div>
                                <p className={styles.text}>3,452 Units Sold</p>
                            </div>
                            <div className={styles.right_col}>
                                <div className={`${styles.brand_review_slider} ${styles.brand_navigator}`}>
                                    {reviewdata && reviewdata.map((d:any,index:any)=>(
                                        <div className={`${styles.slick_item} commoncontent selectedContent${index+1} ${activeState==index+1 ? 'addsection' : ""}`} id={`selectedContent${index+1}`} key={index} >
                                            <div className={styles.brand_review}>
                                            <p>
                                                {d.title}
                                            </p>
                                            </div>
                                        </div> 
                                    ))}
                            </div>
                            <div className={styles.brand_logo_slider}>
                                {reviewdata && reviewdata.map((d:any,index:any)=>(
                                    <div className={`${styles.slick_item} brandlogo brandlogo${index+1} ${activeState==index+1 ? 'addOpacity' : ""}`}>
                                        <div className={styles.brand_logo}>
                                        <CachedImage 
                                          url={d.logourl}
                                        />
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                } */}
            </div>
          </div>
        </div>
    );
}

export default Press;