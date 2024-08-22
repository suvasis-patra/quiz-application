import Categories from "../components/Categories";
import QuizCard, { QuizCardProps } from "../components/QuizCard";
import SelectLevel from "../components/SelectLevel";
import { useGetQuizzes } from "../hooks/queries";

const Quizzes = () => {
  const { data, isLoading, error } = useGetQuizzes();
  console.log(data);
  return (
    <main className="flex flex-col overflow-y-auto">
      <div className="flex flex-col gap-3 pb-3">
        <Categories />
        <SelectLevel />
      </div>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-16">
        {Array.isArray(data) ? (
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
          <p>No quizzes found</p>
        )}
      </section>
    </main>
  );
};

export default Quizzes;
