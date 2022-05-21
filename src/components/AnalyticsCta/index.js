import { BsHeart, GoComment, BsBookmarkCheck, AiFillHeart } from "icons";
import {
  likeTweet,
  unlikeTweet,
  bookMarkTweet,
  removeBookMarkTweet,
  editTweet,
} from "networkCalls";
import { useEffect, useState } from "react";
import "./index.css";
import { ADMIN } from "../../config/constants";
export default function AnalyticsIcon({ icon, post }) {
  const { _id: postid, likes, bookMarked } = post;
  const [localBookMark, setBookMark] = useState(false);
  console.log(bookMarked, "i want to know status", localBookMark);
  const [liked, toggleLike] = useState(false);

  // like handler working alone but in seires with bookmarks giving serilization error
  const toggleLikeHandler = async () => {
    toggleLike((likeStatus) => !likeStatus);
    // try {
    //   const toggleLikeResponse = !liked
    //     ? await likeTweet(postid)
    //     : await unlikeTweet(postid);
    //   // setIsTweeted((prev) => !prev);
    // } catch (e) {
    //   throw e;
    // }
  };

  // bookmark handler
  const toggleBookMark = async () => {
    try {
      const bookMarkResponse = !localBookMark
        ? await bookMarkTweet(postid)
        : await removeBookMarkTweet(postid);
      setBookMark((prevBookMarkStatus) => !prevBookMarkStatus);
      // setIsTweeted((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="analytics-div">
      <div className="flex-H-center-V">
        <BsHeart
          onClick={toggleLikeHandler}
          className={liked && "style-analytics-icon"}
        />
        <p>{likes.likeCount}</p>
      </div>
      <div className="flex-H-center-V">
        <GoComment />
        <p>0</p>
      </div>
      <div>
        <BsBookmarkCheck
          onClick={toggleBookMark}
          className={(localBookMark || bookMarked) && "style-analytics-icon"}
        />
      </div>
    </div>
  );
}
