import RaceHud from "./RaceUi/RaceHud/RaceHud";
import { HudContainer } from "./HudGeneralStyles";
import Speedometer from "./Speedometer/Speedometer";

const Hud = () => {
  
  return (
    <HudContainer>
      <RaceHud/>
      <Speedometer />
    </HudContainer>
  );
};

export default Hud;
