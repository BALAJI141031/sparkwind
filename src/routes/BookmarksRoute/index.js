import { useEffect, useState } from "react";
import { Tweet } from "../../components";
import { getAllBookMarks, getAllPosts } from "networkCalls";
import "./index.css";
export default function Bookmarks() {
  const [bookMarks, setBookMarks] = useState(null);
  const [bookmarksUi,setBookmarksUi]=useState(false)

  // fetch bookmarks
  useEffect(() => {
    (async () => {
      try {
        const bookmarks = await getAllBookMarks();
        const allPosts = await getAllPosts()
        const bookMarkPosts=allPosts.data.posts.filter((post)=>bookmarks.data.bookmarks.includes(post._id))
        setBookMarks(bookMarkPosts);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [bookmarksUi]);
  return (
    <div className="bookmark-section">
      <center>
        <h4>Your Bookmarks</h4>
      </center>
      <div className="flex justify-center items-center">
        <div className="w-1/4">      {bookMarks && bookMarks.length !== 0
          ? bookMarks.map((bookmark) => <Tweet post={bookmark} setBookMarks={setBookMarks} setBookmarksUi={setBookmarksUi} />)
          : "Not found"}
        </div></div>

    </div>
  );
}
