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
import { ADMIN } from "../../config/constants";
export default function AnalyticsIcon({ icon, post }) {
  const { _id: postid, likes, bookMarked } = post;
  const [localBookMark, setBookMark] = useState(false);
  console.log(post, "i want to know status",);
  const [aboutLikes, toggleLike] = useState({status:false,count:likes.likeCount});

  // like handler working alone but in seires with bookmarks giving serilization error
  const toggleLikeHandler = async () => {
    try {
      const toggleLikeResponse = !aboutLikes.status
      ? await likeTweet(postid)
        : await unlikeTweet(postid);
      console.log(toggleLikeResponse);

      const postResponse = await getTweet(postid)
      let newStatus
      aboutLikes.status ? newStatus=false:newStatus=true
      toggleLike((prevLikes) => ({status:newStatus,count:postResponse.likes.likeCount,}));
    } catch (e) {
      throw e;
    }
  };

  // bookmark handler
  const toggleBookMark = async () => {
    console.log("triggering bookmark block")
    try {
      const bookMarkResponse = !localBookMark
        ? await bookMarkTweet(postid)
        : await removeBookMarkTweet(postid);
      setBookMark((prevBookMarkStatus) => !prevBookMarkStatus);
    } catch (e) {
      console.log(e);
    }
  };


  // add comment
  const addComment = async () => {
    try {
      const response = await postComment(postid)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="analytics-div">
      <div className="flex-H-center-V">
        <BsHeart
          onClick={toggleLikeHandler}
          className={aboutLikes.status ? "style-analytics-icon cursor-pointer ":"cursor-pointer "}
        />
        <p>{aboutLikes.count}</p>
      </div>
      <div className="flex-H-center-V">
        <GoComment onClick={addComment}/>
        <p>0</p>
      </div>
      <div>
        <BsBookmarkCheck
          onClick={toggleBookMark}
          className={(localBookMark || bookMarked) ? "style-analytics-icon ":"cursor-pointer"}
        />
      </div>
    </div>
  );
}
