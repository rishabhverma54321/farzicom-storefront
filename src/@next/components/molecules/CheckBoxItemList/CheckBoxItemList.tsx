import { CheckBoxItem } from "@components/atoms/CheckBoxItem";
import React from "react";
import * as S from "./style";
import style from "./scss/index.module.scss"

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
    <div className={style.Wrapper}>
      <span className={`${headerClass} ${style.subHeader}`}>{header}</span>
      {contents?.map(content => (
        <CheckBoxItem onProdTypeChange={onProdTypeChange} content={content} />
      ))}
    </div>
  );
};
CheckBoxItemList.displayName = "CheckBoxItemList";
export default CheckBoxItemList;
