import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithOrganization from './interfaces/requestWithOrganization.i';
import JwtAuthGuard from './jwtAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const organization = await this.authService.register({ email, password });

    //@ts-expect-error need to really fix this response typing with express type
    const cookie = this.authService.getCookieWithJwtToken(organization);

    // @ts-expect-error absolutely shocking behaviour here , my bad
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    response.setHeader('Set-Cookie', cookie);

    return organization;
  }

  @HttpCode(200)
  @Post('login')
  @UseGuards(LocalAuthenticationGuard)
  login(@Req() request: RequestWithOrganization, @Res() response: Response) {
    // passport is attaching organization to user which is a bit confusing , beware
    const organization = request.user;
    // @ts-expect-error give me a chance pls
    const cookie = this.authService.getCookieWithJwtToken(organization);
    // @ts-expect-error this is awful but need to address another time
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    response.setHeader('Set-Cookie', cookie);

    // @ts-expect-error this is awful but need to address another time
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
    return response.send(organization);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logOut(@Req() _request: RequestWithOrganization, @Res() response: Response) {
    // @ts-expect-error this is awful but need to address another time
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    response.setHeader('Set-Cookie', this.authService.getCookieToLogout());
    // @ts-expect-error this is awful but need to address another time
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    response.send();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: RequestWithOrganization) {
    return req.organization;
  }
}
