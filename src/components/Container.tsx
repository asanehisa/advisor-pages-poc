import { ComponentConfig, Fields } from "@measured/puck";
import { cn } from "../utils/cn";
import "./index.css";

export type ContainerProps = {
  layout: "left-content" | "right-content" | "full-width";
  backgroundColor: "white" | "gray" | "primary" | "secondary";
  padding: "small" | "medium" | "large";
  gap: "small" | "medium" | "large";
  verticalAlignment: "top" | "center" | "bottom";
  renderDropZone?: any;
};

const Container = ({
  layout,
  backgroundColor,
  padding,
  gap,
  verticalAlignment,
  renderDropZone,
}: ContainerProps) => {
  return (
    <div
      className={cn(
        "components flex flex-col md:flex-row",
        backgroundColor === "white" && "bg-white",
        backgroundColor === "gray" && "bg-gray-100",
        backgroundColor === "primary" && "bg-primary",
        backgroundColor === "secondary" && "bg-secondary",
        padding === "small" && "p-4",
        padding === "medium" && "p-8",
        padding === "large" && "p-12",
        gap === "small" && "gap-4",
        gap === "medium" && "gap-8",
        gap === "large" && "gap-12",
        layout === "right-content" && "md:flex-row-reverse",
        verticalAlignment === "top" && "items-start",
        verticalAlignment === "center" && "items-center",
        verticalAlignment === "bottom" && "items-end"
      )}
    >
      {layout !== "full-width" && (
        <div className="flex-1">
          {renderDropZone({ zone: `left`, allow:["Image", "HeadingBlock", "CTABlock", "Body"]})}
        </div>
      )}
      <div className={cn("flex-1", layout === "full-width" && "w-full")}>
        {renderDropZone({ zone: `right`, allow:["Image", "HeadingBlock", "CTABlock", "Body"]})}
      </div>
    </div>
  );
};

const containerFields: Fields<ContainerProps> = {
  layout: {
    type: "radio",
    label: "Layout",
    options: [
      { label: "Left Content", value: "left-content" },
      { label: "Right Content", value: "right-content" },
      { label: "Full Width", value: "full-width" },
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
  padding: {
    type: "radio",
    label: "Padding",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
  },
  gap: {
    type: "radio",
    label: "Gap",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
  },
  verticalAlignment: {
    type: "radio",
    label: "Vertical Alignment",
    options: [
      { label: "Top", value: "top" },
      { label: "Center", value: "center" },
      { label: "Bottom", value: "bottom" },
    ],
  },
};

export const ContainerComponent: ComponentConfig<ContainerProps> = {
  fields: containerFields,
  defaultProps: {
    layout: "left-content",
    backgroundColor: "white",
    padding: "medium",
    gap: "medium",
    verticalAlignment: "center",
  },
  render: ({ puck: {renderDropZone}, layout, backgroundColor, padding, gap, verticalAlignment }) => (
    <Container
      layout={layout}
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      verticalAlignment={verticalAlignment}
      renderDropZone={renderDropZone}
    />
  ),
};
