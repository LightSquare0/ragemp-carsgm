import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 20px;
  margin: 20px;
  border-radius: 15px;
  box-shadow: 0px 0px 9px 0px rgba(36, 36, 36, 1);
  transition: all 2s linear;
`;

export const CardContent = styled.div`
  display: flex;
  ${(props) =>
    props.row
      ? "flex-direction: row"
      : props.column
      ? "flex-direction: column"
      : ""}
`;

export const CardHeader = styled.h3``;
