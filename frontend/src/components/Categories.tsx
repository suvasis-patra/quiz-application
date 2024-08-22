import { useFilter } from "../hooks/filters";
import { QUIZ_CATEGORIES } from "../utils/constant";

const Categories = () => {
  const { setCategory } = useFilter();
  return (
    <article className="px-6 bg-blue border border-black flex flex-col items-center rounded-lg">
      <h3 className="text-2xl font-bold">Filter by category</h3>
      <ul className="flex gap-4 flex-wrap justify-center py-4">
        {QUIZ_CATEGORIES.map((item) => (
          <li
            key={item}
            className="p-2 rounded-3xl border hover:cursor-pointer hover:shift hover:shadow-dark transition duration-100 border-black text-base font-semibold"
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
