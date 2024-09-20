import type { Config } from "@measured/puck";
import {
  HeroComponent as FinProHero,
  HeroProps as FinProHeroProps,
} from "./components/financial-professional/FinProHero";

import "@yext/visual-editor/style.css";
import {
  ServicesProps,
  ServicesComponent as Services,
} from "./components/financial-professional/Services";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import {
  SocialPostsProps,
  SocialPostsComponent as SocialPosts,
} from "./components/SocialPosts";
import {
  LeadFormProps,
  LeadFormComponent as LeadForm,
} from "./components/financial-professional/LeadForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type FinancialProfessionalProps = {
  FinProHero: FinProHeroProps;
  Services: ServicesProps;
  SocialPosts: SocialPostsProps;
  LeadForm: LeadFormProps;
};

const queryClient = new QueryClient();

export const financialProfessionalConfig: Config<FinancialProfessionalProps> = {
  components: {
    FinProHero,
    Services,
    SocialPosts,
    LeadForm,
  },
  root: {
    render: ({ children }) => {
      return (
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
          <Footer />
        </QueryClientProvider>
      );
    },
    fields: {},
  },
};

export const componentRegistry = new Map<string, Config<any>>([
  ["Financial Professional", financialProfessionalConfig],
]);
