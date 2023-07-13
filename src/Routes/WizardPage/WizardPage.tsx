import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';
import CopyIcon from '@patternfly/react-icons/dist/esm/icons/copy-icon';

import {
  Button,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Form,
  FormGroup,
  Icon,
  MenuToggle,
  MenuToggleElement,
  Page,
  PageSection,
  PageSectionTypes,
  PageSectionVariants,
  Select,
  SelectOption,
  Stack,
  Switch,
  TextArea,
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
import { useNavigate } from 'react-router-dom';
import DomainList, { Domain } from '../../Components/DomainList/DomainList';

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
const WizardPage = () => {
  const [domainType, setDomainType] = React.useState('rhel-idm');
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>('Select a value');
  const [isHostJoinEnabled, setIsHostJoinEnabled] = React.useState(true);
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

  const onHostJoinEnabledChange = () => {
    setIsHostJoinEnabled(!isHostJoinEnabled);
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

  // FIXME Decouple in a component
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

  // FIXME Encapsulate this in a component
  const page2Content = (
    <React.Fragment>
      <Form
        onSubmit={(value) => {
          console.debug('onSubmit WizardPage' + String(value));
        }}
      >
        <FormGroup label="Name" isRequired fieldId="register-domain-name">
          <TextInput id="register-domain-name" className="domain-name"></TextInput>
        </FormGroup>
        <FormGroup label="Description" fieldId="register-domain-description">
          <TextArea
            id="register-domain-description"
            type="text"
            className="domain-description"
            value={
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, porro velit aperiam deserunt dolor amet esse rerum ea sit ' +
              'sequi facere, necessitatibus quam! Ut sequi, praesentium officiis itaque aspernatur assumenda?'
            }
          ></TextArea>
        </FormGroup>
      </Form>
    </React.Fragment>
  );

  const onCopyToClipboard = () => {
    console.info('Copy to clipboard');
    return;
  };

  // FIXME Encapsulate this in a component
  const page3Content = (
    <React.Fragment>
      <Form
        onSubmit={(value) => {
          console.debug('onSubmit WizardPage' + String(value));
        }}
      >
        <FormGroup label="Register the domain blueprint with RHEL IdM/IPA" fieldId="register-domain-name">
          <TextContent>
            Intro test lorem ipsum dolor sit amet, consectetur adipisciing elit, sed do esiusmod tempor incididunt ut labore at dolore.
          </TextContent>
          <ol className="domain-page-3-list">
            <li>
              <TextContent>Ut enim ad minim mamiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</TextContent>
              <TextInputGroup>
                <TextInputGroupMain value="ipa-hcc register 094e3816-1a3c-11ee-bac7-482ae3863d30 0e7b6d9a-1a3c-11ee-9874-482ae3863d30" />
                <TextInputGroupUtilities>
                  <Button variant="plain" onClick={onCopyToClipboard} aria-label="Copy to clipboard">
                    <CopyIcon />
                  </Button>
                </TextInputGroupUtilities>
              </TextInputGroup>
            </li>
            <li>
              <TextContent>Duis aute irune dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</TextContent>
            </li>
            <li>
              <TextContent>Once you have completed the steps, return here to test the package installation.</TextContent>
              <TextInputGroup>
                <TextInputGroupMain value="ipa-hcc status" />
                <TextInputGroupUtilities>
                  <Button variant="plain" onClick={onCopyToClipboard} aria-label="Copy to clipboard">
                    <CopyIcon />
                  </Button>
                </TextInputGroupUtilities>
              </TextInputGroup>
            </li>
            <li>
              <TextContent>If you receive message &quot;XYZ&quot; as a final response, the package was successfully installed.</TextContent>
              <TextContent>
                Didn&apos;t get the success message?
                <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="right" onClick={onInstallServerPackagesClick}>
                  Troubleshoot your package installation
                </Button>
              </TextContent>
            </li>
            <li>
              <TextContent>Repeat this process for each server within this domain you want to register.</TextContent>
            </li>
          </ol>
        </FormGroup>
      </Form>
    </React.Fragment>
  );

  // FIXME Refactor in a component
  const domainData: Domain[] = [
    {
      domain_id: 'e68587bc-e8eb-4c88-932a-c8bcd4b816fb',
      domain_name: 'mydomain.example',
      auto_enrollment_enabled: false,
      title: 'Human readable title',
      description: 'My human friendly description',
      domain_type: 'rhel-idm',
      rhel_idm: {
        ca_certs: [
          {
            issuer: 'CN=Certificate Authority, O=MYDOMAIN.EXAMPLE',
            nickname: 'MYDOMAIN.EXAMPLE IPA CA',
            not_after: new Date('2023-01-31T13:23:36Z'),
            not_before: new Date('2023-01-31T13:23:36Z'),
            pem: '-----BEGIN CERTIFICATE-----\nMIIElzCCAv+gAwIBAgIBATANBgkqhkiG9w0BAQsFADA6MRgwFgYDVQQKDA9ITVNJ\nRE0tREVWLlRFU1QxHjAcBgNVBAMMFUNlcnRpZmljYXRlIEF1dGhvcml0eTAeFw0y\nMzA2MTIwNjEyMThaFw00MzA2MTIwNjEyMThaMDoxGDAWBgNVBAoMD0hNU0lETS1E\nRVYuVEVTVDEeMBwGA1UEAwwVQ2VydGlmaWNhdGUgQXV0aG9yaXR5MIIBojANBgkq\nhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA/F+63FGVUElkycJ2I5/rOIQ8331bfqp+\nraVuft2wezXj9O60X4DsEXltjMM+Lb3vPpInI6Fjdr74RWiz7YeWRYT8y4AgiZ7O\nrbe1ivvmutZwdA3S3KVoQhfqLUzYKksL7IpLQFuXsOm85GMQsw2SNz0NIlM3Ixjv\nKFyARcFSLzBAlIUHdZwq2e8PKvIcLGjHRGczfBqSviCBKxTTO3S2vRRHFEw8lsmJ\nyqIb8gLLOSRi4GqZfp6RRnr88z7z/xqZc7ffDko3ngjUn1Cynm715Xqftlj3o297\naVQ/Oxgw/ODiQSZl+HnOgrrH4XbM+hVUfxBXydVgPrN8mTrTcY0X03cLqMWCFO6E\n8XAJFkY+1SLOdruHTfdhbmRcp/vvyZ3rcSP9qk75jFPr3iKU5vnbAtbZfGtzk6te\nsG/Y8tRjdLvcKKM9PBa93VA56nN0+RLtOn24/UfiYjYsYQeq1wJnfJUlcrER9X6t\nbX1umBXcwT9FeofJENCZqP3YfU0EH76nAgMBAAGjgacwgaQwHwYDVR0jBBgwFoAU\ntQw3tdMW/Sz+VLsOZaefg4Vnrm0wDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8E\nBAMCAcYwHQYDVR0OBBYEFLUMN7XTFv0s/lS7DmWnn4OFZ65tMEEGCCsGAQUFBwEB\nBDUwMzAxBggrBgEFBQcwAYYlaHR0cDovL2lwYS1jYS5obXNpZG0tZGV2LnRlc3Qv\nY2Evb2NzcDANBgkqhkiG9w0BAQsFAAOCAYEA6JDiMHd8aWSlyIQ8tg/mEH7mIvSz\niXWfygMcyXP5sGRvrE0yo2lbNfr8y3KnOGkNYMqrKJ28VBXAPjx5zLrooHynLYua\nLEsHw6XzvQWiWvcstSkKhcVOGdDqTMhl2XEGvx+LHZYBWKlb7i+L/0fDl0EUestS\ne4Shh63DLJ+7RaMFqoI/CHO/Jer5R4+dIMR8KSTTBhjEGLwN6rsRNI7D7vsyqDV8\ntZmhMHNEo9jtrPR8+tAzp6BaumioukI75nkAXrKiB0GRXI/jRp94VqEZstWcQPqc\nxzRRyR2Htet4AVbUWnSq2TRWIyeIecgPVmHXgDPpFWrwi/hpysXqT9sN/QOsCa3a\n2IpyGeuieProOeXb5lG4pbwePz5dRRlY3WRvhWdQm+dRGRErJt42KC7JAfiYoSmV\nDfJjQL2S11oYZt048ZQFIsUpiSJTmsCLXURIEuccrKT+WXR7D+WNkYm8aJ/4s8Ub\n+B8Vv5GjCTO5LrjgVWGZtxOttN/uJ1ecgZpW\n-----END CERTIFICATE-----\n',
            serial_number: '1',
            subject: 'CN=My Domain, O=MYDOMAIN.EXAMPLE',
          },
        ],
        realm_domains: ['mydomain.example'],
        realm_name: 'MYDOMAIN.EXAMPLE',
        servers: [
          {
            ca_server: true,
            fqdn: 'ipaserver.mydomain.example',
            hcc_enrollment_server: true,
            hcc_update_server: true,
            location: 'europe',
            pkinit_server: true,
            subscription_manager_id: '6f324116-b3d2-11ed-8a37-482ae3863d30',
          },
          {
            ca_server: false,
            fqdn: 'server2.mydomain.example',
            hcc_enrollment_server: false,
            hcc_update_server: false,
            pkinit_server: false,
            subscription_manager_id: '6f324116-b3d2-11ed-8a37-482ae3863d30',
          },
        ],
      },
    },
  ];
  const page4Content = (
    <React.Fragment>
      <DescriptionList
        isHorizontal
        horizontalTermWidthModifier={{
          default: '12ch',
          sm: '15ch',
          md: '18ch',
          lg: '18ch',
          xl: '18ch',
          '2xl': '18ch',
        }}
      >
        <DescriptionListGroup>
          <DescriptionListTerm>Identity and access management solution</DescriptionListTerm>
          <DescriptionListDescription>
            {domainData[0].domain_type === 'rhel-idm' && <div>Red Hat Enterprise Linux IdM/IPA</div>}
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Name</DescriptionListTerm>
          <DescriptionListDescription>{domainData[0].title}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Description</DescriptionListTerm>
          <DescriptionListDescription>{domainData[0].description}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>DNS Domain/Servers</DescriptionListTerm>
          <DescriptionListDescription>
            {/* TODO Navigator panel */}
            1-3 of 3 v &nbsp;&nbsp;&lt;&nbsp;&nbsp;&nbsp;&gt;
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DomainList data={domainData}></DomainList>
        <DescriptionListGroup>
          <DescriptionListTerm>Allow host domain join</DescriptionListTerm>
          <DescriptionListDescription>
            <Switch
              id="wizard-allow-host-join"
              aria-label="Allow host domain join"
              isChecked={isHostJoinEnabled}
              onChange={onHostJoinEnabledChange}
            />
          </DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
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
      component: page2Content,
    },
    {
      name: 'Registration',
      component: page3Content,
    },
    {
      name: 'Review',
      component: page4Content,
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
