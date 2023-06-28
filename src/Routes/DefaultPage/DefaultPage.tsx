import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import { RegistryIcon } from '@patternfly/react-icons/dist/esm/icons/registry-icon';

import { Bullseye, Button, EmptyState, EmptyStateBody, EmptyStateVariant, Spinner, Stack, StackItem, Title } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';

import './DefaultPage.scss';

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

  useEffect(() => {
    insights?.chrome?.appAction?.('default-page');
  }, []);

  const handleOpenLearnAbout = () => {
    // FIXME Update the URL with the location for docs
    window.open('https://access.redhat.com/articles/1586893', '_blank');
  };

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Domain Registry" />
        <p>
          Manage registered domains to leverage host access controls from your existing identity and access management.{' '}
          <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="right" onClick={handleOpenLearnAbout}>
            Learn more about the domain registry
          </Button>
        </p>
      </PageHeader>
      <Main>
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
                  <Button>Add domain</Button>
                </StackItem>
              </Stack>
            </EmptyStateBody>
          </EmptyState>
        </Bullseye>
      </Main>
    </React.Fragment>
  );
};

export default DefaultPage;
