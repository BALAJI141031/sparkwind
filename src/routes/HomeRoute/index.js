import "./index.css";
import {
  Tweet,
  BottomNavbar,
  SuggestedProfile,
  CreateTweet,
} from "../../components";
export default function HomeRoute() {
  return (
    <div className="home-section">
      {/* <div>
        <Tweet />
      </div>
      <div className="bottom-navbar">
        <BottomNavbar />
      </div> */}
      <CreateTweet />
    </div>
  );
}

