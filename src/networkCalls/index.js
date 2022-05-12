// import
import axios from "axios";
import { ADMIN } from "../config/constants";
const getAllUsers = async () => {
  try {
    const userList = await axios.get("/api/users");
    return userList.data.users;
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
        // console.log(userResponse.userPhoto);
        payload.displayPicture = userResponse[i].userPhoto;
        payload.displayname = userResponse[i].displayname;
      }
    }
    console.log("hey this is payload", payload);

    const createTweetResposne = await axios.post("/api/posts/", payload, {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmNDljMjhjMS0yM2E5LTQ5YzItYTI1Zi0yOWUwODU1MThiOTgifQ.ZlUzxFJPiklMTwWQ8pBrLUkSghbN2SUeBLdxfnGLLqY",
      },
    });
    console.log(createTweetResposne, "asdfgh");
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmNDljMjhjMS0yM2E5LTQ5YzItYTI1Zi0yOWUwODU1MThiOTgifQ.ZlUzxFJPiklMTwWQ8pBrLUkSghbN2SUeBLdxfnGLLqY",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmNDljMjhjMS0yM2E5LTQ5YzItYTI1Zi0yOWUwODU1MThiOTgifQ.ZlUzxFJPiklMTwWQ8pBrLUkSghbN2SUeBLdxfnGLLqY",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmNDljMjhjMS0yM2E5LTQ5YzItYTI1Zi0yOWUwODU1MThiOTgifQ.ZlUzxFJPiklMTwWQ8pBrLUkSghbN2SUeBLdxfnGLLqY",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmNDljMjhjMS0yM2E5LTQ5YzItYTI1Zi0yOWUwODU1MThiOTgifQ.ZlUzxFJPiklMTwWQ8pBrLUkSghbN2SUeBLdxfnGLLqY",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmNDljMjhjMS0yM2E5LTQ5YzItYTI1Zi0yOWUwODU1MThiOTgifQ.ZlUzxFJPiklMTwWQ8pBrLUkSghbN2SUeBLdxfnGLLqY",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmNDljMjhjMS0yM2E5LTQ5YzItYTI1Zi0yOWUwODU1MThiOTgifQ.ZlUzxFJPiklMTwWQ8pBrLUkSghbN2SUeBLdxfnGLLqY",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmNDljMjhjMS0yM2E5LTQ5YzItYTI1Zi0yOWUwODU1MThiOTgifQ.ZlUzxFJPiklMTwWQ8pBrLUkSghbN2SUeBLdxfnGLLqY",
      },
    });
    return bookMarks;
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
};
