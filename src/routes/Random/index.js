import { Link } from "react-router-dom";
import "./index.css";
export default function NotFoundRoute() {
  return (
    <center>
      <div className="notfound-div">
        <h1>Page Not Found</h1>
        <Link to="/">
          <button className="primary-cta">Go to Home</button>
        </Link>
      </div>
    </center>
  );
}
