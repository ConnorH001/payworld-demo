import { Account } from 'src/accounts/entities/account.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Account, (account) => account.organization, {
    cascade: true,
  })
  accounts: Account[];
}

export default Organization;
