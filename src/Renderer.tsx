import { hot } from "react-hot-loader";

import GlobalStyles from "./Globals/GlobalStyles/GlobalStyles";
import {
  Route,
  HashRouter,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import Auth from "./Interfaces/Auth/Auth";
import Hud from "./Hud/Hud";
import Home from "./Interfaces/Home/Home";
import React from "react";

const Renderer: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Hud />
      <HashRouter>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
      </HashRouter>
    </>
  );
};

export default hot(module)(Renderer);
