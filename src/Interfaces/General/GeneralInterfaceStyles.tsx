import styled from "styled-components";

export const TopBar = styled.div`
  position: absolute;
  top: 3.125rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 4.375rem;
  padding-right: 4.375rem;
  color: var(--text-gray);
`;

export const Header = styled.h1`
  font-family: "HemiHead";
  font-size: 3.4375rem;
`;

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

export const User = styled.div`
  font-size: 1.875rem;
`;

export const DropdownArrow = styled.img`
  margin: 0;
`;

export const Avatar = styled.img`
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
`;
