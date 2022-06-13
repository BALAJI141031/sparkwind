import { AnalyticsIcon } from "../index";
import { FiMoreVertical } from "icons";
import { useState, useEffect,useRef } from "react";
import "./index.css";
import { NOTIFICATIONS } from "config/constants";
import { deleteTweet, getAllBookMarks,addComment,getTweet,getComments } from "networkCalls/";
import { useHome, useNotifyUser, useAuthProvider,useCommentProvider } from "contexts";
import { useNavigate } from "react-router-dom";
import { jwtProfile } from "config/jwt";
export default function Tweet({
  post,
  setBookmarksUi,
  setComments,
  fromHome
}) {
  const { isLoggedIn } = useAuthProvider();
  const myProfileDetials = isLoggedIn ? jwtProfile() : null;
  const { toast } = useNotifyUser();
  const navigate = useNavigate();
  const { home, setHome } = useHome();
  const { fromEdit, isTweeted } = home;
  const [comment, setComment] = useState("")
  const { previousCommentsCount } = useCommentProvider()
  const [isCommentEmpty, setIsCommentEmpty] = useState(true)

  const {
    displayname,
    content,
    caption,
    displayPicture,
    picture,
    emailId,
    _id: postid,
    userId,
  } = post;

 
  const [options, setOptions] = useState(false);
  const [commentsCount,setCommentsCount]=useState(0)

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
      setIsCommentEmpty(true)
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
     
  }, [isLiked.status])


  useEffect(() => {
    (async () => {
      try {
        const post = await getTweet(postid)
        setCommentsCount(post?.comments.length)
        
      } catch (e){
      }
    })()    
  }, [previousCommentsCount])


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
            <AnalyticsIcon className="icon" post={post} setIsLiked={setIsLiked} isLiked={isLiked} alreadyLiked={alreadyLiked}
              setBookmarksUi={setBookmarksUi} setBookMark={setBookMark} isBookMarked={isBookMarked} alreadyBookMarked={alreadyBookMarked} setAlreadyBookMarked={setAlreadyBookMarked} commentsCount={commentsCount}/>
        </div>
        <div className="grid comment-grid">
            <input className="border-none text-sm" placeholder="Add Comment" onChange={(e) => {
              let comment=e.target.value
              if (comment !== "") setIsCommentEmpty(false)
              if(comment==="") setIsCommentEmpty(true)
              setComment(comment)
            }
            } value={comment} />
          <button className={(comment === "" || comment === null) ? "text-sm w-max mr-1 mb-2 border-none bg-transparent cursor-pointer text-blue-600/50" : " text-sm w-max  mr-1 mb-2 border-none bg-transparent cursor-pointer text-blue-600/100"} onClick={(e) => {
              commentHandler(postid, comment)
              if(setComments) setComments((prevComments)=>!prevComments)
            e.stopPropagation()
            }
            
          } disabled={ isCommentEmpty && true}>Post</button>
        </div>
      </div>
      {(isLoggedIn && myProfileDetials.email === emailId && fromHome ) && (
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
