import { ComponentConfig, Fields } from "@measured/puck";
import { Section as BaseSection, SectionProps } from "../atoms/section";
import { cn } from "../../utils/cn";

export type ExpandedSectionProps = SectionProps & {
  padding: "default" | "small" | "large";
  maxWidth: "default" | "full" | "xl";
  backgroundColor: "white" | "gray" | "primary" | "secondary";
};

const sectionFields: Fields<ExpandedSectionProps> = {
  padding: {
    type: "radio",
    label: "Padding",
    options: [
      { label: "Default", value: "default" },
      { label: "Small", value: "small" },
      { label: "Large", value: "large" },
    ],
  },
  maxWidth: {
    type: "radio",
    label: "Max Width",
    options: [
      { label: "Default", value: "default" },
      { label: "Full", value: "full" },
      { label: "Extra Large", value: "xl" },
    ],
  },
  backgroundColor: {
    type: "radio",
    label: "Background Color",
    options: [
      { label: "White", value: "white" },
      { label: "Gray", value: "gray" },
      { label: "Primary", value: "primary" },
      { label: "Secondary", value: "secondary" },
    ],
  },
};

const Section = ({
  padding,
  maxWidth,
  backgroundColor,
  className,
  ...props
}: ExpandedSectionProps) => {
  const paddingClasses = {
    default: "py-16",
    small: "px-4 py-8",
    large: "px-[200px] py-24",
  };

  const maxWidthClasses = {
    default: "max-w-6xl",
    full: "max-w-full",
    xl: "max-w-4xl",
  };

  const backgroundColorClasses = {
    white: "bg-white",
    gray: "bg-gray-100",
    primary: "bg-primary",
    secondary: "bg-secondary",
  };

  return (
    <BaseSection
      className={cn(
        paddingClasses[padding],
        maxWidthClasses[maxWidth],
        backgroundColorClasses[backgroundColor],
        className
      )}
      {...props}
    />
  );
};

export const SectionComponent: ComponentConfig<ExpandedSectionProps> = {
  fields: sectionFields,
  defaultProps: {
    padding: "default",
    maxWidth: "default",
    backgroundColor: "white",
  },
  render: (props) => <Section {...props} />,
};
