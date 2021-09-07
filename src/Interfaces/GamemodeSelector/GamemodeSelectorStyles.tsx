import styled from "styled-components";

export const GamemodeContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Gamemode = styled.div`
  width: 42.5rem;
  height: 37.5rem;
  transform: skewX(-7deg);
  overflow: hidden;
  text-align: center;
  position: relative;
  border-radius: 0.625rem;
  margin: 1.5625rem;
  box-shadow: var(--general-shadow);
  transition: all ease 0.2s;
  &:hover {
    transform: translateY(-2.5%) skewX(-7deg);
    box-shadow: var(--yellow-shadow);
  }
`;

export const GamemodeContent = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  color: white;
  overflow: hidden;
  transform: skewX(7deg);
`;

export const GamemodeTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "HemiHead";
  font-size: 3.125rem;
  margin-top: 6.6875rem;
  height: 80%;
`;

export const GamemodeDescription = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  padding-left: 4rem;
  padding-right: 4rem;
  height: 20%;
  font-size: 1.125rem;
  font-family: "MaisonNeueBook";
`;

export const GamemodeWallpaper = styled.img`
  position: absolute;
  height: 100%;
  left: 50%;
  transform: translate(-50%, 0) skewX(7deg);
`;
