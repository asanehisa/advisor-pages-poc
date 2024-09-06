import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

// Define the variants for the body component
const bodyVariants = cva("", {
  variants: {
    size: {
      small: "text-sm",
      base: "text-base",
      large: "text-lg",
    },
    weight: {
      default: "font-normal",
      bold: "font-bold",
    },
    color: {
      default: "text-default",
      primary: "text-primary",
      secondary: "text-secondary",
      gray: "text-slate-700",
    },
    fontFamily: {
      figtree: "font-figtree",
      inter: "font-inter",
      sourceSerif: "font-serif",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "default",
    color: "default",
    fontFamily: "figtree",
  },
});

// Omit 'color' from HTMLAttributes<HTMLParagraphElement> to avoid conflict
export interface BodyProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof bodyVariants> {}

export const bodyProps = {
  size: {
    label: "Size",
    type: "radio" as const,
    options: [
      { label: "Small", value: "small" },
      { label: "Base", value: "base" },
      { label: "Large", value: "large" },
    ],
  },
  weight: {
    label: "Weight",
    type: "radio" as const,
    options: [
      { label: "Default", value: "default" },
      { label: "Bold", value: "bold" },
    ],
  },
  color: {
    label: "Color",
    type: "radio" as const,
    options: [
      { label: "Default", value: "default" },
      { label: "Primary", value: "primary" },
      { label: "Secondary", value: "secondary" },
      { label: "Gray", value: "gray" },
    ],
  },
  fontFamily: {
    label: "Font Family",
    type: "radio" as const,
    options: [
      { label: "Figtree", value: "figtree" },
      { label: "Inter", value: "inter" },
      { label: "Source Serif", value: "sourceSerif" },
    ],
  },
};

const Body = React.forwardRef<HTMLParagraphElement, BodyProps>(
  ({ className, size, weight, color, fontFamily, ...props }, ref) => {
    return (
      <p
        className={cn(
          bodyVariants({ size, weight, color, fontFamily, className })
        )}
        ref={ref}
        {...props}
      >
        {props.children}
      </p>
    );
  }
);

Body.displayName = "Body";

export { Body, bodyVariants };
