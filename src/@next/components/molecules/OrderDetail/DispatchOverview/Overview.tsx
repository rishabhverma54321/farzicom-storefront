import React from "react";
import { AddressCard } from "@components/atoms/AddressCard";
import { CircularProgressBar } from "@components/atoms/CircularProgressBar";
import { StagedProgressBar } from "@components/atoms/StagedProgressBar";
import RightArrow from "@components/atoms/CustomInput/RightArrow";
import ProfileInfoIcon from "images/profileSvg/ProfileInfoIcon";
import { getDaysOutofTwoDates } from "@app/pages/YarzbazarPage/utils/misc";
import { getMetadataValue } from "@utils/misc";
import { getCurrentStageInfo } from "./utils";
import * as O from "../style";

export interface OverViewType {
  details?: any;
  documentField?: any;
  progressBarClr?: string;
  companyName?: string;
}

const Overview: React.FC<OverViewType> = ({
  details,
  documentField,
  progressBarClr,
  companyName,
}) => {
  let transporterDetail;
  if (details?.metadata?.length) {
    const metaData = details.metadata;
    transporterDetail =
      getMetadataValue(metaData, "transporter_details") &&
      JSON.parse(getMetadataValue(metaData, "transporter_details"));
  }
  //
  return (
    <O.Article className="circular-tracking">
      <O.CircleBody>
        <O.Title>Current Dispatch Tracking</O.Title>
        <O.TrackingDetail>
          <CircularProgressBar
            color={progressBarClr}
            total={
              details.createdAt && details.estimateDeliveryDate
                ? getDaysOutofTwoDates(
                    details?.estimateDeliveryDate,
                    details?.createdAt
                  )
                : 0
            }
            left={
              details.estimateDeliveryDate
                ? getDaysOutofTwoDates(
                    details?.estimateDeliveryDate,
                    new Date()
                  )
                : 0
            }
            title="ETA"
          />
          <O.Paragraph>
            {getCurrentStageInfo(details?.status, data)?.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </O.Paragraph>
        </O.TrackingDetail>
      </O.CircleBody>
      <O.LinearBody>
        <StagedProgressBar
          stageData={data}
          history={details?.history}
          status={details?.status}
          transporterDetail={transporterDetail}
          documentField={documentField}
          document={details?.document}
          color={progressBarClr}
        />
      </O.LinearBody>
      <AddressCard info={details} color={progressBarClr} />
    </O.Article>
  );
};

export default Overview;
const data = [
  {
    stageName: "dispatched planned",
    stageMessage:
      "Your dispatch has been planned and is awaiting confirmation from the supplier, sit back and relax while we get this done.",
    stageContent: [],
    stageChecked: false,
    date: "",
  },
  {
    stageName: "dispatched confirmed",
    stageMessage:
      "Your dispatch has been confirmed and is ready to be loaded. sit back while we make sure this gets done right",
    stageContent: [
      {
        dataUp: [
          {
            leftField: "Transporter Name",
            rightField: "Pant dalal transport",
          },
          {
            leftField: "Dispatch Date",
            rightField: "12 July 2021",
          },
        ],
        dataDown: [
          {
            leftField: "PI - PDF",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/login",
          },
        ],
      },
    ],
    stageChecked: false,
    date: "",
  },
  {
    stageName: "loading",
    stageMessage:
      "Your dispatch is being loaded. we have updated all the details and documents related to this.",
    stageContent: [
      {
        dataUp: [
          {
            leftField: "Transporter Name",
            rightField: "Pant dalal transport",
          },
          {
            leftField: "Driver Number",
            rightField: "+9156616165464",
          },
          {
            leftField: "Lorry Number",
            rightField: "MDSFKHS31513",
          },
          {
            leftField: "L/R Number",
            rightField: "212345658",
          },
          {
            leftField: "Dispatch Date",
            rightField: "12 July 2021",
          },
          {
            leftField: "Invoice Number",
            rightField: "XXvlldvalaj",
          },
          {
            leftField: "Invoice Date",
            rightField: "31 Aug 2021",
          },
          {
            leftField: "Invoice Amount",
            rightField: "₹12,36,000",
          },
        ],
        dataDown: [
          {
            leftField: "PI - PDF",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Tax Invoice - PDF",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "EWAY - JGPEG",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Packing List - XLS",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Insurance-PNG",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Test Report - XLS",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
        ],
      },
    ],
    stageChecked: false,
    date: "",
  },
  {
    stageName: "In transit",
    stageMessage:
      "Your dispatch is in-transit will reach you very soon, sit back and relax while we take care of this.",
    stageContent: [
      {
        dataUp: [
          {
            leftField: "Transporter Name",
            rightField: "Pant dalal transport",
          },
          {
            leftField: "Driver Number",
            rightField: "+9156616165464",
          },
          {
            leftField: "Lorry Number",
            rightField: "MDSFKHS31513",
          },
          {
            leftField: "L/R Number",
            rightField: "212345658",
          },
          {
            leftField: "Dispatch Date",
            rightField: "12 July 2021",
          },
          {
            leftField: "Invoice Number",
            rightField: "XXvlldvalaj",
          },
          {
            leftField: "Invoice Date",
            rightField: "31 Aug 2021",
          },
          {
            leftField: "Invoice Amount",
            rightField: "₹12,36,000",
          },
        ],
        dataDown: [
          {
            leftField: "PI - PDF",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Tax Invoice - PDF",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "EWAY - JGPEG",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Packing List - XLS",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Insurance-PNG",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Test Report - XLS",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
        ],
      },
    ],
    stageChecked: false,
    date: "",
  },
  {
    stageName: "Goods Received",
    stageMessage:
      "Your dispatch has been delivered, we are glad to be of service and hope to see you again.",
    stageContent: [
      {
        dataUp: [
          {
            leftField: "Transporter Name",
            rightField: "Pant dalal transport",
          },
          {
            leftField: "Driver Number",
            rightField: "+9156616165464",
          },
          {
            leftField: "Lorry Number",
            rightField: "MDSFKHS31513",
          },
          {
            leftField: "L/R Number",
            rightField: "212345658",
          },
          {
            leftField: "Dispatch Date",
            rightField: "12 July 2021",
          },
          {
            leftField: "Received Date",
            rightField: "12 July 2021",
          },
          {
            leftField: "Invoice Number",
            rightField: "XXvlldvalaj",
          },
          {
            leftField: "Invoice Date",
            rightField: "31 Aug 2021",
          },
          {
            leftField: "Invoice Amount",
            rightField: "₹12,36,000",
          },
        ],
        dataDown: [
          {
            leftField: "PI - PDF",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Tax Invoice - PDF",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "EWAY - JGPEG",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Packing List - XLS",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Insurance-PNG",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
          {
            leftField: "Test Report - XLS",
            rightField: [<RightArrow />, <ProfileInfoIcon />],
            link: "/",
          },
        ],
      },
    ],
    stageChecked: false,
    date: "",
  },
];
