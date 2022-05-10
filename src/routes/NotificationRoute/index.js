import "./index.css";
import { BsHeart, GoComment, RiUserFollowLine } from "../../icons";
import { Tweet } from "../../components";
export default function Notications() {
  return (
    <div className="notification-section">
      <h4>Notifications</h4>
      <div className="notification-div">
        {/* <div className="icon-div">
        <BsHeart className="notification-icon" />
      </div>
      <div>
        <div className="notification-from">
          <img
            src="https://picturepan2.github.io/spectre/img/avatar-4.png"
            className="avatar avatar-xs"
          />
          <div>
            <h4>Admin @imbalajinarayana 1m ago</h4>
            <p>Liked your post</p>
          </div>
        </div>
        <div id="notification-tweet">
          <Tweet />
        </div>
      </div> */}
        <div className="icon-div">
          <RiUserFollowLine className="notification-icon" />
        </div>
        <div>
          <div className="notification-from">
            <img
              src="https://picturepan2.github.io/spectre/img/avatar-4.png"
              className="avatar avatar-xs"
            />
            <div>
              <h4>Admin @imbalajinarayana 1m ago</h4>
              <p>Followed You!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
