import styled, { keyframes } from "styled-components";

export const RaceHudContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  top: 1.875rem;
  left: 1.875rem;
  border-radius: 0.4375rem;
  background-color: var(--background-hud-gray);
  color: white;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  & > div:not(:last-child) {
    margin-right: 1.25rem;
  }
`;

export const RacePosition = styled.div`
  font-family: "HemiHead";
  display: flex;
  align-items: center;
`;

export const CurrentPosition = styled.div`
  font-size: 4.5rem;
`;

export const Bar = styled.div`
  width: 0.5rem;
  background-color: white;
  height: 3.1rem;
  transform: skew(-10deg);
  margin-left: 0.6125rem;
  margin-right: 0.3125rem;
`;

export const Participants = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ParticipantsNo = styled.div`
  font-size: 2.25rem;
  margin-top: -0.5rem;
`;

export const Position = styled.div`
  font-size: 0.875rem;
`;

export const RaceStat = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "MaisonNeueBook";
`;

export const StatName = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.1875rem;
`;

export const StatProp = styled.div`
  font-size: 1.5rem;
`;
