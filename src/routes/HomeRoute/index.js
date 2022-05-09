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
      <div className="filters-div">
        <button>Trending Posts</button>
        <button>Latest Posts</button>
      </div>
      <div>
        <Tweet />
      </div>
      <div className="bottom-navbar">
        <BottomNavbar />
      </div>
      {/* <CreateTweet /> */}
    </div>
  );
}

