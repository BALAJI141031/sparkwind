import "./index.css";
import { BiSearchAlt2 } from "../../icons";

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
      <img
        src="https://picturepan2.github.io/spectre/img/avatar-4.png"
        class="avatar avatar-xs"
      />
    </div>
  );
}
