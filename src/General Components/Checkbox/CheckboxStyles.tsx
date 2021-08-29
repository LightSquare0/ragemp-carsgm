import styled from "styled-components";

interface CheckboxProps {
  checked: boolean
}

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const CheckboxContainer = styled.div`
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  margin: 0.938rem;
`;

export const CheckboxStyled = styled.div<CheckboxProps>`
  display: inline-block;
  width: 1.625rem;
  height: 1.625rem;
  background: var(--yellow-gradient);
  box-shadow: ${(props) =>
    props.checked
      ? "0rem 0rem 0.375rem 0.05rem rgba(90, 90, 90, 1)"
      : "0rem 0rem 0.313rem 0rem rgba(90, 90, 90, 1)"};
  border-radius: 0.375rem;
  transition: all 150ms;
`;

export const Icon = styled.svg<CheckboxProps>`
  fill: none;
  stroke: ${(props) => (props.checked ? "white" : "transparent")};
  stroke-width: 0.125rem;
`;

export const Text = styled.span`
  margin-left: 0.375rem;
  font-size: 0.9375rem;
  color: var(--text-gray);
`;
