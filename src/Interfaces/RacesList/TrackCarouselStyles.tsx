import styled, { css } from "styled-components";
import { state } from "../RacesList/TrackCarousel";

export const TrackCarouselContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.375rem;
  margin-bottom: 1.375rem;
`;

export const TrackImagesContainer = styled.div`
  position: relative;
  height: 9.375rem;
  width: 80%;
  overflow: hidden;

`;

export const ArrowButton = styled.div`
  display: flex;
  height: inherit;
  width: 10%;
  align-items: center;
  justify-content: center;
`;

type TrackImage = {
  currentIndex?: number;
  index?: number;
  state?: state;
};

export const TrackDiv = styled.div<TrackImage>`
  position: absolute;
  transition: transform 0.4s, left 0.4s, opacity 0.4s, z-index 0s, height 0.4s;
  opacity: 1;

  ${({ state }) =>
    state == "hiddenLeft" &&
    css`
      height: 5.25rem;
      left: 0%;
      opacity: 0;
      transform: translateY(50%) translateX(-50%);
    `};

  ${({ state }) =>
    state == "hiddenRight" &&
    css`
      height: 5.25rem;
      left: 100%;
      opacity: 0;
      transform: translateY(50%) translateX(-50%);
    `};

  ${({ state }) =>
    state == "prev" &&
    css`
      height: 5.25rem;
      z-index: 5;
      left: 30%;
      opacity: 0.8;
      transform: translateY(1.5rem) translateX(-70%);
    `};

  ${({ state }) =>
    state == "selected" &&
    css`
      z-index: 10;
      left: 50%;
      opacity: 1;
      height: 7.1875rem;
      transform: translateY(0.5rem) translateX(-50%);
      & > * {
        box-shadow: var(--dimmer-yellow-shadow);
      }
    `};

  ${({ state }) =>
    state == "next" &&
    css`
      height: 5.25rem;
      z-index: 5;
      left: 70%;
      opacity: 0.8;
      transform: translateY(1.5rem) translateX(-30%);
    `}
`;

export const TrackImage = styled.img<TrackImage>`
  /* height: 7.1875rem; */
  height: 100%;
  width: auto;
  border-radius: 0.4375rem;
`;

export const TrackName = styled.div<TrackImage>`
  color: white;
  font-size: 1rem;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translateX(-50%);
  ${({ state }) =>
    state == "selected"
      ? css`
          display: inline;
        `
      : css`
          display: none;
        `}
`;
