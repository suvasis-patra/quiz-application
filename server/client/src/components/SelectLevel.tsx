import { useFilter } from "../hooks/filters";
import { QUIZ_LEVELS } from "../utils/constant";

const SelectLevel = () => {
  const { level, setLevel } = useFilter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as QUIZ_LEVELS;

    // Ensure the value is a valid QUIZ_LEVELS enum value
    if (Object.values(QUIZ_LEVELS).includes(value)) {
      setLevel(value);
    }
  };

  return (
    <div>
      <select
        onChange={handleChange}
        value={level || ""}
        className="input_field"
      >
        <option value="" disabled>
          Filter by level
        </option>
        <option value={QUIZ_LEVELS.EASY}>{QUIZ_LEVELS.EASY}</option>
        <option value={QUIZ_LEVELS.MEDIUM}>{QUIZ_LEVELS.MEDIUM}</option>
        <option value={QUIZ_LEVELS.HARD}>{QUIZ_LEVELS.HARD}</option>
      </select>
    </div>
  );
};

export default SelectLevel;
