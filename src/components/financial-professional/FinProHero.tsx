import { ComponentConfig, Fields } from "@measured/puck";
import { FinancialprofessionalStream } from "../../types/autogen";
import { useDocument } from "@yext/pages/util";
import { Section } from "../atoms/section";
import { Address, HoursStatus, Image } from "@yext/pages-components";
import { Heading, HeadingProps, headingProps } from "../atoms/heading";
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
import { Body, BodyProps, bodyProps } from "../atoms/body";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export type HeroProps = {
  imageMode: "left" | "right";
  name: HeadingProps;
  role: HeadingProps;
  description: BodyProps;
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
    label: "Name",
    objectFields: headingProps,
  },
  role: {
    type: "object",
    label: "Role",
    objectFields: headingProps,
  },
  description: {
    type: "object",
    label: "Description",
    objectFields: bodyProps,
  },
};

const Hero = ({ imageMode, name, role, description }: HeroProps) => {
  const {
    headshot,
    name: finProName,
    c_role,
    description: finProDescription,
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
    <Section className="">
      <div
        className={cn(
          "flex flex-col gap-x-10 gap-y-12 md:flex-row",
          imageMode === "right" && "md:flex-row-reverse"
        )}
      >
        {headshot && (
          <div className="flex justify-center">
            <EntityField displayName="Hero Image" fieldId="c_hero.image">
              <Image
                // className="rounded-[30px] max-w-3xl max-h-96"
                layout="fixed"
                width={336}
                height={336}
                image={headshot}
              />
            </EntityField>
          </div>
        )}

        <div className="flex flex-col justify-center gap-y-3 pt-8">
          <div className="flex flex-col gap-y-2">
            <EntityField displayName="Name" fieldId="name">
              <Heading
                level={1}
                size={name.size}
                color={name.color}
                weight={name.weight}
                fontFamily={name.fontFamily}
              >
                {finProName}
              </Heading>
            </EntityField>
            <EntityField displayName="Role" fieldId="c_role">
              <Heading
                level={2}
                size={role.size}
                color={role.color}
                weight={role.weight}
                fontFamily={role.fontFamily}
              >
                {c_role}
              </Heading>
            </EntityField>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <EntityField displayName="Description" fieldId="description">
            <Body
              size={description.size}
              weight={description.weight}
              color={description.color}
              fontFamily={description.fontFamily}
              className="text-left"
            >
              {finProDescription}
            </Body>
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
        </div>

        <div className="flex justify-center gap-x-6">
          {facebookPageUrl && (
            <a href={facebookPageUrl} target="_blank" rel="noopener noreferrer">
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
            <a href={instagramHandle} target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-5 w-5 mr-2" />
            </a>
          )}
        </div>

        <div>
          <Button>Contact Me</Button>
          <Button>Book an Appointment</Button>
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
      color: "primary",
      weight: "bold",
      fontFamily: "figtree",
    },
    role: {
      size: "subheading",
      color: "secondary",
      weight: "semibold",
      fontFamily: "figtree",
    },
    description: {
      size: "base",
      weight: "default",
      color: "default",
      fontFamily: "figtree",
    },
  },
  render: ({ imageMode, name, role, description }) => (
    <Hero
      imageMode={imageMode}
      name={name}
      role={role}
      description={description}
    />
  ),
};
