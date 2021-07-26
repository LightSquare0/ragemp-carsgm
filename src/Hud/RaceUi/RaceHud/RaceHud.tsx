import { useEffect, useRef } from "react";
import Icon from "../../../Utils/Icon";
import {
  RaceHudContainer,
  Position,
  TimeLeft,
  CurrentStatsContainer,
  CurrentLapTimer,
  CurrentRelativePosition,
  BestLap,
  LastLap,
  Laps,
  StatsContainer,
} from "./RaceHudStyles";

const RaceHud: React.FC = () => {
  const ref = useRef(null);
  useEffect(() => {

  console.log(ref.current.offsetHeight);
  }, [])
  return (
    <RaceHudContainer ref = {ref}>
      <StatsContainer>
        <Position>1/17</Position>
        <TimeLeft>05:48:30</TimeLeft>
        <Laps>1</Laps>
      </StatsContainer>
      <CurrentStatsContainer>
        <CurrentLapTimer>02:54:24</CurrentLapTimer>
        <CurrentRelativePosition>
          <span>
            <Icon icon="caret-up-solid" size="1.6rem" color="white" />Laity
          </span>
          <span>
            <Icon icon="caret-down-solid" size="1.6rem" color="white" />
            Critos
          </span>
        </CurrentRelativePosition>
      </CurrentStatsContainer>
      <StatsContainer>
        <BestLap>03:13:21</BestLap>
        <LastLap>03:28:03</LastLap>
      </StatsContainer>
    </RaceHudContainer>
  );
};

export default RaceHud;
