import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { OrganizationService } from '../organization/organization.service';
import { Account } from './entities/account.entity';
import Organization from 'src/organization/entities/organization.entity';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Organization]), PaymentsModule],
  providers: [AccountsService, OrganizationService],
  controllers: [AccountsController],
  exports: [AccountsService],
})
export class AccountsModule {}
