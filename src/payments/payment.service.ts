import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { CreatePaymentDto } from './dtos/payments.create.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async createPayment(
    accountId: number,
    createPaymentDto: CreatePaymentDto,
    orgId: string,
  ) {
    const account = await this.accountRepository.findOne({
      where: { id: accountId, organization: { id: orgId } },
    });
    if (!account) {
      throw new NotFoundException(
        'Account not found or does not belong to your organization',
      );
    }

    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      account,
      status: 'pending',
    });

    return this.paymentRepository.save(payment);
  }
  async getPaymentsByAccount(accountId: number, orgId: string) {
    const payments = await this.paymentRepository.find({
      where: {
        account: {
          id: accountId,
          organization: { id: orgId },
        },
      },
      relations: ['account'],
    });
    return payments;
  }

  async updatePaymentStatus(paymentId: number, status: 'pending' | 'approved') {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    payment.status = status;
    return this.paymentRepository.save(payment);
  }
}
