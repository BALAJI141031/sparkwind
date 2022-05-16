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

  const { home, setHome, posts } = useHome();
  const { createTweet, trending, sort } = home;

  console.log(posts, "whts im getting");
  //trending posts

  return (
    <div className="home-section">
      <div className="filters-div">
        <BiTrendingUp
          className={trending ? "styled-filter-icon" : "filter-icon"}
          onClick={() => setHome({ type: "trending", payload: !trending })}
        />
        <ImSortNumbericDesc
          className={sort ? "styled-filter-icon" : "filter-icon"}
          onClick={() => setHome({ type: "sort", payload: !sort })}
        />
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

