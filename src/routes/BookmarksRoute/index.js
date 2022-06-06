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
  console.log(bookMarks,"dont you have likes")
  return (
    <div className="bookmark-section">
      <center>
        <h4>Your Bookmarks</h4>
      </center>
      <div className="flex justify-center items-center">
        <div className="w-1/4">      {bookMarks && bookMarks.length !== 0
        ? bookMarks.map((bookmark) => <Tweet post={bookmark} />)
          : "Not found"}
        </div></div>

    </div>
  );
}
