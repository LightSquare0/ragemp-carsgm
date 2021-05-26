import styled from "styled-components";

export const InputBox = styled.input`
  width: 100%;
  height: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 8px;
  font-family: inherit;
  font-size: 17px;
  outline: none;
  border-radius: 11px;
  border: none;
  color: black;
  &::placeholder {
    color: #cdd1d4;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 230px;
  height: 35px;
  margin: 15px;
  padding-left: 8px;
  border-radius: 11px;
  background-color: white;
  box-shadow: 0px 0px 5px 0px rgb(204 204 204 / 80%);
`;
