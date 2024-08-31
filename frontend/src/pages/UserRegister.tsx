import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterUserSchema } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterUser } from "../hooks/queries";
import { useState } from "react";
import { errorMessage } from "../utils";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import { RotatingLines } from "react-loader-spinner";

export type TUser = z.infer<typeof RegisterUserSchema>;

const UserRegister = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();
  const { isPending, mutateAsync: registerUser } = useRegisterUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterUserSchema>>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof RegisterUserSchema>) => {
    try {
      setErrorMsg("");
      setSuccessMsg("");
      const response = await registerUser(data);
      if (response?.statusCode === 201) {
        setSuccessMsg("Registered successfully!");
        reset();
        navigate("/auth/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.errorCode;
        console.log(errorCode);
        setErrorMsg(errorMessage(errorCode));
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="font-exo font-bold text-3xl mb-3">
          Welcome to QuizMaster!
        </h1>
        <p
          className="text-lg
        font-bold"
        >
          Registe here
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col  w-full font-outfit text-black">
          <div className="flex flex-col w-full">
            <label htmlFor="fullName" className="input_label">
              full name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Jhon doe"
              className="input_field"
              disabled={isPending}
              {...register("fullName")}
            />
            {errors.fullName ? (
              <p className="input_message">{errors.fullName.message}</p>
            ) : null}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="username" className="input_label">
              username
            </label>
            <input
              id="username"
              type="text"
              placeholder="jhondoe_10"
              className="input_field"
              disabled={isPending}
              {...register("username")}
            />
            {errors.username ? (
              <p className="input_message">{errors.username.message}</p>
            ) : null}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="input_label">
              email
            </label>
            <input
              id="email"
              type="email"
              placeholder="jhondoe@gmail.com"
              className="input_field"
              disabled={isPending}
              {...register("email")}
            />
            {errors.email ? (
              <p className="input_message">{errors.email.message}</p>
            ) : null}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="input_label">
              password
            </label>
            <input
              id="password"
              type="password"
              placeholder="******"
              className="input_field"
              disabled={isPending}
              {...register("password")}
            />
            {errors.password ? (
              <p className="input_message">{errors.password.message}</p>
            ) : null}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmPassword" className="input_label">
              confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="input_field"
              placeholder="******"
              disabled={isPending}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <p className="input_message">{errors.confirmPassword.message}</p>
            ) : null}
          </div>
          <ErrorMessage message={errorMsg} />
          <SuccessMessage message={successMsg} />
          <button
            className="w-full p-2 flex items-center justify-center bg-black text-white mt-3 md:mt-5 rounded-lg"
            disabled={isPending}
          >
            {isPending ? (
              <RotatingLines
                visible={true}
                width="20"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            ) : (
              "click to register"
            )}
          </button>
        </div>
        <p className="text-base mt-2 text-center font-outfit">
          Already have an account?
          <Link to="/auth/login" className="underline">
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserRegister;
