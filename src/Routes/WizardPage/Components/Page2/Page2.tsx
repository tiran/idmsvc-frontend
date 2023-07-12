import React from 'react';
import { Form, FormGroup, TextArea } from '@patternfly/react-core';
import { TextInput } from '@patternfly/react-core';

import './Page2.scss';

const Page2 = () => {
  const [value, setValue] = React.useState(
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, porro velit aperiam deserunt dolor amet esse rerum ea sit ' +
      'sequi facere, necessitatibus quam! Ut sequi, praesentium officiis itaque aspernatur assumenda?'
  );
  return (
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
            contentEditable="true"
            id="register-domain-description"
            type="text"
            readOnly={false}
            className="domain-description"
            value={value}
            onChange={(value) => setValue(value)}
          ></TextArea>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default Page2;
