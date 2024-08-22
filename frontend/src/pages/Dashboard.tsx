import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <div className="w-full flex ">
      <SideBar />
      <div className="py-4 px-2 overflow-y-auto md:px-4 md:py-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
