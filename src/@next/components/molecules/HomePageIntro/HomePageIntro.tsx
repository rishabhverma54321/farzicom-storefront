import { CollectionHeading } from "@components/atoms/CollectionHeading";
import FlowerImage from "@components/atoms/FlowerImage";
import React from "react";
import { META_DEFAULTS } from "Themes/config";

export interface IHomePageIntroProps {}

export const HomePageIntro: React.FC<IHomePageIntroProps> = () => {
  return (
    <>
      <div
        className="container"
        style={{ padding: "10px 0 50px 0", position: "relative" }}
      >
        <FlowerImage isLeft />
        <CollectionHeading Heading="LOTUS ORGANICS" />
        <div className="container" style={{ fontStyle: "italic" }}>
          {META_DEFAULTS.name} is taking care of our two homes -{" "}
          <strong>EARTH & Our body.</strong>
          Curated with 100% Certified Organic Actives,{" "}
          <strong>
            we are Delivering Cruelty-free, Chemical-free Skincare at your
            Doorstep.
          </strong>{" "}
          Start your organic journey{" "}
          <strong>
            with {META_DEFAULTS.name}, and be one less person harming the
            environment !. #LiveOrganic!
          </strong>
        </div>
      </div>
    </>
  );
};
HomePageIntro.displayName = "HomePageIntro";
export default HomePageIntro;
