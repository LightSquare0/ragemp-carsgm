import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserContext } from "../../Globals/UserContext";
import { ServerData } from "../RaceUi/RaceHud/RaceEvents";
import {
  GraySpan,
  HeadlineContainer,
  Logo,
  Stat,
  StatData,
  StatName,
} from "./HeadlineStyles";

interface Headline {
  isHeadlineRendered: boolean;
  setIsHeadlineRendered: React.Dispatch<React.SetStateAction<boolean>>;
}

const Headline: React.FC<Headline> = ({
  isHeadlineRendered,
  setIsHeadlineRendered,
}) => {
  const { ServerData, setServerData } = useContext<{
    ServerData: ServerData;
    setServerData: React.Dispatch<React.SetStateAction<ServerData>>;
  }>(UserContext);

  mp.events.add("react:GetServerData", (playerName, playerId, _ServerData) => {
    let data = JSON.parse(_ServerData);
    setServerData({
      Player: { Name: playerName, Id: playerId },
      Online: data.Online,
      Races: data.Races,
      Clock: {
        Year: ServerData.Clock.Year,
        Month: ServerData.Clock.Month,
        Day: ServerData.Clock.Day,
        Hour: ServerData.Clock.Hour,
        Minute: ServerData.Clock.Minute,
      },
    });
    console.log(ServerData);
  });

  useEffect(() => {
    setIsHeadlineRendered(true);
    return () => setIsHeadlineRendered(false);
  }, []);

  return (
    <HeadlineContainer>
      <Stat>
        <StatName>
          {ServerData.Clock.Day}.{ServerData.Clock.Month}.
          {ServerData.Clock.Year}
        </StatName>
        <StatData>
          {ServerData.Clock.Hour}:{ServerData.Clock.Minute}
        </StatData>
      </Stat>
      <Stat>
        <StatName>ID</StatName>
        <StatData>
          {ServerData.Player.Name}
          <GraySpan>#{ServerData.Player.Id}</GraySpan>
        </StatData>
      </Stat>
      <Stat>
        <StatName>RACES</StatName>
        <StatData>{ServerData.Races}</StatData>
      </Stat>
      <Stat>
        <StatName>ONLINE</StatName>
        <StatData>{ServerData.Online}</StatData>
      </Stat>
      <Logo>Invictum.mp</Logo>
    </HeadlineContainer>
  );
};

export default Headline;
