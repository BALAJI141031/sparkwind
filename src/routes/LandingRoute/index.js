import { LandingHero, Cta } from "../../components";
import { HERO } from "../../config/constants";
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
          <Cta type={"primary-cta"} text={"JoinNow"} />
          <center>
            <small>Already Have an Account?</small>
          </center>
        </div>
      </div>
    </main>
  );
}
