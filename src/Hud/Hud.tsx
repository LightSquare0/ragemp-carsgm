import RaceHud from "./RaceUi/RaceHud/RaceHud";
import { HudContainer } from "./HudGeneralStyles";
import Speedometer from "./Speedometer/Speedometer";
import Headline from "./Headline/Headline";
import { useLocation } from "react-router";
import { Routes } from "../Utils/RoutesEnum";
import { useContext } from "react";
import { UserContext } from "../Globals/UserContext";
import { UserData } from "./RaceUi/RaceHud/RaceEvents";

const Hud: React.FC = () => {
  let location = useLocation();

  const { userData } = useContext<{ userData: UserData }>(UserContext);

  if (location.pathname != Routes.Root) return <></>;

  return (
    <HudContainer>
      <Headline />
      {userData.IsInStartedRace && <RaceHud />}
      <Speedometer />
    </HudContainer>
  );
};

export default Hud;
