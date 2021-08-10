import styled, { keyframes } from "styled-components";

const RaceHudExpand = keyframes`

0% {
  height: 0.01rem;
  color: rgba(255, 255, 255, 0);
}

70% {
  color: rgba(255, 255, 255, 0.4);
}

85% { 
  color: rgba(255, 255, 255, 0.85);
}

100% {
  height: 12.875rem;
  color: rgba(255, 255, 255, 1);
}

`;

export const RaceHudContainer = styled.div`
  display: none; //temporary
  position: absolute;
  flex-direction: column;
  top: 2.5rem;
  left: 2.5rem;
  color: white;
  text-shadow: 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  background-color: rgba(175, 175, 175, 0.6);
  padding: 1.2rem;
  border-radius: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${RaceHudExpand} 0.8s ease;
  transition: opacity 1s;
`;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  justify-content: center;
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
