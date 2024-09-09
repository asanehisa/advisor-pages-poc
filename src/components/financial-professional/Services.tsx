import { ComponentConfig, Fields } from "@measured/puck";
import { FinancialprofessionalStream } from "../../types/autogen";
import { useDocument } from "@yext/pages/util";
import { Section } from "../atoms/section";
import { Heading } from "../atoms/heading";
import { LexicalRichText } from "@yext/pages-components";
import { EntityField } from "@yext/visual-editor";
import { Body } from "../atoms/body";

export type ServicesProps = {};

const servicesFields: Fields<ServicesProps> = {};

const Services = ({}: ServicesProps) => {
  const { c_productsAndServices, _site } =
    useDocument<FinancialprofessionalStream>();
  const { title, subtitle, description } =
    _site?.c_productsAndServicesCmpt || {};

  return (
    <Section className="bg-[#001943]">
      <div className="max-w-screen-xl mx-auto px-3 py-24">
        <EntityField displayName="Services" fieldId="c_productsAndServices">
          <div className="flex flex-col justify-start pb-12">
            <Body
              className="text-left text-white uppercase"
              fontFamily="figtree"
              weight="light"
            >
              {subtitle}
            </Body>
            <Heading
              className="text-left text-white pt-5"
              fontFamily="sourceSerif"
              level={2}
            >
              {title}
            </Heading>
            <Body className="text-left text-white pt-6" fontFamily="inter">
              {description}
            </Body>
          </div>
          <div className="flex flex-col gap-y-6 justify-start">
            {c_productsAndServices.map((service) => (
              <div key={service.id}>
                <Heading
                  className="text-left text-white"
                  fontFamily="sourceSerif"
                  level={3}
                >
                  {service.name}
                </Heading>
                <LexicalRichText
                  nodeClassNames={{
                    paragraph: "text-left text-white font-inter",
                  }}
                  serializedAST={JSON.stringify(
                    service.richTextDescriptionV2?.json
                  )}
                />
              </div>
            ))}
          </div>
        </EntityField>
      </div>
    </Section>
  );
};

export const ServicesComponent: ComponentConfig<ServicesProps> = {
  fields: servicesFields,
  render: () => <Services />,
};
