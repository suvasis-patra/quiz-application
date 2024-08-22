import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const apiReaquest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",
  LOGIN_USER_ACCOUNT = "loginUserAccount",
  LOGOUT_USER_ACCOUNT = "logoutUserAccount",
  UPDATE_USER_ACCOUNT = "updateUserAccount",
  CURRENT_USER = "currentUser",
}

export const errorMessage = (errorCode: number) => {
  switch (errorCode) {
    case 301:
      return "Email already exist!";
    case 302:
      return "Invalid user credentials!";
    case 303:
      return "Please provide valid details!";
    case 305:
      return "Access denied!";
    default:
      return "Something went wrong!";
  }
};
