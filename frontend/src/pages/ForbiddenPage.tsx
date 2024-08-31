import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Access Denied</h1>
        <p className="text-gray-700 mb-4">
          You do not have permission to access this page. Please contact your
          administrator or navigate to another section of the site.
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <button className="cta-btn hover:shift hover:shadow-dark w-full mt-8 text-xl flex justify-end items-center gap-2 md:gap-4 hover:bg-orange-600">
            <span>
              <ArrowLeftCircle />
            </span>{" "}
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
