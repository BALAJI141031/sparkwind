import { BsHeart, GoComment, BsBookmarkCheck, AiFillHeart } from "icons";

import {
  likeTweet,
  unlikeTweet,
  bookMarkTweet,
  removeBookMarkTweet,
  getTweet,
  postComment
} from "networkCalls";
import { useEffect, useState } from "react";
import "./index.css";
import { useHome } from "contexts";
import { jwtProfile } from "config/jwt";
export default function AnalyticsIcon({post,previouslyBookmarked,setBookmarksUi}) {
  const {setHome}=useHome()
  const { _id: postid, likes, bookMarked } = post;
  const { likedBy } = likes
  const [isBookMarked, setBookMark] = useState(false);
  const [isLiked, setIsLiked] = useState({status:false,count:likes.likeCount});

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
      console.log(e)
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
        console.log("yes setting ui")
        await removeBookMarkTweet(postid)
        setBookmarksUi((prevStatus)=>!prevStatus)
      }
    } catch (e) {
      console.log(e);
    }
  };


  // add comment
  // const addComment = async () => {
  //   try {
  //     // const response = await postComment(postid)
  //     // console.log(response)
  //     db.child('comments').push({ content: "hello world", fullname: "balaji narayana", }, err => {
  //       if (err) {
  //         console.log(err)
  //       }
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  
  // console.log("yes it is rendering")
  return (
    <div className="analytics-div">
      <div className="flex-H-center-V">
        <BsHeart
          onClick={toggleLikeHandler}
          className={isLiked.status || isLikedFlag ? "style-analytics-icon cursor-pointer ":"cursor-pointer"}
        />
        <p>{isLiked.count}</p>
      </div>
      <div className="flex-H-center-V cursor-pointer">
        <GoComment  />
        <p>0</p>
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
