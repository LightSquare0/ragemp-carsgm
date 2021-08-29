import styled from "styled-components";

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OptionsContainer = styled.div`
  margin-top: 1.25rem;
  display: flex;
  justify-content: space-between;
`;

export const Option = styled.div`
  color: var(--text-gray);
  font-size: 0.9375rem;
  cursor: pointer;
  margin-top: 2.75rem;
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

export const LogoHead = styled.div`
  color: var(--logo-gray);
  font-family: "HemiHead";
  text-align: center;
  font-size: 5.625rem;
  line-height: 80%;
  margin-bottom: 6.25rem;
  & > span {
    display: block;
    font-size: 4.5rem;
  }
`;
