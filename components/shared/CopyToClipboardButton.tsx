"use client";

import copy from "clipboard-copy";
import { Copy, CopyCheck } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const CopyToClipboardButton = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      await copy(text);
      setIsCopied(true);
    } catch (error) {
      console.log("Failed to copy text to clipboard", error);
    }
  };

  return (
    <Button className={cn(`flex gap-2 ${className}`)} onClick={handleCopyClick}>
      {text}

      {isCopied ? (
        <CopyCheck className="text-orange70" />
      ) : (
        <Copy className="text-orange70" />
      )}
    </Button>
  );
};

export default CopyToClipboardButton;
