import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Organization from './entities/organization.entity';
import CreateOrganizationDto from './organization.create.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepo: Repository<Organization>,
  ) {}

  async findById(id: string) {
    const organization = await this.organizationRepo.findOne({ where: { id } });
    if (organization) {
      return organization;
    }

    throw new HttpException(
      'Organization with this ID does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async findByEmail(email: string) {
    const organization = await this.organizationRepo.findOne({
      where: { email },
    });
    if (organization) {
      return organization;
    }

    throw new HttpException(
      'Organization with this Email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(organizationData: CreateOrganizationDto) {
    const newOrg = this.organizationRepo.create(organizationData);
    await this.organizationRepo.save(newOrg);
    return newOrg;
  }
}
