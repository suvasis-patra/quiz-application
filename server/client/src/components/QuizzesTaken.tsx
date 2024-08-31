import QuizCard, { QuizCardProps } from "./QuizCard";

type QuizProp = {
  quizzesTaken: {
    quiz: QuizCardProps;
    score: number;
  }[];
};

const QuizzesTaken = ({ quizzesTaken }: QuizProp) => {
  console.log("FROM QUIZ TAKEN:", quizzesTaken);
  return (
    <section className="flex flex-col gap-3 mt-4">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Quizzes Taken</h3>
        <button className="btn hover:bg-orange-500 capitalize">see all</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
        {quizzesTaken ? (
          quizzesTaken?.map(({ quiz }: { quiz: QuizCardProps }) => {
            console.log(quiz);
            return (
              <QuizCard
                key={quiz._id}
                title={quiz.title}
                description={quiz.description}
                level={quiz.level}
                tag={quiz.tag}
                numberOfQuestion={quiz.numberOfQuestion}
                _id={quiz._id}
              />
            );
          })
        ) : (
          <p>No quizzes found</p>
        )}
      </div>
    </section>
  );
};

export default QuizzesTaken;
