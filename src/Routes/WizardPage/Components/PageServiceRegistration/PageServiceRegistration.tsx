import React from 'react';
// import { useDispatch } from 'react-redux';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import { Alert, Button, ClipboardCopy, Form, FormGroup, TextContent } from '@patternfly/react-core';

import './PageServiceRegistration.scss';
import { Domain } from '../../../../Api/api';

interface PageServiceRegistrationProp {
  data?: Domain;
  token?: string;
}

const PageServiceRegistration: React.FC<PageServiceRegistrationProp> = (props) => {
  // FIXME Delete this
  const demoToken = 'F4ZWgmhUxcw.d2iqKLHa8281CM_1aknGLsBRFpwfoy3YkrTbLBIuEkM';
  const ipa_hcc_register_cmd = 'ipa-hcc register ' + demoToken;
  const alertTitle = 'Register your directory and domain service';
  // FIXME Update the URL with the location for docs
  const linkLearnMoreAbout = 'https://access.redhat.com/articles/1586893';

  return (
    <React.Fragment>
      <Alert title={alertTitle} variant="warning" isInline>
        Completing this step registers your directory and domain service, and cannot be undone from the wizard.{' '}
        {/* FIXME Q What is the better way to fix the top padding between the link and the text? */}
        <div className="--pf-global--spacer--sm">
          <Button component="a" target="_blank" variant="link" isInline icon={<ExternalLinkAltIcon />} iconPosition="right" href={linkLearnMoreAbout}>
            Learn more about the directory and domain services.
          </Button>
        </div>
      </Alert>
      <Form
        onSubmit={(value) => {
          console.debug('onSubmit WizardPage' + String(value));
        }}
      >
        <FormGroup label="Register the domain blueprint with RHEL IdM/IPA" fieldId="register-domain-name">
          <ol>
            <li>
              <TextContent>
                To register your Red Hat IdM/IPA server with the Red Hat Hybrid Cloud Console, run the following command in your RHEL IdM (IPA)
                server&#39;s terminal.
              </TextContent>
              <ClipboardCopy hoverTip="copy" clickTip="Copied" isReadOnly>
                {ipa_hcc_register_cmd}
              </ClipboardCopy>
            </li>
            <li>
              <TextContent>Once the process have been completed, run a verification test.</TextContent>
            </li>
          </ol>
        </FormGroup>
      </Form>
      {/* TODO Add here the new VerifyRegistration component */}
    </React.Fragment>
  );
};

export default PageServiceRegistration;
