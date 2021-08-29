import styled from "styled-components";

export const Skewify: React.FC = (props) => {
  const SkewifyS = styled.div`
    transform: skew(-7deg);
  `;

  return <SkewifyS>{props.children}</SkewifyS>;
};

export const DeSkewify: React.FC = (props) => {
  const DeSkewifyS = styled.div`
  transform: skew(7deg);
  `

  return <DeSkewifyS>{props.children}</DeSkewifyS>
}

