import "./index.css";
import { AiOutlineClose, MdOutlineChangeCircle } from "../../icons";
import { Cta } from "../index";
import { useEffect, useRef, useState } from "react";
import { editUser, getUser } from "../../networkCalls";
import {useNotifyUser} from 'contexts'
export default function EditProfile({ userId, editMyProfile, setProfile }) {
  const hiddenFileInput = useRef(null);
  const username = useRef(null);
  const { toast } = useNotifyUser();
  const bio = useRef(null);
  const portfolioUrl = useRef(null);
  const [userPhoto, updateUserPhoto] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const userResponse = await getUser(userId);
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
      setProfile(editUserResponse.data.user);
      editMyProfile(false);
    } catch (e) {
      toast.error("Unexpected error. Please try again in some time.")
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
                  onChange={(e) =>
                    updateUserPhoto(URL.createObjectURL(e.target.files[0]))
                  }
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
              <div onClick={editProfileHandler} className="flex justify-end">
                <Cta type="primary-cta" text="Update" />
              </div>  
          </div>
        </div>
      </div>
    </div>
  );
}
