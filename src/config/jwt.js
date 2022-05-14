import jwt_decode from "jwt-decode";
export const jwtProfile = () => {
  // thi sshould replace with cookies jwt token
  const decodedToken = jwt_decode(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4MTdhM2Q3My00MzQ2LTRjOGUtODljMC00OTk3NzJlZjcxODkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.8zvlBM0EHofU7XOv1KLenlUKn7Jks3D6ijmQAf2_vk4",
    process.env.REACT_APP_JWT_SECRET
  );
  return decodedToken;
};
