import { Cta, ProfileAnalytics } from "../../components";
import { EditProfile } from "../../components";
import { useParams } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  getUser,
  followUser,
  unfollowUser,
} from "../../networkCalls";
import { ADMIN, PROFILE_CONTSTANTS } from "../../config/constants";
import jwt_decode from "jwt-decode";
// thi sshould replace with cookies jwt token
const decodedToken = jwt_decode(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
  process.env.REACT_APP_JWT_SECRET
);
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [followsList, setFollowsList] = useState(null);
  const [myProfile, editMyProfile] = useState({
    showMyProfile: false,
    userPhoto: null,
    displayname: null,
    portfolioUrl: null,
    bio: null,
    firstName: null,
    lastName: null,
  });
  const { userId } = useParams();

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
    if (profile.email === decodedToken.email) ctaText = "Edit Profile";
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
      editMyProfile((prev) => ({ ...prev, showMyProfile: true }));
    }
  }

  if (followsList) {
    const { followers, following } = followsList;
    for (let i = 0; i < followers.length; i++) {
      if (followers[i].email === decodedToken.email) {
        ctaText = "Following";
        break;
      }
      ctaText = "Follow";
    }
  }

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
      {myProfile.showMyProfile && <EditProfile userId={userId} />}
    </div>
  );
}