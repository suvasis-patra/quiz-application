import { AlertCircle, Search } from "lucide-react";

import { useGetQuizzes } from "../hooks/queries";
import Categories from "../components/Categories";
import SkeletonLoader from "../components/Skeleton";
import SelectLevel from "../components/SelectLevel";
import QuizCard, { QuizCardProps } from "../components/QuizCard";

const Quizzes = () => {
  const { data, isLoading, error } = useGetQuizzes();

  return (
    <main className="flex flex-col overflow-y-auto">
      <div className="flex flex-col gap-3 pb-3">
        <Categories />
        <SelectLevel />
      </div>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center p-6 bg-red-100 border border-red-300 rounded-lg">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-lg font-semibold text-red-600">
              Oops! Something went wrong.
            </p>
            <p className="text-sm text-red-500 mt-2">
              We couldn't load the quizzes. Please try again later.
            </p>
          </div>
        ) : Array.isArray(data) && data.length > 0 ? (
          data.map((quiz: QuizCardProps) => (
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
          <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-100 border border-gray-300 rounded-lg">
            <Search className="h-12 w-12 text-gray-500 mb-4" />
            <p className="text-lg font-semibold text-gray-600">
              No quizzes found
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Try adjusting your filters or come back later to find available
              quizzes.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Quizzes;
