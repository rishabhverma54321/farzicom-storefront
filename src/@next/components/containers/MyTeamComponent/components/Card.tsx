import React from "react";
import * as C from "../styles";

export interface CardComponentProps {
  compName?: string | null | undefined;
  phoneNo?: string;
  postAndDepartment?: string;
  buttonDetail?: string;
  imgUrl?: string;
  handleClick?: any;
  id?: any;
}

const Card: React.FC<CardComponentProps> = ({
  compName,
  phoneNo,
  postAndDepartment,
  buttonDetail,
  imgUrl,
  handleClick,
  id,
}) => {
  return (
    <C.Card className="card">
      <div className="card__left">
        <C.CImage>
          {imgUrl ? <img src={imgUrl} alt="img" /> : compName?.substring(0, 1)}
        </C.CImage>
        <C.Details>
          <C.Title>{compName}</C.Title>
          {phoneNo && <C.Info className="card__phonenumber">{phoneNo}</C.Info>}
          {postAndDepartment && (
            <C.Info className="card__post-and-designation">
              {postAndDepartment}
            </C.Info>
          )}
        </C.Details>
      </div>
      {buttonDetail && (
        <C.Button onClick={() => handleClick(id)}>{buttonDetail}</C.Button>
      )}
    </C.Card>
  );
};

export default Card;
