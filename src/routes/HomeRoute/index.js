import "./index.css";
import { useTweet, useHome } from "contexts/";
import { useEffect, useState } from "react";
import {
  Tweet,
  BottomNavbar,
  SuggestedProfile,
  CreateTweet,
  Header,
  Suggestions,
} from "components";
import { getAllPosts } from "networkCalls";
import { BiTrendingUp, ImSortNumbericDesc } from "icons";
import { toast } from "react-toastify";
export default function HomeRoute() {
  const { tweet, setTweet } = useTweet();

  // const [createTweet, setCreateTweet] = useState(false);
  // const [posts, setPosts] = useState(null);
  // created to handle useeffect
  // const [isTweeted, setIsTweeted] = useState(false);
  // const [fromEdit, setFromEdit] = useState({
  // editStatus: false,
  // tweetId: null,
  // });

  const { home, setHome } = useHome();
  const { createTweet, posts, isTweeted, fromEdit } = home;

  useEffect(() => {
    (async () => {
      try {
        const postsResponse = await getAllPosts();
        setHome({
          type: "updatePosts",
          payload: postsResponse.data.posts.reverse(),
        });
        // setPosts(postsResponse.data.posts.reverse());
      } catch (e) {
        toast.warning("Unexpected Error Try Again!");
      }
    })();
  }, [isTweeted]);

  //trending posts
  const toggleTrendingPosts = () => {};

  return (
    <div className="home-section">
      <div className="filters-div">
        <BiTrendingUp className="filter-icon" onClick={toggleTrendingPosts} />
        <ImSortNumbericDesc className="filter-icon" />
      </div>

      <main className="main-div">
        <div>
          {posts &&
            posts.map((post) => (
              <div className="center-div">
                <Tweet
                  post={post}
                  // setIsTweeted={setIsTweeted}
                  // setCreateTweet={setCreateTweet}
                  // setFromEdit={setFromEdit}
                />
              </div>
            ))}
        </div>
        <div className="suggestions-div">
          <div>
            <Suggestions />
          </div>
        </div>
      </main>

      <div className="bottom-navbar">
        <BottomNavbar
        // setCreateTweet={setCreateTweet}
        // setFromEdit={setFromEdit}
        />
      </div>
      {createTweet && (
        <CreateTweet
        // setCreateTweet={setCreateTweet}
        // setIsTweeted={setIsTweeted}
        // fromEdit={fromEdit}
        // setFromEdit={setFromEdit}
        />
      )}
    </div>
  );
}

