import { createContext } from "react";

export type TUserInfo = { userId: string; role: "user" | "admin" ;username:string};
type TUserAuth = {
  user: TUserInfo | undefined;
  setUser: (user: TUserInfo | undefined) => void;
};

const UserAuthContext = createContext<TUserAuth | undefined>(undefined);

export { UserAuthContext };
