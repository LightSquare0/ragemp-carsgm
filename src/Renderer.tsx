import { hot } from "react-hot-loader";

import GlobalStyles from "./Globals/GlobalStyles/GlobalStyles";
import { Route, HashRouter, useLocation } from "react-router-dom";
import Auth from "./Interfaces/Auth/Auth";
import Hud from "./Hud/Hud";
import Home from "./Interfaces/Home/Home";
import { NotificationsContext } from "./General Components/Notifications/NotificationsContext";
import { useState, useEffect } from "react";
import Notifications from "./General Components/Notifications/Notifications";
import GamemodeSelector from "./Interfaces/GamemodeSelector/GamemodeSelector";
import { RacesList } from "./Interfaces/RacesList/RacesList";
import { UserContext } from "./Globals/UserContext";
import { Routes } from "./Utils/RoutesEnum";

export interface ServerData {
  Player: {
    Name: string;
    Id: number;
  };
  Races: number;
  Online: number;
}

const Renderer: React.FC = () => {
  const [ServerData, setServerData] = useState<ServerData>({
    Player: { Name: "not logged", Id: -1 },
    Races: 0,
    Online: 0,
  });
  const [notifications, setNotifications] = useState([]);

  const Notify = (title: string, text: string, type: string) => {
    setNotifications([...notifications, { title: title, text: text, type: type }]);
  };

  useEffect(() => {
    if (notifications.length <= 0) return;

    const interval = setInterval(() => {
      const _notifications = [...notifications];
      _notifications.splice(0, 1);
      setNotifications(_notifications);
      console.log(notifications);
    }, 3500);
    return () => clearInterval(interval);
  });

  mp.events.add("react:DisplayNotification", (type, title, text) => {
    Notify(title, text, type);
  });

  return (
    <UserContext.Provider value={{ ServerData, setServerData }}>
      <NotificationsContext.Provider value={{ notifications, Notify }}>
        <GlobalStyles />
        <HashRouter>
          <Hud />
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/gmselector">
            <GamemodeSelector />
          </Route>
          <Route path="/racelist">
            <RacesList />
          </Route>
        </HashRouter>
        <Notifications />
      </NotificationsContext.Provider>
    </UserContext.Provider>
  );
};

export default hot(module)(Renderer);
