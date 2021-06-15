import { useState } from "react";
import { Redirect } from "react-router-dom";

const Home: React.FC = () => {
  const [willLogin, setWillLogin] = useState(false);

  //@ts-ignore
  mp.events.add("react:DisplayLogin", () => {
    setWillLogin(true);
    //@ts-ignore
  });

  console.log("willLogin" + willLogin);
  if (!willLogin) {
    return <></>;
  } else {
    return <Redirect to="/auth" push />;
  }
};

export default Home;
