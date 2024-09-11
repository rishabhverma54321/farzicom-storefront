import React from "react";
import * as S from "./style";
import CustomButton from "../CustomButton";
import MemoEdit from "./Edit";

export interface IYarnAddressProps {
  bgColor?: any;
  companyName: string;
  name: string;
  id: string;
  addressL1: string;
  addressL2: string;
  addressL3: string;
  pincode: string;
  title?: string;
}

export const YarnAddress: React.FC<IYarnAddressProps> = ({
  bgColor,
  companyName,
  name,
  id,
  addressL1,
  addressL2,
  addressL3,
  pincode,
  title,
}) => {
  return (
    <S.Container className="yarn-address" bgColor={bgColor}>
      <div className="yarn-address__body">
        <S.Heading>{title}</S.Heading>
        <S.Name>{companyName}</S.Name>
        <S.Title>{name}</S.Title>
        <S.Title>{addressL1}</S.Title>
        <S.Title>{addressL2}</S.Title>
        <S.Title>{addressL3}</S.Title>
        <S.Title>{pincode}</S.Title>
      </div>
      {/* <CustomButton
        textColor="#005bc2"
        width={318}
        LeftIcon={<MemoEdit />}
        text="Edit"
        ClassName="addressSvg"
      /> */}
    </S.Container>
  );
};
YarnAddress.displayName = "YarnAddress";
export default YarnAddress;
