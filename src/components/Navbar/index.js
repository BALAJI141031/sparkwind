import "./index.css";
import {
  RiHome7Line,
  MdOutlineNotifications,
  BsPlusSquare,
} from "../../icons/";
export default function BottomNavbar() {
  return (
    <div className="nav-section">
      <RiHome7Line className="icon" />
      <BsPlusSquare className="icon" />
      <MdOutlineNotifications className="icon" />
    </div>
  );
}
