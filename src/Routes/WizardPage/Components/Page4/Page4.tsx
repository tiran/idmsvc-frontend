import React, { useState } from 'react';

import { DescriptionList, DescriptionListDescription, DescriptionListGroup, DescriptionListTerm, Switch } from '@patternfly/react-core';

import './Page4.scss';
import { Domain } from '../../../../Api/api';
import DomainOverview from '../../Components/DomainOverview/DomainOverview';

const Page4: React.FC<{ data: Domain }> = (props) => {
  const [isHostJoinEnabled, setIsHostJoinEnabled] = React.useState(true);
  const [domain] = useState<Domain>(props.data);

  const onHostJoinEnabledChange = () => {
    setIsHostJoinEnabled(!isHostJoinEnabled);
  };

  return (
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
          <DescriptionListDescription>{domain.domain_type === 'rhel-idm' && <div>RHEL IdM (IPA)</div>}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Name</DescriptionListTerm>
          <DescriptionListDescription>{domain.title}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Description</DescriptionListTerm>
          <DescriptionListDescription>{domain.description}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>DNS Domain/Servers</DescriptionListTerm>
          <DescriptionListDescription>
            {/* TODO Navigator panel */}
            1-3 of 3 v &nbsp;&nbsp;&lt;&nbsp;&nbsp;&nbsp;&gt;
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DomainOverview domain={domain} />
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
};

export default Page4;
