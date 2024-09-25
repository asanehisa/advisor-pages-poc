import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { ComponentConfig, Fields, DropZone } from "@measured/puck";

const sectionVariants = cva("", {
  variants: {
    margin: {
      none: "m-0",
      small: "m-2",
      medium: "m-4",
      large: "m-8",
    },
    padding: {
      none: "p-0",
      small: "p-2",
      medium: "p-4",
      large: "p-8",
    },
    hAlign: {
      left: "items-start",
      center: "items-center",
      right: "items-end",
    },
    vAlign: {
      top: "justify-start",
      center: "justify-center",
      bottom: "justify-end",
    },
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    gap: {
      none: "gap-0",
      small: "gap-2",
      medium: "gap-4",
      large: "gap-8",
    },
    maxWidth: {
      none: "max-w-none",
      small: "max-w-md",
      medium: "max-w-2xl",
      large: "max-w-4xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    margin: "none",
    padding: "medium",
    hAlign: "left",
    vAlign: "top",
    direction: "column",
    gap: "none",
    maxWidth: "medium",
  },
});

const backgroundColorVariants = {
  default: "bg-background",
  primary: "bg-[#001943]",
  transparent: "bg-transparent",
  // Add more color options as needed
};

export interface SectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {
  backgroundColor?: keyof typeof backgroundColorVariants;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      className,
      margin,
      padding,
      hAlign,
      vAlign,
      direction,
      gap,
      maxWidth,
      backgroundColor = "default",
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn("components", backgroundColorVariants[backgroundColor])}
      >
        <div
          className={cn(
            "flex",
            sectionVariants({
              margin,
              padding,
              hAlign,
              vAlign,
              direction,
              gap,
              maxWidth,
            }),
            className
          )}
          ref={ref}
          {...props}
        >
          {props.children}
        </div>
      </div>
    );
  }
);
Section.displayName = "Section";

export { Section, sectionVariants };

// New code starts here
export type SectionBlockProps = SectionProps;

const sectionBlockFields: Fields<SectionBlockProps> = {
  backgroundColor: {
    type: "select",
    label: "Background Color",
    options: Object.keys(backgroundColorVariants).map((key) => ({
      label: key,
      value: key,
    })),
  },
  margin: {
    type: "select",
    label: "Margin",
    options: [
      { label: "None", value: "none" },
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
  },
  padding: {
    type: "select",
    label: "Padding",
    options: [
      { label: "None", value: "none" },
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
  },
  hAlign: {
    type: "select",
    label: "Horizontal Alignment",
    options: [
      { label: "Left", value: "left" },
      { label: "Center", value: "center" },
      { label: "Right", value: "right" },
    ],
  },
  vAlign: {
    type: "select",
    label: "Vertical Alignment",
    options: [
      { label: "Top", value: "top" },
      { label: "Center", value: "center" },
      { label: "Bottom", value: "bottom" },
    ],
  },
  direction: {
    type: "select",
    label: "Direction",
    options: [
      { label: "Row", value: "row" },
      { label: "Column", value: "column" },
    ],
  },
  gap: {
    type: "select",
    label: "Gap",
    options: [
      { label: "None", value: "none" },
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
  },
  maxWidth: {
    type: "select",
    label: "Max Width",
    options: [
      { label: "None", value: "none" },
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
      { label: "Full", value: "full" },
    ],
  },
};

export const SectionBlock: ComponentConfig<SectionBlockProps> = {
  fields: sectionBlockFields,
  defaultProps: {
    backgroundColor: "default",
    margin: "none",
    padding: "medium",
    hAlign: "left",
    vAlign: "top",
    direction: "column",
    gap: "none",
    maxWidth: "medium",
  },
  render: ({puck: {renderDropZone}}, ...props) => (
    <Section {...props}>
      {renderDropZone({ zone: `section-content`})}
    </Section>
  ),
};
