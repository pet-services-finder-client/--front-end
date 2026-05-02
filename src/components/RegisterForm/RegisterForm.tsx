import type { AppDispatch, RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { registerThunk } from "@/features/authSlice";
import { Eye, EyeOff, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { registerSchema, type RegisterFormValues } from "./registerSchema";
type Props = {
  onClose: () => void;
  onSwitchModal: () => void;
};
export const RegisterForm: React.FC<Props> = ({ onClose, onSwitchModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await dispatch(
        registerThunk({
          email: data.email,
          full_name: data.full_name,
          password: data.password,
        }),
      ).unwrap();
      onClose();
      navigate("/petCreate");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 w-full max-w-[648px] relative shadow-lg">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-10 w-2/3 rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-12 w-full rounded-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-12 w-full rounded-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-12 w-full rounded-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-12 w-full rounded-full" />
          </div>

          <Skeleton className="h-14 w-full rounded-full mt-4" />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl p-8 w-full max-w-[648px] relative shadow-lg">
      <X onClick={onClose} className="absolute top-7 right-8 cursor-pointer" />
      <h2 className="h3 mb-8">Enter your information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="full_name" className="text-main">
            Full name
          </label>
          <Input
            id="full_name"
            type="text"
            placeholder="Full name"
            {...register("full_name")}
            className=" rounded-full !bg-gray-100 px-6 py-[18px] border-gray-200 placeholder:secondary-text focus-visible:ring-primary"
          />
          {errors.full_name && (
            <p className="text-sm text-red-500">{errors.full_name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-main">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
            className=" rounded-full !bg-gray-100 px-6 py-[18px] border-gray-200 placeholder:secondary-text focus-visible:ring-primary"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-main">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className=" rounded-full !bg-gray-100 px-6 py-[18px] border-gray-200 placeholder:secondary-text focus-visible:ring-primary pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="text-main">
            Repeat password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat password"
              {...register("confirmPassword")}
              className=" rounded-full !bg-gray-100 px-6 py-[18px] border-gray-200 placeholder:secondary-text focus-visible:ring-primary pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="btn-primary w-full h-[52px] rounded-full text-white mt-2"
        >
          {loading ? "Завантаження..." : "Next"}
        </Button>

        <button
          type="button"
          className="text-sm text-primary underline text-center"
          onClick={onSwitchModal}
        >
          Already have an account? Log in
        </button>
      </form>
    </div>
  );
};
