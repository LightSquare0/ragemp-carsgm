import styled, { css } from "styled-components";

export const DropdownWrapper = styled.div``;
export const DropdownLabel = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.0625rem;
  margin-left: 0.3125rem;
`;

export const DropdownButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  transform: rotate(-90deg);
`;

export const DropdownBox = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  width: 10rem;
  height: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background: var(--badge-gray);
  border-radius: 0.4375rem;
  border: 0.0625rem solid var(--stroke2-gray);
  z-index: 10;
`;

export const DropdownText = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 100%;
  font-size: 0.875rem;
  color: white;
  background: transparent;
  border: none;
  outline: none;
  font-family: "MaisonNeueBook";
`;

export type DropdownElements = {
  state: boolean;
};

export const DropdownElements = styled.div<DropdownElements>`
  position: absolute;
  z-index: 1;
  transform: translateY(-1.5%);
  border-radius: 0rem 0rem 0.4375rem 0.4375rem;
  background: var(--badge-gray);
  font-size: 0.875rem;
  & > :first-child {
    padding-top: 0.6rem;
  }

  & > :last-child {
    padding-bottom: 0.375rem;
  }
  border: 0.0625rem solid var(--stroke2-gray);

  ${({ state }) =>
    state
      ? css`
          display: inline;
        `
      : css`
          display: none;
        `}
`;

export const DropdownElement = styled.div`
  width: 9.875rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  padding-left: 0.5rem;
  &:hover {
    background: var(--darker-gray);
  }
`;
