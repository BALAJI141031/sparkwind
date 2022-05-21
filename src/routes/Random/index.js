import { Link } from "react-router-dom";
export default function NotFoundRoute() {
  console.log("here");
  return (
    <center>
      <div>
        <h1>Page Not Found</h1>
        <Link to="/">
          <button className="primary-cta">Go to Home</button>
        </Link>
      </div>
    </center>
  );
}
