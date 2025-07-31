import Organization from 'src/organization/entities/organization.entity';

interface TokenPayload {
  organization: Organization;
}

export default TokenPayload;
