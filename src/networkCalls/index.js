// import
import axios from "axios";
import { ADMIN } from "config/constants";
import { jwtProfile, getJwtToken } from "config/jwt";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const getAllUsers = async () => {
  try {
    const userList = await axios.get("/api/users");
    return userList.data.users;
  } catch (e) {
    throw e;
  }
};

const getUser = async (userId) => {
  try {
    const allUsers = await getAllUsers();
    const user = await axios.get(`/api/users/${userId}`);
    return user.data.user;
  } catch (e) {
    throw e;
  }
};

const editUser = async (userData) => {
  try {
    const editUserResponse = await axios.post("/api/users/edit", userData, {
      headers: {
        authorization: getJwtToken(),
      },
    });
    return editUserResponse;
  } catch (e) {
    throw e;
  }
};

const createTweet = async (payload) => {
  try {
    const userResponse = await getAllUsers();
    for (let i = 0; i < userResponse.length; i++) {
      // i have to decode jwt and need use email id here
      if (userResponse[i].email === ADMIN.EMAIL) {
        // payload.userId = userResponse[i]._id;
        payload.displayPicture = userResponse[i].userPhoto;
        payload.displayname = userResponse[i].displayname;
      }
    }
    // payload.userId = myProfileDetials._id;
    payload.emailId = jwt_decode(
      Cookies.get("jwt_token"),
      process.env.REACT_APP_JWT_SECRET
    ).email;


    const createTweetResposne = await axios.post("/api/posts/", payload, {
      headers: {
        authorization: getJwtToken(),
      },
    });
    return createTweetResposne;
  } catch (e) {
    throw e;
  }
};

const getAllPosts = async () => {
  try {
    const createTweetResposne = await axios.get("/api/posts");
    return createTweetResposne;
  } catch (e) {
    throw e;
  }
};

const deleteTweet = async (postid) => {
  try {
    const createTweetResposne = await axios.delete(`/api/posts/${postid}`, {
      headers: {
        authorization: getJwtToken(),
      },
    });
    return createTweetResposne;
  } catch (e) {
    throw e;
  }
};

const editTweet = async (payload, postid) => {
  try {
    const createTweetResposne = await axios.post(
      `/api/posts/edit/${postid}`,
      { postData: payload },
      {
        headers: {
          authorization: getJwtToken(),
        },
      }
    );
    return createTweetResposne;
  } catch (e) {
    throw e;
  }
};

const likeTweet = async (postid) => {
  try {
    const likeTweetResposne = await axios.post(
      `/api/posts/like/${postid}`,
      {},
      {
        headers: {
          authorization: getJwtToken(),
        },
      }
    );
    return likeTweetResposne;
  } catch (e) {
    throw e;
  }
};

const unlikeTweet = async (postid) => {
  try {
    const likeTweetResposne = await axios.post(
      `/api/posts/dislike/${postid}`,
      {},
      {
        headers: {
          authorization: getJwtToken(),
        },
      }
    );
    return likeTweetResposne;
  } catch (e) {
    throw e;
  }
};

const bookMarkTweet = async (postid) => {
  try {
    const bookMarkTweetResposne = await axios.post(
      `/api/users/bookmark/${postid}`,
      {},
      {
        headers: {
          authorization: getJwtToken(),
        },
      }
    );
    return bookMarkTweetResposne;
  } catch (e) {
    throw e;
  }
};

const removeBookMarkTweet = async (postid) => {
  try {
    const removeBokkMarkResponse = await axios.post(
      `/api/users/remove-bookmark/${postid}`,
      {},
      {
        headers: {
          authorization: getJwtToken(),
        },
      }
    );
    return removeBokkMarkResponse;
  } catch (e) {
    throw e;
  }
};

const getAllBookMarks = async () => {
  try {
    const bookMarks = await axios.get("/api/users/bookmark", {
      headers: {
        authorization: getJwtToken(),
      },
    });
    return bookMarks;
  } catch (e) {
    throw e;
  }
};

const followUser = async (userId) => {
  try {
    const followResponse = await axios.post(
      `/api/users/follow/${userId}`,
      {},
      {
        headers: {
          authorization: getJwtToken(),
        },
      }
    );
    return followResponse;
  } catch (e) {
    throw e;
  }
};

const unfollowUser = async (userId) => {
  try {
    const unfollowResponse = await axios.post(
      `/api/users/unfollow/${userId}`,
      {},
      {
        headers: {
          authorization: getJwtToken(),
        },
      }
    );
    return unfollowResponse;
  } catch (e) {
    throw e;
  }
};

const getTweet = async (tweetId) => {
  try {
    const tweetResponse = await axios.get(`/api/posts/${tweetId}`);
    return tweetResponse.data.post;
  } catch (e) {
    throw e;
  }
};
const loginUser = async (credentials) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);

    if (response.status === 200) {
      Cookies.set("jwt_token", response.data.encodedToken, {
        expires: 1,
      });
      return response.status;
    }
  } catch (e) {
    throw e;
  }
};

const signupUser = async (userData) => {
  try {
    const response = await axios.post("/api/auth/signup", userData);
    if (response.status === 201) {
      Cookies.set("jwt_token", response.data.encodedToken, {
        expires: 1,
      });
      return response.status;
    }
  } catch (e) {
    throw e;
  }
};

const getUserTweets = async (userid) => {
  try {
    const userTweets = await axios.get(`/api/posts/user/${userid}`);
    return userTweets.data.posts;
  } catch (e) {
    throw e
  }
};



const addComment = async (podtid, payload) => {
  try {
    const response = await axios.post(`/api/comments/add/${podtid}`, payload, { headers: { authorization: getJwtToken() } })
    
    return response
    
  } catch (e) {
    throw e
  }
}

const getComments = async (postid) => {
  try {
    const response = await axios.get(`/api/comments/${postid}`)
    return response.data.comments
  } catch (e) {
   throw e
  }
}

export {
  createTweet,
  getAllPosts,
  deleteTweet,
  editTweet,
  likeTweet,
  unlikeTweet,
  bookMarkTweet,
  removeBookMarkTweet,
  getAllBookMarks,
  getAllUsers,
  getUser,
  followUser,
  unfollowUser,
  editUser,
  getTweet,
  loginUser,
  signupUser,
  getUserTweets,
  addComment,
  getComments
};
