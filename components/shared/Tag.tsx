/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteIcon } from "lucide-react";

import { Badge } from "../ui/badge";

const Tag = ({ item, onClick }: { item: string; onClick: any }) => {
  return (
    <Badge
      variant="outline"
      className="bg-dark80-light30 flex items-center gap-3 px-4 py-1 text-[0.9rem] hover:text-orange70"
    >
      <span>{item}</span>
      <span className="p-1" onClick={onClick}>
        <DeleteIcon className="size-5 " />
      </span>
    </Badge>
  );
};

export default Tag;
