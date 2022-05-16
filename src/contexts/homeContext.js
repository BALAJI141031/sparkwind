import { createContext, useContext, useReducer } from "react";
import { REDUCER_CONSTANTS } from "../config/constants";

const homeContext = createContext();

function HomeProvider({ children }) {
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
    }
  };
  const [home, setHome] = useReducer(homeHandler, {
    createTweet: false,
    posts: null,
    isTweeted: false,
    fromEdit: { editStatus: false, tweetId: null },
  });
  return (
    <homeContext.Provider value={{ home, setHome }}>
      {children}
    </homeContext.Provider>
  );
}

const useHome = () => useContext(homeContext);

export { HomeProvider, useHome };
