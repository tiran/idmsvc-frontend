import React, { useState } from 'react';
import { Form, FormGroup, TextArea, Title, Tooltip } from '@patternfly/react-core';
import { TextInput } from '@patternfly/react-core';
import { Domain } from '../../../../Api/api';
import OutlinedQuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon';

import './PageServiceDetails.scss';
import { Switch } from '@patternfly/react-core';

const PageServiceDetails: React.FC<{ data: Domain }> = (props) => {
  const [data, setData] = useState<Domain>(props.data);
  const [isAutoEnrollmentEnabled, setIsAutoEnrollmentEnabled] = React.useState<boolean>(true);

  const onChangeAutoEnrollment = (checked: boolean) => {
    setIsAutoEnrollmentEnabled(checked);
  };

  const autoEnrollmentTooltipContent = isAutoEnrollmentEnabled
    ? 'Enabling makes the serice available for the "Domain join on launch" feature within Image Builder.'
    : 'Disabling the option leaves the service registration intact, but does not make it available for the "Domain join on launch" feature within Image Builder. It can be enabled later in the "Register Directory and Domain Service" view.';

  return (
    <React.Fragment>
      <Form
        onSubmit={(value) => {
          console.debug('onSubmit WizardPage' + String(value));
        }}
      >
        <Title headingLevel={'h2'}>Service Details</Title>
        <FormGroup label="Service name" isRequired fieldId="register-domain-name">
          <TextInput id="register-domain-name" className="domain-name" value={props.data.title} />
        </FormGroup>
        <FormGroup label="Service description" fieldId="register-domain-description">
          <TextArea
            contentEditable="true"
            id="register-domain-description"
            type="text"
            readOnly={false}
            className="domain-description"
            value={data.description}
            onChange={(value) => setData({ ...data, description: value })}
          ></TextArea>
        </FormGroup>
        <FormGroup
          label={
            <>
              Domain join on launch <OutlinedQuestionCircleIcon></OutlinedQuestionCircleIcon>
            </>
          }
        >
          <Tooltip content={autoEnrollmentTooltipContent}>
            <Switch
              label="Enable upon finishing registration"
              labelOff="Disable upon finishing registration"
              id="checked-with-label-switch-on"
              aria-label="Message when on"
              isChecked={isAutoEnrollmentEnabled}
              hasCheckIcon
              onChange={onChangeAutoEnrollment}
            />
          </Tooltip>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default PageServiceDetails;
