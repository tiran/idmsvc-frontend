import { TableComposable, TableHeader, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import './DomainList.scss';
import { Fragment, PropsWithChildren, useState } from 'react';
import React from 'react';
import { Props } from '@patternfly/react-core/dist/esm/helpers/Popper/DeprecatedTippyTypes';
import { Button } from '@patternfly/react-core';
import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';
import AngleDownIcon from '@patternfly/react-icons/dist/esm/icons/angle-down-icon';
import { Hash } from 'react-router-dom';

export interface RhelIdmCaCert {
  issuer: string;
  nickname: string;
  not_after: Date;
  not_before: Date;
  pem: string;
  serial_number: string;
  subject: string;
}

export type RhelIdmRealmDomains = string;

export interface RhelIdmServer {
  ca_server: boolean;
  fqdn: string;
  hcc_enrollment_server: boolean;
  hcc_update_server: boolean;
  location?: string | undefined;
  pkinit_server: boolean;
  subscription_manager_id: string;
}

export interface RhelIdm {
  ca_certs: RhelIdmCaCert[];
  realm_domains: RhelIdmRealmDomains[];
  realm_name: string;
  servers: RhelIdmServer[];
}

/**
 * Define the supported domain types.
 */
export type DomainType = 'rhel-idm';

export interface Domain {
  domain_id: string;
  domain_name: string;
  auto_enrollment_enabled: boolean;
  title: string;
  description: string;
  domain_type: DomainType;
  rhel_idm: RhelIdm;
}

export interface IColumnType<T> {
  key: string;
  title: string;
  width?: number;
  render?: (columnd: IColumnType<T>, item: T) => void;
}

export interface DomainListProps {
  data: Domain[];
}

export interface DomainProps {
  data: Domain;
}

/**
 * This represent the table header displayed for the DomainList.
 * @returns The table header for the DomainList component.
 */
const DomainListHead: React.FC = () => {
  return (
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>UUID</Th>
        <Th>Allow host domain join</Th>
      </Tr>
    </Thead>
  );
};

/**
 * This represent the table header displayed for the DomainList.
 * @returns The table header for the DomainList component.
 */
const TrDomainDetail: React.FC<DomainProps> = (props) => {
  const [domain] = useState<Domain>(props.data);

  switch (domain.domain_type) {
    case 'rhel-idm':
      return (
        <>
          {domain.rhel_idm.servers.map((server) => {
            return (
              <Tr key={domain.domain_id + server.fqdn}>
                <Td>{server.fqdn}</Td>
                <Td colSpan={2}>{server.subscription_manager_id}</Td>
              </Tr>
            );
          })}
        </>
      );
    default:
      return <></>;
  }
};

const DomainListBody: React.FC<DomainListProps> = (props) => {
  const [domains] = useState<Domain[]>(props.data);
  const [expandDomain, setExpandDomain] = useState<boolean>(false);
  const enabledText = 'Enabled';
  const disabledText = 'Disabled';

  const toggleExpandDomain = () => {
    setExpandDomain(!expandDomain);
  };

  return (
    <Tbody>
      {domains.map((domain) => {
        return (
          <>
            <Tr key={domain.domain_id}>
              <Td colSpan={2}>
                <Button variant="plain" onClick={toggleExpandDomain}>
                  {expandDomain && <AngleDownIcon />}
                  {expandDomain || <AngleRightIcon />}
                </Button>
                {domain.domain_name}
              </Td>
              <Td>{domain.auto_enrollment_enabled ? enabledText : disabledText}</Td>
            </Tr>
            {expandDomain && <TrDomainDetail data={domain} />}
          </>
        );
      })}
    </Tbody>
  );
};

const DomainList: React.FC<DomainListProps> = (props) => {
  const [domains] = useState<Domain[]>(props.data);
  return (
    <Fragment>
      <TableComposable aria-label="Simple table">
        <DomainListHead />
        <DomainListBody data={domains} />
      </TableComposable>
    </Fragment>
  );
};

export default DomainList;
