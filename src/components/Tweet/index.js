import { AnalyticsIcon } from "../index";
import { FiMoreVertical } from "icons";
import { useState, useEffect } from "react";
import "./index.css";
import { ADMIN, NOTIFICATIONS } from "config/constants";
import { deleteTweet, editTweet, getAllBookMarks,addComment } from "networkCalls/";
import { useHome, useNotifyUser, useAuthProvider } from "contexts";
import { useNavigate } from "react-router-dom";
import { jwtProfile } from "config/jwt";
export default function Tweet({
  post,
  setBookmarksUi,
  setComments
}) {
  const { isLoggedIn } = useAuthProvider();
  const myProfileDetials = isLoggedIn ? jwtProfile() : null;
  const { toast } = useNotifyUser();
  const navigate = useNavigate();
  const { home, setHome } = useHome();
  const { fromEdit, isTweeted } = home;
  const [comment, setComment] = useState("")

  const {
    displayname,
    content,
    caption,
    displayPicture,
    picture,
    emailId,
    _id: postid,
    userId,
    comments
  } = post;

 
  const [options, setOptions] = useState(false);
  const [previouslyBookmarked, setPreviouslyBookmarked] = useState(false);
  const [commentsCount,setCommentsCount]=useState(comments.length)

  // deleteHandler
  const deleteHandler = async () => {
    try {
      const deleteResponse = await deleteTweet(postid);
      setHome({ type: "userTweeted", payload: !isTweeted });
      toast.success(NOTIFICATIONS.TWEET_DELETED);
    } catch (e) {
      throw e;
    }
  };

  // editHandler
  const editHandler = async () => {
    try {
      setHome({ type: "createTweet", payload: true });
      setHome({
        type: "editTweet",
        payload: { editStatus: true, tweetId: postid },
      });
    } catch (e) {
      throw e;
    }
  };

  // // book mark effects
  useEffect(() => {
    (async () => {
      const bookMarksResponse = await getAllBookMarks();
      let previouslyBookmarked=bookMarksResponse.data.bookmarks.includes(postid)
      setPreviouslyBookmarked(previouslyBookmarked);
    })();
  }, []);

  // comment handler
  const  commentHandler = async (id,payload) => {
    try {
      const commentResponse = await addComment(id, { commentData: { comment, commentedBy: jwtProfile()._id } })
      setComment("")
      setCommentsCount((prevCount)=>prevCount+1)
      toast.success("Comment added")
    } catch (e) {
      toast.error("Unexpected error. Please try again in some time.")
    }

    
  }


  // navigate handler
  const navigateToProfile = () => navigate(`/profile/${userId}`);
  return (
    <>
      <div className="tweet-section cursor-pointer">
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
            <img src={picture} className="tweet-pic" />
        )}
        <div className="analytics-section">
            <AnalyticsIcon className="icon" post={post} previouslyBookmarked={previouslyBookmarked} setBookmarksUi={setBookmarksUi} commentsCount={commentsCount}/>
        </div>
        <div className="grid">
          <input className="row-start-1 col-start-1 border-none text-sm" placeholder="Add Comment" onChange={(e)=>setComment(e.target.value)} value={comment}/>
          <button className={(comment === "" || comment === null) ? "row-start-1 col-start-1 text-sm w-max justify-self-end self-center mr-1 mb-2 border-none bg-transparent cursor-pointer text-blue-600/50" : "row-start-1 col-start-1 text-sm w-max justify-self-end self-center mr-1 mb-2 border-none bg-transparent cursor-pointer text-blue-600/100"} onClick={(e) => {
              commentHandler(postid, comment)
              if(setComments) setComments((prevComments)=>!prevComments)
            e.stopPropagation()
          }
          } >Post</button>
        </div>
      </div>
      {(isLoggedIn && myProfileDetials.email === emailId) && (
        <div className="options-div cursor-pointer">
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
    </>
    
  );
}
