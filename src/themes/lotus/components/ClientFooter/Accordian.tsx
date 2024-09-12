import React, { useState } from "react";

import ReactSVG from "react-svg";
import { NavLink } from "src/components/NavLink";
import { Footer_menu } from "@temp/components/Footer/gqlTypes/Footer";
import * as S from "./style";
import MemoPlusSVG from "./assets/PlusSVG";
import MemoMinusSVG from "./assets/MinusSVG";
// import Plus from "./assets/Group 22.svg";
// import Minus from "./assets/Vector 23.svg";

export interface ICareAccordianProps {
  menu: Footer_menu;
}
// const data = [
//   {
//     id: 1,
//     title: "Shop",
//     description: [
//       "ALL Skincare",
//       "haircare",
//       "Creams",
//       "Exfoliator",
//       "Face Oil",
//       "Face Wash",
//       "Mask",
//       "Serum",
//       "SunScreen",
//       "Toner",
//       "Moisturise",
//     ],
//   },
//   {
//     id: 2,
//     title: "About",
//     description: [
//       "Our Story",
//       "ingredients",
//       "Blogs",
//       "FAQ's",
//       "CSR Policy",
//       "Return Policy",
//       "Privacy Policy",
//       "Term & Conditions",
//     ],
//   },
//   {
//     id: 3,
//     title: "Useful links",
//     description: ["My Account", "Track Order", "My Orders", "Store Locatior"],
//   },
// ];

export const CareAccordian: React.FC<ICareAccordianProps> = ({ menu }) => {
  const [show, setshow] = useState("");
  return (
    <S.Accordian>
      {menu.items.map(item => (
        <S.Item className={`${item.id === show ? "active" : ""}`} key={item.id}>
          <div style={{ display: "flex" }}>
            <S.Heading>{item.name}</S.Heading>
            {show === item.id ? (
              // <ReactSVG path={Minus} onClick={() => setshow("")} />
              <MemoMinusSVG onClick={() => setshow(item.id)} />
            ) : (
              <MemoPlusSVG onClick={() => setshow(item.id)} />
              // <ReactSVG path={Plus} onClick={() => setshow(item.id)} />
            )}
          </div>

          {show === item.id && (
            <S.List>
              {item.children.map((i, index) => (
                <li key={index}>
                  <NavLink item={i} />
                </li>
              ))}
            </S.List>
          )}
        </S.Item>
      ))}
    </S.Accordian>
  );
};
CareAccordian.displayName = "CareAccordian";
export default CareAccordian;
