import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { resetPasswordThunk } from "@/features/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { passwordSchema } from "@/utils/passwordSchema";

const ResetByTokenSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

type ResetByTokenFormValues = z.infer<typeof ResetByTokenSchema>;

export const Resetpasswordform: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetByTokenFormValues>({
    resolver: zodResolver(ResetByTokenSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetByTokenFormValues) => {
    try {
      await dispatch(
        resetPasswordThunk({ token, new_password: data.password }),
      ).unwrap();
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  // ─── Invalid / missing token ──────────────────────────────────────
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl px-7 py-12 w-full max-w-[648px] shadow-lg text-center">
          <h2 className="h3 mb-4">Невірне посилання</h2>
          <p className="text-sm text-gray-500 mb-6">
            Посилання для відновлення паролю недійсне або застаріле.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="btn-primary h-[52px] rounded-full text-white px-8"
          >
            На головну
          </Button>
        </div>
      </div>
    );
  }

  // ─── Success state ────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl px-7 py-12 w-full max-w-[648px] shadow-lg text-center">
          <h2 className="h3 mb-4">Пароль змінено!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Ваш пароль успішно оновлено. Тепер ви можете увійти.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="btn-primary h-[52px] rounded-full text-white px-8"
          >
            Увійти
          </Button>
        </div>
      </div>
    );
  }

  // ─── Form ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl px-7 pt-[84px] pb-[26px] w-full max-w-[648px] shadow-lg">
        <h2 className="h3">Відновлення паролю</h2>
        <span className="mb-8 text-sm text-gray-500">
          Введіть і підтвердіть новий пароль нижче
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          {/* NEW PASSWORD */}
          <div className="flex flex-col gap-1">
            <label htmlFor="new-password" className="text-sm text-gray-600">
              Введіть новий пароль
            </label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="Введіть новий пароль"
                {...register("password")}
                className="rounded-full !bg-gray-100 border-gray-200 px-6 py-4 placeholder:text-gray-400 focus-visible:ring-primary"
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

          {/* CONFIRM PASSWORD */}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirm-password" className="text-sm text-gray-600">
              Повторіть пароль
            </label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="Повторіть пароль"
                {...register("confirmPassword")}
                className="rounded-full !bg-gray-100 border-gray-200 px-6 py-4 placeholder:text-gray-400 focus-visible:ring-primary"
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

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="btn-primary w-full h-[52px] rounded-full text-white mt-2"
          >
            {loading ? "Збереження..." : "Зберегти новий пароль"}
          </Button>
        </form>
      </div>
    </div>
  );
};
