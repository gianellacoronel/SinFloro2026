import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Badge, type badgeVariants } from "@/components/ui/badge";

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

function MonopolyBadge({ className, ...props }: BadgeProps) {
  return (
    <Badge
      className={cn(
        "rounded-none border-2 border-border font-bold uppercase tracking-wide px-3 py-1",
        className,
      )}
      {...props}
    />
  );
}

export { MonopolyBadge };
