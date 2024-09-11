import React from "react";

import { getMetadataValue } from "@utils/misc";
import * as S from "./style";

import { TextIcon } from "../TextIcon";
import ArrowUpward from "./ArrowUpward";
import ArrowDownward from "./ArrowDownward";
import { TypedNavBarInformation } from "./queries";

export interface IYarnNavbarProps {}

export const YarnNavbar: React.FC<IYarnNavbarProps> = () => {
  return (
    <TypedNavBarInformation>
      {({ data }) => {
        const metaData: any = data?.section?.edges[0]?.node?.metadata;
        const result = JSON.parse(
          getMetadataValue(metaData, "top_bar_sticker")
        );
        const phoneNumber = JSON.parse(
          getMetadataValue(metaData, "phone_number")
        );

        localStorage.setItem("phoneNumber", phoneNumber);
        return (
          <S.Navbar>
            {result?.map((item: any, idx: number) => {
              return (
                <S.Container key={idx}>
                  <S.Navlinks>
                    <TextIcon
                      text={item}
                      icon={<ArrowUpward />}
                      ClassName="nav-item"
                    />
                    <TextIcon
                      text={item}
                      icon={<ArrowDownward />}
                      ClassName="nav-item"
                    />
                  </S.Navlinks>
                  <S.Separator>|</S.Separator>
                </S.Container>
              );
            })}
          </S.Navbar>
        );
      }}
    </TypedNavBarInformation>
  );
};
YarnNavbar.displayName = "YarnNavbar";
export default YarnNavbar;
