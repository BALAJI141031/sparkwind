import "./index.css";
import {
  RiHome7Line,
  MdOutlineNotifications,
  BsPlusSquare,
} from "../../icons/";
export default function BottomNavbar({ setCreateTweet }) {
  return (
    <div className="nav-section">
      <RiHome7Line className="icon" />
      <BsPlusSquare className="icon" onClick={() => setCreateTweet(true)} />
      <MdOutlineNotifications className="icon" />
    </div>
  );
}
