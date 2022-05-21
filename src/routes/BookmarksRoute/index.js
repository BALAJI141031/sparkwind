import { useEffect, useState } from "react";
import { Tweet } from "../../components";
import { getAllBookMarks } from "networkCalls";
import "./index.css";
export default function Bookmarks() {
  const [bookMarks, setBookMarks] = useState(null);
  // fetch bookmarks
  useEffect(() => {
    (async () => {
      try {
        const bookmarks = await getAllBookMarks();
        setBookMarks(bookmarks.data.bookmarks);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div className="bookmark-section">
      <center>
        <h4>Your Bookmarks</h4>
      </center>
      {bookMarks && bookMarks.length !== 0
        ? bookMarks.map((bookmark) => <Tweet post={bookmark} />)
        : "Not found"}
    </div>
  );
}
