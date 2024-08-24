import { Rocket } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full min-w-8 py-4 px-4 md:px-12 lg:px-20 flex items-center justify-between backdrop-blur-lg bg-white/30 shadow-lg border border-white/20">
      <div className="flex justify-center items-center gap-1">
        <span className="bg-blue text-background p-1 rounded-full text-center">
          <Rocket />
        </span>
        <h1 className="text-xl md:text-3xl font-bold">
          Quiz<span className="text-blue">Master</span>
        </h1>
      </div>
      <div className="flex justify-center items-center gap-4">
        <button className="btn hover:bg-blue">Login</button>
        <button className="btn hover:bg-orange-500">Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
