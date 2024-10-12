import Image from "next/image";
import bg from "@/public/bg.jpg";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { createMember } from "@/lib/actions/member.actions";

export default async function Home() {
  // await createMember({
  // name: "me",
  // username: "mes",
  // email: "abu@ego.com",
  // picture: "ddfft",
  // path: "/",
  // clerkId: "465456",
  // });
  return (
    <main className="mt-24 bg-gradient-to-r from-gray-300 to-gray-200 ">
      <Image
        src={bg}
        fill
        placeholder="blur"
        className="bg-gradient-to-r from-gray-300 to-gray-200 object-cover object-top"
        quality={90}
        alt="Fedha group background image "
      />
      <div className="relative z-10  flex flex-col items-center rounded-lg p-8 text-center backdrop-blur-md ">
        <h1 className="mb-2 bg-gradient-to-r from-rose-950 to-rose-700 bg-clip-text text-6xl font-normal tracking-tighter text-transparent">
          Fedha Youth Group
        </h1>
        <p
          className="my-8 text-xl text-rose-400
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
            className="rounded-md bg-green-500 px-6 py-4 text-xl  font-semibold text-white  hover:bg-green-600"
          >
            Apply Loan
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md bg-rose-500 px-6 py-4 text-xl  font-semibold text-white  hover:bg-rose-600"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
