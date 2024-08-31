import { useContext } from "react";
import { FilterContext } from "../context/filterContext";

const useFilter = () => {
  const filterContext = useContext(FilterContext);
  if (!filterContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return filterContext;
};

export { useFilter };
