import React from "react";
import styled, { css } from "styled-components";
import { media } from "@styles/media";
import MemoEmailSVG from "@components/atoms/SvgIcons/EmailSVG";
import MemoPhoneSVG from "@components/atoms/SvgIcons/PhoneSVG";
import MemoOrderSVG from "@components/atoms/SvgIcons/OrderSVG";
import MemoLocationSVG from "@components/atoms/SvgIcons/LocationSVG";
import NewMemoEmailSVG from "@components/atoms/SvgIcons/NewEmailSVG";
import NewMemoLocationSVG from "@components/atoms/SvgIcons/NewLocationSVG";
import NewMemoChatSvg from "@components/atoms/SvgIcons/NewChatSvg";
import NewPhoneSvg from "@components/atoms/SvgIcons/NewPhoneSvg";
import { CLIENT_ADDRESS, CONTACT_INFO, CLIENT } from "Themes/config";
import { clients } from "gqlTypes/customGlobalTypes";
import MemoChatSvg from "@components/atoms/SvgIcons/ChatSvg";
import { Gap } from "../../atoms/Gap/styled";
import Link from "next/link";
import { getMetadataValue, parseJson } from "@utils/misc";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 562px;
  background: #f6f6f6;
  border-radius: 12px;
  padding: 55px 58px;
  height: max-content;
  @media screen and (max-width: 1359px) and (min-width: 993px) {
    max-width: 482px;
  }
  svg {
    min-width: 72px;
    height: 72px;
  }
  ${media.largeScreen`
    margin-right: 0;
    padding: 50px 20px;
    max-width:100%;
    width:100%;
    svg{
      width: 42px;
      height: 42px;
    }
  `}
  ${media.mediumScreen`
    margin-right: 0;
    padding: 50px 20px;
    svg{
      width: 42px;
      height: 42px;
    }
  `}
`;

const TextContainer = styled.div<{ flexDirection?: string }>`
  display: flex;
  flex-direction: ${props =>
    props?.flexDirection ? props?.flexDirection : "row"};
    margin-left: 32px;
  ${media.smallScreen`
    margin-left: 16px;
  `}
`;

const Heading = styled.h3`
  font-family: "CocoSharp XL";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 130%;
  text-transform: capitalize;
  color: #095933;
  margin-bottom: 42px;
  ${media.mediumScreen`
    font-weight: 400;
    font-size: 24px;
    line-height: 130%;
    margin-bottom: 24px;
  `}
`;

const TextCSS = css`
  font-family: "CocoSharp XL";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #095933;
  ${media.mediumScreen`
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
  `}
  a {
    font-family: "CocoSharp XL";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 150%;
    text-decoration-line: underline;
    color: #1eaf6d;
    margin-left: 8px;
    cursor: pointer;
  }
`;

const Text = styled.div`
  ${TextCSS}
`;

const SmartSupport = styled.a`
  font-family: "CocoSharp XL";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 190%;
  text-decoration-line: underline;
  color: #1eaf6d;
  margin-left: 8px;
  cursor: pointer;
`;

const Address = styled.address`
  ${TextCSS}
  text-transform: capitalize;
`;

const ContactNoMob = styled.div`
  display: none;
  ${media.smallScreen`
    display:inline;
  `}
  span{
    color:#1eaf6d
    text-decoration-line:underline;
    font-weight:700;
  }
`;

const ContactNoDesk = styled.span`
  ${media.smallScreen`
     display:none;
  `}
  span{
    color:#1eaf6d
    text-decoration-line:underline;
    font-weight:700;
  }
`;

export default function ContactInformation({ metaData }: any) {
  const contactNo =
    getMetadataValue(metaData, "contact_no") &&
    parseJson(getMetadataValue(metaData, "contact_no"));

  return (
    <>
      <Container style={{ flex: 1 }}>
        <Heading>Store Information</Heading>
        {CONTACT_INFO[1].text && (
          <>
            <Gap />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MemoPhoneSVG fontSize="24px" />
              <TextContainer>
                <Text>Call us: </Text>
                <SmartSupport href={CONTACT_INFO[1].url}>
                  {CONTACT_INFO[1].text}
                </SmartSupport>
              </TextContainer>
            </div>
          </>
        )}
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <NewMemoLocationSVG fontSize="24px" />
          <TextContainer>
            <Address>
              {CLIENT_ADDRESS.addressLine1} {CLIENT_ADDRESS.addressLine2}{" "}
              {CLIENT_ADDRESS.addressLine3} {CLIENT_ADDRESS.city},{" "}
              {CLIENT_ADDRESS.state} {CLIENT_ADDRESS.pincode}
            </Address>
          </TextContainer>
        </div>
        <Gap />
        {CLIENT === clients.PLIXLIFEFC && (
          <>
            {/* <Gap /> */}
            <div
              style={{
                display: "flex",
                cursor: "pointer",
                marginBottom: "10px",
                flexDirection: "row",
                alignItems: "center",
              }}
              className="limechat_widget_toggle"
            >
              <NewPhoneSvg/>
              {/* <NewMemoChatSvg fontSize="24px" /> */}
              <TextContainer flexDirection="column">
                <Text>
                    {contactNo ? (
                      <>
                        <ContactNoMob>
                          Call <span>{contactNo}</span>
                        </ContactNoMob>
                        <ContactNoDesk>Call <span>{contactNo}</span></ContactNoDesk>
                      </>
                    ) : (
                      <></>
                    )}
                </Text>
                <Text>
                  from Monday-Saturday 10am-7pm.
                </Text>
              </TextContainer>
            </div>
          </>
        )}
        <Gap />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <NewMemoEmailSVG fontSize="24px" />
          <TextContainer flexDirection="column">
            <Text>
              {" "}
              Chat with us
              <span>
                <a target="_blank" href="https://wa.link/tr583q">
                  Here
                </a>
              </span>
            </Text>
            <Text> or email us at 
            <SmartSupport href={CONTACT_INFO[0].url}>
              {CONTACT_INFO[0].text}
            </SmartSupport>
            </Text>
          </TextContainer>
        </div>
        <Gap />
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MemoOrderSVG fontSize="24px" />
          <TextContainer>
            <Text>
              For queries regarding bulk orders, distributorship & general
              trade, please contact us on
              <SmartSupport href="mailto:business@plixlife.com">
                business@plixlife.com
              </SmartSupport>
            </Text>
          </TextContainer>
        </div>
      </Container>
    </>
  );
}
