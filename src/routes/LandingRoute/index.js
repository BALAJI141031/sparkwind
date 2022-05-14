import { LandingHero, Cta } from "components";
import { HERO } from "config/constants";
import { NavLink } from "react-router-dom";
import { PATHS } from "config/constants";
import "./index.css";
export default function LandingRoute() {
  return (
    <main className="landing-section">
      <div>
        <h1>SparkWind</h1>
        <div>
          {HERO.LANDING_ROUTE_HERO_TEXTS.map((hero) => (
            <LandingHero hero={hero} />
          ))}
        </div>
        <div>
          <NavLink to={PATHS.SIGNUP}>
            <Cta type={"primary-cta"} text={"JoinNow"} />
          </NavLink>
          <center>
            <NavLink to={PATHS.LOGIN}>
              <strong>Already Have an Account?</strong>
            </NavLink>
          </center>
        </div>
      </div>
    </main>
  );
}
