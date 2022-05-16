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
      <h4>Your Bookmarks</h4>
      {bookMarks
        ? bookMarks.map((bookmark) => <Tweet post={bookmark} />)
        : "Not found"}
    </div>
  );
}
