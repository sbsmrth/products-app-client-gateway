import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../interfaces';

export const GetUser = createParamDecorator(
  (data: (keyof User)[] = [], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request & { user?: User }>();
    const user = req.user;

    if (!user)
      throw new InternalServerErrorException('User not found in request');

    if (data.length === 0) return user;

    return Object.fromEntries(data.map((key) => [key, user[key]]));
  },
);
