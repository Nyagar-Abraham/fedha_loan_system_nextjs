"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import SubmitButtom from "../shared/SubmitButtom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const SearchUsers = () => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="my-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
          setSubmitting(false);
        }}
      >
        <Label
          className="space-x-2 text-[1.1rem] capitalize dark:text-orange10"
          htmlFor="search"
        >
          Search for users <span className="text-orange70">*</span>
        </Label>
        <div className="flex items-center justify-between gap-6">
          <Input className="input" id="search" name="search" type="text" />
          <SubmitButtom
            submitTxt="search user"
            submittingTxt="searching"
            submitting={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};
