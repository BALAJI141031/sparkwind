import "./index.css";
import {
  RiHome7Line,
  MdOutlineNotifications,
  BsPlusSquare,
} from "../../icons/";
import { useHome } from "contexts";
export default function BottomNavbar() {
  const { home, setHome } = useHome();
  return (
    <div className="nav-section">
      <RiHome7Line className="icon" />
      <BsPlusSquare
        className="icon"
        onClick={() => {
          setHome({ type: "editTweet", payload: false });
          setHome({ type: "createTweet", payload: true });
        }}
      />
      <MdOutlineNotifications className="icon" />
    </div>
  );
}
