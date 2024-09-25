import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

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

export interface SectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {}

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
      ...props
    },
    ref
  ) => {
    return (
      <div className="components bg-background">
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
              className,
            })
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
