import styled from "styled-components";

export const StepWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
height: 60%;
`;

export const StepHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > :not(:last-child) {
    margin-bottom: 1.25rem;
  }
`;

export const StepMode = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--badge-gray);
  border-radius: 0.4375rem;
  width: 16.25rem;
  height: 2.8125rem;
  & > :first-child {
    margin: 0;
    padding: 0;
  }
`;

export const StepModeText = styled.div`
  display: flex;
  justify-content: center;
  width: 59%;
`;

export const StepCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 20%;
`;

export const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
