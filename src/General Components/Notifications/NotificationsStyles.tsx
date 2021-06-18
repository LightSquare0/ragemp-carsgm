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
  padding: 15px;
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 15px;
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
  font-size: 18px;
`;
export const NotificationText = styled.div`
  font-size: 15px;
`;
export const NotificationIcon = styled.img`
  height: 26px;
  padding-right: 10px;
`;

