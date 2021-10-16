import RaceHud from "./RaceUi/RaceHud/RaceHud";
import { HudContainer } from "./HudGeneralStyles";
import Speedometer from "./Speedometer/Speedometer";
import Headline from "./Headline/Headline";
import { useLocation } from "react-router";
import { Routes } from "../Utils/RoutesEnum";

const Hud: React.FC = () => {
  let location = useLocation();

  if (location.pathname != Routes.Root) return <></>;

  return (
    <HudContainer>
      <Headline />
      <RaceHud />
      <Speedometer />
    </HudContainer>
  );
};

export default Hud;
