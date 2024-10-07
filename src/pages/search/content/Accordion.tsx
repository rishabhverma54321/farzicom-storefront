import React, { useState } from "react";
import MemoDownArrowBig from "@components/atoms/SvgIcons/DownArrowBig";
import * as S from "./styles";

export interface IFilterAccordianProps {
  children: React.ReactChildren | null;
  header: string;
}

export const FilterAccordian: React.FC<IFilterAccordianProps> = ({
  children,
  header,
}) => {
  const [show, setshow] = useState(true);
  return (
    <S.Accordian>
      <S.AccordionHeader>
        <h3>{header}</h3>
        {show ? (
          <span className="invert-arrow" onClick={() => setshow(show => !show)}>
            <MemoDownArrowBig />
          </span>
        ) : (
          <span onClick={() => setshow(show => !show)}>
            <MemoDownArrowBig />
          </span>
        )}
      </S.AccordionHeader>
      {show ? <S.FilterList>{children}</S.FilterList> : <></>}
    </S.Accordian>
  );
};
FilterAccordian.displayName = "FilterAccordian";
export default React.memo(FilterAccordian);
