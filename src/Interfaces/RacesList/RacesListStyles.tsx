import styled from "styled-components";

export const RaceList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const RaceListHeader = styled.div`
  display: flex;
  width: 88.125rem;
  height: 4.375rem;
  border-radius: 0.625rem;
  transform: skewX(-7deg);
  color: white;
  background-color: var(--darker-gray);
  box-shadow: var(--general-shadow);
`;

export const RaceListHeaderContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  transform: skewX(7deg);
  width: 100%;
`;

export const RacesStats = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.1875rem;
  & > :first-child {
    color: var(--middle-gray);
    margin-right: 1rem;
  }
`;

export const StatGroup = styled.div`
  display: flex;
  margin-left: 3.375rem;
  & > :first-child {
    color: var(--middle-gray);
    margin-right: 0.9375rem;
  }
  & > :nth-child(even) {
    color: white;
  }
`;

export const GraySpan = styled.span`
  color: var(--middle-gray);
`;

export const RacesListContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 88.125rem;
  height: 38.4375rem;
  margin-top: 1rem;
`;

export const RaceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border-radius: 0.625rem;
  height: 4.75rem;
  padding: 0.875rem 1.5rem 0.875rem 1.5rem;
  margin-bottom: 1.25rem;
  color: white;
  box-shadow: var(--general-shadow);
  background-color: var(--darker-gray);
  transition: transform 0.3s cubic-bezier(0.8, -0.5, 0.2, 1.4);
  &:hover {
    transform: scale(0.98);
  }
`;

export const RacesListed = styled.div`
  width: 60%;
  height: 38.4375rem;
  margin-right: 1.75rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const RacePlaceholder = styled.div`
  width: 100%;
  height: 4.75rem;
  margin-bottom: 1.25rem;
  border-radius: 0.625rem;
  box-shadow: var(--general-shadow);
  background-color: var(--darker-gray-variant);
`;

export const RaceBrief = styled.div`
  display: flex;
  flex-direction: column;
  width: 17.1875rem;
`;

export const RaceName = styled.div`
  font-size: 1.5rem;
`;

export const RaceTrack = styled.div`
  font-size: 1.25rem;
  color: var(--text-whiter-gray);
`;

export const VehicleClassContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 10rem;
  position: relative;
`;

export const VehicleClass = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5125rem 0.9375rem 0.5125rem 0.9375rem;
  color: var(--text-whiter-gray);
  background-color: var(--badge-gray);
  border-radius: 1.25rem;
  border: 0.0625rem solid #454545b3;
  & > :first-child {
    margin-right: 0.2rem;
  }
`;

export const RacePanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  border-radius: 0.625rem;
  padding: 1.75rem 2.375rem 1.75rem 2.375rem;
  color: white;
  box-shadow: var(--general-shadow);
  background-color: var(--darker-gray);
`;

export const OpenedRaceHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const OpenedTrackName = styled.div`
  font-size: 1.75rem;
`;

export const OpenedAdditionalInfo = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--text-whiter-gray);
`;

export const Bullet = styled.div`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  margin-left: 0.375rem;
  margin-right: 0.375rem;
  background-color: var(--text-whiter-gray);
`;

export const TrackMap = styled.img`
  height: auto;
  width: 100%;
  border-radius: 0.4375rem;
  opacity: 0.8;
`;

export const OpenedBottom = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
`;

export const OpenedBottomInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const OpenedRaceStat = styled.div`
  display: flex;
  margin-top: 0.3125rem;
  margin-bottom: 0.3125rem;
  font-size: 1.125rem;
  text-transform: uppercase;
  & > :first-child {
    color: var(--middle-gray);
    margin-right: 0.9375rem;
  }
`;

export const OpenedRaceName = styled.div`
  font-size: 1.5rem;
`;

export const OpenedInteract = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: flex-end;
  align-items: flex-end;
  & > * {
    margin-bottom: 0.9375rem;
  }
  & > :last-child {
    margin-bottom: 0rem;
  }
`;

export const SecondaryOption = styled.div`
  display: flex;
  justify-content: center;
  width: 11.5625rem;
  position: relative;
  &:hover {
    text-decoration: underline;
  }
`;

export const FloatingWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7.1875rem;
  position: absolute;
  border-radius: 0.4375rem;
  padding: 0.9375rem;
  background: var(--badge-gray);
  border: 0.0625rem solid var(--stroke2-gray);
  z-index: 30;
  & > div:not(:first-child){
    margin-top: 0.5rem;
  }
`;

export const Participants = styled.div`
  font-size: 1.4375rem;
  width: 4.375rem;
`;

export const Status = styled.div`
  font-size: 1.5625rem;
`;

export const BackButton = styled.div<any>`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 2.5rem;
  left: 2.5rem;
  padding: 0.625rem 1.25rem 0.625rem 1.25rem;
  border-radius: 0.625rem;
  font-size: 1.25rem;
  color: white;
  background-color: var(--darker-gray);
`;

export const HostGenericHeader = styled.div`
  font-size: 1.25rem;
`;

export const TrackFiltering = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NotOpenedMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.375rem;
`;
