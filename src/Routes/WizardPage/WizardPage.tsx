import React, { useEffect, useState } from 'react';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';

import { Button, Page, PageSection, PageSectionTypes, PageSectionVariants, Wizard } from '@patternfly/react-core';

import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';

import './WizardPage.scss';
import { useNavigate } from 'react-router-dom';
import { Domain } from '../../Components/DomainList/DomainList';

// Lazy load for the wizard pages
const Page1 = React.lazy(() => import('./Components/Page1/Page1'));
const Page2 = React.lazy(() => import('./Components/Page2/Page2'));
const Page3 = React.lazy(() => import('./Components/Page3/Page3'));
const Page4 = React.lazy(() => import('./Components/Page4/Page4'));

const initialDomain: Domain = {
  domain_id: '14f3a7a4-32c5-11ee-b40f-482ae3863d30',
  domain_name: 'mydomain.example',
  auto_enrollment_enabled: true,
  title: 'My Domain',
  description: 'My Domain Description',
  domain_type: 'rhel-idm',
  rhel_idm: {
    realm_name: '',
    realm_domains: [],
    ca_certs: [],
    servers: [],
  },
};

const demoToken = 'c34e10a8-32c7-11ee-bde3-482ae3863d30';

/**
 * Wizard page to register a new domain into the service.
 */
const WizardPage: React.FC = () => {
  const navigate = useNavigate();

  // TODO Update the initial state into the context so that
  //      state can be read/write from the different pages
  //      into the wizard process.
  const [data] = useState<Domain>(initialDomain);

  useEffect(() => {
    insights?.chrome?.appAction?.('default-page');
  }, []);

  // FIXME Update the URL with the location for docs
  const linkLearnMoreAbout = 'https://access.redhat.com/articles/1586893';

  // Event when Close button is clicked
  const onCloseClick = () => {
    // TODO Not implemented
    //      What happens on Cancel? (see documentation)
    navigate('/domains');
  };

  const steps = [
    {
      // This page only display the pre-requisites
      name: 'Prerequisites',
      component: <Page1 />,
    },
    {
      name: 'Basic information',
      // FIXME Pass here the 'registering.domain' field from the context
      component: <Page2 data={data} />,
    },
    {
      name: 'Registration',
      // FIXME Pass here the 'registering.domain' field from the context
      // FIXME Pass here the 'registering.token' field from the context
      component: <Page3 data={data} token={demoToken} />,
    },
    {
      name: 'Review',
      // FIXME Pass here the 'registering.domain' field from the context
      component: <Page4 data={[data]} />,
    },
  ];

  const title = 'Add domain';

  return (
    <React.Fragment>
      <Page>
        <PageHeader>
          <PageHeaderTitle title={title} />
          <p>
            Add a domain to the registry.{' '}
            <Button
              component="a"
              target="_blank"
              variant="link"
              isInline
              icon={<ExternalLinkAltIcon />}
              iconPosition="right"
              href={linkLearnMoreAbout}
            >
              Learn more about the domain registry.
            </Button>
          </p>
        </PageHeader>
        <PageSection type={PageSectionTypes.wizard} variant={PageSectionVariants.light}>
          <Wizard navAriaLabel={`${title} steps`} mainAriaLabel={`${title} content`} steps={steps} onClose={onCloseClick} />
        </PageSection>
      </Page>
    </React.Fragment>
  );
};

export default WizardPage;
