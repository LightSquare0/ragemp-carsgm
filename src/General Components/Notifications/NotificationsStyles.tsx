import styled, { keyframes } from "styled-components";


const expand = keyframes`
 from {
    transform: scale(0);
    opacity: 0;
    
  }
`

export const NotificationsContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  min-width: 300px;
  z-index: 101;
`;


export const NotificationWrapper = styled.div`
  justify-content: center;
  align-items: center;
  background-color: #161616;
  opacity: 0.9;
  color: white;
  padding: 0.9375rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.9375rem;
  &.enter-appear {
	  opacity: 0.01;
  }
  &.enter-appear-active {
	  opacity: 1;
	  transition: opacity 0.3s ease;
  }
`;

export const NotificationContent = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NotificationColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const NotificationTitle = styled.div`
  font-size: 1.125rem;
`;
export const NotificationText = styled.div`
  font-size: 0.9375rem;
`;
export const NotificationIcon = styled.div`
  padding-right: 1.2rem;
`;

