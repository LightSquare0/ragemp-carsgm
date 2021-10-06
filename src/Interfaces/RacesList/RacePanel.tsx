import { useEffect, useRef, useState } from "react";
import Search from "../../General Components/Search/Search";
import { Button } from "../../Globals/GlobalStyles/ButtonStyles";
import { Race } from "./RacesList";
import {
  Bullet,
  HostGenericHeader,
  NotOpenedMessage,
  OpenedAdditionalInfo,
  OpenedBottom,
  OpenedBottomInfo,
  OpenedInteract,
  OpenedRaceHeader,
  OpenedRaceName,
  OpenedRaceStat,
  OpenedTrackName,
  FloatingWindow,
  RacePanelContainer,
  SecondaryOption,
  TrackFiltering,
  TrackMap,
} from "./RacesListStyles";
import Steps from "./Steps";
import TrackCarousel, { race, state } from "./TrackCarousel";
import demo_map from "../../Static/Demo_map.png";
import { useOutsideAlerter } from "../../Utils/useOutsideAlerter";

interface RacePanel {
  willHost: boolean;
  races: Array<Race>;
  openedRace: Race;
}

export const RacePanel: React.FC<RacePanel> = ({ openedRace, races, willHost }) => {
  const [selectedTrackName, setSelectedTrackName] = useState<string>();

  const [imageIndex, setImageIndex] = useState<number>(0);

  const [images, setImages] = useState<any>([]);

  const [defaultImages, setDefaultImages] = useState<any>([]);

  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    //@ts-ignore
    mp.trigger("clientside:GetTrackImages");
  }, []);

  mp.events.add("react:GetTrackImages", (_images) => {
    let prevImages = JSON.parse(_images);
    let hiddenLeft: race = prevImages[imageIndex - 2];
    let prev: race = prevImages[imageIndex - 1];
    let selected: race = prevImages[imageIndex];
    let next: race = prevImages[imageIndex + 1];
    let hiddenRight: race = prevImages[imageIndex + 2];

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
    setDefaultImages(prevImages);
    setImages(prevImages);
    setSelectedTrackName(selected.name);
  });

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
      setSelectedTrackName(selected.name);
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
      return image.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
    });
    setImageIndex(0);
    setImages(samp);
    updateCarousel(samp, imageIndex);
  }, [searchText]);

  return (
    <RacePanelContainer>
      {!willHost &&
        (openedRace ? (
          <OpenedRace races={races} Race={openedRace}></OpenedRace>
        ) : (
          <NotOpenedMessage>
            {races.length == 0 ? (
              <>No races are currently hosted. Be the first to host one!</>
            ) : (
              <>Click any race to view more information about it here.</>
            )}
          </NotOpenedMessage>
        ))}
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
          <Steps selectedTrackName={selectedTrackName}></Steps>
        </>
      )}
    </RacePanelContainer>
  );
};
// interface Race {
//   Guid?: string;
//   Name: string;
//   TrackName: string;
//   Type: string;
//   Racers: Array<any>;
//   MaxParticipants: number;
//   HasStarted: boolean;
// }

export const OpenedRace: React.FC<{races: Array<Race>, Race: Race }> = ({races, Race }) => {
  const getHoster = () => {
    let splitName = Race.Name.split("'");
    return splitName[0];
  };

  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideAlerter(false);

  const onJoinRace = () => {
    let raceId = races.indexOf(Race);
    //@ts-ignore
    mp.trigger("clientside:onJoinRace", raceId);
    console.log(raceId);
  }

  let Racers = Object.values(Race.Racers); 

  return (
    <>
      <OpenedRaceHeader>
        <OpenedTrackName>{Race.Template.TrackName}</OpenedTrackName>
        <OpenedAdditionalInfo>
          Hosted by {getHoster()}
          <Bullet />
          {Race.Template.Category}
          <Bullet />
          Vinewood, Los Santos
        </OpenedAdditionalInfo>
      </OpenedRaceHeader>
      <TrackMap src={demo_map} />
      <OpenedBottom>
        <OpenedBottomInfo>
          <OpenedRaceName>{Race.Name}</OpenedRaceName>
          <OpenedRaceStat>
            {Race.Mode ? (
              <>
                <div>Duration</div>
                <div>{Race.MaxDuration} minutes</div>
              </>
            ) : (
              <>
                <div>Laps</div>
                <div>{Race.Laps} laps</div>
              </>
            )}
          </OpenedRaceStat>
          <OpenedRaceStat>
            <div>Participants</div>
            <div>{Racers.length}</div>
          </OpenedRaceStat>
          <OpenedRaceStat>
            <div>Spectators</div>
            <div>2</div>
          </OpenedRaceStat>
          <OpenedRaceStat>
            <div>Status</div>
            <div>{Race.HasStarted ? <>Started</> : <>Not started</>}</div>
          </OpenedRaceStat>
        </OpenedBottomInfo>
        <OpenedInteract>
          <SecondaryOption>Spectate</SecondaryOption>
          <SecondaryOption ref={ref} onClick={() => setIsComponentVisible(true)}>
            {isComponentVisible ? (
              <FloatingWindow>
                {Racers.length == 0 ? (
                  <>No racers</>
                ) : (
                  Racers.map((racer) => <div>{racer.ParticipantName}</div>)
                )}
              </FloatingWindow>
            ) : (
              <></>
            )}
            View participants
          </SecondaryOption>
          <Button join onClick={() => onJoinRace()}>
            <div>JOIN NOW</div>
          </Button>
        </OpenedInteract>
      </OpenedBottom>
    </>
  );
};
