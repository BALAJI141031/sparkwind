import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LandingRoute } from "./routes";
import { PATHS } from "./config/constants";
function App() {
  return (
    <div>
      <Routes>
        <Route path={PATHS.HOME_PATH} element={<LandingRoute />} />
      </Routes>
    </div>
  );
}

export default App;
