import { motion } from "framer-motion";
import styled, { css } from "styled-components";

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

interface StepContainer {
  size?: "big" | "small";
}

export const StepContainer = styled(motion.div)<{size: "big" | "small"}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > :not(:last-child) {
    ${({ size }) =>
      size == "big" &&
      css`
        margin-bottom: 0.9375rem;
      `}

    ${({ size }) =>
      size == "small" &&
      css`
        margin-bottom: 0.625rem;
      `}
  }
`;

interface StepMode {
  size: "big" | "small";
}

export const StepMode = styled.div<StepMode>`
  display: flex;
  align-items: center;
  background-color: var(--badge-gray);
  border-radius: 0.4375rem;

  ${({ size }) =>
    size == "big" &&
    css`
      width: 16.25rem;
      height: 2.8125rem;
    `};

  ${({ size }) =>
    size == "small" &&
    css`
      width: 15rem;
      height: 2.1875rem;
    `}
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

export const ButtonContainer = styled.div<{ rendered: boolean }>`
  margin-top: auto;
  display: flex;
  justify-content: ${({ rendered }) =>
    rendered ? "space-between" : "flex-end"};
  width: 100%;
`;

export const StepSelectContainer = styled.div`
  height: 8.4375rem;
  overflow: auto;
  & > :not(:last-child) {
    margin-bottom: 0.625rem;
  }
`;

export const StepBackStyled = styled.div`
  display: flex;
  align-items: center;
`;
