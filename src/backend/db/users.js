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
    lastName: "Angel",
    email: "anjali1234@gmail.com",
    password: "anjaliBalika1234",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userPhoto: "https://picturepan2.github.io/spectre/img/avatar-3.png",
    displayname: "Always_anjali",
    portfolioUrl: "www.anjali.com",
    bio: "learning business dev @neogcamp",
  },

  {
    _id: "testAdmin",
    firstName: "sanjay",
    lastName: "yadav",
    email: "sanjay1999@gmail.com",
    password: "sanjay1999",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userPhoto: "https://picturepan2.github.io/spectre/img/avatar-4.png",
    displayname: "Always_Adarsh",
    portfolioUrl: "www.adarsh.com",
    bio: "learning front end dev @neogcamp",
  },
  {
    _id: "titu",
    firstName: "titu",
    lastName: "Balika",
    email: "titu123@gmail.com",
    password: "tituuu1234",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userPhoto: "https://picturepan2.github.io/spectre/img/avatar-1.png",
    displayname: "titu_talks",
    portfolioUrl: "www.titu.com",
    bio: "learning front end dev @neogcamp",
  },
  {
    _id: "varun roy",
    firstName: "varu",
    lastName: "roy",
    email: "varun123@gmail.com",
    password: "varun1234",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userPhoto: "https://picturepan2.github.io/spectre/img/avatar-5.png",
    displayname: "rider_varun",
    portfolioUrl: "www.varun.com",
    bio: "learning front end dev @neogcamp",
  },
];
