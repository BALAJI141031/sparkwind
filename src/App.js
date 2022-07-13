import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  LandingRoute,
  HomeRoute,
  Profile,
  Notications,
  Bookmarks,
  Login,
  Signup,
  NotFoundRoute,
  Comments,
} from "routes";
import { PATHS } from "config/constants";
import { RequireAuth } from "config/authentication";
import { Header } from "components";
import Mockman from "mockman-js";
import { useAuthProvider } from "contexts";
function App() {
  <Helmet>
    <meta charSet="utf-8" />
    <title>My Title</title>
    <link rel="canonical" href="http://mysite.com/example" />
    <meta name="description" content="social media platform for aspirants" />
  </Helmet>;
  const { isLoggedIn } = useAuthProvider();
  return (
    <div className="routes-wrapper">
      {isLoggedIn && (
        <div className="header ">
          <Header />
        </div>
      )}
      <Routes>
        <Route path={PATHS.LANDING_PATH} element={<LandingRoute />} />
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.SIGNUP} element={<Signup />} />
        <Route
          path={PATHS.HOME_PATH}
          element={
            <RequireAuth>
              <HomeRoute />
            </RequireAuth>
          }
        />
        <Route
          path={PATHS.PROFILE_PATH}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path={PATHS.NOTIFICATIONS_PATH}
          element={
            <RequireAuth>
              <Notications />
            </RequireAuth>
          }
        />
        <Route
          path={PATHS.BOOKMARKS_PATH}
          element={
            <RequireAuth>
              <Bookmarks />
            </RequireAuth>
          }
        />

        <Route path={PATHS.MOCK} element={<Mockman />} />
        <Route path={PATHS.COMMENTS} element={<Comments />} />
        <Route path={PATHS.RANDOM} element={<NotFoundRoute />} />
      </Routes>
    </div>
  );
}

export default App;
