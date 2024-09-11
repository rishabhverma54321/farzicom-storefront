import * as React from "react";
import { useTrail, animated } from "react-spring";
import ProductItem from "./ProductItem";

import * as S from "./Search.styled";

const config = { mass: 5, tension: 2000, friction: 200 };

export interface IResultList {
  data: any[];
  hideFunc: () => void;
}

const ResultList: React.FC<IResultList> = ({ data, hideFunc }) => {
  const trail = useTrail(data.length, {
    config,
    opacity: 1,
    x: 0,
    height: "auto",
    from: { opacity: 0, y: 20, height: 0 },
  });
  return (
    <S.ResultList>
      {trail.map(({ y, height, ...rest }, index) => {
        return (
          <animated.div
            key={index}
            className="trails-text"
            style={{
              ...rest,
              transform: y.interpolate(y => `translate3d(0,0,${y}px)`),
            }}
          >
            <animated.div style={{ height }}>
              <ProductItem
                product={data[index]}
                hide={hideFunc}
                isEven={index % 2 === 0}
                key={data[index].id}
              />
            </animated.div>
          </animated.div>
        );
      })}
    </S.ResultList>
  );
};

export default ResultList;
