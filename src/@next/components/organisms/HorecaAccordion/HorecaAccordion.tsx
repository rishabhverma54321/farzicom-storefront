import React, { ReactNode, useState } from "react";

import ReactSVG from "react-svg";
import * as S from "./style";

import Plus from "./assets/Group 22.svg";
import Minus from "./assets/Vector 23.svg";
import ItemIcon from "./assets/HorecaItemIcon.svg";

interface item {
  id: number;
  title: string;
  description: string;
  icon: string;
  childrenElements?: [];
}

export interface IHorecaAccordionProps {
  data: item[];
  arrowUp?: ReactNode;
  arrowDown?: ReactNode;
}

export const HorecaAccordion: React.FC<IHorecaAccordionProps> = ({
  data,
  arrowUp,
  arrowDown,
}) => {
  const [show, setshow] = useState(0);
  return (
    <S.Accordian>
      {data.map(item => (
        <S.Item className={`${item.id === show ? "active" : ""}`}>
          <S.Button
            onClick={() => (show === item.id ? setshow(0) : setshow(item.id))}
          >
            {item.icon && (
              <S.Icon>
                <img src={item.icon} alt="" />
              </S.Icon>
            )}
            <S.Heading>{item.title}</S.Heading>
            <S.ExpandIcon>
              {show === item.id ? (
                <ReactSVG path={Minus} />
              ) : (
                // <ReactSVG path={ArrowUp} />
                <ReactSVG path={Plus} />
                // <ReactSVG path={ArrowDown} />
              )}
            </S.ExpandIcon>
          </S.Button>
          {show === item.id && item.description && (
            <S.Description>{item.description}</S.Description>
          )}
          {show === item.id && item.childrenElements && (
            <S.List>
              {item.childrenElements.map(childItem => (
                <S.ListItem>{childItem}</S.ListItem>
              ))}
            </S.List>
          )}
        </S.Item>
      ))}
    </S.Accordian>
  );
};
HorecaAccordion.displayName = "HorecaAccordion";
export default HorecaAccordion;
