import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { OrganizationService } from 'src/organization/organization.service';
import { CreateAccountDto } from './dtos/accounts.create.dto';
import { UpdateAccountDto } from './dtos/accounts.update.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly organizationService: OrganizationService,
  ) {}

  public async findByOrganizationId(organizationId: string) {
    return this.accountRepository.find({
      where: { organization: { id: organizationId } },
      relations: ['organization'],
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        bankNumber: true,
        organization: {
          id: true,
          //we dont really need the rest
        },
      },
    });
  }

  async create(createAccountDto: CreateAccountDto, organizationId: string) {
    const organization =
      await this.organizationService.findById(organizationId);

    const account = this.accountRepository.create({
      ...createAccountDto,
      organization,
    });

    return this.accountRepository.save(account);
  }

  async updateAccount(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.accountRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    Object.assign(account, updateAccountDto);
    return this.accountRepository.save(account);
  }

  async findByIdAndOrganizationId(accountId: number, organizationId: string) {
    return this.accountRepository.findOne({
      where: { id: accountId, organization: { id: organizationId } },
      relations: ['organization'],
    });
  }
}
