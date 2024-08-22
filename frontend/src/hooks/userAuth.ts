import { useContext } from "react";
import { UserAuthContext } from "../context/authContext";

const useAuth = () => {
  const authContext = useContext(UserAuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return authContext;
};

export { useAuth };
