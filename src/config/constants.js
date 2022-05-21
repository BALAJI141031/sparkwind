module.exports = {
  PATHS: {
    LANDING_PATH: "/",
    HOME_PATH: "/home",
    PROFILE_PATH: "/profile/:userId",
    NOTIFICATIONS_PATH: "/notifications",
    BOOKMARKS_PATH: "/bookmarks",
    USER: "/user",
    LOGIN: "/user/login",
    SIGNUP: "/user/signup",
    MOCK: "/mock",
  },
  HERO: {
    LANDING_ROUTE_HERO_TEXTS: [
      { mainHero: "FOLLOW", subHero: "Aspirants Around The Country" },
      { mainHero: "CONNECT", subHero: "With Your Friends" },
      { mainHero: "SHARE", subHero: "What You are Thinking" },
    ],
  },
  REDUCER_CONSTANTS: {
    CAPTION: "caption",
    TWEETTEXT: "tweetText",
    PICTURE: "picture",
    EMOJI: "emoji",
  },
  EMOJIS: ["😊", "😳", "😔", "🥡", "❤️"],
  ADMIN: {
    EMAIL: "adarshbalika@gmail.com",
    SECOND_EMAIL: "anjalibalika@gmail.com",
  },
  NOTIFICATIONS: {
    TWEET_DELETED: "Successfully Tweet Deleted",
    TWEET_UPDATED: "Successfully Tweet Updated",
  },
  PROFILE_CONTSTANTS: ["Followers", "Following", "Tweets"],
};
