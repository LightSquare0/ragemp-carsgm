import styled, { CSSProperties, keyframes } from "styled-components";

export const translateIn = keyframes`
 from {
    transform: translateY(0.625rem);
    opacity: 0;
  }
`;

interface ButtonProps {
  discord?: boolean
  onChange?: (event: any) => void
  style?: CSSProperties
}

export const Button = styled.div<ButtonProps>`
  display: inline-block;
  padding: 0.563rem;
  padding-left: 1.875rem;
  padding-right: 1.875rem;
  font-size: 1.125rem;
  line-height: 1.2;
  letter-spacing: 0.1em;
  transition: 0.2s ease;
  border-radius: 1.719rem;
  cursor: pointer;
  border: 0;
  color: ${(props) => (props.discord ? "white" : "white")};
  background-color: ${(props) => (props.discord ? "#7289da" : "#8c0424")};
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
  box-shadow: ${(props) =>
    props.discord
      ? "0 0.25rem 0.875rem 0 rgba(114, 137, 218, 0.8)"
      : "0 0.25rem 0.875rem 0 rgba(140, 4, 36, 0.6)"};
  outline: none;
  font-family: inherit;
  animation: ${translateIn} 0.2s ease;
  &:hover {
    color: white;
    background: ${(props) => (props.discord ? "#8499e3" : "#69021a")};
    box-shadow: ${(props) =>
      props.discord
        ? "0 0.25rem 0.875rem 0 rgba(132, 153, 227, 1)"
        : "0 0.125rem 0.875rem 0 rgba(140, 4, 36, 0.6)"};
  }
  &:active {
    transform: translateY(0.25rem);
  }
  &:focus-visible {
    background-color: #558bb5;
  }
`;
