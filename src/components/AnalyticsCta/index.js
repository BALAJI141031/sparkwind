import { BsHeart, GoComment, BsBookmarkCheck} from "icons";

import {
  likeTweet,
  unlikeTweet,
  bookMarkTweet,
  removeBookMarkTweet,
} from "networkCalls";
import "./index.css";
import {useNotifyUser } from "contexts";
import { useNavigate } from "react-router-dom";
export default function AnalyticsIcon({ post, previouslyBookmarked, isLiked, commentsCount,alreadyLiked,setIsLiked,alreadyBookMarked,setAlreadyBookMarked,isBookMarked,setBookMark,setBookmarksUi}) {
  const { toast } = useNotifyUser();
  const navigate=useNavigate()
  const { _id: postid} = post;
    
  const toggleLikeHandler = async () => {    
    try {
      let toggleLikeResponse
      if (!isLiked.status && !alreadyLiked) {
        toggleLikeResponse = await likeTweet(postid)
        let togleLikePost = toggleLikeResponse.data.posts.filter((post) => post._id === postid)
        setIsLiked((prevStatus)=> ({...prevStatus,status:true,count:togleLikePost[0].likes.likeCount}))
      } else {
        toggleLikeResponse = await unlikeTweet(postid)
        let togleLikePost = toggleLikeResponse.data.posts.filter((post) => post._id === postid)
        setIsLiked((prevStatus) => ({ ...prevStatus, status: false, count: togleLikePost[0].likes.likeCount }))
      }
    } catch (e) {
      toast.error("Unexpected error. Please try again in some time.");
    }
  };

  // bookmark handler
  const toggleBookMark = async () => {
    try {
        if (!isBookMarked && !alreadyBookMarked) {
        const response = await bookMarkTweet(postid)
        setBookMark(true);
      } else {
        const response = await removeBookMarkTweet(postid)
          setBookMark(false);
          setAlreadyBookMarked(false)

          if (setBookmarksUi) {
            setBookmarksUi((prevStatus) => !prevStatus)
          }
      }
      
      // this is to set book mark route
      
    } catch (e) {
      toast.error("Unexpected error. Please try again in some time.");
    }
  };


  const handleComments = (postid) => {
   navigate(`/user/tweet/comments/${postid}`)
  }
  return (
    <div className="analytics-div">
      <div className="flex-H-center-V">
        <BsHeart
          onClick={toggleLikeHandler}
          className={isLiked.status  || alreadyLiked ? "style-analytics-icon cursor-pointer ":"cursor-pointer hover:bg-primary"}
        />
        <p>{isLiked.count}</p>
      </div>
      <div className="flex-H-center-V cursor-pointer">
        <GoComment  onClick={()=>handleComments(postid)}/>
        <p>{commentsCount}</p>
      </div>
      <div>
        <BsBookmarkCheck
          onClick={toggleBookMark}
          className={isBookMarked || alreadyBookMarked  ? "style-analytics-icon cursor-pointer":"cursor-pointer"}
        />
      </div>
    </div>
  );
}
