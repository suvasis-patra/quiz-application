import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <div className="w-full flex h-screen">
      <SideBar />
      <div className="py-4 px-2 overflow-y-auto md:px-4 md:py-4 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
