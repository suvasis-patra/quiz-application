import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type QuizCardProps = {
  title: string;
  level: string;
  numberOfQuestion: number;
  tag: string[];
  _id: string;
  description: string;
};

const QuizCard = ({
  level,
  numberOfQuestion,
  _id: quizId,
  tag,
  title,
  description,
}: QuizCardProps) => {
  const navigate = useNavigate();

  // Truncate description to 15 words
  const truncatedDescription =
    description.split(" ").slice(0, 15).join(" ") +
    (description.split(" ").length > 15 ? "..." : "");

  return (
    <article className="min-w-[250px] font-outfit bg-white border-2 border-black hover:shadow-dark rounded-lg overflow-hidden cursor-pointer transition-all duration-200">
      <div className="p-4 relative">
        <h3 className="text-xl font-bold mt-4 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-700 mb-4">{truncatedDescription}</p>
        <div className="flex items-center mb-2">
          <p className="text-sm text-gray-600">Questions:</p>
          <span className="ml-2 text-sm font-semibold">{numberOfQuestion}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {tag?.map((item) => (
            <span
              key={item}
              className="bg-purple-200 text-black text-xs font-medium py-1 px-2 rounded-full border border-black"
            >
              {item}
            </span>
          ))}
        </div>
        <span className="text-sm text-white absolute top-2 right-4 bg-green-500 px-2 py-1 rounded-md">
          {level.toUpperCase()}
        </span>
      </div>
      <div className="flex justify-center items-center w-full mb-4">
        <button
          className="bg-orange-500 text-white rounded-lg transition hover:shift hover:shadow-dark duration-100 font-semibold border border-black flex items-center gap-2 justify-center w-3/4 py-2"
          onClick={() => navigate(`/quizzes/${quizId}`)}
        >
          <GraduationCap />
          Play
        </button>
      </div>
    </article>
  );
};

export default QuizCard;
