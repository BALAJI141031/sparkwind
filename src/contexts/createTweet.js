import { createContext, useContext, useEffect, useReducer } from "react";
import {useNotifyUser} from 'contexts'
import { REDUCER_CONSTANTS } from "../config/constants";


const tweetContext = createContext();

function CreateTweet({ children }) {
  const {toast} =useNotifyUser()
  const tweetHandler = (prevTweet, action) => {
    const { type, payload } = action;
    switch (type) {
      case REDUCER_CONSTANTS.CAPTION:
        return { ...prevTweet, caption: payload };
      case REDUCER_CONSTANTS.TWEETTEXT:
        return { ...prevTweet, content: payload };
      case REDUCER_CONSTANTS.EMOJI:
        return { ...prevTweet, emoji: payload };
      case REDUCER_CONSTANTS.PICTURE:
        return { ...prevTweet, picture: payload };
    }
  };

  const [tweet, setTweet] = useReducer(tweetHandler, {
    caption: null,
    content: "",
    picture: null,
    emoji: null,
    // displayPicture: null,
    // displayname: null,
  });
  return (
    <tweetContext.Provider value={{ tweet, setTweet }}>
      {children}
    </tweetContext.Provider>
  );
}

const useTweet = () => useContext(tweetContext);

export { CreateTweet, useTweet };
