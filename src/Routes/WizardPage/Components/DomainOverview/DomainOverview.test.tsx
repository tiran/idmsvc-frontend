import React from 'react';
import { render, screen } from '@testing-library/react';
import DomainOverview from './DomainOverview';
import '@testing-library/jest-dom';
import { Domain } from '../../../../Api';

test('expect sample-component to render children', () => {
  const location = 'boston';
  const subscription_manager_id = '21ee4400-4bfc-11ee-ada9-482ae3863d30';
  const domain_demo: Domain = {
    domain_name: 'mydomain.example',
    domain_type: 'rhel-idm',
    'rhel-idm': {
      ca_certs: [],
      locations: [
        {
          name: location,
          description: 'cpd located at Boston',
        },
      ],
      realm_domains: ['mydomain.example'],
      realm_name: 'MYDOMAIN.EXAMPLE',
      servers: [
        {
          location: location,
          fqdn: 'server1.mydomain.example',
          ca_server: true,
          pkinit_server: true,
          subscription_manager_id: subscription_manager_id,
          hcc_enrollment_server: true,
          hcc_update_server: true,
        },
      ],
    },
  };

  render(<DomainOverview domain={domain_demo} />);
  expect(screen.getAllByRole('rowgroup')[1].children[0].children[0].textContent).toEqual(location);
  expect(screen.getAllByRole('rowgroup')[1].children[0].children[1].textContent).toEqual(subscription_manager_id);
});
