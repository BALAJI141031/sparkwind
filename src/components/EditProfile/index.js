import "./index.css";
import { AiOutlineClose } from "../../icons";
import { Cta } from "../index";
export default function EditProfile() {
  return (
    <div className="edit-profile-section">
      <div className="edit-profile">
        <div className="cancel-cta-div">
          <AiOutlineClose className="cancel-cta" />
        </div>
        <div className="profile-section">
          <div className="profile-content">
            <div>
              <p>Avatar</p>

              <div className="flex-H-center-V">
                <img
                  src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                  className="avatar avatar-sm set"
                />
                <button className="ml">Change</button>
              </div>
            </div>
            <div>
              <p>username</p>
              <input type="text" placeholder="UserName" className="set" />
            </div>
            <div>
              <p>bio</p>
              <textarea
                rows="4"
                cols="10"
                placeholder="Your bio?"
                className="set"
              ></textarea>
            </div>
            <div>
              <p>Website</p>
              <input type="text" placeholder="UserName" className="set" />
            </div>
            <div className="">
              <Cta type="primary-cta" text="Update" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
