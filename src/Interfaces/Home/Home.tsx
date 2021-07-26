import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();

  mp.events.add("react:DisplayLogin", () => {
    history.push("/auth");
  });

  mp.events.add("react:OpenRaceManagerUI", () => {
    history.push("/racemanager");
  });

  return <></>;
};

export default Home;
