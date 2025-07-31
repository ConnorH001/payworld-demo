import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import Organization from 'src/organization/entities/organization.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<Organization> {
    const organization = await this.authService.getAuthenticatedOrganization(
      email,
      password,
    );

    return {
      id: organization.id,
      email: organization.email,
    } as Organization;
  }
}
