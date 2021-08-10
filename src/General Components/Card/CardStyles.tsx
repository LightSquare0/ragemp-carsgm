import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(241, 249, 255, 0.8);
  padding: 1.25rem;
  margin: 1.25rem;
  border-radius: 0.938rem;
  box-shadow: 0rem 0rem 0.563rem 0rem rgba(36, 36, 36, 0.7);
`;

interface CardProps {
  row?: boolean,
  column?: boolean
}

export const CardContent = styled.div<CardProps>`
  display: flex;
  ${(props) =>
    props.row
      ? "flex-direction: row"
      : props.column
      ? "flex-direction: column"
      : ""}
`;

export const CardHeader = styled.h3``;
