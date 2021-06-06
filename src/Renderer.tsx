import GlobalStyles from "./Globals/GlobalStyles/GlobalStyles";
import {
  Route,
  HashRouter,
  Link,
} from "react-router-dom";
import Auth from "./Interfaces/Auth/Auth";
import Hud from "./Hud/Hud";

const Renderer = () => {
  return (
    <>
      <GlobalStyles />
      <Hud />
      <HashRouter>
        <Route exact path="/">
          {/* <Link to="/auth">Log in</Link> */}
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
      </HashRouter>
    </>
  );
};

export default Renderer;
