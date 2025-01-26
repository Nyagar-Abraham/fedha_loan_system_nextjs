import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/actions/member.actions";
import { handleError } from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import bg from "@/public/bg.jpg";
import { sendMail } from "@/utils/sendMail";
import { sendSMSNotification } from "@/utils/Sms";

// import { Button } from "@/components/ui/button";

const test = async () => {
  try {
    // throw new NotFoundError("Test Error");
    throw new ValidationError({
      title: ["Required"],
      tags: ['"javaScript" is not a valid tag.'],
    });
  } catch (error) {
    return handleError(error);
  }
};

export default async function Home() {
  const results = await test();
  console.log(results);
  // const { userId } = auth();

  return (
    <main className="mt-24 md:mt-32 xl:mt-40  ">
      <Image
        src={bg}
        fill
        placeholder="blur"
        className="  object-cover object-top"
        quality={90}
        alt="Fedha group background image "
      />
      <div className="relative z-10 mx-auto flex  max-w-[65rem] flex-col items-center rounded-lg p-7 text-center backdrop-blur-sm">
        <h1 className="mb-2 bg-gradient-to-r from-orange100 to-orange70 bg-clip-text text-6xl font-normal tracking-tighter text-transparent">
          Loan Kenya
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
            href="/loans"
            className="line-clamp-1 rounded-md border-2 border-green90 px-6 py-3 text-xl  font-semibold text-green90   hover:bg-green80 hover:text-green10"
          >
            Loans
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
