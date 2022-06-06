import "./index.css";
import { BsHeartFill, FaCommentAlt, RiUserFollowLine } from "../../icons";
import { Tweet } from "../../components";
import { getAllBookMarks,getAllPosts   } from "networkCalls";
import { useState, useEffect } from "react";
export default function Notications() {
  const [notifications, setNotifications] = useState(null);
  // fetch bookmarks
  useEffect(() => {
    (async () => {
       try {
        const bookmarks = await getAllBookMarks();
        const allPosts = await getAllPosts()
        const bookMarkPosts=allPosts.data.posts.filter((post)=>bookmarks.data.bookmarks.includes(post._id))
        setNotifications(bookMarkPosts);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    
      <div className="notification-section flex flex-col items-center">
      <h4>Notifications</h4>
      {notifications !== null && notifications.length !== 0 ? (
        notifications.map((notification, index) => (
          <div className="notification-div w-1/2 ">
            <div className="icon-div">
              {index % 2 !== 0 ? (
                <BsHeartFill className="notification-icon like-notification" />
              ) : (
                <FaCommentAlt className="notification-icon comment-notification" />
              )}
            </div>
            <div>
              <div className="notification-from">
                <img
                  src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                  className="avatar avatar-xs"
                />
                <div>
                  <h4>Admin @imbalajinarayana 1m ago</h4>
                  {index % 2 !== 0 ? (
                    <p>Liked your post</p>
                  ) : (
                    <p>Commented your post</p>
                  )}
                </div>
              </div>
              <div id="notification-tweet">
                <Tweet post={notification} />
              </div>
            </div>
            {/* <div className="icon-div">
          <RiUserFollowLine className="notification-icon" />
        </div>
        <div>
          <div className="notification-from">
            <img
              src="https://picturepan2.github.io/spectre/img/avatar-4.png"
              className="avatar avatar-xs"
            />
            <div>
              <h4>Admin @imbalajinarayana 1m ago</h4>
              <p>Followed You!</p>
            </div>
          </div>
        </div> */}
          </div>
        ))
      ) : (
        <p>NO Notifications</p>
      )}
    </div>
  );
}
