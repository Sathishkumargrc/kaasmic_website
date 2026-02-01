import * as React from "react";
import { cn } from "@/app/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        data-slot="input"
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
