import { BankForm } from "@/components/forms/BankForm";
import { LoanTypeForm } from "@/components/forms/LoanTypeForm";
import { getBank } from "@/lib/actions/bank.actions";
import { getLoanType } from "@/lib/actions/loanTypes.actions";

interface EditPageProps {
  searchParams: { [key: string]: string }; // Fixed index signature
}

const Page = async ({ searchParams }: EditPageProps) => {
  const bankId = searchParams.bank;
  const loanTypeId = searchParams.loantype;

  let bank;
  let loanType;

  if (bankId) {
    bank = await getBank({ bankId });
  }

  if (loanTypeId) {
    loanType = await getLoanType({ loanTypeId });
  }

  return (
    <div>
      {bankId && <BankForm edit bank={bank} />}
      {loanTypeId && <LoanTypeForm edit loanType={loanType} />}
    </div>
  );
};

export default Page;
