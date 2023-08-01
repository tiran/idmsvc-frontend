import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import { RegistryIcon } from '@patternfly/react-icons/dist/esm/icons/registry-icon';

import { Bullseye, Button, EmptyState, EmptyStateBody, EmptyStateVariant, Stack, StackItem, Title } from '@patternfly/react-core';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';

import './DefaultPage.scss';
import Section from '@redhat-cloud-services/frontend-components/Section';

// const SampleComponent = lazy(() => import('../../Components/SampleComponent/sample-component'));

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 *
 * https://www.patternfly.org/v4/layouts/bullseye/
 *
 */
const DefaultPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    insights?.chrome?.appAction?.('default-page');
  }, []);

  const linkLearnMoreAbout = 'https://access.redhat.com/articles/1586893';

  const handleOpenWizard = () => {
    navigate('/domains/wizard', { replace: true });
  };

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Domain Registry" />
        <p>
          Manage registered domains to leverage host access controls from your existing identity and access management.{' '}
          <Button component="a" target="_blank" variant="link" isInline icon={<ExternalLinkAltIcon />} iconPosition="right" href={linkLearnMoreAbout}>
            Learn more about the domain registry.
          </Button>
        </p>
      </PageHeader>
      <Section>
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.full}>
            <RegistryIcon size="xl" />
            <Title headingLevel="h2" size="lg">
              No domains
            </Title>
            <EmptyStateBody>
              <Stack>
                <StackItem className="empty-state-body-content">
                  To specify which existing access controls can be
                  <br /> leveraged for hosts launched through the console, you
                  <br /> must first register your domain(s). As part of that
                  <br /> process you will be required to SSO into your server(s)
                  <br /> and install packages via CLI.
                </StackItem>
                <StackItem>
                  <Button onClick={handleOpenWizard}>Add domain</Button>
                </StackItem>
              </Stack>
            </EmptyStateBody>
          </EmptyState>
        </Bullseye>
      </Section>
    </React.Fragment>
  );
};

export default DefaultPage;
