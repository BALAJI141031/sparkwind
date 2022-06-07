import "./index.css";
import {useHome } from "contexts/";
import {
  Tweet,
  BottomNavbar,
  CreateTweet,
  Suggestions,
} from "components";
import { BiTrendingUp, ImSortNumbericDesc } from "icons";

export default function HomeRoute() {
  const { home, setHome, posts } = useHome();
  const { createTweet, trending, sort } = home;
  return (
    <div className="home-section relative min-h-screen ">
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
            posts.map((post) => {
             return <div className="center-div">
                <Tweet post={post} key={post._id} />
              </div>
            })}
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

