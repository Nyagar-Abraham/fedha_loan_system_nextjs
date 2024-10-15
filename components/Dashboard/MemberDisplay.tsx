import { formatToCurrency } from "@/lib/utils";
import Image from "next/image";

interface MemberDisplayProps {
  loanCount: number;
  shares: number;
  name: string;
  email: string;
  avatar: string;
}

const MemberDisplay = ({
  loanCount,
  email,
  name,
  avatar,
  shares,
}: MemberDisplayProps) => {
  return (
    <div className="flex gap-7 rounded-md bg-gradient-to-tr px-2 py-4 shadow-md hover:shadow-lg dark:from-orange-950 dark:to-dark80  ">
      <div className="flex items-start justify-center p-3">
        <Image
          src={avatar}
          width={80}
          height={80}
          className="rounded-full border border-orange40 object-cover dark:border-orange70"
          alt={`${name}'s avatar`}
        />
      </div>
      <div>
        <p className="mb-2 text-xl font-semibold text-orange100">{name}</p>
        <p className="space-x-0 text-sm">
          <span className="text-orange90">@</span>
          {email}
        </p>
        <div className="mt-6 flex gap-4">
          <div className="flex items-center gap-2 rounded-full bg-orange70 px-3 py-1">
            <span className="text-base font-semibold">Shares</span>
            <span className="text-xl font-bold ">
              {formatToCurrency(shares)}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-orange70 px-3 py-1">
            <span className="text-base font-semibold">Loans</span>
            <span className="text-xl font-bold ">{loanCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDisplay;
