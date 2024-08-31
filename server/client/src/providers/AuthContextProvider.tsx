import { useEffect, useState } from "react";
import { TUserInfo, UserAuthContext } from "../context/authContext";

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUserInfo | undefined>(undefined);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("Stored user found:", storedUser); // Debugging log
      setUser(JSON.parse(storedUser));
    } else {
      console.log("No user found in localStorage"); // Debugging log
    }
  }, [setUser]);

  const login = (userInfo: TUserInfo) => {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
  };
  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
  };
  return (
    <UserAuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default AuthContextProvider;
