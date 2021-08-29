import styled, { CSSProperties, keyframes } from "styled-components";

export const translateIn = keyframes`
 from {
    transform: translateY(0.625rem);
    opacity: 0;
  }
`;

interface ButtonProps {
  discord?: boolean;
  onChange?: (event: any) => void;
  style?: CSSProperties;
}

export const Button = styled.div<ButtonProps>`
  display: inline-block;
  background: var(--yellow-gradient);
  color: white;
  font-size: 1.5rem;
  text-transform: uppercase;
  padding: 1rem 6.25rem 1rem 6.25rem;
  border-radius: 0.5rem;
  box-shadow: 0.16rem 0.1875rem 1rem rgba(0, 0, 0, 0.3);
	
  &:active {
    transform: translateY(0.25rem);
  }

  &:focus-visible {
  }
`;
