import * as z from "zod";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRightFromLine, BadgePlus, ClipboardCheck } from "lucide-react";

import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import { useCheckQuiz, useGetQuizById } from "../hooks/queries";

const PlayQuizSchema = z.object({
  answers: z.array(z.string().min(1, "Answer is required")),
});

export type PlayQuizFormData = z.infer<typeof PlayQuizSchema>;

type Question = {
  question: string;
  answerOptions: string[];
  marks: number;
};

type Feedback = {
  isAnswerCorrect: boolean;
  question: string;
  givenAnswer: string;
  correctAnswer: string;
};

const PlayQuiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  if (!quizId) return null;

  const { data, isLoading } = useGetQuizById(quizId);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PlayQuizFormData>({
    resolver: zodResolver(PlayQuizSchema),
    defaultValues: {
      answers: Array(data?.data?.questionsWithoutAnswer?.length || 0).fill(""),
    },
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [showResult, setShowResult] = useState(false);

  const { mutateAsync: checkQuiz, isPending, isSuccess } = useCheckQuiz();

  const onSubmit = async (formData: PlayQuizFormData) => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { answers } = formData;
      const response = await checkQuiz({ answers, quizId });
      console.log(response?.data.feedback[0]);
      setSuccessMsg("Submitted your response!");
      setFeedback(response?.data?.feedback || []);
      console.log(feedback);
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

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

  return (
    <section className="border relative font-outfit border-black rounded-lg mx-4 md:mx-8 lg:mx-10 my-2 md:my-8 py-4 md:py-8 flex flex-col bg-blue">
      {/* {isSuccess ? <div className="absolue top-1 left-4"><span>{feedback?.}</span></div>:null} */}
      <div>
        <h3 className="text-center text-2xl capitalize font-bold">
          {data?.data?.title}
        </h3>
      </div>
      {isSuccess ? (
        <div className="md:min-w-[500px] lg:min-w-[700px] min-w-[300px] mx-auto mt-4 md:mt-8 space-y-4">
          {!showResult && (
            <>
              <SuccessMessage message="Your response submitted!" />
              <button
                className="cta-btn hover:shift hover:shadow-dark w-full mt-8 text-xl flex justify-end items-center gap-2 md:gap-4 hover:bg-orange-600"
                onClick={() => setShowResult(true)}
              >
                <span>
                  <ClipboardCheck />
                </span>
                Show Result
              </button>
            </>
          )}
          {showResult &&
            feedback.length > 0 &&
            feedback?.map((item, index) => (
              <div key={index} className="">
                <h3 className="text-lg lg:text-xl font-semibold mb-2">
                  {index + 1}. {item.question}
                </h3>
                <p className="p-2">
                  Correct Answer:{" "}
                  <span className="text-white p-2 rounded-md text-sm md:text-base lg:text-lg">
                    {item.correctAnswer}
                  </span>
                </p>
                <p className="p-2">
                  Your Answer :{" "}
                  <span
                    className="text-white p-2 rounded-md text-sm md:text-base lg:text-lg"
                    style={{
                      backgroundColor: item.isAnswerCorrect
                        ? "rgb(22 163 74)"
                        : "rgb(220 38 38)",
                    }}
                  >
                    {item.givenAnswer}
                  </span>
                </p>
              </div>
            ))}
          <button
            className="cta-btn hover:shift hover:shadow-dark w-full mt-8 text-xl flex justify-end items-center gap-2 md:gap-4 hover:bg-orange-600"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
            <span>
              <ArrowRightFromLine />
            </span>
          </button>
        </div>
      ) : (
        <div className="md:min-w-[500px] lg:min-w-[700px] min-w-[300px] mx-auto mt-4 md:mt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {data?.data?.questionsWithoutAnswer?.map(
              (q: Question, questionIndex: number) => (
                <div key={questionIndex} className="mb-6">
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">
                    {questionIndex + 1}. {q.question}
                  </h3>
                  <div className="space-y-3">
                    {q.answerOptions.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center">
                        <Controller
                          name={`answers.${questionIndex}`}
                          control={control}
                          render={({ field }) => (
                            <label className="flex items-center space-x-2">
                              <input
                                disabled={isPending}
                                type="radio"
                                {...field}
                                value={option}
                                checked={field.value === option}
                                className="form-radio h-4 w-4 text-blue-600"
                              />
                              <span className="text-sm md:text-base lg:text-lg">
                                {option}
                              </span>
                            </label>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                  {errors.answers?.[questionIndex] && (
                    <span className="text-red-500 text-sm">
                      {errors.answers[questionIndex]?.message}
                    </span>
                  )}
                </div>
              )
            )}
            <SuccessMessage message={successMsg} />
            <ErrorMessage message={errorMsg} />
            <button
              type="submit"
              disabled={isPending}
              className="cta-btn hover:shift hover:shadow-dark w-full mt-8 text-xl flex justify-end items-center gap-2 md:gap-4 hover:bg-orange-600"
              style={{ cursor: isPending ? "not-allowed" : "pointer" }}
            >
              {!isPending ? (
                <>
                  <span>
                    <BadgePlus />
                  </span>
                  Submit Quiz
                </>
              ) : (
                <RotatingLines
                  visible={true}
                  width="20"
                  strokeWidth="3"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              )}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default PlayQuiz;
