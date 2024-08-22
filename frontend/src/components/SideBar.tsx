import { Link } from "react-router-dom";
import { SIDEBARITEMS } from "../utils/constant";

const SideBar = () => {
  return (
    <section className="h-screen min-w-[250px] bg-purple flex flex-col justify-between py-8 font-outfit">
      <div className="flex flex-col justify-between gap-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Quiz<span>Book</span>
          </h1>
        </div>
        <div className="flex flex-col gap-1 px-4">
          {SIDEBARITEMS.map((item) => (
            <Link
              to={item.linkTo}
              key={item.text}
              className="p-4 hover:bg-background hover:shift hover:shadow-dark hover:text-black transition duration-100 rounded-lg hover:border hover:border-black"
            >
              <span className="font-semibold text-lg">{item.text}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full px-8">
        <button className="flex items-center justify-center hover:shift hover:shadow-dark hover:bg-blue w-full rounded-lg transition duration-100 font-semibold text-xl border border-black py-4">
          Logout
        </button>
      </div>
    </section>
  );
};

export default SideBar;
