import { RadioItem } from "@components/atoms/RadioItem";
import React from "react";
import * as S from "./style";

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
      <S.Wrapper>
        <S.SubHeader className={headerClass}>{header}</S.SubHeader>
        {contents.map((content, index) => (
          <RadioItem
            key={index}
            checked={content.isChecked}
            label={content.name}
            id={content.id}
            onCollectionChange={onCollectionChange}
          />
        ))}
      </S.Wrapper>
    </>
  );
};
RadioItemList.displayName = "RadioItemList";
export default RadioItemList;
