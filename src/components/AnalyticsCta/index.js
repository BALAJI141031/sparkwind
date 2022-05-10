import { BsHeart, GoComment, BsBookmarkCheck } from "../../icons";
import "./index.css";
export default function AnalyticsIcon({ icon }) {
  return (
    <div className="analytics-div">
      <div className="flex-H-center-V">
        <BsHeart />
        <p>143</p>
      </div>
      <div className="flex-H-center-V">
        <GoComment />
        <p>143</p>
      </div>
      <BsBookmarkCheck />
    </div>
  );
}
