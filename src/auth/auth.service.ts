import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateOrganizationDto from 'src/organization/organization.create.dto';
import { OrganizationService } from 'src/organization/organization.service';
import Organization from 'src/organization/entities/organization.entity';
import TokenPayload from './interfaces/tokenPayload.i';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register({ email, password }: CreateOrganizationDto) {
    //todo add validation
    try {
      const hashPassword = await bcrypt.hash(password, 12);
      const organization = await this.organizationService.create({
        email,
        password: hashPassword,
      });
      return { ...organization, password: undefined };
    } catch {
      //todo add list of error codes in data struct and throw exceptions in alignment with these
      throw new HttpException(
        'Something went wrong but i should provide the reason in next version',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedOrganization(
    email: string,
    plainTextPassword: string,
  ) {
    try {
      const organization = await this.organizationService.findByEmail(email);

      await this.verifyPassword(plainTextPassword, organization.password);
      return {
        ...organization,
        password: undefined,
      } as unknown as Organization;
    } catch {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashPassword: string,
  ) {
    const passwordMatches = await bcrypt.compare(
      plainTextPassword,
      hashPassword,
    );
    if (!passwordMatches) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  public getCookieWithJwtToken(organization: Organization) {
    const payload: TokenPayload = { organization };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookieToLogout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
