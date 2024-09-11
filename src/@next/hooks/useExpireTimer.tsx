// useExpireTimer.js
import { useState, useEffect, useRef } from "react";

const useExpireTimer = (initialValue = 5) => {
  const initialTime = Number(initialValue) * 60 || 5 * 60; // 5 minutes in seconds
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let timer: any;

    if (time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      // Reset the timer when it reaches zero
      setTime(initialTime);
    }

    return () => clearInterval(timer); // Cleanup the interval on component unmount or re-render
  }, [time, initialTime]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return {
    minutes,
    seconds,
  };
};

export default useExpireTimer;
