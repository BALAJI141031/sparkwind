import { jwtProfile } from "config/jwt";
import { getAllUsers } from "networkCalls";
import { useEffect, useState } from "react";
import { SuggestedProfile } from "../index";
import { useAuthProvider } from "contexts";

export default function Suggestions() {
  const { isLoggedIn } = useAuthProvider();
  const myProfile = isLoggedIn && jwtProfile();
  const [users, setUsers] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const allUsers = await getAllUsers();
        const suggestedUsers = allUsers.filter(
          (user) => user._id !== myProfile._id
        );
        setUsers(suggestedUsers);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div className="suggestions">
      <h3>Who To Follow?</h3>
      {users && users.map((user) => <SuggestedProfile user={user} />)}
      <h3>Show More</h3>
    </div>
  );
}
