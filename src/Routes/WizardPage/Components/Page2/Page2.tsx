import React, { useState } from 'react';
import { Form, FormGroup, TextArea } from '@patternfly/react-core';
import { TextInput } from '@patternfly/react-core';
import { Domain } from '../../../../Api/api';

import './Page2.scss';

const Page2: React.FC<{ data: Domain }> = (props) => {
  const [data, setData] = useState<Domain>(props.data);

  return (
    <React.Fragment>
      <Form
        onSubmit={(value) => {
          console.debug('onSubmit WizardPage' + String(value));
        }}
      >
        <FormGroup label="Name" isRequired fieldId="register-domain-name">
          <TextInput id="register-domain-name" className="domain-name" value={props.data.title} />
        </FormGroup>
        <FormGroup label="Description" fieldId="register-domain-description">
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
      </Form>
    </React.Fragment>
  );
};

export default Page2;
