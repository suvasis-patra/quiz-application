import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="bg-blue max-w-[30rem] rounded-lg shadow-md border-2 border-black p-5 md:px-8 font-nunito my-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
