import { useNavigate } from "react-router-dom";
import { useGetLatestQuizzes } from "../hooks/queries";
import QuizCard, { QuizCardProps } from "./QuizCard";
import SkeletonLoader from "./Skeleton";

const LatestQuizzes = () => {
  const { data, isLoading } = useGetLatestQuizzes();
  console.log(data);
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-3 mt-4">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Latest Quizzes</h3>
        <button
          className="btn hover:bg-orange-500 capitalize"
          onClick={() => navigate("/dashboard/quizzes")}
        >
          sea all
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : Array.isArray(data?.data) ? (
          data?.data?.map((quiz: QuizCardProps) => (
            <QuizCard
              key={quiz._id}
              title={quiz.title}
              description={quiz.description}
              level={quiz.level}
              tag={quiz.tag}
              numberOfQuestion={quiz.numberOfQuestion}
              _id={quiz._id}
            />
          ))
        ) : (
          <p>No quizzes found</p>
        )}
      </div>
    </section>
  );
};

export default LatestQuizzes;
