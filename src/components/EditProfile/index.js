import "./index.css";
import { AiOutlineClose, MdOutlineChangeCircle } from "../../icons";
import { Cta } from "../index";
import { useEffect, useRef, useState } from "react";
import { editUser, getUser } from "../../networkCalls";
export default function EditProfile({ userId, editMyProfile }) {
  const hiddenFileInput = useRef(null);
  const username = useRef(null);
  const bio = useRef(null);
  const portfolioUrl = useRef(null);
  const [userPhoto, updateUserPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const userResponse = await getUser(userId);
        console.log(userResponse, "here");
        updateUserPhoto(userResponse.userPhoto);
      } catch (e) {
        throw e;
      }
    })();
  }, []);

  const editProfileHandler = async () => {
    try {
      const editUserResponse = await editUser({
        userPhoto,
        displayname: username.current.value,
        bio: bio.current.value,
        portfolioUrl: portfolioUrl.current.value,
      });
      editMyProfile(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="edit-profile-section">
      <div className="edit-profile">
        <div className="cancel-cta-div">
          <AiOutlineClose
            className="cancel-cta"
            onClick={() => editMyProfile(false)}
          />
        </div>
        <div>
          <div className="profile-content">
            <div>
              <p>Avatar</p>

              <div>
                <div id="profile-pic-div">
                  <img src={userPhoto} className=" avatar-sm profile-pic" />
                  <MdOutlineChangeCircle
                    className="profile-change-icon"
                    onClick={() => {
                      hiddenFileInput.current.click();
                    }}
                  />
                </div>
                <input
                  className="ml"
                  type="file"
                  style={{ display: "none" }}
                  ref={hiddenFileInput}
                  onChange={(e) => {
                    updateUserPhoto((prevProfile) => ({
                      ...prevProfile,
                      userPhoto: URL.createObjectURL(e.target.files[0]),
                    }));
                  }}
                />
              </div>
            </div>
            <div>
              <p>username</p>
              <input type="text" placeholder="UserName" ref={username} />
            </div>
            <div>
              <p>bio</p>
              <textarea
                rows="4"
                cols="10"
                placeholder="Your bio?"
                ref={bio}
              ></textarea>
            </div>
            <div>
              <p>Website</p>
              <input
                type="text"
                placeholder="UserName"
                ref={portfolioUrl}
                name="website"
              />
            </div>
            <div className="">
              <div onClick={editProfileHandler}>
                <Cta type="primary-cta" text="Update" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
