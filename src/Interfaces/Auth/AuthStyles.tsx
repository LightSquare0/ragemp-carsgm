import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
 `;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.875rem;
`;


export const OptionsContainer = styled.div`
  margin-top: 1.25rem;
  display: flex;
  justify-content: space-between;
`;

export const Option = styled.div`
  color: gray;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const Hr = styled.div`
  border: 0;
  height: 0.063rem;
  background: #bababa;
  opacity: 0.7;
`;

export const ServerLogo = styled.img`
  max-width: 12rem;
  margin-top: 2rem;
`;
