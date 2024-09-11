import React from "react";
import styled, { css } from "styled-components";
import { media } from "@styles/media";
import MemoEmailSVG from "@components/atoms/SvgIcons/EmailSVG";
import MemoPhoneSVG from "@components/atoms/SvgIcons/PhoneSVG";
import MemoLocationSVG from "@components/atoms/SvgIcons/LocationSVG";
import { CLIENT_ADDRESS, CONTACT_INFO, CLIENT } from "Themes/config";
import { clients } from "gqlTypes/customGlobalTypes";
import MemoChatSvg from "@components/atoms/SvgIcons/ChatSvg";
import { Gap } from "../../atoms/Gap/styled";

const Container = styled.div`
  flex: 1;
  display: flex;
  margin-right: 2rem;
  flex-direction: column;

  ${media.mediumScreen`
    margin-right: 0;
  `}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const Heading = styled.h3`
  text-transform: uppercase;
  color: #414141;
  margin-bottom: 32px;
  font-size: 18px;
  letter-spacing: 0.65px;
  font-weight: 600;

  ${media.mediumScreen`
    text-align: center;
    margin-bottom: 2rem;
    margin-top: 2rem;
  `}
`;

const TextCSS = css`
  color: #414141;
  font-size: 13px;
  width: auto;
  overflow: hidden;
`;

const Text = styled.div`
  ${TextCSS}
`;

const SmartSupport = styled.a`
  ${TextCSS}
`;

const Address = styled.address`
  ${TextCSS}
`;

export default function ContactInformation() {
  return (
    <>
      <Container style={{ flex: 1 }}>
        <Heading>STORE INFORMATION</Heading>
        <div style={{ display: "flex" }}>
          <MemoLocationSVG fontSize="24px" />
          <TextContainer>
            <Address>
              {CLIENT_ADDRESS.addressLine1}
              <br /> {CLIENT_ADDRESS.addressLine2}
              <br /> {CLIENT_ADDRESS.addressLine3}
              <br /> {CLIENT_ADDRESS.city}
              <br /> {CLIENT_ADDRESS.state}
              <br /> {CLIENT_ADDRESS.pincode}
            </Address>
          </TextContainer>
        </div>
        {CONTACT_INFO[1].text && (
          <>
            <Gap />

            <div style={{ display: "flex" }}>
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
        {CLIENT === clients.PLIXLIFEFC && (
          <>
            <Gap />
            <div
              style={{ display: "flex", cursor: "pointer" }}
              className="limechat_widget_toggle"
            >
              <MemoChatSvg fontSize="24px" />
              <TextContainer>
                <Text>Chat with us </Text>
              </TextContainer>
            </div>
          </>
        )}
        <Gap />
        <div style={{ display: "flex" }}>
          <MemoEmailSVG fontSize="24px" />
          <TextContainer>
            <Text>Email us: </Text>
            <SmartSupport href={CONTACT_INFO[0].url}>
              {CONTACT_INFO[0].text}
            </SmartSupport>
          </TextContainer>
        </div>
      </Container>
    </>
  );
}
