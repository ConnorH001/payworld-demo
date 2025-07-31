import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentsController } from './payments.controller';
import { Account } from 'src/accounts/entities/account.entity';
import { PaymentsService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Account])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
