"use client";

import { formUrlQuery } from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 rounded-md bg-orange90 px-5 py-2 text-white">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="bg-inherit text-xl text-white hover:bg-orange80"
      >
        <p className="">Prev</p>
      </Button>
      <div className=" rounded-md bg-white px-3 text-orange80">
        <p className="text-2xl ">{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="bg-inherit text-xl text-white hover:bg-orange80"
      >
        <p className="">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
