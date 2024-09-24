import { fetchWithAxios } from "./utils";

export default async function handler(req, res) {
      const orderId = req.body.id;
      if (req.method === 'POST') {
            try{
                  const result = await fetchWithAxios(`https://plixlife.clickpost.ai/api/v1/track-order?&order_id=${orderId}`,2000)
                  const order = result?.data;
                  const orderdetail = await fetchWithAxios(`https://plixlife.clickpost.ai/api/v1/track-order?&waybill=${order?.result?.shipments[0].waybill}`,2000)
                  const orderdata = orderdetail?.data;
                  const DeliveryDateDetail = await fetchWithAxios(`https://plixlife.clickpost.ai/api/v1/edd/?&waybill=${order?.result?.shipments[0].waybill}`,2000)
                  const DeliverydetailData = DeliveryDateDetail?.data;
                  res.send({orderSummary:order,orderdetail:orderdata,DeliverydetailData:DeliverydetailData?.result?.edod?.expected_date_of_delivery, remarks:DeliverydetailData?.result?.edd_ui });
            }
            catch(err){
                  if(err?.code === "ERR_CANCELED"){
                        res.status(200).send({msg:"Request Cancelled (Timeout)"})
                  }else{
                        res.status(500).send({msg:err})
                  }
            }

      }else{
            res.send({result:"method not allowed"})

      }

}