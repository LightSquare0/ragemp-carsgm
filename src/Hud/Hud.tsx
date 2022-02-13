import RaceHud from "./RaceUi/RaceHud/RaceHud";
import { HudContainer, KeybindsContainer } from "./HudGeneralStyles";
import Speedometer from "./Speedometer/Speedometer";
import Headline, { HeadlineProps } from "./Headline/Headline";
import { useLocation } from "react-router";
import { Routes } from "../Utils/RoutesEnum";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Globals/UserContext";
import { ServerData, UserData } from "./RaceUi/RaceHud/RaceEvents";
import { Button } from "../Globals/GlobalStyles/ButtonStyles";

const Hud: React.FC = () => {
  let location = useLocation();

  if (location.pathname != Routes.Root) return <></>;

  const { ServerData, setServerData, userData } = useContext<{
    ServerData: ServerData;
    setServerData: React.Dispatch<React.SetStateAction<ServerData>>;
    userData: UserData;
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

  const PrepareRace = () => {
    mp.events.call("clientside:PrepareRace");
  };

  const StartRace = () => {
    mp.events.call("clientside:StartRace");
  };

  console.log("IsInPreparedRace " + userData.IsInPreparedRace);
  console.log("HasEnded " + userData.CurrentRace.HasEnded);

  return (
    <HudContainer>
      <Headline
        clock={clock}
        isHeadlineRendered={isHeadlineRendered}
        setIsHeadlineRendered={setIsHeadlineRendered}
      />
      <RaceHud />
      <KeybindsContainer>
        {userData.CurrentRace.HosterName == ServerData.Player.Name &&
          !userData.IsInPreparedRace && (
            <Button host onClick={PrepareRace}>
              PREPARE RACE
            </Button>
          )}
        {userData.CurrentRace.HosterName == ServerData.Player.Name &&
          userData.IsInPreparedRace &&
          !userData.IsInStartedRace &&
          !userData.CurrentRace.HasEnded && (
            <Button host onClick={StartRace}>
              START RACE
            </Button>
          )}
      </KeybindsContainer>
      <Speedometer />
    </HudContainer>
  );
};

export default Hud;
