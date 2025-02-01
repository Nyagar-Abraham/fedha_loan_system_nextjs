"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className="space-x-2 bg-orange70 text-[1rem] font-semibold text-[0.9]  text-white hover:bg-orange80 "
      onClick={() => router.back()}
    >
      {" "}
      <ArrowLeft /> back
    </Button>
  );
};

export default BackButton;
