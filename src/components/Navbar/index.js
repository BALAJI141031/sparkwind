import "./index.css";
import {
  RiHome7Line,
  MdOutlineNotifications,
  BsPlusSquare,
  BsBookmarkStar,
} from "icons/";
import { NavLink } from "react-router-dom";
import { useHome } from "contexts";
import { PATHS } from "config/constants";
export default function BottomNavbar() {
  const { home, setHome } = useHome();
  return (
    <div className="nav-section">
      <NavLink to={PATHS.HOME_PATH}>
        <RiHome7Line className="icon" />
      </NavLink>

      <NavLink to={PATHS.HOME_PATH}>
        <BsPlusSquare
          className="icon"
          onClick={() => {
            setHome({ type: "editTweet", payload: false });
            setHome({ type: "createTweet", payload: true });
          }}
        />
      </NavLink>
      <NavLink to={PATHS.NOTIFICATIONS_PATH}>
        <MdOutlineNotifications className="icon" />
      </NavLink>
      <NavLink to={PATHS.BOOKMARKS_PATH}>
        <BsBookmarkStar className="icon" />
      </NavLink>
    </div>
  );
}
