import { createContext, useContext, useReducer } from "react";
import { REDUCER_CONSTANTS } from "../config/constants";
import { useEffect } from "react";
import { getAllPosts } from "networkCalls";
import { useNotifyUser } from "./toast";
const homeContext = createContext();

function HomeProvider({ children }) {
  const { toast } = useNotifyUser();
  const homeHandler = (prevState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "createTweet":
        return { ...prevState, createTweet: payload };
      case "updatePosts":
        return { ...prevState, posts: payload };
      case "userTweeted":
        return { ...prevState, isTweeted: payload };
      case "editTweet":
        return { ...prevState, fromEdit: payload };
      case "trending":
        return { ...prevState, trending: payload };
      case "sort":
        return { ...prevState, sort: payload };
    }
  };
  const [home, setHome] = useReducer(homeHandler, {
    createTweet: false,
    posts: null,
    isTweeted: false,
    fromEdit: { editStatus: false, tweetId: null },
    trending: false,
    sort: false,
  });
  let { isTweeted, trending, posts, sort } = home;
  console.log();
  useEffect(() => {
    (async () => {
      try {
        const postsResponse = await getAllPosts();
        //   setHome({
        //     type: "updatePosts",
        //     payload: ,
        //   });
        // tweetsFeed = postsResponse.data.posts.reverse();
        setHome({
          type: "updatePosts",
          payload: postsResponse.data.posts.reverse(),
        });
      } catch (e) {
        toast.warning("Unexpected Error Try Again!");
      }
    })();
  }, [isTweeted]);

  if (trending && posts.length !== 0) {
    posts = posts.filter((post) => post.likes.likeCount > 0);

    posts.sort(
      (postOne, postTwo) => postOne.likes.likeCount - postTwo.likes.likeCount
    );
    console.log("inside if block", posts);
  }

  if (sort) {
    console.log(
      new Date(posts[0].updatedAt).getTime() ==
        new Date(posts[1].updatedAt).getTime()
    );
    // console.log(new Date(posts[1].updatedAt));
    posts.sort(
      (postOne, postTwo) =>
        new Date(postOne.updatedAt).getTime() -
        new Date(postTwo.updatedAt).getTime()
    );
  } else if (posts !== null && !sort) {
    posts.sort(
      (postOne, postTwo) =>
        new Date(postTwo.updatedAt).getTime() -
        new Date(postOne.updatedAt).getTime()
    );
  }
  return (
    <homeContext.Provider value={{ home, setHome, posts }}>
      {children}
    </homeContext.Provider>
  );
}

const useHome = () => useContext(homeContext);

export { HomeProvider, useHome };
