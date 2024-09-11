import MyCustomLink from "@components/next-react/MyCustomLink";
import { generateCollectionUrl } from "@temp/core/utils";
import React from "react";
import * as S from "./style";

export interface IMobileFilterItemProps {
  filter: {
    id: string;
    name: string;
    metaData: {};
    isChecked: Boolean;
  };
  onFilterChange: (id: string, name: string) => void;
  makeLink?: boolean;
  onLinkClick?:any;
}

export const MobileFilterItem: React.FC<IMobileFilterItemProps> = ({
  filter,
  onFilterChange,
  makeLink = false,
  onLinkClick,
}) => {
  if (makeLink) {
    return (
      <>
        {filter && (
          <MyCustomLink onClick={()=> {
            if(typeof onLinkClick == "function"){
              onLinkClick(filter.name);
            }
          }} href={generateCollectionUrl(filter.id, filter.name)}>
            <S.Wrapper
              isActive={filter.isChecked}
              // onClick={() => onFilterChange(filter.id, filter.name)}
            >
              <S.Text isActive={filter.isChecked}>{filter.name}</S.Text>
            </S.Wrapper>
          </MyCustomLink>
        )}
      </>
    );
  }
  return (
    <>
      {filter && (
        <S.Wrapper
          isActive={filter.isChecked}
          onClick={() => onFilterChange(filter.id, filter.name)}
        >
          <S.Text isActive={filter.isChecked}>{filter.name}</S.Text>
        </S.Wrapper>
      )}
    </>
  );
};
MobileFilterItem.displayName = "MobileFilterItem";
export default MobileFilterItem;
