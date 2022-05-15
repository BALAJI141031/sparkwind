import "./index.css";
import { BiSearchAlt2 } from "icons";
import { BottomNavbar } from "components";

export default function Header() {
  return (
    <div class="flex-H-space-around" id="header-div">
      <div>
        <sapn class="span-style">SL</sapn>
      </div>
      <div className="searchbar-div">
        <input
          className="search-bar"
          type="search"
          placeholder="search here...."
        />
        <button className="search-icon">
          <BiSearchAlt2 />
        </button>
      </div>
      <div className="desktop-header-cta">
        <BottomNavbar
        // setCreateTweet={setCreateTweet}
        // setFromEdit={setFromEdit}
        />
        <img
          src="https://picturepan2.github.io/spectre/img/avatar-4.png"
          class="avatar avatar-xs"
        />
      </div>
      <div className="device-header-cta">
        <img
          src="https://picturepan2.github.io/spectre/img/avatar-4.png"
          class="avatar avatar-xs"
        />
      </div>
    </div>
  );
}
