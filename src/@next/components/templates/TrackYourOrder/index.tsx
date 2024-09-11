import React, { useEffect, useRef, useState } from "react";
import { Router, useRouter } from "next/router";

import styles from './index.module.scss';
import MemoTrackOrderBannerIcon from "@components/atoms/SvgIcons/TrackOrderBannerIcon";
import MemoMovingcourier from "@components/atoms/SvgIcons/Movingcourier";
import MemoBackButton from "@components/atoms/SvgIcons/BackButton";
import MemoDeliverdTruck from "@components/atoms/SvgIcons/DeliveredTruck";
import { dateformatter } from "@utils/misc";
import { getdate } from "@utils/misc";
import { timeformatter } from "@utils/misc";
const TrackOrder = ()=> {

  return(
    <>
      <TrackOrdersection />
    </>
  );
}
export default TrackOrder;


const TrackOrdersection = () =>{
    const [id,setId] = useState(null);
    const [resultdata,setresultdata] = useState(null);
    const [Error, setError] = useState(null);
    const [orderDetail, setorderDetail] = useState(null);
    const [orderStatus, setorderStatus] = useState(null);
    const [orderdetaildata, setorderdetaildata] = useState(null);
    const [DeliveryDateDetail,setDeliveryDateDetail] = useState(null);
    const [transitdata,settransitdata] = useState({});
    const [transitkeys,settransitkeys] = useState([]);
    const [remark,setremark] = useState(null);

    const router = useRouter();

    const deliveryStatus:any = {
      'Order Placed' : "Order Placed",
      'Shipped': "Order Shipped",
      'Dispatched': "Moving as expected",
      'In transit' : "Moving as expected",
      'Out For Delivery' : "Out For Delivery",
      'Delivered': "Delivered",
      'Returned':"Returned"
    }


    const postData = async () => {

      if(id){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const data = await fetch(`https://farzitracker.farziengineer.co/services/?client_id=plixlifefc`,{
          method:"POST",
          headers:myHeaders,
          body:JSON.stringify({
            "id": id
          }),
        })
        return data.json();
      }
    }
    const orderHandler = (e) =>{
      e.preventDefault();
      try{
        postData().then((data) => {
          if(data?.orderSummary?.meta?.status==400){
            setError("The order/shipment you're trying to track has not been shipped yet or the order number entered is incorrect.")
          }
          else{
            let transit:any = {};
            let waybill = data?.orderSummary?.shipments[0]?.waybill;
            let orderStatusdetail = data?.orderdetail[waybill];
            setorderdetaildata(orderStatusdetail);
            setorderDetail(data.orderdetail);
            setorderStatus(data.orderSummary);
            setresultdata(data?.orderSummary?.shipments[0]?.latest_status?.clickpost_status_bucket_description);
            setDeliveryDateDetail(data.DeliverydetailData);
            setremark(data.remarks);
            data?.orderdetail[waybill]?.scans.length >0 && data?.orderdetail[waybill]?.scans.map((item:any,i:Number)=>{
              const tempdata = item.timestamp.split(" ")[0];
              if(transit[tempdata]){
                transit[tempdata].push(item);
              }
              else{
                transit[tempdata] = [item]
              }
            })
            let transitKeys = Object.keys(transit);
            settransitdata(transit);
            settransitkeys(transitKeys);
          }
        });
      }
      catch(err){
        setError("Something went wrong while fetching your order info")
      }
    }

    const checkStatus = (res:String,value:Array<String>) =>{
      let result = res.toLowerCase();
      
      if(value.includes(result)){
        return true;
      }
      else{
        return false;
      }
 
    }

    return (
        <div className={styles.track_order_wrapper}>
            { (!resultdata) && 
            
            <section className={styles.track_order_cover_section}>
                <div className={styles.track_order_container}>
                    <div className={styles.track_order_cover_section_row}>
                    <div className={styles.form_col}>
                        <div className={styles.icon_img}>
                          <MemoTrackOrderBannerIcon />
                        </div>
                        <h1>Track your order</h1>
                        <form className={styles.track_order_form} onSubmit={orderHandler}>
                        <div className={styles.form_row}>
                            <input
                            type="text"
                        className={styles.form_control}
                            id="order-id"
                            placeholder="Eg: P972738"
                            required
                            onChange={(e)=>setId(e.target.value)}
                            />
                        </div>
                        <button type="submit" className={styles.button_track_order}>
                            Track Order
                        </button>
                        </form>

                        {Error &&
                          <p style={{
                            marginTop: "20px"
                          }}>
                            {Error}
                          </p>
                        }

                        <div className={styles.need_help_text}>
                        Need Help? <a href="/page/contact-us">Contact Us</a>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            }
            {resultdata && 
            <>

            { orderDetail && orderStatus && 
              <>
                <section className={styles.track_order_page_header}>
                  <div className={styles.track_order_container}>
                    <div className={styles.track_order_page_header_inner}>
                      <button className={styles.button_back} onClick={()=>router.back()}>
                        <MemoBackButton />
                      </button>
                      <h1>Track your order</h1>
                    </div>
                  </div>
                </section>
                <section className={styles.track_order_details_section}>
                  <div className={styles.track_order_container}>
                    <div className={styles.track_order_details_row}>
                      <div className={styles.order_status_col}>
                        <div className={`${styles.order_status_progress_card} ${styles.order_status_inprogress}`}>
                          { orderdetaildata?.latest_status?.clickpost_status_description=="Delivered" ?
                              <div className={`${styles.order_status_progress_card_header} ${styles.deliverd}`}>
                                <div className={styles.delivery_status_icon}>
                                  <MemoDeliverdTruck />
                                </div>
                                <span className={styles.delivery_status}>
                                {orderdetaildata?.latest_status?.clickpost_status_bucket_description}
                                </span>
                                <span className={styles.delivery_status_date}>
                                  {dateformatter(orderdetaildata?.latest_status?.timestamp)}
                                </span>
                              </div>
                              :
                              orderdetaildata?.latest_status?.clickpost_status_description=="Returned" || orderdetaildata?.latest_status?.clickpost_status_description=="Cancelled" ?
                              <div className={styles.order_status_progress_card_header}>
                                <div className={styles.delivery_status_icon}>
                                  <MemoMovingcourier />
                                </div>
                                <span className={styles.delivery_status}>
                                {orderdetaildata?.latest_status?.clickpost_status_bucket_description}
                                  </span>
                              </div>
                              :
                              <div className={styles.order_status_progress_card_header}>
                              <div className={styles.delivery_status_icon}>
                                <MemoMovingcourier />
                              </div>
                              <span className={styles.delivery_status}>
                                 {orderdetaildata?.latest_status?.clickpost_status_bucket_description}
                                </span>
                            </div>
                           
                          }

                          <div className={styles.order_status_progress_card_body}>
                            <div className={styles.order_status_progress_card_item}>
                              <div className={styles.order_status_progress_card_item_title}>
                                Courier
                              </div>
                              <div className={styles.order_status_progress_card_item_content}>
                                {orderDetail?.cp_name}
                              </div>
                            </div>
                            <div className={styles.order_status_progress_card_item}>
                              <div className={styles.order_status_progress_card_item_title}>
                                Tracking Order
                              </div>
                              <div className={styles.order_status_progress_card_item_content}>
                                {orderDetail?.waybill}
                              </div>
                            </div>
                            <div className={styles.order_status_progress_card_item}>
                              <div className={styles.order_status_progress_card_item_title}>
                                Order ID
                              </div>
                              <div className={styles.order_status_progress_card_item_content}>
                              {orderDetail?.order_id}
                              </div>
                            </div>
                            <div className={styles.order_status_progress_card_item}>
                              <div className={styles.order_status_progress_card_item_title}>
                                Order Placed On
                              </div>
                              <div className={styles.order_status_progress_card_item_content}>
                                {getdate(orderStatus?.order_placed_date)}
                              </div>
                            </div>
                            {DeliveryDateDetail && 
                              <div className={styles.order_status_progress_card_item}>
                                <div className={styles.order_status_progress_card_item_title}>
                                  Expected Delivery
                                </div>
                                <div className={styles.order_status_progress_card_item_content}>
                                  {getdate(DeliveryDateDetail)}
                                </div>
                              </div>
                            
                            }
                            <div className={styles.order_status_progress_card_item}>
                              <div className={styles.order_status_progress_card_item_title}>
                                Last Update
                              </div>
                              <div className={styles.order_status_progress_card_item_date}>
                                {dateformatter(orderdetaildata?.latest_status?.timestamp)}
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.order_details_col}>
                        <div className={styles.order_details_card}>
                          <div className={styles.order_details_card_progress}>

                            <div className={styles.order_status_wrapper}>
  
                              <div className={styles.order_progress_wrapper}>
                                <div className={`${styles.order_status_section} ${resultdata=="Returned" ? styles.returned : ""}`}>
                                  <div className={styles.icon_section}>
                                    <div className={`${styles.order_status_icon} ${ checkStatus(resultdata,["order placed","shipped","dispatched","in transit","out for delivery"])  ? styles.active_state : checkStatus(resultdata,["delivered"]) ? styles.delivered_active_state:""} `}></div>

                                  </div>
                                  <div className={styles.icon_section}>
                                    <div className={`${styles.order_status_icon} ${checkStatus(resultdata,["in transit","out for delivery"])  ? styles.active_state : checkStatus(resultdata,["delivered"]) ? styles.delivered_active_state : ""} `}></div>

                                  </div>
                                  <div className={styles.icon_section}>
                                    <div className={`${styles.order_status_icon} ${checkStatus(resultdata,["in transit","out for delivery"]) ? styles.active_state : checkStatus(resultdata,["delivered"]) ? styles.delivered_active_state : ""} `}></div>

                                  </div>
                                  <div className={styles.icon_section}>
                                    <div className={`${styles.order_status_icon} ${checkStatus(resultdata,["out for delivery"]) ? styles.active_state : checkStatus(resultdata,["delivered"]) ? styles.delivered_active_state : ""} `}></div>

                                  </div>
                                  
                                  <div className={styles.icon_section}>
                                    <div className={`${styles.order_status_icon} ${checkStatus(resultdata,["Returned"]) ? styles.active_state : checkStatus(resultdata,["delivered"]) ? styles.delivered_active_state : ""} `}></div>

                                  </div>

                                </div>
                                <div className={styles.order_progressbar}></div>
                                <div className={`${styles.order_progressbar_overlay} ${resultdata=="Returned" ? styles.delivered_progressbar : ""}`}
                                  style={{
                                    width: checkStatus(resultdata,["delivered","returned"]) ? "100%" : checkStatus(resultdata,["out for delivery"]) ? "75%" : checkStatus(resultdata,["in transit"]) ? "50%" : checkStatus(resultdata,["dispatched","shipped"]) ? "25%" : "0%"
                                  }}
                                >
                                
                                </div>
                              </div>
                              <div className={styles.order_status}>
                                <p>Order Placed</p>
                                <p>Dispatched</p>
                                <p>In Transit</p>
                                <p>Out For Delivery</p>
                                {resultdata=="Returned" ? 
                                    <p>Returned</p> :
                                <p>Delivered</p>
                                }
                              </div>
                            </div>
                            {remark ? 
                            <div className={styles.remark} style={{ color: remark?.color }}>
                                { remark?.message }
                            </div>
                            : null
                            }
                          </div>
    
                          {transitkeys.length>0 && 
                            transitkeys.map((item:any,index:any)=>(
          
                              <div className={styles.order_details_card_summary} key={index}>
                                <div className={styles.order_details_card_summary_title}>
                                  {getdate(item)}
                                  </div>
                                  {transitdata?.[item]?.map((data:any,i:any)=>(
                                      <div className={`${styles.order_details_card_summary_item} ${index==0 && i==0 ? styles.active : ""}`} key={i}>
                                        <div className={styles.order_details_card_summary_item_left}>
                                          <div className={styles.order_details_card_summary_item_time}>
                                            {/* 08:25 AM */}
                                          {timeformatter(data?.timestamp)}
                                          </div>
                                        </div>
                                        <div className={styles.order_details_card_summary_item_right}>
                                          <div className={styles.order_details_card_summary_item_location}>
                                            {/* Mumbai_OT (Maharashtra) */}
                                            {data?.location}
                                          </div>
                                          <div className={styles.order_details_card_summary_item_desc}>
                                            {/* Bag Added To Trip */}
                                            {data?.remark}
                                          </div>
                                        </div>
                                      </div>
                                  ))}
                               
                              </div>
                              
                            ))
                          }

                          <div className={styles.order_details_card_body_help}>
                              <div className={styles.need_help_text}>
                                Need Help? <a href="/page/contact-us">Contact Us</a>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              
              </>
            }

            </>
            }
        </div>
    );
}