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
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";

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

  return (
    <Section>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row max-w-full">
          {/* Left container for content */}
          <div className="flex flex-col gap-y-12 sm:w-2/3  sm:p-8">
            {/* Headshot for mobile */}
            {headshot && (
              <div className="sm:hidden">
                <EntityField displayName="Hero Image" fieldId="c_hero.image">
                  <Image
                    layout="fixed"
                    width={336}
                    height={336}
                    image={headshot}
                    className="w-full h-auto"
                  />
                </EntityField>
              </div>
            )}
            <div className="flex flex-col justify-center gap-y-3 pt-8">
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
            <div className="flex justify-center sm:justify-start gap-x-6">
              {facebookPageUrl && (
                <EntityField displayName="Facebook" fieldId="facebookPageUrl">
                  <a
                    href={facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon className="h-5 w-5 mr-2" />
                  </a>
                </EntityField>
              )}
              {/* {linkedInUrl && (
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon className="h-5 w-5 mr-2" />
                </a>
              )} */}
              {twitterHandle && (
                <EntityField displayName="Twitter" fieldId="twitterHandle">
                  <a
                    href={twitterHandle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon className="h-5 w-5 mr-2" />
                  </a>
                </EntityField>
              )}
              {instagramHandle && (
                <EntityField displayName="Instagram" fieldId="instagramHandle">
                  <a
                    href={instagramHandle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="h-5 w-5 mr-2" />
                  </a>
                </EntityField>
              )}
            </div>
            <div className="flex flex-col gap-y-4">
              <CTA variant={"primary"} label={"Contact Me"} url={"#"} />
              <CTA
                variant={"secondary"}
                label={"Book an Appointment"}
                url={"#"}
              />
            </div>
          </div>

          {/* Right container for headshot on tablet and above */}
          {headshot && (
            <div className="hidden sm:flex sm:w-1/3 sm:bg-[#001943] sm:items-center sm:justify-center">
              <EntityField displayName="Hero Image" fieldId="c_hero.image">
                <Image
                  layout="fixed"
                  width={216}
                  height={216}
                  image={headshot}
                  className="sm:max-w-full sm:h-auto"
                />
              </EntityField>
            </div>
          )}
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
