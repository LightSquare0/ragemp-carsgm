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
import { AnimatePresence, motion } from "framer-motion";

const Notifications: React.FC = () => {
  const { notifications } = useContext(NotificationsContext);
  return (
    <NotificationsContainer>
      <AnimatePresence>
        {notifications.map((notification: any, index: number) => (
          <motion.div layout
            key={index}
            initial={{ x: 200, opacity: 0}}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
          >
            <NotificationWrapper key={index}>
              <NotificationContent>
                <NotificationColumn>
                  <NotificationIcon>
                    <Icon
                      color={notification.type == "success" ? "green" : "red"}
                      icon={
                        notification.type == "success"
                          ? "check-circle"
                          : "times-circle"
                      }
                      size="1.9rem"
                    />
                  </NotificationIcon>
                </NotificationColumn>
                <NotificationColumn>
                  <NotificationTitle>{notification.title}</NotificationTitle>
                  <NotificationText>{notification.text}</NotificationText>
                </NotificationColumn>
              </NotificationContent>
            </NotificationWrapper>
          </motion.div>
        ))}
      </AnimatePresence>
    </NotificationsContainer>
  );
};

export default Notifications;
