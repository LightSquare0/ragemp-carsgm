import RaceHud from "./RaceUi/RaceHud/RaceHud";
import { HudContainer } from "./HudGeneralStyles";
import Speedometer from "./Speedometer/Speedometer";
import Headline, { HeadlineProps } from "./Headline/Headline";
import { useLocation } from "react-router";
import { Routes } from "../Utils/RoutesEnum";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Globals/UserContext";
import { ServerData, UserData } from "./RaceUi/RaceHud/RaceEvents";

const Hud: React.FC = () => {
  let location = useLocation();

  if (location.pathname != Routes.Root) return <></>;

  const { ServerData, setServerData } = useContext<{
    ServerData: ServerData;
    setServerData: React.Dispatch<React.SetStateAction<ServerData>>;
  }>(UserContext);

  const [isHeadlineRendered, setIsHeadlineRendered] = useState<boolean>(false);

  const [clock, setClock] = useState<HeadlineProps["clock"]>({
    Year: "",
    Month: "",
    Day: "",
    Hour: "",
    Minute: "",
  });

  async function FetchClock(): Promise<void> {
    if (isHeadlineRendered) {
      let response = await fetch(
        "http://worldtimeapi.org/api/timezone/Europe/Amsterdam"
      );

      let clockData = await response.json();

      let [date, time] = clockData.datetime.split("T");
      time = time.split(".")[0];
      let [year, month, day] = date.split("-");
      let [hour, minute] = time.split(":");

      setClock({
        Year: year,
        Month: month,
        Day: day,
        Hour: hour,
        Minute: minute,
      });
    }
  }

  useEffect(() => {
    FetchClock();
  }, [isHeadlineRendered]);

  useEffect(() => {
    FetchClock();
  }, []);

  useEffect(() => {
    let tick = setInterval(() => {
      FetchClock();
    }, 20000);

    return () => clearInterval(tick);
  });

  return (
    <HudContainer>
      <Headline
        clock={clock}
        isHeadlineRendered={isHeadlineRendered}
        setIsHeadlineRendered={setIsHeadlineRendered}
      />
      <RaceHud />
      <Speedometer />
    </HudContainer>
  );
};

export default Hud;
