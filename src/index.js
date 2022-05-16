import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import {
  CreateTweet,
  NotifyUser,
  AuthProvider,
  HomeProvider,
} from "./contexts";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <NotifyUser>
          <HomeProvider>
            <CreateTweet>
              <App />
            </CreateTweet>
          </HomeProvider>
        </NotifyUser>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
