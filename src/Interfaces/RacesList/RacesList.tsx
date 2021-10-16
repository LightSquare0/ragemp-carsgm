import { Button } from "../../Globals/GlobalStyles/ButtonStyles";
import Icon from "../../Utils/Icon";
import GeneralInterface from "../General/GeneralInterface";
import {
  BackButton,
  Participants,
  RaceContainer,
  RaceBrief,
  RaceList,
  RaceListHeader,
  RaceListHeaderContent,
  RaceName,
  RacesListContainer,
  RacesListed,
  RacesStats,
  RaceTrack,
  StatGroup,
  Status,
  VehicleClass,
  VehicleClassContainer,
  RacePlaceholder,
  FloatingWindow,
} from "./RacesListStyles";
import { useHistory } from "react-router-dom";
import { Routes } from "../../Utils/RoutesEnum";
import { useEffect, useState } from "react";
import { RacePanel } from "./RacePanel";
import { useOutsideAlerter } from "../../Utils/useOutsideAlerter";

const DisplayRaces: React.FC<{
  races: Array<Race>;
  setRaces: React.Dispatch<React.SetStateAction<Array<Race>>>;
  setOpenedRace: React.Dispatch<React.SetStateAction<Race>>;
}> = ({ races, setRaces, setOpenedRace }) => {
  useEffect(() => {
    //@ts-ignore
    mp.trigger("clientside:GetInitialRaces");
  }, []);

  mp.events.add("react:GetInitialRaces", (_races) => {
    setRaces(JSON.parse(_races));
    console.log(_races);
  });

  if (races.length > 7)
    return (
      <>
        {races.map((i: Race, index: number) => {
          return <Race onClick={() => setOpenedRace(i)} key={index} Race={i} />;
        })}
      </>
    );

  var rows: any[] = [];
  races.map((i: Race, index: number) => {
    rows.push(<Race onClick={() => setOpenedRace(i)} key={index} Race={i} />);
  });

  for (let i = rows.length; i < 7; i++) {
    rows.push(<RacePlaceholder key={i} />);
  }

  return <>{rows}</>;
};

export const RacesList: React.FC = () => {
  const history = useHistory();

  const [races, setRaces] = useState<Array<Race>>([]);

  const [openedRace, setOpenedRace] = useState<Race>();

  const [willHost, setWillHost] = useState<boolean>(false);

  mp.events.add("react:SendRaceToList", (race) => {
    setRaces((prevRaces) => [...prevRaces, JSON.parse(race)]);
    console.log(race);
  });

  const ReturnRacesStates = () => {
    let started = races.filter((x) => x.HasStarted == true).length;
    let notStarted = races.length - started;

    if (started <= 0) {
      started = 0;
    }

    return [started, notStarted];
  };

  return (
    <GeneralInterface header="Join or host a race">
      <RaceList>
        <RaceListHeader>
          <RaceListHeaderContent>
            <RacesStats>
              <div>RACES</div>
              <StatGroup>
                <div>TOTAL</div>
                <div>{races.length}</div>
              </StatGroup>
              <StatGroup>
                <div>STARTED</div>
                <div>{ReturnRacesStates()[0]}</div>
              </StatGroup>
              <StatGroup>
                <div>NOT STARTED</div>
                <div>{ReturnRacesStates()[1]}</div>
              </StatGroup>
            </RacesStats>
            <Button host onClick={() => setWillHost(!willHost)}>
              <div>{willHost ? <>CANCEL HOST</> : <>HOST A RACE</>}</div>
            </Button>
          </RaceListHeaderContent>
        </RaceListHeader>
        <RacesListContainer>
          <RacesListed>
            <DisplayRaces setOpenedRace={setOpenedRace} races={races} setRaces={setRaces} />
          </RacesListed>
          <RacePanel openedRace={openedRace} races={races} willHost={willHost} />
        </RacesListContainer>
      </RaceList>
      <BackButton onClick={() => history.push(Routes.GamemodeSelector)}>
        <Icon icon="angle-left-solid" size="1.5rem" color="white" />
        <div>Back</div>
      </BackButton>
    </GeneralInterface>
  );
};

export interface Race {
  Guid?: string;
  MaxParticipants: number;
  Name: string;
  Mode: boolean;
  Laps: number;
  MaxDuration: number;
  HasStarted: boolean;
  Type: string;
  SelectedVehicles: Array<string>;
  Racers: Array<any>;
  Template: {
    TrackName: string;
    Category: string;
    Image: string;
  };
}

export const Race: React.FC<{ onClick: () => void; Race: Race }> = ({ onClick, Race }) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideAlerter(false);

  console.log(Race.SelectedVehicles);

  let Racers = Object.keys(Race.Racers).length;

  return (
    <RaceContainer onClick={onClick}>
      <RaceBrief>
        <RaceName>{Race.Name}</RaceName>
        <RaceTrack>{Race.Template.TrackName}</RaceTrack>
      </RaceBrief>
      <VehicleClassContainer onClick={() => setIsComponentVisible(true)}>
        <VehicleClass>
          <div>{Race.Type}</div>
          <Icon color="var(--text-whiter-gray)" size="1rem" icon="external-link-alt-solid"></Icon>
        </VehicleClass>
        {isComponentVisible ? (
          <FloatingWindow ref={ref}>
            {Race.SelectedVehicles.map((vehicle) => {
              return <div>{vehicle}</div>;
            })}
          </FloatingWindow>
        ) : (
          <></>
        )}
      </VehicleClassContainer>
      <Participants>
        {Racers < 9 ? "0" + Racers : Racers}/
        {Race.MaxParticipants < 9 ? "0" + Race.MaxParticipants : Race.MaxParticipants}
      </Participants>
      <Status>{Race.HasStarted ? <>STARTED</> : <>NOT STARTED</>}</Status>
    </RaceContainer>
  );
};
