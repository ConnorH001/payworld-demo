import { Controller, Get, Body, Param } from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.organizationService.findById(id);
  }
}
