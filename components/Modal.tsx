import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const Modal = ({
  children,
  trigger,
  title,
  className,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          `bg-dark90-light20 max-h-[90vh] border border-orange20/30 md:max-w-[50rem] mdl:max-w-[55rem] lg:max-w-[60rem] ${className}`
        )}
      >
        <DialogHeader>
          {title && (
            <DialogTitle className="mb-3 text-2xl text-orange80">
              {title}
            </DialogTitle>
          )}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
