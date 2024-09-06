import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

// Define the variants for the heading component
const headingVariants = cva("", {
  variants: {
    size: {
      page: "text-5xl",
      section: "text-3xl",
      subheading: "text-2xl",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
    },
    weight: {
      bold: "font-bold",
      semibold: "font-semibold",
      light: "font-light",
    },
    fontFamily: {
      figtree: "font-figtree",
      inter: "font-inter",
      sourceSerif: "font-serif",
    },
  },
  defaultVariants: {
    size: "section",
    color: "primary",
    weight: "bold",
    fontFamily: "figtree",
  },
});

// Define the valid levels for the heading element
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

// Omit 'color' from HTMLAttributes<HTMLHeadingElement> to avoid conflict
export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  level?: HeadingLevel;
}

export const headingProps = {
  size: {
    label: "Size",
    type: "radio" as const,
    options: [
      { label: "Page", value: "page" },
      { label: "Section", value: "section" },
      { label: "Subheading", value: "subheading" },
    ],
  },
  color: {
    label: "Color",
    type: "radio" as const,
    options: [
      { label: "Primary", value: "primary" },
      { label: "Secondary", value: "secondary" },
      { label: "Accent", value: "accent" },
    ],
  },
  weight: {
    label: "Weight",
    type: "radio" as const,
    options: [
      { label: "Bold", value: "bold" },
      { label: "Semibold", value: "semibold" },
      { label: "Light", value: "light" },
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

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { className, level = 1, size, color, weight, fontFamily, ...props },
    ref
  ) => {
    const Tag = `h${level}` as keyof Pick<
      JSX.IntrinsicElements,
      "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    >;

    return (
      <Tag
        className={cn(
          headingVariants({ size, color, weight, fontFamily, className })
        )}
        ref={ref}
        {...props}
      >
        {props.children}
      </Tag>
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
