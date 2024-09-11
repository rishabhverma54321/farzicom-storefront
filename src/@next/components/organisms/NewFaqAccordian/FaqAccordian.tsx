import React, { ReactNode, useState } from "react";

// import ReactSVG from "react-svg";
import ReactSVG from "react-svg";
import MemoMinusPlix from "@components/atoms/SvgIcons/MinusPlix";
import MemoPlusPlix from "@components/atoms/SvgIcons/PlusPlix";
import MemoMinusPlixNew from "@components/atoms/SvgIcons/MinusPlixNew";
import MemoPlusPlixNew from "@components/atoms/SvgIcons/PlusPlixNew";

import { useWindowWidth } from "@hooks/useWindowWidth";
import * as S from "./style";

import Plus from "./assets/Group 22.svg";
import Minus from "./assets/Vector 23.svg";

interface item {
  id: number;
  q: string;
  a: string;
  icon?: string;
}
export interface IFaqAccordianProps {
  data: item[];
  arrowUp?: ReactNode;
  arrowDown?: ReactNode;
  accordianClass?: string;
}

export const FaqAccordian: React.FC<IFaqAccordianProps> = ({
  data,
  arrowUp,
  arrowDown,
  accordianClass,
}) => {
  const [show, setshow] = useState(0);
  const [width] = useWindowWidth();
  return (
    <S.Accordian>
      {data.map((item,index) => (
        <S.Item
          className={`${index === show ? `active ${accordianClass}` : ""}`}
        >
          <S.Button
            onClick={() => (show === index ? setshow(0) : setshow(index))}
          >
            {item.icon && (
              <S.Icon>
                <img src={item.icon} alt="" />
              </S.Icon>
            )}
            <S.Heading>{item?.question}</S.Heading>
            <S.ExpandIcon>
              {show === index ? (
                <MemoMinusPlixNew fontSize="32px" />
              ) : (
                <MemoPlusPlixNew fontSize="32px" />
              )}
            </S.ExpandIcon>
          </S.Button>
          {show === index && <S.Description>{item?.answer}</S.Description>}
        </S.Item>
      ))}
    </S.Accordian>
  );
};
FaqAccordian.displayName = "FaqAccordian";
export default FaqAccordian;