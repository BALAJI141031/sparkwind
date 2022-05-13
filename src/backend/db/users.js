import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "anjali",
    firstName: "Anjali",
    lastName: "Balika",
    email: "anjalibalika@gmail.com",
    password: "anjaliBalika1234",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userPhoto: "https://picturepan2.github.io/spectre/img/avatar-3.png",
    displayname: "Always_anjali",
    portfolioUrl: "www.anjali.com",
    bio: "learning business dev @neogcamp",
  },

  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@gmail.com",
    password: "adarshBalika1234",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userPhoto: "https://picturepan2.github.io/spectre/img/avatar-4.png",
    displayname: "Always_Adarsh",
    portfolioUrl: "www.adarsh.com",
    bio: "learning front end dev @neogcamp",
  },
];
