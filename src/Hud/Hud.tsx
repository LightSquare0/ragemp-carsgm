import { useEffect } from "react";
import { useHistory } from "react-router";
import { HudContainer } from "./HudGeneralStyles";
import Speedometer from "./Speedometer/Speedometer";

const Hud = () => {
  
  return (
    <HudContainer>
      <Speedometer />
    </HudContainer>
  );
};

export default Hud;
