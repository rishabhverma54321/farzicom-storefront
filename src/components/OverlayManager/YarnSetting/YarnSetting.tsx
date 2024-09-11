import React from "react";
import Cross from "images/profileSvg/SideNavCrossSVG";
import { Overlay, OverlayContextInterface } from "@temp/components";
import * as S from "./styles";
import SettingIcon from "../../../images/order-dispatch/Setting";
import LogoutIcon from "../../../images/order-dispatch/Logout";
import RightArrow from "../../../@next/components/atoms/CustomInput/RightArrow";

export interface IYarnSettingProps {
  overlay: OverlayContextInterface;
  testingContext: string;
}

export const YarnSetting: React.FC<IYarnSettingProps> = ({
  overlay,
  testingContext,
}) => {
  return (
    <Overlay context={overlay} testingContext={testingContext}>
      <S.Setting className="setting">
        <S.Header className="setting__header">
          <div className="setting__header--heading">
            <SettingIcon className="setting__icon" />
            <h1>Settings</h1>
          </div>
          <Cross className="setting__cross" />
        </S.Header>
        <S.PartOne>
          <Row left="FAQs" right={<RightArrow />} />
          <Row left="Suggest a feature" right={<RightArrow />} />
        </S.PartOne>
        <S.PartOne>
          <Row left="About Us" right={<RightArrow />} />
          <Row left="Privacy Policy" right={<RightArrow />} />
          <Row left="Terms And Conditions" right={<RightArrow />} />
        </S.PartOne>
        <S.Logout>
          <Row left="Logout" right={<LogoutIcon />} />
        </S.Logout>
      </S.Setting>
    </Overlay>
  );
};
YarnSetting.displayName = "YarnSetting";
export default YarnSetting;

export const Row = (props: any) => {
  return (
    <S.Row className="setting-row">
      <span>{props.left}</span>
      <span>{props.right}</span>
    </S.Row>
  );
};
