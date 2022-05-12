import { AiOutlineClose, BiUpload, BsEmojiSmile } from "../../icons";
import { useRef, useState } from "react";
import { Cta } from "../index";
import { createTweet } from "../../networkCalls";
import { useTweet, useNotifyUser } from "../../contexts";
import { REDUCER_CONSTANTS, EMOJIS } from "../../config/constants";
import "./index.css";

export default function CreateTweet({ setCreateTweet, setIsTweeted }) {
  const { tweet, setTweet } = useTweet();
  const [imageName, setImageName] = useState(null);
  const [emojis, setEmojis] = useState(null);
  const { toast } = useNotifyUser();

  // create tweet req
  const createTweetHandler = () => {
    (async () => {
      try {
        toast("wow so easy");
        const response = await createTweet(tweet);
        setIsTweeted((prevState) => !prevState);
        setCreateTweet(false);
      } catch (e) {
        console.log(e);
      }
    })();
  };

  const hiddenFileInput = useRef(null);

  return (
    <div className="create-tweet-section">
      <div className="create-tweet">
        <div className="cancel-cta-div">
          <AiOutlineClose
            className="cancel-cta"
            onClick={() => setCreateTweet(false)}
          />
        </div>
        <div className="tweet-section">
          <img
            src="https://picturepan2.github.io/spectre/img/avatar-4.png"
            className="avatar avatar-xs"
          />
          <div className="tweet-content">
            <input
              type="text"
              placeholder="Add caption here"
              onChange={(e) =>
                setTweet({
                  type: REDUCER_CONSTANTS.CAPTION,
                  payload: e.target.value,
                })
              }
            />
            <textarea
              rows="4"
              cols="10"
              placeholder="what's you are thinking?"
              onChange={(e) =>
                setTweet({
                  type: REDUCER_CONSTANTS.TWEETTEXT,
                  payload: e.target.value,
                })
              }
            ></textarea>
            <input
              type="file"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={(e) => {
                setTweet({
                  type: REDUCER_CONSTANTS.PICTURE,
                  payload: URL.createObjectURL(e.target.files[0]),
                });
                setImageName(e.target.files[0].name);
              }}
            />
            {imageName && <p>{imageName}</p>}
            <div className="primary-cta-div">
              <div className="icons-section">
                <BiUpload
                  className="crate-tweet-icon"
                  onClick={() => {
                    hiddenFileInput.current.click();
                  }}
                />
                <div className="emojis-section">
                  <BsEmojiSmile
                    className="crate-tweet-icon"
                    // onClick={() =>
                    //   !emojis ? setEmojis(EMOJIS) : setEmojis(null)
                    // }
                  />
                  {/* {emojis && (
                    <div className="emojis-div">
                      {emojis.map((emoji) => (
                        <li
                          onClick={() => {
                            console.log(emoji, "jj", tweet.tweetText + emoji);
                            setTweet({
                              type: REDUCER_CONSTANTS.TWEETTEXT,
                              payload: tweet.tweetText + emoji,
                            });
                          }}
                        >
                          {emoji}
                        </li>
                      ))}
                    </div>
                  )} */}
                </div>
              </div>
              <div onClick={createTweetHandler}>
                <Cta type="primary-cta" text="Tweet" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
