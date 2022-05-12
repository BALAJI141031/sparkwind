import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { CreateTweet, NotifyUser } from "./contexts";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NotifyUser>
        <CreateTweet>
          <App />
        </CreateTweet>
      </NotifyUser>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
