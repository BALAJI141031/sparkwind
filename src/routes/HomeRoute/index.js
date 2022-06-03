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

export default function HomeRoute() {
  const { home, setHome, posts } = useHome();
  const { createTweet, trending, sort } = home;
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
        <div style={{display:"grid"}}>
          {posts &&
            posts.map((post) => (
              <div className="center-div">
                <Tweet post={post} />
              </div>
            ))}
        </div>
        <div className="suggestions-div">
          <Suggestions />
        </div>
      </main>

      <div className="bottom-navbar">
        <BottomNavbar />
      </div>
      {createTweet && <CreateTweet />}
    </div>
  );
}

