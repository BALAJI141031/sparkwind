import { AiOutlineClose, BiUpload, BsEmojiSmile } from "../../icons";
import { Cta } from "../index";
import "./index.css";
export default function CreateTweet() {
  return (
    <div className="create-tweet-section">
      <div className="create-tweet">
        <div className="cancel-cta-div">
          <AiOutlineClose className="cancel-cta" />
        </div>
        <div className="tweet-section">
          <img
            src="https://picturepan2.github.io/spectre/img/avatar-4.png"
            className="avatar avatar-xs"
          />
          <div className="tweet-content">
            <input type="text" placeholder="Add caption here" />
            <textarea
              rows="4"
              cols="10"
              placeholder="what's you are thinking?"
            ></textarea>
            <div className="primary-cta-div">
              <div className="icons-section">
                <BiUpload className="crate-tweet-icon" />
                <BsEmojiSmile className="crate-tweet-icon" />
              </div>
              <Cta type="primary-cta" text="Tweet" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
