import React, { useEffect, useState } from "react";

export interface CountUpProps {
  number: number;
  duration: number;
}

export const CountUp: React.FC<CountUpProps> = ({ number, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = number;
    // if zero, return
    if (start === end) return;

    // find duration per increment
    let totalMilSecDur = duration;
    let incrementTime = (totalMilSecDur / end) * 1000;

    // timer increments start counter
    // then updates count
    // ends if start reaches end
    let timer = setInterval(() => {
      start += 1000;
      setCount(start);

      if (start >= end) {
        clearInterval(timer);
        setCount(number);
      }
    }, incrementTime);
  }, [number, duration]);

  return <>{count.toLocaleString()}</>;
};

CountUp.displayName = "CountUp";
export default CountUp;
