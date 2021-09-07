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
  OpenedRace,
  OpenedRaceHeader,
  OpenedRaceName,
  OpenedRaceStat,
  OpenedTrackName,
  Participants,
  Race,
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
} from "./RacesListStyles";
import demo_map from "../../Static/Demo_map.png";
import { useHistory } from "react-router-dom";
import { Routes } from "../../Utils/RoutesEnum";

const RacesList: React.FC = () => {

  const history = useHistory();

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
            <Button host>
              <div>HOST A RACE</div>
            </Button>
          </RaceListHeaderContent>
        </RaceListHeader>
        <RacesListContainer>
          <RacesListed>
            <Race>
              <RaceBrief>
                <RaceName>Laity's street race</RaceName>
                <RaceTrack>Eclipse Tour</RaceTrack>
              </RaceBrief>
              <VehicleClassContainer>
                <VehicleClass>
                  <div>Sports</div>
                  <Icon
                    color="var(--text-whiter-gray)"
                    size="1rem"
                    icon="external-link-alt-solid"
                  ></Icon>
                </VehicleClass>
              </VehicleClassContainer>
              <Participants>01/23</Participants>
              <Status>STARTED</Status>
            </Race>
            <Race>
              <RaceBrief>
                <RaceName>Joaca samp chiar acum</RaceName>
                <RaceTrack>Eclipse Tour</RaceTrack>
              </RaceBrief>
              <VehicleClassContainer>
                <VehicleClass>
                  <div>Sports</div>
                  <Icon
                    color="var(--text-whiter-gray)"
                    size="1rem"
                    icon="external-link-alt-solid"
                  ></Icon>
                </VehicleClass>
              </VehicleClassContainer>
              <Participants>21/23</Participants>
              <Status>STARTED</Status>
            </Race>
            <Race>
              <RaceBrief>
                <RaceName>Cristosss</RaceName>
                <RaceTrack>Eclipse Tour</RaceTrack>
              </RaceBrief>
              <VehicleClassContainer>
                <VehicleClass>
                  <div>SUVs</div>
                  <Icon
                    color="var(--text-whiter-gray)"
                    size="1rem"
                    icon="external-link-alt-solid"
                  ></Icon>
                </VehicleClass>
              </VehicleClassContainer>
              <Participants>21/23</Participants>
              <Status>STARTED</Status>
            </Race>
            <Race>
              <RaceBrief>
                <RaceName>Laity's street race</RaceName>
                <RaceTrack>Eclipse Tour</RaceTrack>
              </RaceBrief>
              <VehicleClassContainer>
                <VehicleClass>
                  <div>Sports Classic</div>
                  <Icon
                    color="var(--text-whiter-gray)"
                    size="1rem"
                    icon="external-link-alt-solid"
                  ></Icon>
                </VehicleClass>
              </VehicleClassContainer>
              <Participants>00/23</Participants>
              <Status>STARTED</Status>
            </Race>
            <Race>
              <RaceBrief>
                <RaceName>Laity's street race</RaceName>
                <RaceTrack>Eclipse Tour</RaceTrack>
              </RaceBrief>
              <VehicleClassContainer>
                <VehicleClass>
                  <div>Sports</div>
                  <Icon
                    color="var(--text-whiter-gray)"
                    size="1rem"
                    icon="external-link-alt-solid"
                  ></Icon>
                </VehicleClass>
              </VehicleClassContainer>
              <Participants>21/23</Participants>
              <Status>STARTED</Status>
            </Race>
            <Race>
              <RaceBrief>
                <RaceName>Laity's street race</RaceName>
                <RaceTrack>Eclipse Tour</RaceTrack>
              </RaceBrief>
              <VehicleClassContainer>
                <VehicleClass>
                  <div>Sports</div>
                  <Icon
                    color="var(--text-whiter-gray)"
                    size="1rem"
                    icon="external-link-alt-solid"
                  ></Icon>
                </VehicleClass>
              </VehicleClassContainer>
              <Participants>21/23</Participants>
              <Status>STARTED</Status>
            </Race>
            <Race>
              <RaceBrief>
                <RaceName>Laity's street race</RaceName>
                <RaceTrack>Eclipse Tour</RaceTrack>
              </RaceBrief>
              <VehicleClassContainer>
                <VehicleClass>
                  <div>Sports</div>
                  <Icon
                    color="var(--text-whiter-gray)"
                    size="1rem"
                    icon="external-link-alt-solid"
                  ></Icon>
                </VehicleClass>
              </VehicleClassContainer>
              <Participants>21/23</Participants>
              <Status>STARTED</Status>
            </Race>
          </RacesListed>
          <OpenedRace>
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
          </OpenedRace>
        </RacesListContainer>
      </RaceList>
      <BackButton onClick={() => history.push(Routes.GamemodeSelector)}>
        <Icon icon="angle-left-solid" size="1.5rem" color="white" />
        <div>Back</div>
      </BackButton>
    </GeneralInterface>
  );
};
export default RacesList;
