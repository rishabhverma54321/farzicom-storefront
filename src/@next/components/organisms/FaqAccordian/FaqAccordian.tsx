import React, { ReactNode, useState } from "react";

// import ReactSVG from "react-svg";
import ReactSVG from "react-svg";
import MemoMinusPlix from "@components/atoms/SvgIcons/MinusPlix";
import MemoPlusPlix from "@components/atoms/SvgIcons/PlusPlix";
import { useWindowWidth } from "@hooks/useWindowWidth";
import Script from "next/script";
import { constructFaqSchema } from "@temp/core/SEO/Faq/faqSchema";
import MemoMinusPlixNew from "@components/atoms/SvgIcons/MinusPlixNew";
import MemoPlixPluxNew from "@components/atoms/SvgIcons/PlusPlixNew";
import * as S from "./style";

import Plus from "./assets/Group 22.svg";
import Minus from "./assets/Vector 23.svg";
import { customEventTrigger } from "@utils/misc";
import gtmConfig from "@temp/themes/plixlifefc/lib/gtmConfig";
import { useAuthState } from "@saleor/sdk";

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
  eventHeaderName?:string;
}

export const FaqAccordian: React.FC<IFaqAccordianProps> = ({
  data,
  arrowUp,
  arrowDown,
  accordianClass,
  eventHeaderName
}) => {
  const [show, setshow] = useState(0);
  const [width] = useWindowWidth();
  const {user} = useAuthState();
  return (
    <>
      {data && (
        <Script
          dangerouslySetInnerHTML={{
            __html: `${constructFaqSchema(data)}`,
          }}
          id="faq-structured-data-list-script"
          className="faq-structured-data-list"
          type="application/ld+json"
        />
      )}
        <S.Accordian>
        {data.map(item => (
          <S.Item
            className={`${item.id === show ? `active ${accordianClass}` : ""}`}
          >
            <S.Button
              onClick={() => {
                if(show === item.id){
                  setshow(0) 
                }else{
                  setshow(item.id)
                  if(gtmConfig.faqSectionClick.enable){
                    customEventTrigger(gtmConfig.faqSectionClick.value, user, {
                      heading_name: item.q
                    });
                  }
                }
              }}
            >
            {item.icon && (
              <S.Icon>
                <img src={item.icon} alt="" />
              </S.Icon>
            )}
            <S.Heading>{item.q}</S.Heading>
            <S.ExpandIcon>
              {show === item.id ? (
                <MemoMinusPlixNew fontSize="32px" />
              ) : (
                <MemoPlixPluxNew fontSize="32px" />
                )}
              </S.ExpandIcon>
            </S.Button>
            {show === item.id && <S.Description>{item.a}</S.Description>}
          </S.Item>
        ))}
      </S.Accordian>
    </>
  );
};
FaqAccordian.displayName = "FaqAccordian";
export default FaqAccordian;
