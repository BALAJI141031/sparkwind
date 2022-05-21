import { useContext, useState, createContext } from "react";
import Cookies from "js-cookie";
const authContext = createContext();

function AuthProvider({ children }) {
  const jwtToken = Cookies.get("jwt_token");
  const [isLoggedIn, setLogin] = useState(jwtToken ? true : false);
  return (
    <authContext.Provider value={{ isLoggedIn, setLogin }}>
      {children}
    </authContext.Provider>
  );
}

const useAuthProvider = () => useContext(authContext);

export { AuthProvider, useAuthProvider };
