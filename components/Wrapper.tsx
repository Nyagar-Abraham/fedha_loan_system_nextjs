import { cn } from "@/lib/utils";

const Wrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={cn(`grid  ${className}`)}>{children}</div>;
};

export default Wrapper;
