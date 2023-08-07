import React, { useState, useEffect } from "react";

export default function Timer({ gameFinished }) {
  const [seconds, setSeconds] = useState(0);

  // save time to localstorage and show the best time

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameFinished) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      } else {
        setSeconds(0); // Restart the timer when gameFinished is true
      }
    }, 1000);

    // Clear the interval when the component unmounts or when gameFinished is true (to restart the timer)
    return () => clearInterval(interval);
  }, [gameFinished]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    const formattedTime = `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    return formattedTime;
  };

  return (
    <div>
      <h2>Timer: {formatTime(seconds)}</h2>
    </div>
  );
}
