import styled from "styled-components";

export const InputBox = styled.input`
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
    padding-left: 0.5rem;
  font-family: inherit;
    font-size: 1.0625rem;
  outline: none;
  border-radius: 0.6875rem;
  border: none;
  color: black;
  &::placeholder {
    color: #cdd1d4;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 14.375rem;
  height: 2.188rem;
  margin: 0.938rem;
  padding-left: 0.5rem;
  border-radius: 0.688rem;
  background-color: white;
  box-shadow: 0rem 0rem 0.313rem 0rem rgb(204 204 204 / 80%);
`;
