import { ArrowRightFromLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 px-4 md:px-12 lg:px-20 bg-white text-center flex flex-col gap-4 items-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
        Join the <span className="text-blue">Community</span>
      </h2>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
        Be part of a growing community of quiz enthusiasts. Compete with others,
        share your results, and improve your knowledge with friends!
      </p>
      <button
        className="btn hover:bg-orange-500 mt-6 flex gap-2 items-center"
        onClick={() => navigate("/auth/register")}
      >
        Join Now{" "}
        <span>
          <ArrowRightFromLine />
        </span>
      </button>
    </section>
  );
};

export default Community;
