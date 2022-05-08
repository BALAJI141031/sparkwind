import "./index.css";
import { Tweet, BottomNavbar, SuggestedProfile } from "../../components";
export default function HomeRoute() {
  return (
    <div className="home-section">
      <div>
        <Tweet />
      </div>
      <div className="bottom-navbar">
        <BottomNavbar />
      </div>
    </div>
  );
}

