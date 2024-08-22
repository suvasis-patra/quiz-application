import { createContext } from "react";
import { QUIZ_LEVELS } from "../utils/constant";

type TFilter = {
  category?: string;
  setCategory: (category: string) => void;
  level?: QUIZ_LEVELS;
  setLevel: (level: QUIZ_LEVELS) => void;
  tags?: string[];
  setTags: (tags: string[]) => void;
};

const FilterContext = createContext<TFilter | undefined>(undefined);

export { FilterContext };
