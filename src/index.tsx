import * as ReactDOM from "react-dom";
import Renderer from "./Renderer";
import * as _ from "lodash";
import React from "react";
import { HashRouter } from "react-router-dom";

//@ts-ignore
// window.mp = {
//   add: () => {},
//   trigger: () => {},
//   events: {
//     add: () => {},
//   },
// };

ReactDOM.render(
  <HashRouter>
    <Renderer />
  </HashRouter>,
  document.getElementById("app")
);
