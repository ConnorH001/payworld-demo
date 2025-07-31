import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePaymentDto } from './dtos/payments.create.dto';
import { PaymentsService } from './payment.service';
import JwtAuthGuard from 'src/auth/jwtAuthGuard';
import RequestWithOrganization from 'src/auth/interfaces/requestWithOrganization.i';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('account/:accountId')
  async createPayment(
    @Param('accountId') accountId: string,
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() request: RequestWithOrganization,
  ) {
    //@ts-expect-error need to add id to user at some point
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const orgId = request.user.id;

    return this.paymentsService.createPayment(
      Number(accountId),
      createPaymentDto,
      orgId,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':paymentId/status')
  async updatePaymentStatus(
    @Param('paymentId') paymentId: string,
    @Body('status') status: 'pending' | 'approved',
  ) {
    return this.paymentsService.updatePaymentStatus(Number(paymentId), status);
  }
}
