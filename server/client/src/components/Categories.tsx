import { useFilter } from "../hooks/filters";
import { QUIZ_CATEGORIES } from "../utils/constant";

const Categories = () => {
  const { setCategory, category } = useFilter();
  return (
    <article className="px-6 bg-blue border-2 border-black rounded-lg categories-scrollbar">
      <h3 className="text-2xl font-bold text-center mb-4">
        Filter by category
      </h3>
      <ul className="flex gap-4 flex-nowrap overflow-x-auto py-4">
        {QUIZ_CATEGORIES.map((item) => (
          <li
            key={item}
            className={`whitespace-nowrap p-2 rounded-3xl border border-black text-base font-semibold hover:cursor-pointer hover:shadow-dark transition duration-100 ${
              item === category ? "bg-[#FAF0E6]" : ""
            }`}
            onClick={() => setCategory(item.toLocaleLowerCase())}
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Categories;
