import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="bg-[#FAF0E6] min-h-screen w-full">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
