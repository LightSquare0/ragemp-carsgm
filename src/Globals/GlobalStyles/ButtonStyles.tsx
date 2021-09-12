import styled, { css, CSSProperties, keyframes } from "styled-components";

export const translateIn = keyframes`
 from {
    transform: translateY(0.625rem);
    opacity: 0;
  }
`;

interface ButtonProps {
  host?: boolean;
  join?: boolean;
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
  text-align: center;
  padding: 1rem 6.25rem 1rem 6.25rem;
  border-radius: 0.5rem;
  box-shadow: var(--general-shadow);
  transition: transform 0.2s ease;
  transform: skewX(-7deg);

  ${(props) =>
    props.host &&
    css`
      width: 15rem;
      height: 3rem;
      padding: 0.7rem 0rem 0.7rem 0rem;
      margin-left: auto;
      margin-right: 1rem;
    `}
  ${(props) =>
    props.join &&
    css`
      width: 11.5625rem;
      height: 2.5rem;
      font-size: 1.125rem;
      padding: 0rem;
      text-align: center;
      padding-top: 0.625rem;
      padding-bottom: 0.625rem;
    `}


  & > :first-child {
    transform: skewX(7deg);
  }

  &:active {
    transform: translateY(0.25rem) skewX(-7deg);
  }

  &:hover {
    transform: translateY(-0.25rem) skewX(-7deg);
  }

  &:focus-visible {
  }
`;
