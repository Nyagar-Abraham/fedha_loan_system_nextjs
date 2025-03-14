import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary: "bg-orange80  text-white",
          footerActionLink: "text-orange70 ",
          socialButtonsBlockButton: "text-dark10 bg-dark70 hover:bg-gray-600",
        },
        variables: {
          colorPrimary: "#f08c00",
          colorTextOnPrimaryBackground: "#fff",
          colorBackground: "#212529",
          colorInputBackground: "#495057",
          colorText: "#f1f3f5",
          colorNeutral: "#ced4da",
          colorTextSecondary: "#e9ecef",
        },
      }}
    />
  );
}
