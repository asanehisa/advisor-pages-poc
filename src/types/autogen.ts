import { AddressType } from "@yext/pages-components";
import { Activity } from "./hearsay";

export interface C_visualConfigurations {
  template: string;
  data?: string;
}

export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface Address {
  line1?: string;
  line2?: string;
  line3?: string;
  sublocality?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  extraDescription?: string;
  countryCode?: string;
}

export interface C_visualConfiguration {
  template: string;
  data?: string;
}

export interface C_pages_layouts {
  c_visualConfiguration?: C_visualConfiguration;
}

export interface RichTextV2 {
  json: Record<string, any>;
}

export interface C_productsAndServices {
  id?: string;
  name?: string;
  richTextDescriptionV2?: RichTextV2;
}

export interface FinancialprofessionalStream {
  id: string;
  name: string;
  slug: string;
  c_visualConfigurations: C_visualConfigurations[];
  headshot: Image;
  c_role: string;
  address: AddressType;
  description: string;
  mainPhone: any;
  emails: string[];
  languages: string[];
  facebookPageUrl: string;
  linkedInUrl: string;
  twitterHandle: string;
  instagramHandle: string;
  c_pages_layouts: C_pages_layouts[];
  c_productsAndServices: C_productsAndServices[];
  socialPosts?: Activity[];
  _site: SiteStream;
}

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

export interface C_headerCTAs {
  name?: string;
  link?: string;
}

export interface C_productsAndServicesCmpt {
  title?: string;
  subtitle?: string;
  description?: string;
}

export interface C_visualLayouts {
  c_visualConfiguration?: C_visualConfiguration;
}

export interface C_headquarters {
  name?: string;
  address?: AddressType;
  facebookPageUrl?: string;
  linkedInUrl?: string;
  twitterHandle?: string;
  instagramHandle?: string;
}

export interface SiteStream {
  logo: ComplexImage;
  c_headerCTAs: C_headerCTAs[];
  c_productsAndServicesCmpt: C_productsAndServicesCmpt;
  c_termsAndConditions: RichTextV2;
  c_visualLayouts: C_visualLayouts[];
  c_headquarters: C_headquarters[];
}
