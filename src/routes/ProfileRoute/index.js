import { Cta, ProfileAnalytics } from "../../components";
import { EditProfile } from "../../components";
import "./index.css";
export default function Profile() {
  return (
    <div>
      {/* <div className="profile-div">
        <img
          src="https://picturepan2.github.io/spectre/img/avatar-4.png"
          className="avatar avatar-md"
        />
        <h3>Balaji Narayana</h3>
        <p>@balajiab09</p>
        <Cta type={"primary-cta"} text={"Edit Profile"} />
        <center>
          <p>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available.
          </p>
        </center>
        <small>Balajiab09.com</small>
        <div className="profile-analytics">
          <ProfileAnalytics />
          <ProfileAnalytics />
          <ProfileAnalytics />
        </div>
      </div>
      <h3>Your Posts</h3> */}
      <EditProfile />
    </div>
  );
}
