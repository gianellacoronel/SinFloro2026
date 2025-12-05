import type * as React from "react";
import { cn } from "@/lib/utils";
import { Button, type buttonVariants } from "../ui/button";
import type { VariantProps } from "class-variance-authority";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export interface MonopolyButtonProps extends ButtonProps {
  monopolySize?: "sm" | "md" | "lg";
}

function MonopolyButton({
  className,
  monopolySize = "md",
  variant = "default",
  ...props
}: MonopolyButtonProps) {
  const sizeStyles = {
    sm: "py-2 px-3 text-xs shadow-[2px_2px_0px_0px] active:shadow-none",
    md: "py-3 px-4 text-sm shadow-[3px_3px_0px_0px] active:shadow-[1px_1px_0px_0px]",
    lg: "py-4 px-6 text-lg shadow-[4px_4px_0px_0px] active:shadow-[2px_2px_0px_0px]",
  };

  return (
    <Button
      variant={variant}
      className={cn(
        "rounded-none border-2 border-border shadow-border font-bold uppercase tracking-wide",
        "active:translate-x-0.5 active:translate-y-0.5 transition-all",
        sizeStyles[monopolySize],
        className,
      )}
      {...props}
    />
  );
}

export { MonopolyButton };
