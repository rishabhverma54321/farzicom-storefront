import { RadioItem } from "@components/atoms/RadioItem";
import React from "react";
import * as S from "./style";
import style from "./scss/index.module.scss"

interface RadioObject {
  id: string;
  isChecked: boolean;
  metadata: {};
  name: string;
}

export interface IRadioItemListProps {
  contents: RadioObject[];
  header?: String;
  onCollectionChange: (id: string, name: string) => void;
  headerClass?: string;
}

export const RadioItemList: React.FC<IRadioItemListProps> = ({
  contents,
  header,
  onCollectionChange,
  headerClass,
}) => {
  return (
    <>
      <div className={style.Wrapper}>
        <span className={`${headerClass} ${style.SubHeader}`}>{header}</span>
        {contents.map((content, index) => (
          <RadioItem
            key={index}
            checked={content.isChecked}
            label={content.name}
            id={content.id}
            onCollectionChange={onCollectionChange}
          />
        ))}
      </div>
    </>
  );
};
RadioItemList.displayName = "RadioItemList";
export default RadioItemList;
