import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../../Globals/UserContext";
import { UserData } from "./RaceEvents";
import {
  Bar,
  CurrentPosition,
  Participants,
  ParticipantsNo,
  Position,
  RaceHudContainer,
  RacePosition,
  RaceStat,
  StatName,
  StatProp,
} from "./RaceHudStyles";
import RaceTimer from "./RaceTimer";

const RaceHud: React.FC = () => {
  const { userData, setUserData } =
    useContext<{ userData: UserData; setUserData: React.Dispatch<React.SetStateAction<UserData>> }>(
      UserContext
    );

  return (
    <RaceHudContainer>
      <RacePosition>
        <CurrentPosition>{userData.CurrentRace.Player.RacePosition}</CurrentPosition>
        <Bar />
        <Participants>
          <ParticipantsNo>{userData.CurrentRace.NumberOfParticipants}</ParticipantsNo>
          <Position>POS</Position>
        </Participants>
      </RacePosition>
      {userData.CurrentRace.Mode ? (
        <RaceStat>
          <StatName>TIME</StatName>
          <StatProp>
            <RaceTimer EndTime={userData.CurrentRace.EndTime} />
          </StatProp>
        </RaceStat>
      ) : (
        <RaceStat>
          <StatName>LAPS</StatName>
          <StatProp>
            {userData.CurrentRace.Player.CurrentLap}/{userData.CurrentRace.Laps}
          </StatProp>
        </RaceStat>
      )}

      <RaceStat>
        <StatName>CHECKPOINTS</StatName>
        <StatProp>
          {userData.CurrentRace.Player.CurrentPoint}/{userData.CurrentRace.TotalPoints}
        </StatProp>
      </RaceStat>
    </RaceHudContainer>
  );
};

export default RaceHud;
