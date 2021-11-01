import { useEffect, useState } from "react";

interface RaceTimerProps {
  EndTime: number;
}

interface Timer {
  Hours: number;
  Minutes: number;
  Seconds: number;
}

const RaceTimer: React.FC<RaceTimerProps> = ({ EndTime }) => {
  const [timer, setTimer] = useState<Timer>({
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
  });

  useEffect(() => {
    let interval = setInterval(() => {
      let now = new Date().getTime();
      let distance = EndTime - now;

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimer({ Hours: hours, Minutes: minutes, Seconds: seconds });
    }, 1000);

    return () => clearInterval(interval);
  });

  if (timer.Seconds == 0) return <>--:--:--</>;
  else
    return (
      <>
        {timer.Hours < 10 ? "0" + timer.Hours : timer.Hours}:
        {timer.Minutes < 10 ? "0" + timer.Minutes : timer.Minutes}:
        {timer.Seconds < 10 ? "0" + timer.Seconds : timer.Seconds}
      </>
    );
};

export default RaceTimer;

/*
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
*/
