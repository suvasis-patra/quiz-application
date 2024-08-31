import {
  BookOpenCheck,
  CirclePlus,
  CircleUserIcon,
  Frown,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import { useAuth } from "../hooks/userAuth";
import { useGetCurrentUser } from "../hooks/queries";
import LatestQuizzes from "../components/LatestQuiz";
import QuizzesTaken from "../components/QuizzesTaken";
import { QuizCardProps } from "../components/QuizCard";

const DashboardLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetCurrentUser();
  const quizzesTaken = data?.data?.quizesTaken || [];

  console.log("current logged in User:", data);
  console.log("my required data", data?.data);
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center flex-col gap-2">
        <RotatingLines
          visible={true}
          width="96"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
        <p className="text-3xl font-bold">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-red-600">
          Error loading data. Please try again later.
        </div>
      </div>
    );
  }
  return (
    <section className="w-full">
      <div className="flex justify-between w-full px-4 py-2">
        <h3 className="text-xl md:text-3xl font-semibold">
          Welcome to QuizMaster!
        </h3>
        <div className="flex  gap-2 items-center md:gap-6">
          {user?.role === "admin" ? (
            <button
              className="btn hover:bg-blue items-center gap-2"
              onClick={() => navigate("/create-quiz")}
            >
              Create
              <span>
                <CirclePlus />
              </span>
            </button>
          ) : null}
          <div className="flex gap-2 items-center rounded-md p-2 border border-black hover:bg-orange-600 hover:shift hover:shadow-dark">
            <CircleUserIcon />
            <span className="capitalize text-black">{user?.username}</span>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-b-black mt-1"></div>
      <div className="mt-4 flex gap-4">
        <div className="px-6 py-4 flex flex-col border-2 border-black max-w-[300px] hover:shadow-dark justify-center items-center rounded-md bg-white shadow-md">
          <span>
            <BookOpenCheck size={40} />
          </span>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Quizzes Taken
          </h3>
          {!quizzesTaken ? (
            <div className="flex flex-col gap-4 items-center text-center">
              <Frown className="text-gray-600" size={40} />
              <p className="text-gray-700">You have not taken any quizzes!</p>
              <button className="border border-black text-black font-semibold py-2 px-4 rounded-3xl shadow hover:bg-blue hover:text-black transition duration-200">
                Take a Quiz
              </button>
            </div>
          ) : (
            <span className="text-gray-700">
              You've taken {quizzesTaken?.length} quizzes!
            </span>
          )}
        </div>
        <div className="px-6 py-4 flex flex-col border-2 border-black max-w-[300px] hover:shadow-dark justify-center items-center rounded-md bg-blue shadow-md">
          <span>
            <Trophy size={40} className="text-white" />
          </span>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Best Score</h3>
          <div className="flex items-center flex-col gap-2 w-full">
            <div className="text-white">
              {quizzesTaken?.length === 0 ? (
                <>
                  <p className="text-white font-bold text-xl md:text-2xl">0</p>
                  <p>take a quiz!</p>
                </>
              ) : (
                ""
              )}
            </div>
            hello there
          </div>
        </div>
        <div className="px-6 py-4 flex flex-col border-2 border-black max-w-[320px] hover:shadow-dark justify-center items-center rounded-md bg-indigo-500 shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Latest Scores
          </h3>
          <div className="w-full">
            {quizzesTaken?.length > 0 ? (
              <ul className="w-full space-y-2">
                {quizzesTaken
                  ?.slice(0, 5)
                  .map(
                    (
                      { quiz, score }: { quiz: QuizCardProps; score: number },
                      index: number
                    ) => (
                      <li
                        key={index}
                        className="flex justify-between items-center p-2 bg-white rounded-md shadow hover:bg-gray-100"
                      >
                        <span className="font-semibold text-gray-700 truncate max-w-[150px]">
                          {quiz.title}
                        </span>
                        <span className="text-blue-600 font-bold">{score}</span>
                      </li>
                    )
                  )}
              </ul>
            ) : (
              <span className="text-white">Nil</span>
            )}
          </div>
        </div>
      </div>
      <LatestQuizzes />
      <QuizzesTaken quizzesTaken={quizzesTaken} />
    </section>
  );
};

export default DashboardLayout;
