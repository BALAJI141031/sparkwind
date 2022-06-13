import { AnalyticsIcon } from "../index";
import { FiMoreVertical } from "icons";
import { useState, useEffect } from "react";
import "./index.css";
import { ADMIN, NOTIFICATIONS } from "config/constants";
import { deleteTweet, editTweet, getAllBookMarks,addComment,getTweet } from "networkCalls/";
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
  
  const [isBookMarked, setBookMark] = useState(false);
  const [alreadyBookMarked,setAlreadyBookMarked]=useState(false)
 useEffect(() => {
   (async () => {
     const bookMarksResponse = await getAllBookMarks();
      let previouslyBookmarked= await bookMarksResponse.data.bookmarks.includes(postid)
      setAlreadyBookMarked(previouslyBookmarked);
    })();
  }, [alreadyBookMarked]);




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



  // likess handler
    // get post to update likes while mounting
  const [isLiked, setIsLiked] = useState({ status: false, count:0});
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  
  useEffect(() => {
    (async () => {
      try {
        const postResponse = await getTweet(postid);
        setIsLiked((prevState) => ({ ...prevState, count: postResponse.likes.likeCount }), [])
        let alreadyLiked=false
        for (let i = 0; i < postResponse.likes.likedBy.length; i++){
          if (postResponse.likes.likedBy[i]._id === jwtProfile()._id) {
            alreadyLiked = true
            break
          }
        }
        setAlreadyLiked(alreadyLiked)

    } catch (e) {
      toast.error("unexpected error try after some time")
    }
    })()
     
  }, [isLiked])




  // navigate handler
  const navigateToProfile = () => navigate(`/profile/${userId}`);
  return (
    <>
      <div className="tweet-section cursor-pointer">
      <img
        src={displayPicture}
        className="avatar avatar-xs"
          onClick={navigateToProfile}
          alt="dp"
      />
      <div className="tweet-content">
        <h4 onClick={navigateToProfile}>{displayname}</h4>
        <h5>{caption}</h5>
        <p>{content}</p>
        {picture && (
            <img src={picture} className="tweet-pic" />
        )}
        <div className="analytics-section">
            <AnalyticsIcon className="icon" post={post} previouslyBookmarked={previouslyBookmarked} setBookmarksUi={setBookmarksUi} commentsCount={commentsCount} isLiked={isLiked} alreadyLiked={alreadyLiked} setAlreadyLiked={setAlreadyLiked} setIsLiked={setIsLiked} setBookMark={setBookMark} isBookMarked={isBookMarked} alreadyBookMarked={alreadyBookMarked} setAlreadyBookMarked={setAlreadyBookMarked}/>
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
