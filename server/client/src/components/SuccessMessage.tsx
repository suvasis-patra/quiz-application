import { CircleCheck } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

const SuccessMessage = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="bg-purple p-3 flex gap-x-2 text-white items-center text-sm rounded-md">
      <CircleCheck className="text-white" />
      <p>{message}</p>
    </div>
  );
};

export default SuccessMessage;
