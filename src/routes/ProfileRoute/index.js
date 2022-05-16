import { EditProfile, Cta, ProfileAnalytics } from "components";
import { useNavigate, useParams } from "react-router-dom";
import { jwtProfile } from "config/jwt";
import "./index.css";
import { useAuthProvider } from "contexts";
import { useEffect, useState } from "react";
import { getAllUsers, getUser, followUser, unfollowUser } from "networkCalls";
import { ADMIN, PROFILE_CONTSTANTS } from "config/constants";
import Cookies from "js-cookie";

export default function Profile() {
  const { isLoggedIn } = useAuthProvider();
  const navigate = useNavigate();
  const myProfileDetials = isLoggedIn ? jwtProfile() : null;
  const [profile, setProfile] = useState(null);
  const [followsList, setFollowsList] = useState(null);
  const [myProfile, editMyProfile] = useState(false);
  const { userId } = useParams();
  const { setLogin } = useAuthProvider();

  // get me the user
  useEffect(() => {
    (async () => {
      try {
        let user;
        if (userId !== "admin") {
          user = await getUser(userId);
        } else {
          let users = await getAllUsers();

          for (let i = 0; i < users.length; i++) {
            if (users[i].email === ADMIN.SECOND_EMAIL) {
              user = await getUser(users[i]._id);
            }
          }
        }
        setProfile(user);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // deciding cta
  let ctaText;
  if (profile) {
    if (profile.email === myProfileDetials.email) ctaText = "Edit Profile";
    else if (profile.following.includes(profile._id)) {
      ctaText = "Following";
    } else {
      ctaText = "Follow";
    }
  }

  // toggle follow handler
  async function toggleFollow(ctaText) {
    if (ctaText === "Follow") {
      console.log(ctaText);
      try {
        const followResponse = await followUser(userId);
        setFollowsList(followResponse.data.followUser);
      } catch (e) {
        console.log(e);
      }
    } else if (ctaText === "Following") {
      console.log(ctaText);
      try {
        const unfollowResponse = await unfollowUser(userId);
        setFollowsList(unfollowResponse.data.followUser);
        console.log(unfollowResponse);
      } catch (e) {
        console.log(e);
      }
    } else {
      // editMyProfile((myprofile)=>({...myProfile,showMyProfile:true})
      editMyProfile(true);
    }
  }

  if (followsList) {
    const { followers, following } = followsList;
    for (let i = 0; i < followers.length; i++) {
      if (followers[i].email === myProfileDetials.email) {
        ctaText = "Following";
        break;
      }
      ctaText = "Follow";
    }
  }

  // logout handler

  const logoutHandler = () => {
    Cookies.remove("jwt_token");
    navigate("/", { replace: true });
    setLogin(false);
  };

  return (
    <div>
      {profile && (
        <div className="profile-div">
          <img src={profile.userPhoto} className="avatar avatar-md" />
          <h3>
            {profile.firstName} {profile.lastName} @{profile.displayname}
          </h3>
          <p>{profile.email}</p>
          <button onClick={() => toggleFollow(ctaText)}>{ctaText}</button>
          {ctaText === "Edit Profile" && (
            <button onClick={logoutHandler}>LogOut</button>
          )}
          <center>
            <p>{profile.bio}</p>
          </center>
          <small>{profile.portfolioUrl}</small>
          {followsList ? (
            <div className="profile-analytics">
              <ProfileAnalytics
                type={PROFILE_CONTSTANTS[0]}
                data={`${followsList.followers.length}`}
              />
              <ProfileAnalytics
                type={PROFILE_CONTSTANTS[1]}
                data={`${followsList.following.length}`}
              />
              <ProfileAnalytics type={PROFILE_CONTSTANTS[2]} />
            </div>
          ) : (
            <div className="profile-analytics">
              <ProfileAnalytics type={PROFILE_CONTSTANTS[0]} data={0} />
              <ProfileAnalytics type={PROFILE_CONTSTANTS[1]} data={0} />
              <ProfileAnalytics type={PROFILE_CONTSTANTS[2]} data={0} />
            </div>
          )}
        </div>
      )}
      <h3>Your Posts</h3>
      {myProfile && (
        <EditProfile userId={userId} editMyProfile={editMyProfile} />
      )}
    </div>
  );
}
