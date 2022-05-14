import "./index.css";
import {
  RiHome7Line,
  MdOutlineNotifications,
  BsPlusSquare,
} from "../../icons/";

export default function BottomNavbar({ setCreateTweet, setFromEdit }) {
  return (
    <div className="nav-section">
      <RiHome7Line className="icon" />
      <BsPlusSquare
        className="icon"
        onClick={() => {
          setFromEdit((prev) => ({ ...prev, editStatus: false }));
          setCreateTweet(true);
        }}
      />
      <MdOutlineNotifications className="icon" />
    </div>
  );
}
