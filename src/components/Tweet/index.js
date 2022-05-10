import { AnalyticsIcon } from "../index";
import { FiMoreVertical } from "../../icons";
import { useState } from "react";
import "./index.css";
export default function Tweet() {
  const [options, setOptions] = useState(false);
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
          <AnalyticsIcon className="icon" />
        </div>
      </div>
      <div className="options-div">
        <div
          onMouseEnter={() => setOptions(true)}
          onMouseLeave={() => {
            setOptions(false);
          }}
        >
          <FiMoreVertical className="options-icon" />
          {options && (
            <div className="options-detials">
              <p>Edit</p>
              <p>Delete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
