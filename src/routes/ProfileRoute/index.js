import { Cta, ProfileAnalytics } from "../../components";
import { EditProfile } from "../../components";
import { useParams } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import { getAllUsers, getUser } from "../../networkCalls";
import { ADMIN } from "../../config/constants";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { userId } = useParams();
  const {
    firstName,
    lastName,
    email,
    userPhoto,
    displayname,
    followers,
    following,
    portfolioUrl,
    bio,
  } = profile;
  // get me the user
  useEffect(() => {
    (async () => {
      try {
        let user;
        if (userId !== "admin") {
          user = await getUser(userId);
        } else {
          let users = await getAllUsers();
          console.log(users, "usersss");
          // i was considered one more user
          for (let i = 0; i < users.length; i++) {
            if (users[i].email === ADMIN.SECOND_EMAIL) {
              user = await getUser(users[i]._id);
              console.log(user, "inside foreach");
            }
          }
        }
        console.log(user, "user");
        setProfile(user);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div>
      {profile && (
        <div className="profile-div">
          <img src={userPhoto} className="avatar avatar-md" />
          <h3>
            {firstName} {lastName} @{displayname}
          </h3>
          <p>{email}</p>
          <Cta type={"primary-cta"} text={"Edit Profile"} />
          <center>
            <p>{bio}</p>
          </center>
          <small>{portfolioUrl}</small>
          <div className="profile-analytics">
            <ProfileAnalytics />
            <ProfileAnalytics />
            <ProfileAnalytics />
          </div>
        </div>
      )}
      <h3>Your Posts</h3>
      {/* <EditProfile /> */}
    </div>
  );
}
