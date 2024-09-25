import { Link } from "@yext/pages-components";
import { Button, ButtonProps } from "./button";
import { cn } from "../../utils/cn";
import { ComponentConfig, Fields } from "@measured/puck";

export interface CTAProps {
  label?: string;
  url?: string;
  variant?: ButtonProps["variant"];
  className?: string;
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

type CTABlockProps = Omit<CTAProps, "className">;

const ctaFields: Fields<CTABlockProps> = {
  label: { type: "text", label: "Label" },
  url: { type: "text", label: "URL" },
  variant: {
    type: "radio",
    label: "Variant",
    options: [
      { label: "Default", value: "default" },
      { label: "Secondary", value: "secondary" },
    ],
  },
};

const CTABlock: ComponentConfig<CTABlockProps> = {
  fields: ctaFields,
  defaultProps: {
    label: "Click me",
    url: "#",
    variant: "primary",
  },
  render: ({ label, url, variant }) => (
    <CTA label={label} url={url} variant={variant} />
  ),
};

export { CTA, CTABlockProps, CTABlock };
