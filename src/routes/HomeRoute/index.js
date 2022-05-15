import "./index.css";
import { useTweet } from "contexts/";
import { useEffect, useState } from "react";
import {
  Tweet,
  BottomNavbar,
  SuggestedProfile,
  CreateTweet,
  Header,
} from "components";
import { getAllPosts } from "networkCalls";
import { BiTrendingUp, ImSortNumbericDesc } from "icons";
export default function HomeRoute() {
  const { tweet, setTweet } = useTweet();
  const [createTweet, setCreateTweet] = useState(false);
  const [posts, setPosts] = useState(null);
  // created to handle useeffect
  const [isTweeted, setIsTweeted] = useState(false);
  const [fromEdit, setFromEdit] = useState({
    editStatus: false,
    tweetId: null,
  });

  useEffect(() => {
    (async () => {
      const postsResponse = await getAllPosts();

      setPosts(postsResponse.data.posts);
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

      {posts &&
        posts.map((post) => (
          <div className="center-div">
            <Tweet
              post={post}
              setIsTweeted={setIsTweeted}
              setCreateTweet={setCreateTweet}
              setFromEdit={setFromEdit}
            />
          </div>
        ))}

      <div className="bottom-navbar">
        <BottomNavbar
          setCreateTweet={setCreateTweet}
          setFromEdit={setFromEdit}
        />
      </div>
      {createTweet && (
        <CreateTweet
          setCreateTweet={setCreateTweet}
          setIsTweeted={setIsTweeted}
          fromEdit={fromEdit}
          setFromEdit={setFromEdit}
        />
      )}
    </div>
  );
}

