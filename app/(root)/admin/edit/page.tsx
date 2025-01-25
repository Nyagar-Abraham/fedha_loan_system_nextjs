import { BankForm } from "@/components/forms/BankForm";
import { IBank } from "@/database/bank.model";
import { getBank } from "@/lib/actions/bank.actions";

interface EditPageProps {
  searchParams: { [key: string]: string }; // Fixed index signature
}

const Page = async ({ searchParams }: EditPageProps) => {
  const editItem = searchParams.bank;

  const [bank] = await Promise.all([getBank({ bankId: editItem })]);

  return (
    <div>
      <BankForm edit bank={bank} />
    </div>
  );
};

export default Page;
