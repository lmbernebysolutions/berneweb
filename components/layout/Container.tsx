import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
}

export function Container({ children, narrow, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 md:px-6",
        narrow ? "max-w-3xl" : "max-w-6xl",
        className
      )}
    >
      {children}
    </div>
  );
}
