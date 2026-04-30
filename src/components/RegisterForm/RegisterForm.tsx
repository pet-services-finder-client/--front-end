import type { AppDispatch, RootState } from "@/app/store";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { registerThunk } from "@/features/authSlice";
import { Eye, EyeOff, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
type Props = {
  onClose: () => void;
  onSwitchModal: () => void;
};
export const RegisterForm: React.FC<Props> = ({ onClose, onSwitchModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [full_name, setFull_name] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("password dont match");
      return;
    }
    setPasswordError("");

    const result = await dispatch(
      registerThunk({ email, password, full_name }),
    );

    if (registerThunk.fulfilled.match(result)) {
      onClose();
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="full_name" className="text-main">
            Full name
          </label>
          <Input
            id="full_name"
            type="text"
            placeholder="Full name"
            required
            value={full_name}
            onChange={(e) => setFull_name(e.target.value)}
            className="h-[48px] rounded-full border-gray-200 placeholder:text-gray-300 focus-visible:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-main">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[48px] rounded-full border-gray-200 placeholder:text-gray-300 focus-visible:ring-primary"
          />
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[48px] rounded-full border-gray-200 placeholder:text-gray-300 focus-visible:ring-primary pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
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
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-[48px] rounded-lg border-gray-200 placeholder:text-gray-300 focus-visible:ring-primary pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}
        </div>

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
