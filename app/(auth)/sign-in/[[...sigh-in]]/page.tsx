import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-gradient-to-br from-orange80 to-orange70 text-white  border-none",
          footerActionLink: "text-orange70 ",
          socialButtonsBlockButton: "text-dark10 bg-dark70 hover:bg-gray-600",
        },
        variables: {
          colorPrimary: "#e8590c", // Red color in hex format
          colorTextOnPrimaryBackground: "#ffffff", // White color in hex format
          colorBackground: "#212529", // Dark gray color in hex format
          colorInputBackground: "#495057",
          colorText: "#f1f3f5",
          colorNeutral: "#ced4da",
          colorTextSecondary: "#e9ecef",
        },
      }}
    />
  );
}
