import Organization from 'src/organization/entities/organization.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  bankNumber: string;

  @ManyToOne(() => Organization, (organization) => organization.accounts, {
    onDelete: 'CASCADE',
  })
  organization: Organization;

  @OneToMany(() => Payment, (payment) => payment.account)
  payments: Payment[];
}
