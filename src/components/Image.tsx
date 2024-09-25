import { ComponentConfig } from "@measured/puck";

export type ImageProps = {
  url?: string;
}

export const ImageComponent: ComponentConfig<ImageProps> = {
  fields: {
    url: {
      label: "Url",
      type: "text",
    }
  },
  defaultProps: {
    url: "https://placehold.co/640x360"
  },
  render: ({ url }) => (
    <div
      style={{
        backgroundImage: `url('${url}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: 24,
        height: 200,
        width: "100%",
      }}
    />
  ),
};
