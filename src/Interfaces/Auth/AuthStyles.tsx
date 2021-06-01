import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-width: 300px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  
`;

export const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const Photo = styled.img`
  height: 450px;
  object-fit: cover;
  border-radius: 15px 0px 0px 15px;
  mask-image: linear-gradient(to top, rgba(255, 255, 255, 0.3) 10%, black, black, black);
  mask-type: alpha;
`;

export const OptionsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const Option = styled.div`
  color: gray;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const Hr = styled.div`
  border: 0;
  height: 1px;
  background: #bababa;
  opacity: 0.7;
`;

export const ServerLogo = styled.img`
  max-width: 12rem;
  margin-top: 2rem;
`;
