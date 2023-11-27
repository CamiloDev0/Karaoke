import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import { KarolGApp } from "./KarolGApp";
import { store } from "./store";
import WebcamVideo from "./webcam/WebcamVideo";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <KarolGApp />
      {/* <WebcamVideo/> */}
    </Provider>
  </React.StrictMode>
);
