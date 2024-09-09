import {
  Link,
  CTA,
  LexicalRichText,
  Address,
  Image,
} from "@yext/pages-components";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "./index.css";
import { FinancialprofessionalStream } from "../types/autogen";
import { useDocument } from "@yext/pages/util";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { EntityField } from "@yext/visual-editor";

const Footer = () => {
  const { _site } = useDocument<FinancialprofessionalStream>();
  const { c_headquarters, c_termsAndConditions, logo } = _site;
  const headquarters = c_headquarters[0];

  return (
    <footer className="bg-[#001943] px-4 text-white">
      <div className="mb-4 flex flex-col mx-auto max-w-7xl ">
        <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-between">
          {/* logo goes here */}

          {logo && (
            <EntityField fieldId="_site.logo" displayName="Logo">
              <Image layout="fixed" width={218} height={218} image={logo} />
            </EntityField>
          )}
          <div className="pt-3">
            {headquarters && (
              <>
                <EntityField
                  fieldId="_site.c_headquarters.name"
                  displayName="Headquarters Name"
                >
                  <p className="text-center lg:text-right">
                    {headquarters.name}
                  </p>
                </EntityField>
                <EntityField
                  fieldId="_site.c_headquarters.address"
                  displayName="Headquarters Address"
                >
                  <Address
                    className="text-center lg:text-right"
                    address={headquarters.address}
                    lines={[["line1", "city", "region", "postalCode"]]}
                    separator={", "}
                  />
                </EntityField>
              </>
            )}

            <div className="flex justify-center lg:justify-end gap-x-6 pt-4">
              {headquarters.facebookPageUrl && (
                <EntityField
                  fieldId="_site.c_headquarters.facebookPageUrl"
                  displayName="Headquarters Facebook"
                >
                  <a
                    href={headquarters.facebookPageUrl}
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
              {headquarters.twitterHandle && (
                <EntityField
                  fieldId="_site.c_headquarters.twitterHandle"
                  displayName="Headquarters Twitter"
                >
                  <a
                    href={headquarters.twitterHandle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon className="h-5 w-5 mr-2" />
                  </a>
                </EntityField>
              )}
              <EntityField
                fieldId="_site.c_headquarters.instagramHandle"
                displayName="Headquarters Instagram"
              >
                {headquarters.instagramHandle && (
                  <a
                    href={headquarters.instagramHandle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="h-5 w-5 mr-2" />
                  </a>
                )}
              </EntityField>
            </div>
          </div>
        </div>
        <div className="h-px bg-white w-full my-6 " />
        <div className="pb-12">
          <EntityField
            fieldId="c_termsAndConditions"
            displayName="Terms and Conditions"
          >
            <LexicalRichText
              nodeClassNames={{
                paragraph:
                  "text-left text-sm text-white font-figtree font-light",
              }}
              serializedAST={JSON.stringify(c_termsAndConditions.json)}
            />
          </EntityField>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
