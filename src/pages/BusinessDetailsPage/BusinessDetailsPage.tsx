import { getBusines } from "@/api/business";
import type { BusinessListItem } from "@/types";
import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BusinessDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [busines, setBusines] = useState<BusinessListItem | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getBusines(Number(id)).then((res) => {
      setBusines(res);
    });
  }, [id]);
  return (
    <div>
      <h1>{busines?.name}</h1>
    </div>
  );
};
