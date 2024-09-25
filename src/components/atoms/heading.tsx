import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { ComponentConfig, Fields } from "@measured/puck";

// Define the variants for the heading component
const headingVariants = cva("font-heading", {
  variants: {
    size: {
      default: "text-heading",
      page: "text-5xl",
      section: "text-3xl",
      subheading: "text-2xl",
    },
    color: {
      default: "text-primary",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
    },
    weight: {
      default: "font-bold",
      bold: "font-bold",
      semibold: "font-semibold",
      light: "font-light",
    },
    fontFamily: {
      default: "font-figtree",
      inter: "font-inter",
      sourceSerif: "font-serif",
    },
  },
  defaultVariants: {
    size: "default",
    color: "default",
    weight: "bold",
    fontFamily: "default",
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

// New code starts here
export type HeadingBlockProps = {
  text: string;
  level?: HeadingLevel;
} & VariantProps<typeof headingVariants>;

const headingBlockFields: Fields<HeadingBlockProps> = {
  text: { type: "text", label: "Text" },
  level: {
    type: "select",
    label: "Heading Level",
    options: [
      { label: "H1", value: 1 },
      { label: "H2", value: 2 },
      { label: "H3", value: 3 },
      { label: "H4", value: 4 },
      { label: "H5", value: 5 },
      { label: "H6", value: 6 },
    ],
  },
  size: {
    type: "radio",
    label: "Size",
    options: [
      { label: "Default", value: "default" },
      { label: "Page", value: "page" },
      { label: "Section", value: "section" },
      { label: "Subheading", value: "subheading" },
    ],
  },
  color: {
    type: "radio",
    label: "Color",
    options: [
      { label: "Default", value: "default" },
      { label: "Primary", value: "primary" },
      { label: "Secondary", value: "secondary" },
      { label: "Accent", value: "accent" },
    ],
  },
  weight: {
    type: "radio",
    label: "Weight",
    options: [
      { label: "Default", value: "default" },
      { label: "Bold", value: "bold" },
      { label: "Semibold", value: "semibold" },
      { label: "Light", value: "light" },
    ],
  },
  fontFamily: {
    type: "radio",
    label: "Font Family",
    options: [
      { label: "Default", value: "default" },
      { label: "Figtree", value: "figtree" },
      { label: "Inter", value: "inter" },
      { label: "Source Serif", value: "sourceSerif" },
    ],
  },
};

export const HeadingBlock: ComponentConfig<HeadingBlockProps> = {
  fields: headingBlockFields,
  defaultProps: {
    text: "Heading",
    level: 2,
    size: "default",
    color: "default",
    weight: "default",
    fontFamily: "default",
  },
  render: ({ text, level, ...props }) => (
    <Heading level={level} {...props}>
      {text}
    </Heading>
  ),
};
