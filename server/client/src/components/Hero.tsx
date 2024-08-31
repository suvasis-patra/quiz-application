import { ArrowRightFromLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col md:flex-row md:gap-6 py-4 px-4 md:px-12 lg:px-20 mt-8 md:mt-12">
      <div className="flex flex-col justify-center w-full md:w-1/2 space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left">
          Welcome to Quiz<span className="text-blue">Master</span>!
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-center md:text-left text-gray-700">
          Challenge your mind, master your knowledge.
        </h2>
        <p className="text-lg text-gray-600 text-center md:text-left">
          QuizMaster is your ultimate platform to test your knowledge across a
          wide range of categories. Whether you're a trivia enthusiast or a
          seasoned pro, there's something for everyone!
        </p>
        <div className="flex justify-center md:justify-start">
          <button
            className="btn hover:bg-orange-500 flex items-center justify-center gap-3 text-purple hover:text-black"
            onClick={() => navigate("/auth/register")}
          >
            Start Your Journey
            <span>
              <ArrowRightFromLine />
            </span>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img
          src="/quizmaster_hero_image.svg"
          alt="hero"
          className="h-full w-full bg-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
