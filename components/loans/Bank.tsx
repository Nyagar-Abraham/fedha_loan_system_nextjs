/* eslint-disable no-unused-vars */
import { Link } from "lucide-react";
import Image from "next/image";

import { IBank } from "@/database/bank.model";

import CopyToClipboardButton from "../shared/CopyToClipboardButton";
import List from "../shared/List";

interface BankProps {
  bank: IBank;
}

enum Banks {
  BRANCHCODE = "branchCode",
  EMAIL = "contact email",
  PHONE = "contact phone",
  WEBSITE = "website",
  ESTABLISHEMENTYEAR = "establishment year",
}

const Bank = ({ bank }: BankProps) => {
  console.log(bank.website);
  return (
    <div className="bg-dark80-light30 flex w-fit min-w-[32rem] flex-col gap-3 rounded-sm p-2 pt-4">
      <div className=" flex items-center justify-between gap-8 overscroll-contain">
        <div>
          <p className="text-[1rem] uppercase tracking-wide text-orange-950 dark:text-orange30">
            {bank?.name}
          </p>
          <p className="text-[0.9rem]  tracking-wide text-orange-950/80 dark:text-orange30/80">
            {bank?.headquarters}
          </p>
        </div>
        <div className="flex h-full items-center justify-center pr-2 ">
          <Image
            src={bank?.logo ? bank?.logo : ""}
            className="aspect-square rounded-full "
            width={50}
            height={50}
            alt={`${bank?.name} logo`}
          />
        </div>
      </div>
      <div className=" rounded-sm border border-orange10/10 p-2 ">
        <div className="grid grid-cols-2 gap-4">
          <Attribute label={Banks.BRANCHCODE} value={bank?.branchCode} />
          <Attribute
            label={Banks.ESTABLISHEMENTYEAR}
            value={bank?.establishedYear}
          />
          <Attribute label={Banks.EMAIL} value={bank?.contactEmail} />
          <Attribute label={Banks.PHONE} value={bank?.contactPhone} />
          <Attribute label={Banks.WEBSITE} value={bank?.website} />
        </div>

        <List heading="services" listItems={bank?.services} />
      </div>
    </div>
  );
};

function Attribute({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="w-80 ">
      <p className="text-[0.8rem]  capitalize  text-orange-950/70 dark:text-orange10/50 ">
        {label}
      </p>
      {label === Banks.EMAIL || label === Banks.PHONE ? (
        <CopyToClipboardButton
          className="bg-dark80-light30 hover:bg-dark80-light30 px-0 shadow-none"
          text={value.toString()}
        />
      ) : Banks.WEBSITE === label ? (
        <Link
          className=""
          target="_blank"
          rel="noopener noreferrer"
          href={value.toString()}
        >
          {value}
        </Link>
      ) : (
        <p className="font-bold ">{value}</p>
      )}
    </div>
  );
}

export default Bank;
