import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MonopolyCardProps = React.ComponentProps<"div"> & {
  variant?: "default" | "accent" | "primary";
};

function MonopolyCard({
  className,
  variant = "default",
  ...props
}: MonopolyCardProps) {
  const variantStyles = {
    default: "bg-card",
    accent: "bg-accent",
    primary: "bg-primary",
  };

  return (
    <Card
      className={cn(
        "border-4 border-border shadow-[4px_4px_0px_0px] shadow-border rounded-none",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

function MonopolyCardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <CardHeader
      className={cn("border-b-4 border-border", className)}
      {...props}
    />
  );
}

function MonopolyCardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <CardTitle
      className={cn("text-lg font-bold uppercase tracking-wide", className)}
      {...props}
    />
  );
}

function MonopolyCardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <CardDescription
      className={cn("text-xs font-bold uppercase tracking-widest", className)}
      {...props}
    />
  );
}

function MonopolyCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <CardContent className={className} {...props} />;
}

function MonopolyCardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <CardFooter
      className={cn("border-t-4 border-border p-4", className)}
      {...props}
    />
  );
}

export {
  MonopolyCard,
  MonopolyCardHeader,
  MonopolyCardTitle,
  MonopolyCardDescription,
  MonopolyCardContent,
  MonopolyCardFooter,
};
