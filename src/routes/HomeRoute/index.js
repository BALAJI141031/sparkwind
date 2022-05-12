import "./index.css";
import { useTweet } from "../../contexts/";
import { useEffect, useState } from "react";
import {
  Tweet,
  BottomNavbar,
  SuggestedProfile,
  CreateTweet,
} from "../../components";
import { getAllPosts } from "../../networkCalls";
export default function HomeRoute() {
  const { tweet, setTweet } = useTweet();
  const [createTweet, setCreateTweet] = useState(false);
  const [posts, setPosts] = useState(null);
  // created to handle useeffect
  const [isTweeted, setIsTweeted] = useState(false);

  useEffect(() => {
    (async () => {
      const postsResponse = await getAllPosts();

      setPosts(postsResponse.data.posts);
    })();
  }, [isTweeted]);

  return (
    <div className="home-section">
      <div className="filters-div">
        <button>Trending Posts</button>
        <button>Latest Posts</button>
      </div>

      {posts &&
        posts.map((post) => (
          <div>
            <Tweet post={post} setIsTweeted={setIsTweeted} />
          </div>
        ))}

      {/* <div className="bottom-navbar">
        <BottomNavbar setCreateTweet={setCreateTweet} />
      </div> */}
      {createTweet && (
        <CreateTweet
          setCreateTweet={setCreateTweet}
          setIsTweeted={setIsTweeted}
        />
      )}
    </div>
  );
}

