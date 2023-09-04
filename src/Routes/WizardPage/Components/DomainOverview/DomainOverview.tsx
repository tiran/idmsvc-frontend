import './DomainOverview.scss';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { Fragment, useState } from 'react';
import React from 'react';

import { Domain } from '../../../../Api/api';

export interface IColumnType<T> {
  key: string;
  title: string;
  width?: number;
  render?: (columnd: IColumnType<T>, item: T) => void;
}

/**
 * This represent the table header displayed for the DomainList.
 * @returns The table header for the DomainList component.
 */
const DomainRhelIdmHead: React.FC = () => {
  return (
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>UUID</Th>
      </Tr>
    </Thead>
  );
};

const DomainRhelIdmBody: React.FC<{ domain: Domain }> = (props) => {
  const [domain] = useState<Domain>(props.domain);

  return (
    <Tbody>
      {domain['rhel-idm']?.servers.map((server) => {
        return (
          <Tr key={server.subscription_manager_id}>
            <Td>{server.location}</Td>
            <Td>{server.subscription_manager_id}</Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

export interface DomainProps {
  domain: Domain;
}

export const DomainOverview: React.FC<DomainProps> = (props) => {
  const [domain] = useState<Domain>(props.domain);

  return (
    <>
      <TableComposable>
        {domain.domain_type == 'rhel-idm' && (
          <>
            <DomainRhelIdmHead />
            <DomainRhelIdmBody domain={domain} />
          </>
        )}
      </TableComposable>
    </>
  );
};

export default DomainOverview;
