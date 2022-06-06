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
export default function AnalyticsIcon({post}) {
  const {setHome}=useHome()
  const { _id: postid, likes, bookMarked } = post;
  const { likedBy } = likes
  // const [localBookMark, setBookMark] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  // console.log(post, "i want to know status",);
  //  console.log(post)

  let isLikedFlag
  if (likedBy.length > 0) {
    for (let i = 0; i < likedBy.length; i++){
      if(likedBy[i]._id===jwtProfile()._id) isLikedFlag=true
    }
    
  }

  
  const toggleLikeHandler = async () => {
    try {
      const toggleLikeResponse = !isLiked
        ? await likeTweet(postid)
        : await unlikeTweet(postid);
      
      // console.log(toggleLikeResponse.data.posts,"suffling order")
      // const postResponse = await getTweet(postid)
      // setHome({
      //     type: "updatePosts",
      //   payload: toggleLikeResponse.data.posts,
      //     from:"after liking post"
      //   });
      
      setIsLiked((prevStatus)=>!prevStatus)
    } catch (e) {
      console.log(e)
      throw e;
    }
  };

  // bookmark handler
  // const toggleBookMark = async () => {
  //   try {
  //     const bookMarkResponse = !localBookMark
  //       ? await bookMarkTweet(postid)
  //       : await removeBookMarkTweet(postid);
  //     setBookMark((prevBookMarkStatus) => !prevBookMarkStatus);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };


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

  // firebase comments
//   useEffect(() => {
//     // console.log("atleast you!!!");
//     db.collection(`comments`).get().then((snap) => {
//         snap.forEach(element => {
//                 let data = element.data();
//                 // setInfo(arr => [...arr , data]);
//           console.log(data,"from firebase")
             
//             })
//       }).catch((e)=>console.log(e))
// }, [])
 
  
  // console.log("yes it is rendering")
  return (
    <div className="analytics-div">
      <div className="flex-H-center-V">
        <BsHeart
          onClick={toggleLikeHandler}
          className={isLiked || isLikedFlag ? "style-analytics-icon cursor-pointer ":"cursor-pointer"}
        />
        {/* <p>{isLiked.count}</p> */}
      </div>
      <div className="flex-H-center-V cursor-pointer">
        <GoComment  />
        <p>0</p>
      </div>
      {/* <div>
        <BsBookmarkCheck
          onClick={toggleBookMark}
          className={(bookMarked) ? "style-analytics-icon ":"cursor-pointer"}
        />
      </div> */}
    </div>
  );
}
