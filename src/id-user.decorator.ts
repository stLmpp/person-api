import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const IdUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    context.switchToHttp().getRequest<Request>().header('id-user') ?? 'default'
);
