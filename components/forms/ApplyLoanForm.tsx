// /* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import React, { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
// import { applyLoan } from "@/lib/actions/loan.actions";
// import { calculateLoanDetails, parse } from "@/lib/utils";
// import { MemberInterface } from "@/types/Interfaces";
// import { LoanSchema } from "@/utils/validations";

// import SubmitButtom from "../shared/SubmitButtom";
// import { Label } from "../ui/label";

// interface ApplyLoanInterface {
//   userId: string;
//   membersString: string;
// }

// interface ContribInterface {
//   _id: string;
//   value: number;
// }

// export default function ApplyLoanForm({
//   userId,
//   membersString,
// }: ApplyLoanInterface) {
//   const [submitting, setSubmitting] = useState(false);
//   const [guarantorContributions, setGuarantorContributions] = useState<
//     ContribInterface[]
//   >([]);
//   const [selectedValue, setSelectedValue] = useState<string | undefined>("");

//   const timeoutId = useRef();
//   const { toast } = useToast();
//   const router = useRouter();
//   console.log(membersString);
//   const members = parse(membersString);
//   console.log(members);

//   console.log({ guarantorContributions });

//   // get user details
//   const currentUser = members.find(
//     (member: MemberInterface) => member.clerkId === userId
//   );

//   const form = useForm<z.infer<typeof LoanSchema>>({
//     resolver: zodResolver(LoanSchema),
//     defaultValues: {
//       amount: 0,
//       age: undefined,
//       type: "",
//       guarantors: [],
//     },
//   });

//   async function onSubmit(values: z.infer<typeof LoanSchema>) {
//     try {
//       setSubmitting(true);
//       console.log("Form Submitted", values);
//       console.log("Form Submitted2", guarantorContributions);

//       if (values?.guarantors?.length !== guarantorContributions.length) {
//         toast({
//           title: "Missing input value!!",
//           variant: "destructive",
//           description:
//             "You did not fill one of the input for guarantors contributions",
//           duration: 5000,
//         });
//         return;
//       }

//       const totalGuarantorsContribution = guarantorContributions.reduce(
//         (total, guarantor) => total + guarantor.value,
//         0
//       );
//       console.log({ totalGuarantorsContribution });
//       console.log({ currentUser });
//       // Loan amount greater than shares + contributions
//       const contribution = totalGuarantorsContribution + currentUser?.shares!;
//       if (values.amount > contribution) {
//         toast({
//           title: "Insufficient Contributions!!",
//           variant: "destructive",
//           description:
//             "You shares plus your guarantors` contributions are less than the loan amount",
//         });

//         return;
//       }

//       // get loan Details
//       const loanDetails = calculateLoanDetails(
//         loanTypes,
//         values.type,
//         currentUser?.shares!
//       );

//       console.log("loan Details", loanDetails);

//       const loan = await applyLoan({
//         age: values?.age,
//         path: "/dashboard",
//         loanData: {
//           member: currentUser?._id!,
//           loanType: values.type,
//           amount: values.amount,
//           interestRate: loanDetails?.interestRate!,
//           repaymentPeriod: loanDetails?.repaymentPeriod!,
//           guarantors: values.guarantors,
//           monthlyRepayment: loanDetails?.monthlyRepayment!,
//           balance: loanDetails?.totalLoan!,
//         },
//       });

//       if (!loan) {
//         toast({
//           title: "Error Applying Loan",
//           variant: "destructive",
//           duration: 5000,
//         });
//       } else {
//         toast({
//           title: "Loan Successfully applied",
//           duration: 5000,
//         });

//         form.reset();
//         setGuarantorContributions([]);
//         router.push("/dashboard", { scroll: false });
//       }
//     } catch (error) {
//       console.log(error);
//       throw error;
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   // reset select
//   const resetSelect = () => {
//     setSelectedValue("");
//   };

//   // handle select value change
//   const handleValueChange = (value: string, field: any) => {
//     if (field.name === "guarantors") {
//       if (value !== "") {
//         // add the id  to guarantors array
//         if (!field.value.includes(value.trim() as never)) {
//           form.setValue("guarantors", [...field.value, value.trim()]);
//           form.clearErrors("guarantors");
//           console.log(form.getValues());
//           resetSelect();
//         } else {
//           // remove the id  to guarantors array
//           form.setValue(
//             "guarantors",
//             field.value.filter((v: string) => v !== value.trim())
//           );
//           form.clearErrors("guarantors");
//           console.log("VALUE", value.trim());

//           setGuarantorContributions((contribution) =>
//             contribution.filter(
//               (contibution: ContribInterface) =>
//                 contibution._id !== value.trim()
//             )
//           );
//           console.log(form.getValues());
//           resetSelect();
//         }
//       } else {
//         form.trigger();
//       }
//     }
//   };

//   const handleGuarantorsContribution = (
//     e: React.ChangeEvent,
//     value: number,
//     _id: string
//   ) => {
//     e.preventDefault();

//     // @ts-expect-error
//     if (!e.target?.name || !value || !_id) {
//       console.log("");
//     } else {
//       if (timeoutId.current) clearTimeout(timeoutId.current);
//       // @ts-expect-error
//       timeoutId.current = setTimeout(() => {
//         const names = guarantorContributions.map(
//           (c: ContribInterface) => c?._id
//         );

//         console.log("names", names);
//         if (names.includes(_id)) {
//           const contributions = guarantorContributions.filter(
//             (c: ContribInterface) => c?._id !== _id
//           );
//           setGuarantorContributions([...contributions, { _id, value }]);
//           // @ts-expect-error
//           e.target.value = "";
//         } else {
//           setGuarantorContributions((contributions) => [
//             ...contributions,
//             { _id, value },
//           ]);
//           // @ts-expect-error
//           e.target.value = "";
//         }
//       }, 1000);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className=" flex flex-col gap-8"
//       >
//         <div className="flex-between gap-6">
//           {/* AMOUNT */}
//           <FormField
//             control={form.control}
//             name="amount"
//             render={({ field }) => (
//               <FormItem className="flex flex-1 flex-col gap-px">
//                 <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
//                   Loan Amount<span className="text-orange70">*</span>
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     className=" min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70"
//                     value={field.value || ""}
//                     onChange={(e) => field.onChange(Number(e.target.value))}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-500" />
//               </FormItem>
//             )}
//           />
//           {/* AGE */}
//           <FormField
//             control={form.control}
//             name="age"
//             render={({ field }) => (
//               <FormItem className="flex flex-1 flex-col gap-px">
//                 <FormLabel className=" space-x-2 text-[1.1rem] dark:text-orange10">
//                   Enter Your Age<span className="text-orange70">*</span>
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     className="min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70"
//                     value={field.value || ""}
//                     onChange={(e) => field.onChange(Number(e.target.value))}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-500" />
//               </FormItem>
//             )}
//           />
//         </div>
//         {/* TYPE OF LOAN */}
//         <FormField
//           control={form.control}
//           name="type"
//           render={({ field }) => (
//             <FormItem className="flex flex-1 flex-col gap-px">
//               <FormLabel className="space-x-2 text-[1.1rem] dark:text-orange10 ">
//                 Loan Type<span className="text-orange70">*</span>
//               </FormLabel>
//               <FormControl>
//                 <Select
//                   onValueChange={(value) => {
//                     console.log("Loan Type Selected:", value); // Log the selected loan type
//                     field.onChange(value);
//                   }}
//                 >
//                   <SelectTrigger className="min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70">
//                     <SelectValue placeholder="Select loanType" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-dark20 text-[1rem] dark:bg-dark90 dark:hover:bg-dark80 ">
//                     {loanTypes.map((loanType: loanTypeInterface) => (
//                       <SelectItem
//                         className="text-base hover:text-orange50"
//                         key={loanType.value}
//                         value={loanType.value}
//                       >
//                         {loanType.category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage className="text-red-500" />
//             </FormItem>
//           )}
//         />
//         {/* GUARANTORS */}
//         <FormField
//           control={form.control}
//           name="guarantors"
//           render={({ field }) => (
//             <FormItem className="flex flex-1 flex-col gap-px">
//               <FormLabel className="space-x-2 text-[1.1rem] dark:text-orange10 ">
//                 Select Guarantors<span className="text-orange70">*</span>
//               </FormLabel>
//               <FormControl>
//                 <>
//                   <Select
//                     value={selectedValue}
//                     onValueChange={(value) => handleValueChange(value, field)}
//                   >
//                     <SelectTrigger className="min-h-12 border-b-2 border-orange40  bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70">
//                       <SelectValue placeholder="Select A Guarantor" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-dark20 text-[1rem] dark:bg-dark90 dark:hover:bg-dark80 ">
//                       {members
//                         .filter(
//                           (member: MemberInterface) => member.clerkId !== userId
//                         )
//                         .map((member: MemberInterface) => (
//                           <SelectItem
//                             className="text-base hover:text-orange50"
//                             key={member.clerkId}
//                             value={member._id}
//                           >
//                             {member.name}
//                           </SelectItem>
//                         ))}
//                     </SelectContent>
//                   </Select>
//                   {/* GET THE AMOUNT FROM EACH GUARANTOR */}
//                   {field.value.length > 0 && (
//                     <div className="mt-4 flex flex-col gap-4 py-3 sm:grid sm:grid-cols-2">
//                       {field.value.map((value: string) => (
//                         <div key={value} className="flex flex-col gap-3">
//                           <Label className="text-base">
//                             Enter{" "}
//                             {members
//                               .map((member: MemberInterface) => {
//                                 const name =
//                                   member._id === value && member.name;
//                                 console.log(name);
//                                 return name || "";
//                               })
//                               .join() + "`s"}{" "}
//                             contribution
//                           </Label>
//                           <Input
//                             type="number"
//                             name={`${members
//                               .map((member: MemberInterface) => {
//                                 const _id = member._id === value && member._id;
//                                 console.log(_id);
//                                 return _id || "";
//                               })
//                               .join()
//                               .substring(1)}`}
//                             className="min-h-12 border-b-2 border-orange40 bg-dark20 text-xl hover:bg-dark10 focus:ring focus:ring-orange-400 dark:border-orange-950 dark:bg-dark80 dark:hover:bg-dark70"
//                             // value={""}
//                             onChange={(e) =>
//                               handleGuarantorsContribution(
//                                 e,
//                                 Number(e.target.value),
//                                 value
//                               )
//                             }
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               </FormControl>
//               <FormMessage className="text-red-500" />
//             </FormItem>
//           )}
//         />
//         {/* SUBMIT */}
//         <div className="mt-6 flex items-center justify-end">
//           <SubmitButtom submitting={submitting} />
//         </div>
//       </form>
//     </Form>
//   );
// }
