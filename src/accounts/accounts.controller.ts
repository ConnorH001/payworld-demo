import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  HttpCode,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import RequestWithOrganization from 'src/auth/interfaces/requestWithOrganization.i';
import JwtAuthGuard from 'src/auth/jwtAuthGuard';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/accounts.create.dto';
import { UpdateAccountDto } from './dtos/accounts.update.dto';
import { PaymentsService } from 'src/payments/payment.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAccounts(@Req() request: RequestWithOrganization) {
    //@ts-expect-error need to add id to user at some point
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const orgId = request?.user?.id;
    return this.accountsService.findByOrganizationId(orgId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAccountById(
    @Param('id') id: string,
    @Req() request: RequestWithOrganization,
  ) {
    //@ts-expect-error need to add id to user at some point
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const orgId = request.user.id;

    const account = await this.accountsService.findByIdAndOrganizationId(
      Number(id),
      orgId,
    );

    if (!account) {
      throw new NotFoundException(
        'Account not found or not in your organization',
      );
    }

    return {
      ...account,
      organization: { id: account.organization.id },
    };
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
    @Req() request: RequestWithOrganization,
  ) {
    const account = await this.accountsService.create(
      createAccountDto,
      //@ts-expect-error user id go brr
      request?.user?.id,
    );

    return {
      ...account,
      organization: {
        ...account.organization,
        password: undefined,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateAccount(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    @Req() request: RequestWithOrganization,
  ) {
    await this.accountsService.updateAccount(Number(id), updateAccountDto);

    // Get org ID from the request (assuming request.user has the org id)
    //@ts-expect-error need to add id to user at some point
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const orgId = request.user.id;

    // Fetch the updated account including its organization, but make sure it belongs to this org
    const updatedAccount = await this.accountsService.findByIdAndOrganizationId(
      Number(id),
      orgId,
    );

    if (!updatedAccount) {
      throw new NotFoundException(
        'Account not found or does not belong to your organization',
      );
    }

    // Return with only organization id to avoid exposing password
    return {
      ...updatedAccount,
      organization: { id: updatedAccount.organization.id },
    };
  }
  @UseGuards(JwtAuthGuard)
  @Get(':accountId/payments')
  async getPaymentsForAccount(
    @Param('accountId') accountId: string,
    @Req() request: RequestWithOrganization,
  ) {
    //@ts-expect-error need to add id to user at some point
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const orgId = request.user.id;

    const payments = await this.paymentsService.getPaymentsByAccount(
      Number(accountId),
      orgId,
    );

    return payments;
  }
}
