import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  LandingRoute,
  HomeRoute,
  Profile,
  Notications,
  Bookmarks,
  Login,
  Signup,
} from "routes";
import { PATHS } from "config/constants";
import { Header } from "components";
import Mockman from "mockman-js";
function App() {
  return (
    <div className="routes-wrapper">
      <div className="header">
        <Header />
      </div>
      <Routes>
        <Route path={PATHS.LANDING_PATH} element={<LandingRoute />} />
        <Route path={PATHS.HOME_PATH} element={<HomeRoute />} />
        <Route path={PATHS.PROFILE_PATH} element={<Profile />} />
        <Route path={PATHS.NOTIFICATIONS_PATH} element={<Notications />} />
        <Route path={PATHS.BOOKMARKS_PATH} element={<Bookmarks />} />
        <Route path={PATHS.USER}>
          <Route path={PATHS.LOGIN} element={<Login />} />
          <Route path={PATHS.SIGNUP} element={<Signup />} />
        </Route>
        <Route path={PATHS.MOCK} element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
