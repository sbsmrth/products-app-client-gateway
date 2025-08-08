import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly natsClient: ClientProxy,
  ) {}

  @Post('register')
  registerUser() {
    return this.natsClient.send('auth.register.user', {});
  }

  @Post('login')
  loginUser() {
    return this.natsClient.send('auth.login.user', {});
  }

  @Post('verify')
  verifyUser() {
    return this.natsClient.send('auth.verify.user', {});
  }
}
