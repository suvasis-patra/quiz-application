import { useState } from "react";
import { FilterContext } from "../context/filterContext";
import { QUIZ_LEVELS } from "../utils/constant";

const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState<string | undefined>();
  const [level, setLevel] = useState<QUIZ_LEVELS | undefined>(undefined);
  const [tags, setTags] = useState<string[] | undefined>([]);
  return (
    <FilterContext.Provider
      value={{ category, setCategory, level, setLevel, tags, setTags }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
