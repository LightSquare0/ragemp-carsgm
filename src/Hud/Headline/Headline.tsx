import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Globals/UserContext";
import { ServerData } from "../../Renderer";
import { GraySpan, HeadlineContainer, Logo, Stat, StatData, StatName } from "./HeadlineStyles";

interface Clock {
  Year: number;
  Month: number;
  Day: number;
  Hour: number;
  Minute: number;
}

const Headline: React.FC = () => {
  const FetchClock = () => {
    fetch(
      "http://worldtimeapi.org/api/timezone/Europe/Amsterdam"
    )
      .then((data) => data.json())
      .then((clockData) => {
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
      });
  };

  const { ServerData, setServerData } = useContext<{
    ServerData: ServerData;
    setServerData: React.Dispatch<React.SetStateAction<ServerData>>;
  }>(UserContext);

  const [clock, setClock] = useState<Clock>({ Year: 0, Month: 0, Day: 0, Hour: 0, Minute: 0 });

  mp.events.add("react:GetServerData", (ServerData) => {
    setServerData(JSON.parse(ServerData));
  });

  useEffect(() => {
    FetchClock();
  }, []);

  useEffect(() => {
    let tick = setInterval(() => {
      FetchClock();
    }, 60000);

    return () => clearInterval(tick);
  });

  console.log(clock);

  return (
    <HeadlineContainer>
      <Stat>
        <StatName>
          {clock.Day}.{clock.Month}.{clock.Year}
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
