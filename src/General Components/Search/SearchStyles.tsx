import styled from "styled-components";

export const SearchWrapper = styled.div``;

export const SearchLabel = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.0625rem;
  margin-left: 0.3125rem;
`;

export const SearchBox = styled.div`
  align-items: center;
  display: flex;
  width: 10rem;
  height: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background: var(--badge-gray);
  border-radius: 0.4375rem;
  border: 0.0625rem solid var(--stroke2-gray);
  z-index: 10;
`;

export const SearchInput = styled.input`
  width: 90%;
  height: 100%;
  font-size: 0.875rem;
  color: white;
  background: transparent;
  border: none;
  outline: none;
  font-family: "MaisonNeueBook";
  &::placeholder {
    color: white;
  }
`;

export const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;
