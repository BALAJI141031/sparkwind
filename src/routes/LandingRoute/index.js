import { LandingHero, Cta } from "components";
import { HERO } from "config/constants";
import { NavLink } from "react-router-dom";
import { PATHS } from "config/constants";
import { GiWindSlap, MdOutlineKeyboardArrowRight } from "icons";
import "./index.css";
export default function LandingRoute() {
  return (
    <main className="landing-section">
      <div>
        <h1>
          Spark Wind <GiWindSlap className="hero-icon" />
        </h1>
        <div>
          {HERO.LANDING_ROUTE_HERO_TEXTS.map((hero) => (
            <LandingHero hero={hero} />
          ))}
        </div>
        <div>
          <NavLink to={PATHS.SIGNUP}>
            <Cta type={"primary-cta"} text={"JoinNow"} />
          </NavLink>
          <NavLink to={PATHS.LOGIN}>
            <div className="account-info">
              <p>Already Have an Account</p>
              <MdOutlineKeyboardArrowRight className="icon" />
            </div>
          </NavLink>
        </div>
      </div>
    </main>
  );
}
