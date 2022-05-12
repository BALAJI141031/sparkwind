// import
import axios from "axios";

const createTweet = async (payload) => {
  console.log({ post: payload }, "what is this");
  try {
    const createTweetResposne = await axios.post(
      "/api/posts",
      { post: payload },
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZGM3NGRhMC03NDA1LTQ4ZjMtOWEwYy1lY2Q4ZjgzOTlhYzQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.O5xhr4upZ9a9JuH_DZ9Xp3rCx6lypVssXTeSCRVQoog",
        },
      }
    );
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
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZGM3NGRhMC03NDA1LTQ4ZjMtOWEwYy1lY2Q4ZjgzOTlhYzQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.O5xhr4upZ9a9JuH_DZ9Xp3rCx6lypVssXTeSCRVQoog",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZGM3NGRhMC03NDA1LTQ4ZjMtOWEwYy1lY2Q4ZjgzOTlhYzQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.O5xhr4upZ9a9JuH_DZ9Xp3rCx6lypVssXTeSCRVQoog",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZGM3NGRhMC03NDA1LTQ4ZjMtOWEwYy1lY2Q4ZjgzOTlhYzQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.O5xhr4upZ9a9JuH_DZ9Xp3rCx6lypVssXTeSCRVQoog",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZGM3NGRhMC03NDA1LTQ4ZjMtOWEwYy1lY2Q4ZjgzOTlhYzQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.O5xhr4upZ9a9JuH_DZ9Xp3rCx6lypVssXTeSCRVQoog",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZGM3NGRhMC03NDA1LTQ4ZjMtOWEwYy1lY2Q4ZjgzOTlhYzQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.O5xhr4upZ9a9JuH_DZ9Xp3rCx6lypVssXTeSCRVQoog",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZGM3NGRhMC03NDA1LTQ4ZjMtOWEwYy1lY2Q4ZjgzOTlhYzQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.O5xhr4upZ9a9JuH_DZ9Xp3rCx6lypVssXTeSCRVQoog",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZGM3NGRhMC03NDA1LTQ4ZjMtOWEwYy1lY2Q4ZjgzOTlhYzQiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.O5xhr4upZ9a9JuH_DZ9Xp3rCx6lypVssXTeSCRVQoog",
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
};
