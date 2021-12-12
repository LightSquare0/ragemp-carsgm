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

export interface HeadlineProps {
  clock: {
    Year: string;
    Month: string;
    Day: string;
    Hour: string;
    Minute: string;
  };
  isHeadlineRendered: boolean;
  setIsHeadlineRendered: React.Dispatch<React.SetStateAction<boolean>>;
}

const Headline: React.FC<HeadlineProps> = ({
  clock,
  isHeadlineRendered,
  setIsHeadlineRendered,
}) => {
  const { ServerData, setServerData } = useContext<{
    ServerData: ServerData;
    setServerData: React.Dispatch<React.SetStateAction<ServerData>>;
  }>(UserContext);

  useEffect(() => {
    setIsHeadlineRendered(true);
    return () => setIsHeadlineRendered(false);
  }, []);

  return (
    <HeadlineContainer>
      <Stat>
        <StatName>
          {clock.Day}.{clock.Month}.
          {clock.Year}
        </StatName>
        <StatData>
          {clock.Hour}:{clock.Minute}
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
