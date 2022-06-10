import { BsHeart, GoComment, BsBookmarkCheck, AiFillHeart } from "icons";

import {
  likeTweet,
  unlikeTweet,
  bookMarkTweet,
  removeBookMarkTweet
} from "networkCalls";
import { useEffect, useState } from "react";
import "./index.css";
import { useHome,useNotifyUser } from "contexts";
import { jwtProfile } from "config/jwt";
import { useNavigate } from "react-router-dom";
export default function AnalyticsIcon({ post, previouslyBookmarked, setBookmarksUi, commentsCount }) {
  const { toast } = useNotifyUser();
  const navigate=useNavigate()
  const {setHome}=useHome()
  const { _id: postid, likes, bookMarked,comments } = post;
  const { likedBy } = likes
  const [isBookMarked, setBookMark] = useState(false);
  const [isLiked, setIsLiked] = useState({ status: false, count: likes.likeCount });

  let isLikedFlag
  if (likedBy.length > 0) {
    for (let i = 0; i < likedBy.length; i++){
      if(likedBy[i]._id===jwtProfile()._id) isLikedFlag=true
    }
    
  }

  
  const toggleLikeHandler = async () => {
    try {
      const toggleLikeResponse = !isLiked.status
        ? await likeTweet(postid)
        : await unlikeTweet(postid);
      setIsLiked((prevStatus)=> ({...prevStatus,status:!prevStatus.status,count:`${!isLiked.status ? isLiked.count+1 :isLiked.count-1}`}))
    } catch (e) {
      throw e;
    }
  };

  // bookmark handler
  const toggleBookMark = async () => {
    try {
      const bookMarkResponse = !isBookMarked  
        ? await bookMarkTweet(postid)
        : await removeBookMarkTweet(postid);
      
      setBookMark((prevBookMarkStatus) => !prevBookMarkStatus);

      // this is to set book mark route
      if (previouslyBookmarked) {
        await removeBookMarkTweet(postid)
        setBookmarksUi((prevStatus)=>!prevStatus)
      }
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
          className={isLiked.status || isLikedFlag ? "style-analytics-icon cursor-pointer ":"cursor-pointer hover:bg-primary"}
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
          className={isBookMarked || previouslyBookmarked ? "style-analytics-icon cursor-pointer":"cursor-pointer"}
        />
      </div>
    </div>
  );
}
