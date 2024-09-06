import type { Config } from "@measured/puck";
import {
  HeroComponent as FinProHero,
  HeroProps as FinProHeroProps,
} from "./components/financial-professional/FinProHero";

import "@yext/visual-editor/style.css";

type FinancialProfessionalProps = {
  FinProHero: FinProHeroProps;
};

export const financialProfessionalConfig: Config<FinancialProfessionalProps> = {
  components: {
    FinProHero,
  },
  root: {
    render: ({ children }) => {
      return <>{children}</>;
    },
    fields: {},
  },
};

export const componentRegistry = new Map<string, Config<any>>([
  ["Financial Professional", financialProfessionalConfig],
]);
