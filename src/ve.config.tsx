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

type FinancialProfessionalProps = {
  FinProHero: FinProHeroProps;
  Services: ServicesProps;
};

export const financialProfessionalConfig: Config<FinancialProfessionalProps> = {
  components: {
    FinProHero,
    Services,
  },
  root: {
    render: ({ children }) => {
      return (
        <>
          <Header />
          {children}
          <Footer />
        </>
      );
    },
    fields: {},
  },
};

export const componentRegistry = new Map<string, Config<any>>([
  ["Financial Professional", financialProfessionalConfig],
]);
