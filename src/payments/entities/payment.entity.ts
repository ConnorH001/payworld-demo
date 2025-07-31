import { Account } from 'src/accounts/entities/account.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column()
  amount: string;

  @Column()
  recipientName: string;

  @Column()
  recipientBankName: string;

  @Column()
  recipientAccountNumber: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'approved';
}
