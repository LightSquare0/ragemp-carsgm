import styled from "styled-components";

export const InputBox = styled.input`
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  border: none;
  color: var(--whiter-gray);
  background-color: transparent;
  &::placeholder {
    font-size: 1rem;
    color: #cdd1d4;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.75rem;
`;

export const InputLabel = styled.label`
  align-self: flex-start;
  color: var(--middle-gray);
  margin-left: 0.3125rem;
`;

export const InputStyled = styled.div`
  display: flex;
  align-items: center;
  width: 16.375rem;
  height: 3rem;
  
  margin-top: 0.1875rem;
  padding-left: 0.5rem;
  border-radius: 0.625rem;
  background-color: var(--darker-gray);
  border: 1px solid var(--stroke-gray);
`;
