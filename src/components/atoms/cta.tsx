import { Link } from "@yext/pages-components";
import { Button, ButtonProps } from "./button";
import { cn } from "../../utils/cn";

export interface CTAProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  url?: string;
  variant?: ButtonProps["variant"];
}

const CTA = ({ label, url, variant, className, ...props }: CTAProps) => {
  return (
    <Button
      asChild
      className={cn(
        "flex justify-center items-center font-figtree text-lg font-light rounded-none",
        className
      )}
      variant={variant}
      {...props}
    >
      <Link
        href={url}
        className="w-full h-full flex justify-center items-center"
      >
        {label}
      </Link>
    </Button>
  );
};

CTA.displayName = "CTA";

export { CTA };
