import type React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { forgotPasswordThunk } from "@/features/authSlice";
import { useState } from "react";

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Невірний email"),
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onClose: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await dispatch(forgotPasswordThunk({ email: data.email })).unwrap();
      setSent(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white relative rounded-2xl px-7 pt-[84px] pb-[26px] w-full max-w-[648px] shadow-lg">
      <X className="absolute cursor-pointer top-6 right-7" onClick={onClose} />

      <h2 className="h3">Забули пароль?</h2>

      {sent ? (
        // ─── Success state ───────────────────────────────────────────
        <div className="mt-4 flex flex-col gap-6">
          <p className="text-sm text-gray-500">
            Якщо цей email зареєстрований, ми надіслали інструкції для
            відновлення паролю. Перевірте вашу пошту.
          </p>
          <Button
            onClick={onClose}
            className="btn-primary w-full h-[52px] rounded-full text-white"
          >
            Закрити
          </Button>
        </div>
      ) : (
        // ─── Form ────────────────────────────────────────────────────
        <>
          <span className="mb-8 text-sm text-gray-500">
            Введіть електронну пошту щоб відновити пароль
          </span>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-4"
          >
            <div className="flex flex-col gap-1">
              <Input
                id="forgot-email"
                type="email"
                placeholder="Електронна пошта"
                {...register("email")}
                className="rounded-full px-6 py-5 !bg-gray-100 border-gray-200 placeholder:text-gray-400 focus-visible:ring-primary"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-[52px] rounded-full text-white mt-2"
            >
              {loading ? "Надсилання..." : "Надіслати"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
