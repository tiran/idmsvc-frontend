import { createContext } from 'react';
import { Domain } from './Api';

export interface IAppContext {
  domains: Domain[];
  setDomains: (domains: Domain[]) => void;
  // wizardDomain?: Domain;
  // setWizardDomain: (domain?: Domain) => void;
}

export const AppContext = createContext<IAppContext>({
  domains: [],
  setDomains: (domains: Domain[]) => {
    throw new Error('Function "setDomains" not implemented: domains=' + domains);
  },
  // wizardDomain: undefined,
  // setWizardDomain: (domain?: Domain) => {
  //   throw new Error('Function "setWizardDomain" not implemented: domain=' + domain);
  // },
});
