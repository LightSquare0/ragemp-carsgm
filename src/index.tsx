import * as ReactDOM from "react-dom";
import Renderer from "./Renderer";
import * as _ from "lodash";
import React from "react";

//@ts-ignore
window.mp = {
  add: () => {},
  trigger: () => {},
  events: {
    add: () => {},
  },
};

ReactDOM.render(<Renderer />, document.getElementById("app"));
