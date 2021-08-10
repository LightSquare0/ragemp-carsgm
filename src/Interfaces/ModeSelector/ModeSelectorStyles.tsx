import styled from "styled-components";

export const PlayerStats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: 2.2rem;
  right: 3rem;
  border-radius: 0.938rem;
  /* background-color: rgba(241, 249, 255, 0.35); */
  background-color: rgba(241, 249, 255, 0.65);
  padding: 0.6rem 1rem 0.6rem 1rem;
  & > div {
    margin-left: 0.8rem;
    margin-right: 0.8rem;
  }
`;

export const Avatar = styled.img`
  height: 2.6rem;
  width: 2.6rem;
  border-radius: 50%;
  box-shadow: 0.05rem 0.05rem 0.02rem 0.05rem rgba(136, 136, 136, 0.4);
`;

export const Username = styled.div`
  font-size: 1.4rem;
  color: #494949;
`;
