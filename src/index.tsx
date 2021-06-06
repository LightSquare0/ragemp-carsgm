import * as ReactDOM from "react-dom";
import Renderer from "./Renderer";
import * as _ from 'lodash';
//@ts-ignore
if (module.hot) {
  // Accept hot update
//@ts-ignore
  module.hot.accept();
}

ReactDOM.render(
  <Renderer/>,
  document.getElementById("app")
);
