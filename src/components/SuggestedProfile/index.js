import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SuggestedProfile({ user }) {
  const navigate = useNavigate();
  const [followStatus, setFollowStatus] = useState(false);
  const { displayname, userPhoto, email, _id: userid } = user;
  return (
    <div className="profile-suggestion-div">
      <div
        className="profile-suggestion"
        onClick={() => navigate(`/profile/${userid}`)}
      >
        <img src={userPhoto} className="avatar avatar-xs" />
        <div>
          <h6>{displayname}</h6>
          <small>{email}</small>
        </div>
      </div>
      <h5 onClick={() => setFollowStatus((prevStatus) => !prevStatus)}>
        {!followStatus ? "Follow +" : "Following"}
      </h5>
    </div>
  );
}
