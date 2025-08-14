import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request & { token: string }>();
    const token = req.token;

    if (!token)
      throw new InternalServerErrorException('Token not found in request');

    return token;
  },
);
