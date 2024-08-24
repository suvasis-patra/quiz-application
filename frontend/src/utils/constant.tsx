export const SIDEBARITEMS = [
  {
    text: "Home",
    // icon: <Home />,
    linkTo: "",
  },
  {
    text: "Results",
    // icon:,
    linkTo: "",
  },
  {
    text: "Achivements",
    // icon:,
    linkTo: "",
  },
  {
    text: "Profile",
    // icon:,
    linkTo: "",
  },
  {
    text: "Settings",
    // icon:,
    linkTo: "",
  },
] as const;

export const QUIZ_CATEGORIES = [
  "All",
  "General Knowledge",
  "Science & Technology",
  "History",
  "Geography",
  "Literature",
  "Movies & TV Shows",
  "Music",
  "Sports",
  "Art & Culture",
  "Language & Vocabulary",
  "Business & Economics",
  "Health & Medicine",
  "Mythology",
  "Travel & Tourism",
  "Automobiles",
  "Comics & Cartoons",
  "Space & Astronomy",
] as const;

export enum QUIZ_LEVELS {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",
  LOGIN_USER_ACCOUNT = "loginUserAccount",
  LOGOUT_USER_ACCOUNT = "logoutUserAccount",
  UPDATE_USER_ACCOUNT = "updateUserAccount",
  CURRENT_USER = "currentUser",
  // QUIZ KEYS
  GET_QUIZZES = "getquizzes",
  GET_QUIZ_BY_ID = "getquizbyid",
}
