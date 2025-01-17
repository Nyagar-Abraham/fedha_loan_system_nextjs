import Link from "next/link";

const Noloan = () => {
  return (
    <div className="flex-center h-60 w-full rounded-md bg-dark10 shadow-md dark:bg-dark80">
      <Link
        href="/loan"
        className="rounded-md px-6 py-2 text-2xl font-semibold text-blue-500 hover:bg-dark20 hover:text-blue-700 dark:hover:bg-dark90 "
      >
        {" "}
        Apply Loan{" "}
      </Link>
    </div>
  );
};

export default Noloan;
