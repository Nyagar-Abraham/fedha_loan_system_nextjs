import Image from "next/image";
import bg from "@/public/bg.jpg";
// import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="mt-24  ">
      <Image
        src={bg}
        fill
        placeholder="blur"
        className="  object-cover object-top"
        quality={90}
        alt="Fedha group background image "
      />
      <div className="relative z-10  flex flex-col items-center rounded-lg p-7 text-center backdrop-blur-sm">
        <h1 className="mb-2 bg-gradient-to-r from-orange100 to-orange70 bg-clip-text text-6xl font-normal tracking-tighter text-transparent">
          Fedha Youth Group
        </h1>
        <p
          className="my-6 text-xl text-orange50 md:px-8
        "
        >
          Join the Fedha Youth Group System to easily manage your savings,
          loans, shares, and dividends. Empower your financial journey with
          seamless tools for tracking contributions, applying for loans, and
          earning rewards!
        </p>
        <div className="flex items-center gap-8 rounded-md p-4 ">
          <Link
            href="/loan"
            className="line-clamp-1 rounded-md border-2 border-green90 px-6 py-3 text-xl  font-semibold text-green90  hover:border-green80 hover:bg-green80 hover:text-green10"
          >
            Apply Loan
          </Link>
          <Link
            href="/dashboard"
            className="line-clamp-1 rounded-md border-2 border-orange100 px-6 py-3 text-xl font-semibold  text-orange100   hover:border-orange80 hover:bg-orange80 hover:text-orange10"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
