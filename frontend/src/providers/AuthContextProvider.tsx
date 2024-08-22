import { useState } from "react";
import { TUserInfo, UserAuthContext } from "../context/authContext";

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUserInfo | undefined>(undefined);
  return (
    <UserAuthContext.Provider value={{ user, setUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default AuthContextProvider;
