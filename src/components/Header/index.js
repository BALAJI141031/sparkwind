import "./index.css";
import { BiSearchAlt2 } from "icons";
import { BottomNavbar } from "components";
import { useHome } from "contexts";
import { jwtProfile } from "config/jwt";
import { NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "config/constants";

export default function Header() {
  const { setHome } = useHome();
  const navigate = useNavigate();
  return (
    <div className="flex-H-space-around " id="header-div">
      <NavLink to={PATHS.HOME_PATH}>
        <sapn className="logo">SL</sapn>
      </NavLink>

      {/* have to implement search feature */}
      {/* <div className="searchbar-div">
        <input
          className="search-bar"
          type="search"
          placeholder="search here...."
        />
        <button className="search-icon">
          <BiSearchAlt2 />
        </button>
      </div> */}
      <div className="desktop-header-cta">
        <BottomNavbar />

        <img
          src="https://picturepan2.github.io/spectre/img/avatar-4.png"
          class="avatar avatar-xs icon"
          onClick={() => navigate(`/profile/${jwtProfile()._id}`)}
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
