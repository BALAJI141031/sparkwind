// import
import axios from "axios";
import { ADMIN } from "../config/constants";
import jwt_decode from "jwt-decode";
const decodedToken = jwt_decode(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
  process.env.REACT_APP_JWT_SECRET
);

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
    const user = await axios.get(`/api/users/${userId}`);
    console.log(user);
    return user.data.user;
  } catch (e) {
    throw e;
  }
};

const editUser = async (userData) => {
  try {
    const editUserResponse = await axios.post("/api/users/edit", userData, {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
      },
    });
    // console.log(userData);
    return editUserResponse;
  } catch (e) {
    throw e;
  }
};

const createTweet = async (payload) => {
  console.log({ post: payload }, "what is this");
  try {
    const userResponse = await getAllUsers();
    for (let i = 0; i < userResponse.length; i++) {
      // i have to decode jwt and need use email id here
      if (userResponse[i].email === ADMIN.EMAIL) {
        payload.userId = userResponse[i]._id;
        payload.displayPicture = userResponse[i].userPhoto;
        payload.displayname = userResponse[i].displayname;
      }
    }

    const createTweetResposne = await axios.post("/api/posts/", payload, {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
      },
    });
    return createTweetResposne;
  } catch (e) {
    console.log(e, "whats the error");
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
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
      },
    });
    return createTweetResposne;
  } catch (e) {
    throw e;
  }
};

const editTweet = async (payload, postid) => {
  console.log({ postData: payload }, "what is this");
  try {
    const createTweetResposne = await axios.post(
      `/api/posts/edit/${postid}`,
      { postData: payload },
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
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
    console.log("coming until here while serilizing, book", postid);
    const likeTweetResposne = await axios.post(
      `/api/posts/like/${postid}`,
      {},
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
        },
      }
    );
    console.log("response");
    return likeTweetResposne;
  } catch (e) {
    console.log("network");
    throw e;
  }
};

const unlikeTweet = async (postid) => {
  try {
    console.log(postid);
    const likeTweetResposne = await axios.post(
      `/api/posts/dislike/${postid}`,
      {},
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
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
    console.log("coming until here while serilizing, book");
    const bookMarkTweetResposne = await axios.post(
      `/api/users/bookmark/${postid}`,
      {},
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
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
    console.log("coming until here while serilizing, book");
    const removeBokkMarkResponse = await axios.post(
      `/api/users/remove-bookmark/${postid}`,
      {},
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
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
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
      },
    });
    return bookMarks;
  } catch (e) {
    throw e;
  }
};

const followUser = async (userId) => {
  console.log(userId);
  try {
    const followResponse = await axios.post(
      `/api/users/follow/${userId}`,
      {},
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
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
    console.log(userId);
    const unfollowResponse = await axios.post(
      `/api/users/unfollow/${userId}`,
      {},
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
        },
      }
    );
    return unfollowResponse;
  } catch (e) {
    throw e;
  }
};

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
};
