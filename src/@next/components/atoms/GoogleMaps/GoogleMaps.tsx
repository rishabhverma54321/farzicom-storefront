import React from "react";
import { styled } from "@styles/themes";
import { media } from "@styles/media";

export interface IGoogleMapsProps {}

export const Container = styled.div`
  width: 60%;

  ${media.mediumScreen`
    width: 100%;
    height: 60vh;
  `}
`;

export const GoogleMaps: React.FC<IGoogleMapsProps> = () => {
  return (
    <Container>
      <iframe
        width="100%"
        height="85%"
        title="google map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14025.862650787714!2d77.1512606!3d28.4956344!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x954ca5a46cc40d2e!2sLotus%20Herbals%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1584428443580!5m2!1sen!2sin"
      />
    </Container>
  );
};
GoogleMaps.displayName = "GoogleMaps";
export default GoogleMaps;
