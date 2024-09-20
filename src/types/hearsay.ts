export interface ActivityResponse {
  data: Activity[];
  meta: Meta;
}

export interface Activity {
  organization_id: number;
  activity_id: number;
  participants: null;
  group: Group;
  user: User;
  owner: User;
  author: User;
  asset: Asset;
  text: string;
  subject: null;
  direction: string;
  asset_id: number;
  service_id: string;
  activity_type: string;
  campaign: null;
  message_visibility: null;
  organization_content_id: number;
  phone_number_from: null;
  phone_numbers_to: any[];
  contact_ids: any[];
  parent_service_id: null;
  parent_id: null;
  root_parent_id: number;
  batch_mail_id: null;
  attachments: any[];
  date: string;
  create_date: string;
  discovered_time: string;
  type_details: TypeDetails;
  permalink: string;
  denormalized_record_creation_time: string;
}

interface Group {
  reference_id: null;
  name: string;
  id: number;
}

interface User {
  reference_id: null;
  email: string;
  name: string;
}

interface Asset {
  asset_id: number;
  name: string;
  service_id: string;
  type: string;
}

interface TypeDetails {
  post: Post;
}

interface Post {
  description: string;
  title: string;
  url: string;
  image: string;
  caption: string;
  shortened_url: string;
  url_summary: UrlSummary;
  type: string;
}

interface UrlSummary {
  description: string;
  fetched_url: string;
  images: string[];
  score: null;
  title: string;
  url: string;
}

interface Meta {
  total: number;
  sort_by: null;
  next_link: null;
}

export interface GetActivitiesParams {
  orgId: string;
  assetType: string;
  assetId: string;
}

export interface CreateLeadParams {
  contactMethod: "email" | "phone";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  postalCode: string;
  themeId?: string;
  optin?: boolean;
}
