import { CheckBoxItem } from "@components/atoms/CheckBoxItem";
import React from "react";
import * as S from "./style";

interface contentType {
  id: string;
  name: string;
  checked: boolean;
}

export interface ICheckBoxItemListProps {
  contents: contentType[];
  header?: string;
  onProdTypeChange: (content: {
    id: string;
    checked: boolean;
    name: string;
  }) => void | null;
  headerClass?: string;
}

export const CheckBoxItemList: React.FC<ICheckBoxItemListProps> = ({
  contents,
  header,
  onProdTypeChange,
  headerClass,
}) => {
  return (
    <S.Wrapper>
      <S.SubHeader className={headerClass}>{header}</S.SubHeader>
      {contents?.map(content => (
        <CheckBoxItem onProdTypeChange={onProdTypeChange} content={content} />
      ))}
    </S.Wrapper>
  );
};
CheckBoxItemList.displayName = "CheckBoxItemList";
export default CheckBoxItemList;
