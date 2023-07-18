import React from 'react';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';
import { Button, ClipboardCopy, Form, FormGroup, Icon, Select, SelectOption, Stack, TextContent } from '@patternfly/react-core';

import './Page1.scss';

const Page1: React.FC = () => {
  // TODO Update links
  const firewallConfigurationLink =
    'https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_and_managing_networking/using-and-configuring-firewalld_configuring-and-managing-networking';
  const cloudProviderConfigurationLink =
    'https://access.redhat.com/documentation/es-es/red_hat_subscription_management/2023/html-single/red_hat_cloud_access_reference_guide/index';
  const networkConfigurationLink = 'https://www.redhat.com/sysadmin/network-interface-linux';
  const installServerPackagesLink = 'https://freeipa.org/page/Quick_Start_Guide';

  // States
  const [isOpen, setIsOpen] = React.useState(false);

  // hooks
  const onRegisterDomainTypeSelect = () => {
    // TODO Not implemented
    console.debug('onRegisterDomainTypeSelect in WizardPage');
    return;
  };

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const domainOptions = [
    {
      value: 'rhel-idm',
      title: 'Red Hat Enterprise Linux IdM/IPA',
    },
  ];

  return (
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
            <ClipboardCopy hoverTip="copy" clickTip="Copied" isReadOnly>
              dnf list installed ipa-hcc-server
            </ClipboardCopy>
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
              <ClipboardCopy hoverTip="copy" clickTip="Copied" isReadOnly>
                dnf copr enable copr.devel.redhat.com/cheimes/ipa-hcc && dnf install ipa-hcc-server
              </ClipboardCopy>
              The package must be installed on at least one IPA server. For redundency, the package should be installed on two or more IPA servers,
              possibly all IPA servers.
            </TextContent>
          </Stack>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default Page1;
