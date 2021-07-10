import styled from "styled-components";

export const RaceHudContainer = styled.div`
  display: block;
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: white;
  text-shadow: 0.1rem 0.1rem rgba(0, 0, 0, 0.7);
`;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  & > div {
    margin-right: 0.9rem;
  }
`;

export const Position = styled.div`
  &:before {
    content: "POS";
    display: block;
    font-size: 1rem;
  }

  font-size: 1.9rem;
`;
export const TimeLeft = styled.div`
  &:before {
    content: "TIME LEFT";
    display: block;
    font-size: 0.9rem;
  }

  font-size: 1.9rem;
`;
export const Laps = styled.div`
  &:before {
    content: "LAPS";
    display: block;
    font-size: 0.9rem;
  }

  font-size: 1.9rem;
`;

export const CurrentStatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  & > div {
    margin-right: 0.9rem;
  }
  margin-top: 0.6rem;
  margin-bottom: 0.6rem;
  border-radius: 3rem 0.5rem 3rem 0.5rem;
`;

export const CurrentLapTimer = styled.div`
  font-size: 2.4rem;
  display: flex;
  align-items: center;
`;

export const CurrentRelativePosition = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BestLap = styled.div`
  &:before {
    content: "BEST";
    display: block;
    font-size: 0.9rem;
  }

  font-size: 1.9rem;
`;

export const LastLap = styled.div`
  &:before {
    content: "LAST";
    display: block;
    font-size: 0.9rem;
  }

  font-size: 1.9rem;
`;
