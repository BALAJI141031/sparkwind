import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LandingRoute, HomeRoute, Profile, Notications } from "./routes";
import { PATHS } from "./config/constants";
import { Header } from "./components";
function App() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <Routes>
        <Route path={PATHS.LANDING_PATH} element={<LandingRoute />} />
        <Route path={PATHS.HOME_PATH} element={<HomeRoute />} />
        <Route path={PATHS.PROFILE_PATH} element={<Profile />} />
        <Route path={PATHS.NOTIFICATIONS_PATH} element={<Notications />} />
      </Routes>
    </div>
  );
}

export default App;
