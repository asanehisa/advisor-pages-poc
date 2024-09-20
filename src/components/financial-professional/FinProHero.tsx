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
import useDeviceSizes from "../../utils/useDeviceSizes";

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
    _site,
    // hours,
    // address,
    // name: locationName,
    // c_hero: hero,
  } = useDocument<FinancialprofessionalStream>();
  const { c_heroImage } = _site;

  const { isMediumDevice } = useDeviceSizes();

  return (
    <Section className="components max-w-screen-xl mx-auto px-4 py-8 sm:py-0 sm:px-0 xl:px-0 xl:relative xl:max-w-none">
      <div className="flex flex-col sm:flex-row max-w-full xl:max-w-none xl:mx-auto xl:relative">
        {/* Left container for content */}
        <div className="flex flex-col gap-y-12 sm:w-2/3 sm:p-8 xl:w-[47%] xl:pr-16 xl:bg-inherit">
          {/* Headshot for mobile */}
          {headshot && (
            <EntityField displayName="Hero Image" fieldId="c_hero.image">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden sm:hidden">
                <Image
                  layout="intrinsic"
                  image={headshot}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </EntityField>
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

        {/* Flexible white divider (visible on xl screens and above) */}
        <div className="hidden xl:block xl:w-[6%] bg-white"></div>

        {/* Right container for headshot */}
        {headshot && (
          <div className="hidden sm:flex sm:w-1/3 sm:bg-primary sm:items-center sm:justify-center xl:w-[47%] xl:relative">
            {c_heroImage && (
              <EntityField
                displayName="Site Hero Image"
                fieldId="_site.c_heroImage"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    layout="fixed"
                    width={416}
                    height={541}
                    image={c_heroImage}
                    className="object-cover hidden xl:block"
                  />
                </div>
              </EntityField>
            )}
            <EntityField displayName="Hero Image" fieldId="c_hero.image">
              <div className="xl:absolute xl:left-[-5%] xl:top-1/2 xl:transform xl:-translate-y-1/2 xl:w-[100%] xl:h-auto z-10">
                <Image
                  layout="fixed"
                  width={330}
                  height={330}
                  image={headshot}
                  className="sm:max-w-full sm:h-auto xl:w-full xl:h-auto object-cover"
                />
              </div>
            </EntityField>
          </div>
        )}
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
