import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

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
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    displayname: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    displayPicture: "https://openui.netlify.app/images/avatar1.png",
    caption: "holaaaa",
    picture:
      "https://images.shiksha.com/mediadata/images/articles/1596046112phpALO4Er.jpeg",
    emailId: "adarshbalika123@gmail.com",
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
    displayname: "shubhamsoni",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    displayPicture: "https://picturepan2.github.io/spectre/img/avatar-4.png",
    caption: "holaaaa11",
    emailId: "adarshbalika@gmail.com",
  },
];
