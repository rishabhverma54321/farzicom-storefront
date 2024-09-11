import React, { useState, useEffect } from "react";

export const useExpireTimer = () => {
  const initialTime = 5 * 60; // 5 minutes in seconds
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

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
      <>
        {!!minutes ? (
          <>
            <span>{String(minutes).padStart(1, "0")}</span> mins &
          </>
        ) : (
          <></>
        )}
        <span> {String(remainingSeconds).padStart(2, "0")}</span> Secs
      </>
    );
  };

  return (
    <div>
      <p>The offer expires in {formatTime(time)}</p>
    </div>
  );
};

useExpireTimer.displayname = "ExpireTimer";
export default useExpireTimer;
