import React from 'react';
// import { useDispatch } from 'react-redux';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import { Button, ClipboardCopy, Form, FormGroup, TextContent } from '@patternfly/react-core';

import './Page3.scss';

const Page3 = () => {
  // TODO Update links
  const installServerPackagesLink = 'https://freeipa.org/page/Quick_Start_Guide';

  const openInNewWindow = (url: string) => {
    window.open(url, '_blank');
  };

  const onInstallServerPackagesClick = () => {
    openInNewWindow(installServerPackagesLink);
  };

  return (
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
              <TextContent>Run the registration command on one IPA server with the &quot;ipa-hcc-server&quot; package.</TextContent>
              <ClipboardCopy hoverTip="copy" clickTip="Copied" isReadOnly>
                ipa-hcc register 094e3816-1a3c-11ee-bac7-482ae3863d30 0e7b6d9a-1a3c-11ee-9874-482ae3863d30
              </ClipboardCopy>
            </li>
            <li>
              <TextContent>The command registers the IPA domain and all IPA servers with Console.</TextContent>
            </li>
            <li>
              <TextContent>Once you have completed the steps, return here to test the package installation.</TextContent>
              <ClipboardCopy hoverTip="copy" clickTip="Copied" isReadOnly>
                ipa-hcc status
              </ClipboardCopy>
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
          </ol>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default Page3;
