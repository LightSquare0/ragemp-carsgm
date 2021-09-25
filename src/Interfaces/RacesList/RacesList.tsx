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
  TrackFiltering,
} from "./RacesListStyles";
import demo_map from "../../Static/Demo_map.png";
import { useHistory } from "react-router-dom";
import { Routes } from "../../Utils/RoutesEnum";
import { useEffect, useState } from "react";
import TrackCarousel, { race, state } from "./TrackCarousel";
import Dropdown from "../../General Components/Dropdown/Dropdown";
import Search from "../../General Components/Search/Search";
import Steps from "./Steps";

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
        key={racesMockup.indexOf(i)}
        name={i.name}
        track={i.track}
        type={i.type}
        numberOfParticipants={i.numberOfParticipants}
        status={i.status}
      />
    );
  });

  for (let i = rows.length; i < 7; i++) {
    rows.push(<RacePlaceholder key={i} />);
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
  const [imageIndex, setImageIndex] = useState<number>(0);

  const [images, setImages] = useState<any>([
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Santa Maria Beach",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Nurburgring",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Spa-Francorchamps",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Suzuka",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Circuit de la Sarthe",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Mount Panorama",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Laguna Seca",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Circuit de Monaco",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Monza",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Silverstone",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Interlagos",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Vinewood Sprint",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
  ]);

  const [defaultImages, setDefaultImages] = useState<any>([
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Santa Maria Beach",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Nurburgring",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Spa-Francorchamps",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Suzuka",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Circuit de la Sarthe",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Mount Panorama",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Laguna Seca",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Circuit de Monaco",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Monza",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Silverstone",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Interlagos",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Vinewood Sprint",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const resetImages = () => {
    let _prevImages = [...defaultImages];
    _prevImages.forEach((race: race) => {
      race.state = state.hiddenLeft;
    });
    setImages(_prevImages);
  };

  const updateCarousel = (prevImages: any, _imageIndex: number) => {
    resetImages();

    let hiddenLeft: race = prevImages[_imageIndex - 2];
    let prev: race = prevImages[_imageIndex - 1];
    let selected: race = prevImages[_imageIndex];
    let next: race = prevImages[_imageIndex + 1];
    let hiddenRight: race = prevImages[_imageIndex + 2];

    if (hiddenLeft != undefined) {
      hiddenLeft.state = state.hiddenLeft;
    }
    if (prev != undefined) {
      prev.state = state.prev;
    }

    if (selected != undefined) {
      selected.state = state.selected;
    }

    if (next != undefined) {
      next.state = state.next;
    }
    if (hiddenRight != undefined) {
      hiddenRight.state = state.hiddenRight;
    }

    setImages(prevImages);
  };

  useEffect(() => {
    resetImages();
    let samp = defaultImages.filter((image: { name: string }) => {
      return image.name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase());
    });
    setImageIndex(0);
    setImages(samp);
    updateCarousel(samp, imageIndex);
  }, [searchText]);

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
      {willHost && (
        <>
          <OpenedTrackName>Host a race</OpenedTrackName>
          <TrackFiltering>
            <HostGenericHeader>Select track</HostGenericHeader>
            <div style={{ display: "flex" }}>
              <Search
                style={{ marginLeft: "0.875rem" }}
                placeholder="Filter tracks"
                searchText={searchText}
                setSearchText={setSearchText}
                label=""
              ></Search>
            </div>
          </TrackFiltering>
          <TrackCarousel
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
            images={images}
            setImages={setImages}
            updateCarousel={updateCarousel}
            resetImages={resetImages}
          />
          <Steps></Steps>
        </>
      )}
    </RacePanelContainer>
  );
};
