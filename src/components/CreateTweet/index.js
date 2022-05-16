import { AiOutlineClose, BiUpload, BsEmojiSmile } from "icons";
import { useEffect, useRef, useState } from "react";
import { Cta } from "../index";
import { createTweet, getTweet } from "networkCalls";
import { useTweet, useNotifyUser, useHome } from "contexts";
import { REDUCER_CONSTANTS, EMOJIS } from "config/constants";
import "./index.css";
import { editTweet } from "../../networkCalls";

export default function CreateTweet(
  {
    // setCreateTweet,
    // setIsTweeted,
    // fromEdit,
    // setFromEdit,
  }
) {
  const { tweet, setTweet } = useTweet();
  const { home, setHome } = useHome();
  const { fromEdit, isTweeted } = home;
  const [imageName, setImageName] = useState(null);
  // const [emojis, setEmojis] = useState(null);
  const { toast } = useNotifyUser();

  // create tweet req
  const createTweetHandler = () => {
    (async () => {
      try {
        const response = !fromEdit.editStatus
          ? await createTweet(tweet)
          : await editTweet(tweet, fromEdit.tweetId);
        toast.success("Thanks For Your Tweet");
        setHome({ type: "userTweeted", payload: !isTweeted });
        setHome({ type: "createTweet", payload: false });
      } catch (e) {
        console.log(e);
      }
    })();
  };

  const hiddenFileInput = useRef(null);

  useEffect(() => {
    if (fromEdit.editStatus) {
      (async () => {
        try {
          const tweetResponse = await getTweet(fromEdit.tweetId);

          console.log("during updation", tweet);
          setTweet({
            type: REDUCER_CONSTANTS.CAPTION,
            payload: tweetResponse.caption,
          });
          setTweet({
            type: REDUCER_CONSTANTS.TWEETTEXT,
            payload: tweetResponse.content,
          });

          console.log("yes i'm getting my response back", tweetResponse);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  console.log("should render after updatinon of text fileds", tweet);
  return (
    <div className="create-tweet-section">
      <div className="create-tweet">
        <div className="cancel-cta-div">
          <AiOutlineClose
            className="cancel-cta"
            onClick={() => setHome({ type: "createTweet", payload: false })}
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
              value={fromEdit.editStatus ? tweet.caption : null}
              onChange={(e) =>
                setTweet({
                  type: REDUCER_CONSTANTS.CAPTION,
                  payload: e.target.value,
                })
              }
            />
            <textarea
              placeholder="what's you are thinking?"
              value={fromEdit.editStatus ? tweet.content : null}
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
