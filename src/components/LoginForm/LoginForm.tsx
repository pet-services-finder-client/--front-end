import type React from "react";

import { Button } from "../ui/button";

import { Input } from "../ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { loginThunk } from "@/features/authSlice";
import { Eye, EyeOff, X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginFormValues } from "./LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onSwitchModal: () => void;
  onClose: () => void;
};

export const LoginForm: React.FC<Props> = ({ onSwitchModal, onClose }) => {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await dispatch(
        loginThunk({ email: data.email, password: data.password }),
      ).unwrap();

      onClose();
      navigate("/petCreate");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="bg-white relative rounded-2xl px-7 pt-[84px] pb-[26px] w-full max-w-[648px] shadow-lg">
        {/* TITLE */}
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-64 mb-8" />

        {/* EMAIL */}
        <div className="flex flex-col gap-2 mb-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-[60px] w-full rounded-full" />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-2 mb-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-[60px] w-full rounded-full" />
        </div>

        {/* BUTTON */}
        <Skeleton className="h-[52px] w-full rounded-full mt-2" />

        {/* LINK */}
        <Skeleton className="h-4 w-40 mx-auto mt-6" />
      </div>
    );
  }

  return (
    <div className="bg-white relative rounded-2xl px-7 pt-[84px] pb-[26px] w-full max-w-[648px]  shadow-lg">
      <X className=" absolute cursor-pointer top-6 right-7" onClick={onClose} />
      <h2 className="h3">Login</h2>
      <span className="mb-8">Enter your email and password</span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
            className=" rounded-full px-6 py-[18px] !bg-gray-100 border-gray-200 placeholder:secondary-text focus-visible:ring-primary"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-gray-600">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className=" rounded-full !bg-gray-100 border-gray-200 px-6 py-[18px] placeholder:secondary-text focus-visible:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="btn-primary w-full h-[52px] rounded-full text-white mt-2"
        >
          {loading ? "Завантаження..." : "Log in"}
        </Button>

        <button
          type="button"
          className="text-sm text-primary underline text-center"
          onClick={onSwitchModal}
        >
          Forgot password?
        </button>
      </form>
    </div>
  );
};
