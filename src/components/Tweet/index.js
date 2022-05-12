import { AnalyticsIcon } from "../index";
import { FiMoreVertical } from "../../icons";
import { useState, useEffect } from "react";
import "./index.css";
import { ADMIN, NOTIFICATIONS } from "../../config/constants";
import { deleteTweet, editTweet, getAllBookMarks } from "../../networkCalls/";
import { useNotifyUser } from "../../contexts";
export default function Tweet({ post, setIsTweeted }) {
  const { toast } = useNotifyUser();
  const {
    displayname,
    content,
    caption,
    likes,
    displayPicture,
    picture,
    createdAt,
    emailId,
    _id: postid,
  } = post;

  const [options, setOptions] = useState(false);
  const [bookMarks, setBookMarks] = useState(null);
  // deleteHandler
  const deleteHandler = async () => {
    try {
      const deleteResponse = await deleteTweet(postid);
      setIsTweeted((prevState) => !prevState);
      toast.success(NOTIFICATIONS.TWEET_DELETED);
    } catch (e) {
      throw e;
    }
  };

  // editHandler
  const editHandler = async () => {
    try {
      const editResponse = await editTweet(postid);
      setIsTweeted((prevState) => !prevState);
      toast.success(NOTIFICATIONS.TWEET_UPDATED);
    } catch (e) {
      throw e;
    }
  };

  // // book mark effects
  // useEffect(() => {
  //   (async () => {
  //     const bookMarksResponse = await getAllBookMarks();

  //     setBookMarks(bookMarksResponse.data.bookmarks);
  //   })();
  // }, [bookMarks]);

  // // check if tweet is bookmarked or not by iterating
  // let isTweetBookMarked = false;
  // if (bookMarks !== null && bookMarks.length !== 0) {
  //   for (let i = 0; i < bookMarks.length; i++) {
  //     if (bookMarks[i]._id === postid) {
  //       isTweetBookMarked = true;
  //       break;
  //     }
  //   }
  // }
  return (
    <div className="tweet-section">
      <img src={displayPicture} className="avatar avatar-xs" />
      <div className="tweet-content">
        <h4>{displayname}</h4>
        <h5>{caption}</h5>
        <p>{content}</p>
        {picture && (
          <div>
            <img src={picture} className="tweet-pic" />
          </div>
        )}
        <div className="analytics-section">
          <AnalyticsIcon
            className="icon"
            likes={likes}
            postid={postid}
            setIsTweeted={setIsTweeted}
          />
        </div>
      </div>
      {/* emailId === ADMIN.EMAIL */}
      {false && (
        <div className="options-div">
          <div
            onMouseEnter={() => setOptions(true)}
            onMouseLeave={() => {
              setOptions(false);
            }}
          >
            <FiMoreVertical className="options-icon" />
            {options && (
              <div className="options-detials">
                <p onClick={editHandler}>Edit</p>
                <p onClick={deleteHandler}>Delete</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
