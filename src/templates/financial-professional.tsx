import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { Config, Render } from "@measured/puck";
import { financialProfessionalConfig } from "../ve.config";
import { DocumentProvider } from "@yext/pages/util";
import { resolveVisualEditorData } from "@yext/visual-editor";
import "../components/index.css";
import { getActivities } from "../utils/api";

export const config: TemplateConfig = {
  name: "Financial Professional",
  stream: {
    $id: "financialprofessional-stream",
    filter: {
      entityTypes: ["financialProfessional"],
    },
    fields: [
      "id",
      "name",
      "slug",
      "c_visualConfigurations",
      "c_pages_layouts.c_visualConfiguration",
      "headshot",
      "c_role",
      "address",
      "description",
      "mainPhone",
      "emails",
      "languages",
      "facebookPageUrl",
      "linkedInUrl",
      "twitterHandle",
      "instagramHandle",
      "c_productsAndServices.id",
      "c_productsAndServices.name",
      "c_productsAndServices.richTextDescriptionV2",
    ],
    localization: {
      locales: ["en"],
    },
  },
  additionalProperties: {
    isVETemplate: true,
    isDraft: true,
  },
};

export const transformProps = async (data: TemplateRenderProps) => {
  let streamData = resolveVisualEditorData(data, "Financial Professional");

  const socialResponse = await getActivities({
    orgId: "1712",
    assetType: "third_party_site",
    assetId: "2393541",
  });
  streamData.document.socialPosts = socialResponse.data;
  return streamData;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : "advisors/" + document.id;
};

const FinancialProfessional: Template<TemplateRenderProps> = ({ document }) => {
  const { visualTemplate } = document;
  return (
    <DocumentProvider value={document}>
      <Render
        config={financialProfessionalConfig as Config}
        data={visualTemplate}
      />
    </DocumentProvider>
  );
};

export default FinancialProfessional;
