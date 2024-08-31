import {
  AlarmClock,
  ChartColumnBig,
  FlagTriangleRight,
  MessageSquareText,
  Home,
  User,
  Settings,
  Award,
  Telescope,
} from "lucide-react";

export const SIDEBARITEMS = [
  {
    text: "Home",
    icon: <Home />,
    linkTo: "/dashboard",
  },
  {
    text: "Play",
    icon: <Telescope />,
    linkTo: "/dashboard/quizzes",
  },
  {
    text: "Achivements",
    icon: <Award />,
    linkTo: "/dashboard",
  },
  {
    text: "Profile",
    icon: <User />,
    linkTo: "/dashboard/profile",
  },
  {
    text: "Settings",
    icon: <Settings />,
    linkTo: "/dashboard",
  },
] as const;

export const QUIZ_CATEGORIES = [
  "All",
  "General Knowledge",
  "Science & Technology",
  "Mathematics",
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
  GET_LATEST_QUIZZES = "getlatestquizzes",
}

export const FEATURES = [
  {
    title: "Variety of Categories",
    description:
      "QuizMaster offers an extensive range of quiz categories, from general knowledge to specialized topics. Whether you're passionate about science, history, sports, or pop culture, there's a quiz for everyone.",
    icon: <FlagTriangleRight size={50} />,
  },
  {
    title: "Timed Challenges",
    description:
      "Put your skills to the test with our timed challenges. Each quiz comes with a countdown, pushing you to think quickly and accurately. Compete against the clock and experience the thrill of racing through questions.",
    icon: <AlarmClock size={50} />,
  },
  {
    title: "Real-Time Feedback",
    description:
      "Learn as you play with real-time feedback. After each question, you'll immediately know whether you got it right or wrong, along with a brief explanation or the correct answer.",
    icon: <MessageSquareText size={50} />,
  },
  {
    title: "Community Leaderboards",
    description:
      "Join a global community of quiz enthusiasts and compete for a spot on the leaderboards. Track your progress, see how you rank against friends and other players worldwide, and strive to climb higher with each quiz.",
    icon: <ChartColumnBig size={50} />,
  },
] as const;

export const FAQS = [
  {
    question: "What is QuizMaster?",
    answer:
      "QuizMaster is a platform where you can test your knowledge through various quizzes across multiple categories. It offers timed challenges, real-time feedback, and community leaderboards.",
  },
  {
    question: "How do I create an account?",
    answer:
      "You can create an account by clicking the 'Register' button on the navbar. Fill in the required information, and you'll be ready to start taking quizzes.",
  },
  {
    question: "Can I take quizzes without registering?",
    answer:
      "You can view quizzes without registering, but you'll need an account to participate and track your scores.",
  },
  {
    question: "How are quizzes categorized?",
    answer:
      "Quizzes are categorized into various topics such as General Knowledge, Science & Tech, History, and more. You can select a category that interests you and start quizzing!",
  },
  {
    question: "What if I forget my password?",
    answer:
      "If you forget your password, use the 'Forgot Password' option on the login page to reset it. Follow the instructions sent to your registered email.",
  },
];
