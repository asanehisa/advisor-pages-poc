import { ComponentConfig, Fields } from "@measured/puck";
import { FinancialprofessionalStream } from "../../types/autogen";
import { useDocument } from "@yext/pages/util";
import { Section } from "../atoms/section";
import { Address, HoursStatus, Image } from "@yext/pages-components";
import { Heading, HeadingProps } from "../atoms/heading";
import { CTA } from "../atoms/cta";
import { Button, ButtonProps } from "../atoms/button";
import { cn } from "../../utils/cn";
import { EntityField } from "@yext/visual-editor";
import {
  PhoneIcon,
  EnvelopeIcon,
  LanguageIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import "../index.css";
import { Body } from "../atoms/body";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export type HeroProps = {
  imageMode: "left" | "right";
  name: {
    size: HeadingProps["size"];
    color: HeadingProps["color"];
  };
  // location: {
  //   size: HeadingProps["size"];
  //   color: HeadingProps["color"];
  // };
  // cta1: {
  //   variant: ButtonProps["variant"];
  // };
  // cta2: {
  //   variant: ButtonProps["variant"];
  // };
};

const heroFields: Fields<HeroProps> = {
  imageMode: {
    label: "Image Mode",
    type: "radio",
    options: [
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
    ],
  },
  name: {
    type: "object",
    label: "Location Name",
    objectFields: {
      size: {
        label: "Size",
        type: "radio",
        options: [
          { label: "Page", value: "page" },
          { label: "Section", value: "section" },
          { label: "Subheading", value: "subheading" },
        ],
      },
      color: {
        label: "Color",
        type: "radio",
        options: [
          { label: "Default", value: "default" },
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
        ],
      },
    },
  },
  // location: {
  //   type: "object",
  //   label: "Location",
  //   objectFields: {
  //     size: {
  //       label: "Size",
  //       type: "radio",
  //       options: [
  //         { label: "Page", value: "page" },
  //         { label: "Section", value: "section" },
  //         { label: "Subheading", value: "subheading" },
  //       ],
  //     },
  //     color: {
  //       label: "Color",
  //       type: "radio",
  //       options: [
  //         { label: "Default", value: "default" },
  //         { label: "Primary", value: "primary" },
  //         { label: "Secondary", value: "secondary" },
  //       ],
  //     },
  //   },
  // },
  // cta1: {
  //   type: "object",
  //   label: "CTA 1",
  //   objectFields: {
  //     variant: {
  //       label: "Variant",
  //       type: "radio",
  //       options: [
  //         { label: "Default", value: "default" },
  //         { label: "Secondary", value: "secondary" },
  //         { label: "Link", value: "link" },
  //       ],
  //     },
  //   },
  // },
  // cta2: {
  //   type: "object",
  //   label: "CTA 2",
  //   objectFields: {
  //     variant: {
  //       label: "Variant",
  //       type: "radio",
  //       options: [
  //         { label: "Default", value: "default" },
  //         { label: "Secondary", value: "secondary" },
  //         { label: "Link", value: "link" },
  //       ],
  //     },
  //   },
  // },
};

const Hero = ({ imageMode, name }: HeroProps) => {
  const {
    headshot,
    name: finProName,
    c_role,
    description,
    mainPhone,
    emails,
    address,
    languages,
    facebookPageUrl,
    linkedInUrl,
    twitterHandle,
    instagramHandle,
    // hours,
    // address,
    // name: locationName,
    // c_hero: hero,
  } = useDocument<FinancialprofessionalStream>();

  const formatPhoneNumber = (phone: string) => {
    // Remove any non-digit characters and the leading +1 if present
    const cleaned = phone.replace(/\D/g, "").replace(/^1/, "");
    // Format the number as XXX.XXX.XXXX
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
  };

  return (
    <Section className="components">
      <div
        className={cn(
          "flex flex-col gap-x-10 md:flex-row",
          imageMode === "right" && "md:flex-row-reverse"
        )}
      >
        {headshot && (
          <EntityField displayName="Hero Image" fieldId="c_hero.image">
            <Image
              // className="rounded-[30px] max-w-3xl max-h-96"
              layout="fixed"
              width={336}
              height={336}
              image={headshot}
            />
          </EntityField>
        )}
        <div className="flex flex-col justify-center gap-y-3 pt-8">
          <EntityField displayName="Name" fieldId="name">
            <Heading level={1} size={name.size} color={name.color}>
              {finProName}
            </Heading>
          </EntityField>
          <EntityField displayName="Role" fieldId="c_role">
            <Heading level={2}>{c_role}</Heading>
          </EntityField>
          <EntityField displayName="Description" fieldId="description">
            <Body className="text-left">{description}</Body>
          </EntityField>

          <div className="flex flex-col gap-y-2 mt-4">
            <EntityField displayName="Phone" fieldId="mainPhone">
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                <span>{formatPhoneNumber(mainPhone)}</span>
              </div>
            </EntityField>

            <EntityField displayName="Email" fieldId="emails">
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                <span>{emails && emails.length > 0 ? emails[0] : ""}</span>
              </div>
            </EntityField>

            <EntityField displayName="Address" fieldId="address">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <Address
                  address={address}
                  lines={[["line1", "city", "region", "postalCode"]]}
                  separator={", "}
                />
              </div>
            </EntityField>

            <EntityField displayName="Languages" fieldId="languages">
              <div className="flex items-center">
                <LanguageIcon className="h-5 w-5 mr-2" />
                <span>{languages ? languages.join("/") : ""}</span>
              </div>
            </EntityField>
          </div>

          <div className="flex justify-center gap-x-6">
            {facebookPageUrl && (
              <a
                href={facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="h-5 w-5 mr-2" />
              </a>
            )}
            {/* {linkedInUrl && (
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="h-5 w-5 mr-2" />
              </a>
            )} */}
            {twitterHandle && (
              <a href={twitterHandle} target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="h-5 w-5 mr-2" />
              </a>
            )}
            {instagramHandle && (
              <a
                href={instagramHandle}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="h-5 w-5 mr-2" />
              </a>
            )}
          </div>

          <div>
            <Button>Contact Me</Button>
            <Button>Book an Appointment</Button>
          </div>

          {/* {hours && (
            <EntityField displayName="Hours" fieldId="hours">
              <HoursStatus className="font-semibold" hours={hours} />
            </EntityField>
          )}
          <div className="flex">
            {hero?.cta1 && (
              <EntityField displayName="CTA" fieldId="hero.cta1">
                <CTA
                  className="mr-3"
                  variant={cta1.variant}
                  label={hero.cta1.name}
                  url={hero.cta1.link ? hero.cta1.link : "#"}
                />
              </EntityField>
            )}
            {hero?.cta2 && (
              <EntityField displayName="CTA" fieldId="hero.cta2">
                <CTA
                  variant={cta2.variant}
                  label={hero.cta2.name}
                  url={hero.cta2.link ? hero.cta2.link : "#"}
                />
              </EntityField>
            )} */}
        </div>
      </div>
    </Section>
  );
};

export const HeroComponent: ComponentConfig<HeroProps> = {
  fields: heroFields,
  defaultProps: {
    imageMode: "left",
    name: {
      size: "section",
      color: "default",
    },
    // location: {
    //   size: "section",
    //   color: "default",
    // },
    // cta1: {
    //   variant: "default",
    // },
    // cta2: {
    //   variant: "default",
    // },
  },
  render: ({
    imageMode,
    name,
    // description,
    // location,
    // cta1,
    // cta2
  }) => (
    <Hero
      imageMode={imageMode}
      name={name}
      // description={description}
      // location={location}
      // cta1={cta1}
      // cta2={cta2}
    />
  ),
};
