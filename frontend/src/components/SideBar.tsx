import { LogOut, Rocket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/userAuth";
import { SIDEBARITEMS } from "../utils/constant";

const SideBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="h-screen min-w-[250px] bg-purple flex flex-col justify-between py-8 font-outfit">
      <div className="flex flex-col justify-between gap-12">
        <div className="flex justify-center items-center gap-1">
          <span className="bg-blue text-background p-1 rounded-full text-center">
            <Rocket />
          </span>
          <h1 className="text-xl md:text-3xl font-bold">
            Quiz<span className="text-blue">Master</span>
          </h1>
        </div>
        <div className="flex flex-col gap-1 px-4">
          {SIDEBARITEMS.map((item) => (
            <Link
              to={item.linkTo}
              key={item.text}
              className="p-4 hover:bg-background hover:shift hover:shadow-dark hover:text-black transition duration-100 rounded-lg hover:border hover:border-black flex gap-2 items-center"
            >
              <span>{item.icon}</span>
              <span className="font-semibold text-lg">{item.text}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full px-8">
        <button
          className="flex items-center justify-center hover:shift hover:shadow-dark hover:bg-blue w-full rounded-lg transition duration-100 font-semibold text-xl border border-black py-4 gap-2"
          onClick={() => {
            logout();
            navigate("/auth/login");
          }}
        >
          <span className="">
            <LogOut />
          </span>
          Logout
        </button>
      </div>
    </section>
  );
};

export default SideBar;
