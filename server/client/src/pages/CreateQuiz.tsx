import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { MessageSquarePlus, PackagePlus } from "lucide-react";

import { CreateQuizSchema } from "../utils/validation";
import { QUIZ_CATEGORIES } from "../utils/constant";
import { useCreateQuize } from "../hooks/queries";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { RotatingLines } from "react-loader-spinner";

export type QuizFormData = z.infer<typeof CreateQuizSchema>;

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync: createQuiz, isError } = useCreateQuize();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(CreateQuizSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tag: "",
      level: "easy",
      questions: [
        {
          question: "",
          answerOptions: ["", "", "", ""],
          correctAnswer: "",
          marks: 1,
        },
      ],
    },
  });

  const { fields: questionFields, append: appendQuestion } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data: QuizFormData) => {
    try {
      const response = await createQuiz(data);
      if (response?.statusCode === 201) {
        reset();
        navigate("/dashboard/quizzes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="border font-outfit border-black rounded-lg mx-4 md:mx-8 lg:mx-10 my-2 md:my-8 py-4 md:py-8 flex flex-col bg-purple">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:min-w-[500px] lg:min-w-[700px] min-w-[300px] mx-auto"
      >
        <div className="flex flex-col gap-1 w-full">
          <label className="input_label" htmlFor="title">
            Title of the Quiz
          </label>
          <input
            type="text"
            id="title"
            className="input_field"
            {...register("title")}
            placeholder="Enter the quiz title here..."
            disabled={isPending}
          />
          {errors.title && (
            <p className="input_message">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="input_label" htmlFor="description">
            Brief Description
          </label>
          <textarea
            placeholder="Briefly describe the quiz here..."
            className="input_field"
            rows={3}
            id="description"
            {...register("description")}
            disabled={isPending}
          />
          {errors.description && (
            <p className="input_message">{errors.description.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="input_label" htmlFor="level">
            Choose level
          </label>
          <select
            className="input_field"
            {...register("level")}
            id="level"
            disabled={isPending}
          >
            <option value="" disabled>
              Select difficulty level
            </option>
            <option value="hard">Hard</option>
            <option value="medium">Medium</option>
            <option value="easy">Easy</option>
          </select>
          {errors.level && (
            <p className="input_message">{errors.level.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="input_label" htmlFor="category">
            Select Category
          </label>
          <select
            id="category"
            className="input_field"
            {...register("category")}
            disabled={isPending}
          >
            <option value="" disabled>
              Select a category
            </option>
            {QUIZ_CATEGORIES.filter((category) => category !== "All").map(
              (category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              )
            )}
          </select>
          {errors.category && (
            <p className="input_message">{errors.category.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="input_label" htmlFor="tag">
            Add tags
          </label>
          <input
            id="tag"
            type="text"
            className="input_field"
            {...register("tag")}
            placeholder="Enter the quiz-related tags, comma-separated!"
            disabled={isPending}
          />
          {errors.tag && <p className="input_message">{errors.tag.message}</p>}
        </div>

        <div className="flex flex-col gap-1 w-full mt-4">
          <h3 className="font-semibold text-lg">Questions</h3>
          {questionFields.map((field, index) => (
            <div key={field.id} className="border p-4 my-2 rounded-lg">
              <div className="flex flex-col gap-1">
                <label
                  className="input_label"
                  htmlFor={`questions.${index}.question`}
                >
                  Question {index + 1}
                </label>
                <textarea
                  id={`questions.${index}.question`}
                  className="input_field"
                  rows={2}
                  {...register(`questions.${index}.question` as const)}
                  placeholder="e.g. Who is the best footballer in the world?"
                  disabled={isPending}
                />
                {errors.questions?.[index]?.question && (
                  <p className="input_message">
                    {errors.questions[index].question?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <label className="input_label">Answer Options</label>
                {field.answerOptions.map((_, optionIndex) => (
                  <input
                    key={optionIndex}
                    className="input_field"
                    {...register(
                      `questions.${index}.answerOptions.${optionIndex}` as const
                    )}
                    placeholder={`Option ${optionIndex + 1}`}
                    disabled={isPending}
                  />
                ))}
                {errors.questions?.[index]?.answerOptions && (
                  <p className="input_message">
                    {errors.questions[index].answerOptions?.[0]?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <label
                  className="input_label"
                  htmlFor={`questions.${index}.correctAnswer`}
                >
                  Correct Answer
                </label>
                <input
                  className="input_field"
                  id={`questions.${index}.correctAnswer`}
                  {...register(`questions.${index}.correctAnswer` as const)}
                  placeholder="e.g. Option 3"
                  disabled={isPending}
                />
                {errors.questions?.[index]?.correctAnswer && (
                  <p className="input_message">
                    {errors.questions[index].correctAnswer?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <label
                  className="input_label"
                  htmlFor={`questions.${index}.marks`}
                >
                  Marks
                </label>
                <input
                  type="number"
                  id={`questions.${index}.marks`}
                  className="input_field"
                  {...register(`questions.${index}.marks` as const, {
                    valueAsNumber: true,
                  })}
                  defaultValue={field.marks}
                  disabled={isPending}
                />
                {errors.questions?.[index]?.marks && (
                  <p className="input_message">
                    {errors.questions[index].marks?.message}
                  </p>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              appendQuestion({
                question: "",
                answerOptions: ["", "", "", ""],
                correctAnswer: "",
                marks: 1,
              })
            }
            className="cta-btn hover:shift hover:shadow-dark hover:bg-blue max-w-[250px] flex items-center gap-2 justify-center"
            style={{ cursor: isPending ? "not-allowed" : "pointer" }}
          >
            <span>
              <MessageSquarePlus />
            </span>
            Add Question
          </button>
        </div>
        {isError && (
          <ErrorMessage message="Failed to create quiz. Please try again!" />
        )}
        <button
          type="submit"
          disabled={isPending}
          className="cta-btn hover:shift hover:shadow-dark w-full mt-8 text-xl flex justify-end items-center gap-2 md:gap-4 hover:bg-orange-600"
          style={{ cursor: isPending ? "not-allowed" : "pointer" }}
        >
          {isPending ? (
            <RotatingLines
              visible={true}
              width="20"
              strokeWidth="3"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          ) : (
            <>
              <span>
                <PackagePlus />
              </span>
              Create Quiz
            </>
          )}
        </button>
      </form>
    </section>
  );
};

export default CreateQuiz;
