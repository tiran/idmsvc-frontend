import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';
import CopyIcon from '@patternfly/react-icons/dist/esm/icons/copy-icon';

import {
  Button,
  Form,
  FormGroup,
  Icon,
  List,
  MenuToggle,
  MenuToggleElement,
  Page,
  PageSection,
  PageSectionTypes,
  PageSectionVariants,
  Select,
  SelectOption,
  Stack,
  TextContent,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
  Wizard,
} from '@patternfly/react-core';
// import { DashboardWrapper, PageSection, PageSectionTypes, PageSectionVariants } from '@patternfly/react-core/src/demos/examples/DashboardWrapper';

import { TextInput } from '@patternfly/react-core';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';

import './WizardPage.scss';
import { NavigateOptions, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

export type DomainType = 'rhel-idm' | undefined;

const WizardPage = () => {
  const [domainType, setDomainType] = React.useState('rhel-idm');
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>('Select a value');
  // const [isDrawerExpanded, setIsDrawerExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    insights?.chrome?.appAction?.('default-page');
  }, []);

  // const drawerRef = React.useRef<HTMLSpanElement>(null);

  // const onExpandDrawer = () => {
  //   drawerRef.current && drawerRef.current.focus();
  // };

  const onLearnAboutClick = () => {
    // FIXME Update the URL with the location for docs
    window.open('https://access.redhat.com/articles/1586893', '_blank');
  };

  const onRegisterDomainTypeSelect = () => {
    // TODO Not implemented
    console.debug('onRegisterDomainTypeSelect in WizardPage');
    return;
  };

  // Event when Close button is clicked
  const onCloseClick = () => {
    // TODO Not implemented
    //      What happens on Cancel? (see documentation)
    navigate('/domains');
  };

  const handleRegisterDomainTypeChange = () => {
    // TODO Add behavior when the domain type has changed
    // console.debug('register-domain-type onChange event');
    return;
  };

  const onOpenClick = () => {
    // TODO Add behavior when the wizard is opened
    //      Not implemented
    // console.debug('onOpenClick on WizardPage');
    return;
  };

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const openInNewWindow = (url: string) => {
    window.open(url, '_blank');
  };

  // TODO Update links
  const firewallConfigurationLink =
    'https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_and_managing_networking/using-and-configuring-firewalld_configuring-and-managing-networking';
  const cloudProviderConfigurationLink =
    'https://access.redhat.com/documentation/es-es/red_hat_subscription_management/2023/html-single/red_hat_cloud_access_reference_guide/index';
  const networkConfigurationLink = 'https://www.redhat.com/sysadmin/network-interface-linux';
  const installServerPackagesLink = 'https://freeipa.org/page/Quick_Start_Guide';

  const onFirewallConfigurationClick = () => {
    openInNewWindow(firewallConfigurationLink);
  };

  const onCloudProviderConfigurationClick = () => {
    openInNewWindow(cloudProviderConfigurationLink);
  };

  const onNetworkConfigurationClick = () => {
    openInNewWindow(networkConfigurationLink);
  };

  const onInstallServerPackagesClick = () => {
    openInNewWindow(installServerPackagesLink);
  };

  const onCopyPkgCommand = () => {
    // FIXME Add logic to copy content to the clipboard
    console.warn('WizardPage:Page1:onCopyPkgCommand:Not implemented');
    return;
  };

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={toggleRef}
      onClick={onToggleClick}
      isExpanded={isOpen}
      style={
        {
          width: '200px',
        } as React.CSSProperties
      }
    >
      {selected}
    </MenuToggle>
  );

  const domainOptions = [
    {
      value: 'rhel-idm',
      title: 'Red Hat Enterprise Linux IdM/IPA',
    },
  ];

  const page1Content = (
    <React.Fragment>
      <Form
        onSubmit={(value) => {
          console.debug('onSubmit WizardPage' + String(value));
        }}
      >
        <FormGroup
          label="Identity and access management service"
          isRequired
          fieldId="register-domain-type"
          helperText={
            <TextContent style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Icon status="info" isInline>
                <InfoCircleIcon />
              </Icon>
              <span> </span>
              Only Red Hat Linux IdM/IPA are currently supported.
            </TextContent>
          }
        >
          <Select
            id="register-domain-type"
            isDisabled
            isOpen={isOpen}
            onSelect={onRegisterDomainTypeSelect}
            // onOpenChange={(isOpen) => setIsOpen(isOpen)}
            onToggle={onToggleClick}
            className="domain-type-select"
          >
            {domainOptions.map((option) => (
              <SelectOption key={option.value} value={option.value}>
                {option.title}
              </SelectOption>
            ))}
          </Select>
        </FormGroup>
        <FormGroup label="Prerequisites">
          <TextContent>
            There are prerequisites that must be completed to create and use security for Red Hat Linux IdM/IPA. If any prerequisites are already in
            place, please skip to the next step:
          </TextContent>
          <Button
            className="domain-item-margin-left"
            component="a"
            target="_blank"
            variant="link"
            icon={<ExternalLinkAltIcon />}
            iconPosition="right"
            isInline
            href={firewallConfigurationLink}
          >
            1. Firewall configuration
          </Button>
          <br />
          <Button
            className="domain-item-margin-left"
            component="a"
            target="_blank"
            variant="link"
            icon={<ExternalLinkAltIcon />}
            iconPosition="right"
            isInline
            href={cloudProviderConfigurationLink}
          >
            2. Cloud provider configuration
          </Button>
          <br />
          <Button
            className="domain-item-margin-left"
            component="a"
            target="_blank"
            variant="link"
            icon={<ExternalLinkAltIcon />}
            iconPosition="right"
            isInline
            href={networkConfigurationLink}
          >
            3. Networking configuration
          </Button>
          <br />
          <Stack className="domain-item-margin-left">
            <TextContent>4. Verify wether or not the package is present on your server(st) with this command:</TextContent>
            <br />
            <TextInputGroup>
              <TextInputGroupMain value="disabled test input example" />
              <TextInputGroupUtilities>
                <Button variant="plain" onClick={onCopyPkgCommand} aria-label="Copy to clipboard">
                  <CopyIcon />
                </Button>
              </TextInputGroupUtilities>
            </TextInputGroup>
            <TextContent>
              If the package is not present on your server(s), follow these steps:{' '}
              <Button
                component="a"
                target="_blank"
                variant="link"
                icon={<ExternalLinkAltIcon />}
                iconPosition="right"
                isInline
                href={installServerPackagesLink}
              >
                Install server packages
              </Button>
            </TextContent>
          </Stack>
        </FormGroup>
      </Form>
    </React.Fragment>
  );

  const pageNotImplemented = (
    <React.Fragment>
      <p>Not implemented</p>
    </React.Fragment>
  );

  const steps = [
    {
      name: 'Prerequisites',
      component: page1Content,
    },
    {
      name: 'Basic information',
      component: pageNotImplemented,
    },
    {
      name: 'Registration',
      component: pageNotImplemented,
    },
    {
      name: 'Review',
      component: pageNotImplemented,
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
            <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="right" onClick={onLearnAboutClick}>
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
