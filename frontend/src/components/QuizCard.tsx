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

  return (
    <article className="min-w-[250px] font-outfit bg-white border border-black hover:shadow-dark rounded-lg overflow-hidden  cursor-pointer">
      <div className="p-4 relative">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex items-center mb-2">
          <p className="text-sm text-gray-600">Questions: </p>
          <span className="ml-2 text-sm font-semibold">{numberOfQuestion}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {tag?.map((item) => (
            <span
              key={item}
              className="bg-purple text-black text-xs font-medium py-1 px-2 rounded-full border border-black"
            >
              {item}
            </span>
          ))}
        </div>
        <span className="text-sm text-black absolute top-2 right-4 bg-green-500 p-1 rounded-md">
          {level.toLocaleUpperCase()}
        </span>
      </div>
      <div className="flex justify-center items-center w-full my-2">
        <button
          className="hover:bg-orange-500 rounded-lg transition duration-100 font-semibold border border-black  flex items-center gap-2 justify-center w-1/2 py-2"
          onClick={() => navigate(`/quizzes/${quizId}`)}
        >
          <span>
            <GraduationCap />
          </span>
          Play
        </button>
      </div>
    </article>
  );
};

export default QuizCard;
