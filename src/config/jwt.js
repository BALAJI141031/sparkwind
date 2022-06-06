import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const jwtProfile = () => {
  const myJwt = Cookies.get("jwt_token");
  // console.log(myJwt);
  // thi sshould replace with cookies jwt token
  if (Cookies.get("jwt_token")) {
    const decodedToken = jwt_decode(myJwt, process.env.REACT_APP_JWT_SECRET);
    return decodedToken;
  }
  return null;
};

export const getJwtToken = () => {
  return Cookies.get("jwt_token");
};