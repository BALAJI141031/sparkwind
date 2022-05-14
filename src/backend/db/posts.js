import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
// import { users } from "./users";
// const { _id: userId } = users[0];
/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolore.",
    likes: {
      likeCount: 9,
      likedBy: [],
      dislikedBy: [],
    },
    displayname: "always_anjali",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    displayPicture: "https://openui.netlify.app/images/avatar1.png",
    caption: "holaaaa",
    picture:
      "https://images.shiksha.com/mediadata/images/articles/1596046112phpALO4Er.jpeg",
    emailId: "anjalibalika@gmail.com",
    userId: "anjali",
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolore.",
    likes: {
      likeCount: 99,
      likedBy: [],
      dislikedBy: [],
    },
    displayname: "always_anjali",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    displayPicture: "https://openui.netlify.app/images/avatar1.png",
    caption: "holaaaa",
    picture:
      "https://images.shiksha.com/mediadata/images/articles/1596046112phpALO4Er.jpeg",
    emailId: "anjalibalika@gmail.com",
    userId: "anjali",
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolore.",
    likes: {
      likeCount: 199,
      likedBy: [],
      dislikedBy: [],
    },
    displayname: "always_anjali",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    displayPicture: "https://openui.netlify.app/images/avatar1.png",
    caption: "holaaaa",
    picture:
      "https://images.shiksha.com/mediadata/images/articles/1596046112phpALO4Er.jpeg",
    emailId: "anjalibalika@gmail.com",
    userId: "anjali",
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolore.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    displayname: "always_anjali",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    displayPicture: "https://openui.netlify.app/images/avatar1.png",
    caption: "holaaaa",
    picture:
      "https://images.shiksha.com/mediadata/images/articles/1596046112phpALO4Er.jpeg",
    emailId: "anjalibalika@gmail.com",
    userId: "anjali",
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolore.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    displayname: "always_anjali",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    displayPicture: "https://openui.netlify.app/images/avatar1.png",
    caption: "holaaaa",
    picture:
      "https://images.shiksha.com/mediadata/images/articles/1596046112phpALO4Er.jpeg",
    emailId: "anjalibalika@gmail.com",
    userId: "anjali",
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    displayname: "always_anjali",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    displayPicture: "https://picturepan2.github.io/spectre/img/avatar-4.png",
    caption: "holaaaa11",
    emailId: "anjalibalika@gmail.com",
    userId: "anjali",
  },
];
