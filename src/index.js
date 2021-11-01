import { createElement } from "react";
import { render } from "react-dom";
import App from "./App2";

import "./styles.css";

const rootElement = document.getElementById("root");
render(createElement(App), rootElement);
