import { useHistory } from "react-router-dom";
import { Routes } from "../../Utils/RoutesEnum";

const Home: React.FC = () => {
  const history = useHistory();

  mp.events.add("react:DisplayRoot", () => {
    history.push(Routes.Root);
  })

  mp.events.add("react:DisplayLogin", () => {
    history.push(Routes.Auth);
  });

  mp.events.add("react:OpenGamemodeSelectorUI", () => {
    history.push(Routes.GamemodeSelector);
  });

  mp.events.add("react:OpenRaceListUI", () => {
    history.push(Routes.RaceList);
  });

  return <></>;
};

export default Home;
