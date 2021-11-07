import React, { useEffect, useState } from "react";

interface Timer {
  Hours: number;
  Minutes: number;
  Seconds: number;
}

const RaceTimer: React.FC = () => {
  const [timer, setTimer] = useState<Timer>({
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
  });

  mp.events.add("react:UpdateRaceTimer", (Hours, Minutes, Seconds) => {
    setTimer({
      Hours: Hours,
      Minutes: Minutes,
      Seconds: Seconds,
    });
  });

  if (timer.Seconds <= 0) return <>--:--:--</>;
  else
    return (
      <>
        {timer.Hours < 10 ? "0" + timer.Hours : timer.Hours}:
        {timer.Minutes < 10 ? "0" + timer.Minutes : timer.Minutes}:
        {timer.Seconds < 10 ? "0" + timer.Seconds : timer.Seconds}
      </>
    );
};

export default React.memo(RaceTimer);

/*
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
*/
