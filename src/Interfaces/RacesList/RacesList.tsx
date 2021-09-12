import { Button } from "../../Globals/GlobalStyles/ButtonStyles";
import Icon from "../../Utils/Icon";
import GeneralInterface from "../General/GeneralInterface";
import {
  BackButton,
  Bullet,
  OpenedAdditionalInfo,
  OpenedBottom,
  OpenedBottomInfo,
  OpenedInteract,
  RacePanelContainer,
  OpenedRaceHeader,
  OpenedRaceName,
  OpenedRaceStat,
  OpenedTrackName,
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
  SecondaryOption,
  StatGroup,
  Status,
  TrackMap,
  VehicleClass,
  VehicleClassContainer,
  RacePlaceholder,
  HostGenericHeader,
} from "./RacesListStyles";
import demo_map from "../../Static/Demo_map.png";
import { useHistory } from "react-router-dom";
import { Routes } from "../../Utils/RoutesEnum";
import { useState } from "react";
import TrackCarousel from "./TrackCarousel";

const racesMockup = [
  {
    name: "Laity's street race",
    track: "Eclipse Tour",
    type: "Sports",
    numberOfParticipants: "03/23",
    status: "STARTED",
  },
  {
    name: "Laity's street race",
    track: "Eclipse Tour",
    type: "Sports",
    numberOfParticipants: "03/23",
    status: "STARTED",
  },
];

const DisplayRaces: React.FC = () => {
  var rows: any[] = [];
  racesMockup.map((i) => {
    rows.push(
      <Race
        name={i.name}
        track={i.track}
        type={i.type}
        numberOfParticipants={i.numberOfParticipants}
        status={i.status}
      />
    );
  });

  for (let i = rows.length; i < 7; i++) {
    rows.push(<RacePlaceholder />);
  }

  return <>{rows}</>;
};

export const RacesList: React.FC = () => {
  const history = useHistory();

  const [willHost, setWillHost] = useState<boolean>(true);

  return (
    <GeneralInterface header="Join or host a race">
      <RaceList>
        <RaceListHeader>
          <RaceListHeaderContent>
            <RacesStats>
              <div>RACES</div>
              <StatGroup>
                <div>TOTAL</div>
                <div>15</div>
              </StatGroup>
              <StatGroup>
                <div>STARTED</div>
                <div>10</div>
              </StatGroup>
              <StatGroup>
                <div>NOT STARTED</div>
                <div>5</div>
              </StatGroup>
            </RacesStats>
            <Button host onClick={() => setWillHost(!willHost)}>
              <div>{willHost ? <>CANCEL HOST</> : <>HOST A RACE</>}</div>
            </Button>
          </RaceListHeaderContent>
        </RaceListHeader>
        <RacesListContainer>
          <RacesListed>
            <DisplayRaces />
          </RacesListed>
          <RacePanel willHost={willHost} />
        </RacesListContainer>
      </RaceList>
      <BackButton onClick={() => history.push(Routes.GamemodeSelector)}>
        <Icon icon="angle-left-solid" size="1.5rem" color="white" />
        <div>Back</div>
      </BackButton>
    </GeneralInterface>
  );
};

interface Race {
  name: string;
  track: string;
  type: string;
  numberOfParticipants: string;
  status: string;
}

export const Race: React.FC<Race> = ({
  name,
  track,
  type,
  numberOfParticipants,
  status,
}) => {
  return (
    <RaceContainer>
      <RaceBrief>
        <RaceName>{name}</RaceName>
        <RaceTrack>{track}</RaceTrack>
      </RaceBrief>
      <VehicleClassContainer>
        <VehicleClass>
          <div>{type}</div>
          <Icon
            color="var(--text-whiter-gray)"
            size="1rem"
            icon="external-link-alt-solid"
          ></Icon>
        </VehicleClass>
      </VehicleClassContainer>
      <Participants>{numberOfParticipants}</Participants>
      <Status>{status}</Status>
    </RaceContainer>
  );
};

interface RacePanel {
  willHost: boolean;
}

export const RacePanel: React.FC<RacePanel> = ({ willHost }) => {
  return (
    <RacePanelContainer>
      {!willHost && (
        <>
          <OpenedRaceHeader>
            <OpenedTrackName>EclipseTour</OpenedTrackName>
            <OpenedAdditionalInfo>
              Hosted by Laity
              <Bullet />
              City
              <Bullet />
              Vinewood, Los Santos
            </OpenedAdditionalInfo>
          </OpenedRaceHeader>
          <TrackMap src={demo_map} />
          <OpenedBottom>
            <OpenedBottomInfo>
              <OpenedRaceName>Laity's street race</OpenedRaceName>
              <OpenedRaceStat>
                <div>Length</div>
                <div>13.5KM</div>
              </OpenedRaceStat>
              <OpenedRaceStat>
                <div>Participants</div>
                <div>20</div>
              </OpenedRaceStat>
              <OpenedRaceStat>
                <div>Spectators</div>
                <div>2</div>
              </OpenedRaceStat>
              <OpenedRaceStat>
                <div>Status</div>
                <div>Waiting</div>
              </OpenedRaceStat>
            </OpenedBottomInfo>
            <OpenedInteract>
              <SecondaryOption>Spectate</SecondaryOption>
              <SecondaryOption>View participants</SecondaryOption>
              <Button join>
                <div>JOIN NOW</div>
              </Button>
            </OpenedInteract>
          </OpenedBottom>
        </>
      )}
      {
        willHost && 
        <>
          <OpenedTrackName>Host a race</OpenedTrackName>
          <HostGenericHeader>Select track</HostGenericHeader>
          <TrackCarousel/>
        </>
      }
    </RacePanelContainer>
  );
};
