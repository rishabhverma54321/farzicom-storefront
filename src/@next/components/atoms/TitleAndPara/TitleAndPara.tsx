import React from "react";
import * as S from "./style";

export interface ITitleAndParaProps {
  item: {
    title: string;
    para: string[] | null;
    list: string[] | null;
  };
}

export const TitleAndPara: React.FC<ITitleAndParaProps> = ({
  item: { title, para, list },
}) => {
  return (
    <>
      <S.Container>
        <S.Title> {title} </S.Title>
        {para !== null &&
          para.map(p => (
            <>
              <br />
              <S.Para>{p}</S.Para>
            </>
          ))}
        <br />

        {list !== null && (
          <S.List>
            {list.map(p => (
              <li>{p}</li>
            ))}
          </S.List>
        )}
      </S.Container>
    </>
  );
};
TitleAndPara.displayName = "TitleAndPara";
export default TitleAndPara;
