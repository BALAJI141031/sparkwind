import { EditProfile, Cta, ProfileAnalytics, Tweet } from "components";
import { useNavigate, useParams } from "react-router-dom";
import { jwtProfile } from "config/jwt";
import "./index.css";
import { useAuthProvider } from "contexts";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  getUser,
  followUser,
  unfollowUser,
  getUserTweets,
} from "networkCalls";
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
  const [userTweets, setUserTweets] = useState(null);

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

  // fetch user posts
  useEffect(() => {
    (async () => {
      try {
        const userTweets = await getUserTweets(userId);
        setUserTweets(userTweets);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const logoutHandler = () => {
    Cookies.remove("jwt_token");
    navigate("/", { replace: true });
    setLogin(false);
  };

  console.log("after editing it should render", profile);

  return (
    <div>
      {profile && (
        <div className="profile-div">
          <img src={profile.userPhoto} className="avatar avatar-md" />
          <h3>
            {profile.firstName} {profile.lastName} @{profile.displayname}
          </h3>
          <p>{profile.email}</p>
          <div onClick={() => toggleFollow(ctaText)}>
            <Cta text={ctaText} />
          </div>
          {ctaText === "Edit Profile" && (
            <div onClick={logoutHandler}>
              <Cta text={"LogOut"}  />
            </div>
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
      <center><h3>Your Posts</h3></center>
      {userTweets !== null && userTweets.length !== 0 ? (
        <div className="flex justify-center"><div className="user-tweets">
          {userTweets.map((tweet) => (
            <Tweet post={tweet} />
          ))}
        </div></div>
      ) : (
        "you dont have tweets"
      )}

      {myProfile && (
        <EditProfile
          userId={userId}
          editMyProfile={editMyProfile}
          setProfile={setProfile}
        />
      )}
    </div>
  );
}
