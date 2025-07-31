import { Request } from 'express';
import Organization from 'src/organization/entities/organization.entity';

interface RequestWithOrganization extends Request {
  organization: Organization;
}
export default RequestWithOrganization;
