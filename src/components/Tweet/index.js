import { AnalyticsIcon } from "../index";
import "./index.css";
export default function Tweet() {
  return (
    <div className="tweet-section">
      <img
        src="https://picturepan2.github.io/spectre/img/avatar-4.png"
        className="avatar avatar-xs"
      />
      <div className="tweet-content">
        <h4>Admin</h4>
        <p>Hello World!!!!(content)</p>
        <div>Img's here(if exists)</div>
        <div className="analytics-section">
          <AnalyticsIcon />
        </div>
      </div>
    </div>
  );
}
