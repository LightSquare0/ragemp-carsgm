import styled from "styled-components";

type SpeedoProps = {
    visible: boolean
}

export const Speedo = styled.div<SpeedoProps>`
  position: absolute;
  bottom: 0;
  ${({visible}) => (visible ? "right: 0;" : "right: -100%;")}
  padding: 2rem;
  transition: ease 0.5s;
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

export const SpeedText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 4rem;
  flex-direction: column;
  font-feature-settings: "tnum";
  letter-spacing: -0.35rem;
  color: white;
  text-shadow: 0.1rem 0.1rem rgba(0, 0, 0, 0.7);
  &::after {
    content: "km/h";
    font-size: 1.2rem;
    letter-spacing: normal;
  }
`;
export const RpmText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-feature-settings: "tnum", "zero";
  margin-top: 11rem;
  padding-right: 1.2rem;
  font-size: 1.5rem;
  color: white;
  text-shadow: 0.1rem 0.1rem rgba(0, 0, 0, 0.7);
  &::after {
    content: "RPM";
    font-size: 1rem;
    letter-spacing: normal;
  }
`;
