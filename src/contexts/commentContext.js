import { useContext, useState, createContext } from "react";
import Cookies from "js-cookie";
const commentContext = createContext();

function CommentProvider({ children }) {
  
    const [previousCommentsCount,setPreviousCommentCount]=useState(false)
  // // comment effect
 
  return (
    <commentContext.Provider value={{ previousCommentsCount,setPreviousCommentCount }}>
      {children}
    </commentContext.Provider>
  );
}

const useCommentProvider = () => useContext(commentContext);

export { CommentProvider, useCommentProvider };
