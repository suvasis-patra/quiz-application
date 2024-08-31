import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { errorMessage } from "../utils";
import { useAuth } from "../hooks/userAuth";
import { useLoginUser } from "../hooks/queries";
import { LoginUserSchema } from "../utils/validation";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import { RotatingLines } from "react-loader-spinner";

export type TUserLoginInfo = z.infer<typeof LoginUserSchema>;

const UserLogin = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isPending, mutateAsync: loginUser } = useLoginUser();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginUserSchema>>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof LoginUserSchema>) => {
    try {
      setErrorMsg("");
      setSuccessMsg("");
      const response = await loginUser(data);
      if (response.statusCode === 200) {
        setSuccessMsg("logged in!");
        reset();
        login({
          userId: response?.data?.userId,
          role: response?.data?.role,
          username: response?.data?.username,
        });
        navigate("/dashboard");
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
        <h1 className="font-exo font-bold text-3xl mb-3">Welcome Back!</h1>
        <p
          className="text-lg
        font-bold"
        >
          Login here
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col  w-full font-outfit text-black">
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
                strokeWidth="3"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            ) : (
              "click to login"
            )}
          </button>
        </div>
        <p className="text-base mt-2 text-center font-outfit">
          Don't have an account?
          <Link to="/auth/register" className="underline">
            register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
