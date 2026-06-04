import { useNavigate } from "react-router-dom";

export const BtnBack = () => {
  const navigate = useNavigate();
  return (
    <button
      className="text-primary btn-text md:col-span-12"
      onClick={() => navigate(-1)}
    >
      Назад
    </button>
  );
};
