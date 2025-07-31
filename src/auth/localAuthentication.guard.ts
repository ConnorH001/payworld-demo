import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// todo actually solve this lint not recognising the extending class
export class LocalAuthenticationGuard extends AuthGuard('local') {}
