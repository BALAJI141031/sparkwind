import { AnalyticsIcon } from "../index";
import { FiMoreVertical } from "icons";
import { useState, useEffect } from "react";
import "./index.css";
import { ADMIN, NOTIFICATIONS } from "config/constants";
import { deleteTweet, editTweet, getAllBookMarks } from "networkCalls/";
import { useHome, useNotifyUser, useAuthProvider } from "contexts";
import { useNavigate } from "react-router-dom";
import { jwtProfile } from "config/jwt";
export default function Tweet({
  post,
  // setIsTweeted,
  // setCreateTweet,
  // setFromEdit,
}) {
  const { isLoggedIn } = useAuthProvider();
  const myProfileDetials = isLoggedIn ? jwtProfile() : null;
  console.log(myProfileDetials, "buggggggg");
  const { toast } = useNotifyUser();
  const navigate = useNavigate();
  const { setHome } = useHome();
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
    userId,
  } = post;

  const [options, setOptions] = useState(false);
  const [bookMarks, setBookMarks] = useState(null);
  // deleteHandler
  const deleteHandler = async () => {
    try {
      const deleteResponse = await deleteTweet(postid);
      // setIsTweeted((prevState) => !prevState);
      setHome({ type: "userTweeted", payload: true });
      toast.success(NOTIFICATIONS.TWEET_DELETED);
    } catch (e) {
      throw e;
    }
  };

  // editHandler
  const editHandler = async () => {
    try {
      setHome({ type: "createTweet", payload: true });
      // setFromEdit((prev) => ({ ...prev, editStatus: true, tweetId: postid }));
      setHome({
        type: "editTweet",
        payload: { editStatus: true, tweetId: postid },
      });
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

  // navigate handler
  const navigateToProfile = () => navigate(`/profile/${userId}`);
  return (
    <div className="tweet-section">
      <img
        src={displayPicture}
        className="avatar avatar-xs"
        onClick={navigateToProfile}
      />
      <div className="tweet-content">
        <h4 onClick={navigateToProfile}>{displayname}</h4>
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
            // setIsTweeted={setIsTweeted}
          />
        </div>
      </div>
      {isLoggedIn && myProfileDetials._id === userId && (
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
