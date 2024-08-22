import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

const ErrorMessage = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-orange-950 flex gap-x-2 text-base text-red-500 rounded-md p-3 items-center justify-center mt-3 md:mt-5 hover:shadow-dark hover:shift transition duration-100">
      <TriangleAlert />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
