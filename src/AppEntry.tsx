import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from './store';
import App from './App';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import logger from 'redux-logger';
import { AppContext } from './AppContext';
import { Domain } from './Api';

const AppEntry = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const cbSetDomains = (domains: Domain[]) => {
    setDomains(domains);
  };
  return (
    <Provider store={init(...(process.env.NODE_ENV !== 'production' ? [logger] : [])).getStore()}>
      <Router basename={getBaseName(window.location.pathname)}>
        <AppContext.Provider value={{ domains: domains, setDomains: cbSetDomains }}>
          <App />
        </AppContext.Provider>
      </Router>
    </Provider>
  );
};

export default AppEntry;
