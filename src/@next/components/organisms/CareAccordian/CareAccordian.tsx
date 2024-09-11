import React, { ReactNode, useState } from "react";

// import ReactSVG from "react-svg";
import { Markup } from "interweave";
import * as S from "./style";
import MemoArrowActiveSVG from "./assets/ArrowActiveSVG";
import MemoArrowDownSVG from "./assets/ArrowDownSVG";
// import ArrowDown from "./assets/Arrow down.svg";
// import ArrowUp from "./assets/Arrow active.svg";

interface item {
  id: number;
  title: string;
  description: string;
}
export interface ICareAccordianProps {
  data: item[];
  arrowUp?: ReactNode;
  arrowDown?: ReactNode;
}

export const CareAccordian: React.FC<ICareAccordianProps> = ({
  data,
  arrowUp,
  arrowDown,
}) => {
  const [show, setshow] = useState(0);
  return (
    <S.Accordian>
      {data.map((item, index) => (
        <S.Item className={`${item.id === show ? "active" : ""}`} key={index}>
          <S.Button
            onClick={() => (show === item.id ? setshow(0) : setshow(item.id))}
          >
            <S.Icon>
              {show === item.id ? (
                <>
                  {arrowUp ? (
                    <>{arrowUp}</>
                  ) : (
                    <MemoArrowActiveSVG fontSize="34px" />
                  )}
                </>
              ) : (
                <MemoArrowDownSVG fontSize="34px" />
              )}
            </S.Icon>
            <S.Heading>{item.title}</S.Heading>
          </S.Button>
          {show === item.id && (
            <S.Description>
              <Markup content={item.description} />
            </S.Description>
          )}
        </S.Item>
      ))}
    </S.Accordian>
  );
};
CareAccordian.displayName = "CareAccordian";
export default CareAccordian;
