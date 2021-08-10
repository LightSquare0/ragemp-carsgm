import styled, { css, keyframes } from "styled-components";

type SpeedoProps = {
  visible: boolean;
};

interface GaugeProps {
  currentGear: number;
  willChange: boolean;
}

export const Speedo = styled.div<SpeedoProps>`
  position: absolute;
  bottom: 0;
  ${({ visible }) => (visible ? "right: 0;" : "right: -100%;")}
  padding: 2rem;
  transition: ease 0.5s;
  user-select: none;
`;

export const SpeedoContainer = styled.div`
  position: relative;
  width: 15rem;
`;

export const InfoText = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
`;

const enter = keyframes`
  from {
    transform: scale(0.0);
  }
  to {
    transform: scale(1.5);
  }
`;

const update = keyframes`
  0% {
    transform: scale(0.0);
  }
  100% {
    transform: scale(1.5);
  }
`;

export const GearContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  height: 100%;
  text-shadow: 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
`;

export const GearBubble = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.375rem;
  height: 2.375rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 2.3rem;
`;

export const GearText = styled.div<GaugeProps>`
  font-size: 2.1rem;
  margin-top: 0.35rem;
  margin-right: 0.5rem;
  font-style: italic;
  font-feature-settings: "tnum", "zero";
  animation: ${({ willChange }) =>
    willChange
      ? css`
          ${update} 0.2s linear forwards
        `
      : css`
          ${enter} 0.2s linear forwards
        `};
`;
/* padding: 0.7rem 1.35rem 0.3rem 1.35rem; */

export const SpeedText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-feature-settings: "tnum", "zero";
  margin-top: 11rem;
  padding-right: 1.2rem;
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  &::after {
    content: "km/h";
    font-size: 1rem;
    letter-spacing: normal;
    text-align: center;
  }
`;
