import React from "react";
import * as S from "./style";

export interface ITypeContainerProps {
  categoryTitile: string;
  typeCategory: any;
  profileType?: string;
}

export const TypeContainer: React.FC<ITypeContainerProps> = ({
  typeCategory,
  categoryTitile,
  profileType,
}) => {
  // const [category, setCategory] = useState(4);
  const category = 4;
  //
  return (
    <S.Container>
      <S.TypeHeading>{categoryTitile}</S.TypeHeading>
      {profileType === "company"
        ? typeCategory?.map((content: any, idx: any) =>
            idx < category ? <span key={idx}>{content?.node?.name}</span> : ""
          )
        : typeCategory?.map((content: any, idx: any) => {
            return idx < category ? (
              <span key={content?.node?.id}>{content?.node?.companyType}</span>
            ) : (
              ""
            );
          })}
      <S.MoreTypesContainer>
        {typeCategory?.length > 4 ? (
          `${typeCategory?.length - category}+`
        ) : (
          <></>
        )}
      </S.MoreTypesContainer>
    </S.Container>
  );
};
TypeContainer.displayName = "TypeContainer";
export default TypeContainer;
