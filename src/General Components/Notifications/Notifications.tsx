import { useContext } from "react";
import Icon from "../../Utils/Icon";
import { NotificationsContext } from "./NotificationsContext";
import {
  NotificationColumn,
  NotificationContent,
  NotificationIcon,
  NotificationsContainer,
  NotificationText,
  NotificationTitle,
  NotificationWrapper,
} from "./NotificationsStyles";
import { CSSTransition } from "react-transition-group";

const Notifications: React.FC = () => {
  const { notifications } = useContext(NotificationsContext);
  return (
    <NotificationsContainer>
      {notifications.map((notification: any) => (
          <NotificationWrapper>
            <NotificationContent>
              <NotificationColumn>
                <Icon
                  color="red"
                  icon={
                    notification.type == "success"
                      ? "check-circle"
                      : "times-circle"
                  }
                  size="1.5rem"
                />
              </NotificationColumn>
              <NotificationColumn>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationText>{notification.text}</NotificationText>
              </NotificationColumn>
            </NotificationContent>
          </NotificationWrapper>
      ))}
    </NotificationsContainer>
  );
};

export default Notifications;
