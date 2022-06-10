import { jwtProfile } from "config/jwt";
import { getAllUsers } from "networkCalls";
import { useEffect, useState } from "react";
import { SuggestedProfile } from "../index";
import { useAuthProvider,useNotifyUser } from "contexts";

export default function Suggestions() {
  const { toast } = useNotifyUser();
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
        toast.error("Unexpected error. Please try again in some time.")
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
