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
  margin: 15px;
`;

export const CheckboxStyled = styled.div<CheckboxProps>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? "#8c0424" : "white")};
  box-shadow: ${(props) =>
    props.checked
      ? "0px 0px 6px 1px rgba(90, 90, 90, 1)"
      : "0px 0px 5px 0px rgba(90, 90, 90, 1)"};
  border-radius: 3px;
  transition: all 150ms;
`;

export const Icon = styled.svg<CheckboxProps>`
  fill: none;
  stroke: ${(props) => (props.checked ? "white" : "transparent")};
  stroke-width: 2px;
`;

export const Text = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  font-size: 14px;
  color: #48494B;
`;
