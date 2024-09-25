import { ComponentConfig, Fields } from "@measured/puck";
import { Section } from "./atoms/section";
import "./index.css";
import { useDocument } from "@yext/pages/util";
import { FinancialprofessionalStream } from "../types/autogen";
import { Activity } from "../types/hearsay";
import { MoveUpRight } from "lucide-react";
import { Heading } from "./atoms/heading";

export type SocialPostsProps = {};

const socialPostsFields: Fields<SocialPostsProps> = {};

export const SocialPosts = ({}: SocialPostsProps) => {
  const { socialPosts } = useDocument<FinancialprofessionalStream>();

  if (!socialPosts) return null;

  return (
    <Section className="flex flex-col justify-center max-w-7xl py-24 components mx-auto">
      <Heading level={2} className="text-center pb-8">
        Latest Updates
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialPosts.map((post: Activity) => (
          <a
            key={post.activity_id}
            href={post.type_details.post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden  group"
          >
            <div className="h-[220px] overflow-hidden">
              <img
                src={post.type_details.post.image}
                alt={post.type_details.post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="bg-white p-4 h-32 shadow-lg transform transition-all duration-300 group-hover:-translate-y-4 group-hover:shadow-md">
              <p className="text-sm mb-2 line-clamp-3">
                {post.type_details.post.description}
              </p>
              <MoveUpRight className="text-[#001943] " size={24} />
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
};

export const SocialPostsComponent: ComponentConfig<SocialPostsProps> = {
  fields: socialPostsFields,
  defaultProps: {},
  render: ({}) => <SocialPosts />,
};
