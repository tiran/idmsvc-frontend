import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';

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
  Wizard,
} from '@patternfly/react-core';
// import { DashboardWrapper, PageSection, PageSectionTypes, PageSectionVariants } from '@patternfly/react-core/src/demos/examples/DashboardWrapper';

import { TextInput } from '@patternfly/react-core';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';

import './WizardPage.scss';
import { useNavigate } from 'react-router-dom';

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
          console.debug('onSubmit WizardPage');
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
      </Form>
    </React.Fragment>
  );

  const pageNotImplemented = (
    <React.Fragment>
      <p>Not implemented</p>
    </React.Fragment>
  );

  // const drawerToggleButton = (
  //   <Button isInline variant="link" onClick={onOpenClick}>
  //     Open Drawer
  //   </Button>
  // );

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

  const title = 'Add Domain';

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
